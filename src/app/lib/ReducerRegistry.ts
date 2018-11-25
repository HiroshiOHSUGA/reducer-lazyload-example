import { combineReducers, Reducer } from "redux";

/**
 * この関数を呼び出すとlazyloadされるような動きを期待するので、
 * 呼び出されて初めてpromiseが生成されるような関数である必要がある
 *
 * このreducerとしてはReducerが扱うStateのShapeもActionのタイプも具体的に興味はないのでanyでよい
 * 利用側で困ったら考える
 */
export type ReducerLoader = () => Promise<Reducer<any, any>>;

//プロパティに
//1. Reducer<any> reducerの本体
//2. Reducer<any> を返すPromise を返す関数
//3. ネスト
export interface IReducerMap extends Record<string, IReducerMap | ReducerLoader> {}
interface ILoadedReducerMap extends Record<string, ILoadedReducerMap | Reducer<any>> {}
export interface IPrepareRequest extends Record<string, IPrepareRequest | true> {}

export class ReducerRegistry {
  private map: IReducerMap;
  private loaded: ILoadedReducerMap;

  constructor(map: IReducerMap) {
    this.map = map;
    this.loaded = getInitialLoaded(map);
  }

  /**
   * 必要になるreducerが使えるように要求する
   * reducerは返却するPromiseがresolveした時のみ準備完了となる
   *
   * 例外
   * - requestの形がmapと一貫していない場合は例外が出る
   * - ReducerLoaderが何らかの理由で出した例外 (通信エラーとか？)
   *     - こちらはPromise.allの都合で詳細なハンドリングはできない可能性がたかい
   *     - 正常にリリースされてれば通信不調なので、リロードしてもらったりすればよいか？
   */
  public async prepare(request: IPrepareRequest): Promise<any[]> {
    const promises: Promise<void>[] = [];
    findUnload(this.map, request, this.loaded, (loader: ReducerLoader, path: string[]) => {
      const promise: Promise<any> = loader();
      //tslint:disable-next-line no-floating-promises この関数が返却する promise をエラーハンドリングすれば良いので無視できる
      promise.then((reducer: Reducer) => {
        this.updateReducer(reducer, path);
      });

      promises.push(promise);
    });

    return Promise.all(promises);
  }

  public getLoaded(): ILoadedReducerMap {
    return this.loaded;
  }

  /**
   * @param reducer ロードされたReducer
   * @param path reducerをどの位置に設定すべきかを示しすキーの一覧
   * @param target 現在イテレーションしている this.loaded の一部
   */
  private updateReducer(reducer: Reducer, path: string[], target: ILoadedReducerMap = this.loaded) {
    const key = path.shift();
    if (key === undefined) {
      return;
    }

    if (path.length !== 0) {
      if (target[key] === undefined) {
        target[key] = {};
      }

      //walkForUnload の結果を信じて、pathが残っていれば、ILoadedReducerMapであるとみなす
      //この辺がおかしい場合はwalkForUnloadがおかしいことになる。
      this.updateReducer(reducer, path, target[key] as ILoadedReducerMap);
    } else {
      target[key] = reducer;
    }
  }
}

function getInitialLoaded(map: IReducerMap): ILoadedReducerMap {
  const loaded: ILoadedReducerMap = {};

  Object.keys(map).forEach(key => {
    const elem = map[key];
    const isElementReducerLoader = typeof elem === "function";

    loaded[key] = isElementReducerLoader
      ? (privateNoopReducer as Reducer<any>)
      : getInitialLoaded(elem as IReducerMap);
  });

  return loaded;
}

// テスト用 export
// 実際のreducerがロードされるまでの間 state を維持するための reducer
// 基本的には preload state を破壊しないために存在する
export function privateNoopReducer(state: any = null) {
  return state;
}

/**
 * 未実行のReducerLoaderが見つかった場合に呼び出されるコールバック
 */
type handleUnloadLoader = (
  //未実行のReducerLoader
  loader: ReducerLoader,
  //loaderが設定されていたIReducerMapの位置
  path: string[],
) => void;

/**
 * IReducerMapに対してハンドルスべきIPrepareRequestをILoadedReducerMapをチェックしながら見つけに行く
 * 見つかると handleUnloadLoader が呼び出される
 */
function findUnload(
  map: IReducerMap,
  request: IPrepareRequest,
  loaded: ILoadedReducerMap = {},
  handler: handleUnloadLoader,
  path: string[] = [],
): void {
  Object.keys(request).forEach(key => {
    const isNestKey = typeof map[key] !== "function";
    const isNestRequested = request[key] !== true;

    if (isNestKey !== isNestRequested) {
      throw new Error(
        `structure missmatch. key = ${key}. map[${key}] is ${
          isNestKey ? "nested" : "reducer"
        } but request[${key}] expect ${isNestRequested ? "nest" : "reducer"}.`,
      );
    }

    if (isNestKey) {
      findUnload(
        map[key] as IReducerMap,
        request[key] as IPrepareRequest,
        loaded[key] as ILoadedReducerMap,
        handler,
        path.concat(key),
      );
    } else {
      const isLoaded = loaded[key] !== privateNoopReducer;
      if (isLoaded) {
        return;
      }
      handler(map[key] as ReducerLoader, path.concat(key));
    }
  });
}

export function recursiveCombineReducers(
  loaded: ReturnType<ReducerRegistry["getLoaded"]>,
): Reducer<any> {
  const reducers: any = {};
  Object.keys(loaded).forEach(key => {
    const elem = loaded[key];
    const isElementReducer = typeof elem === "function";

    const reducer = isElementReducer
      ? elem
      : recursiveCombineReducers(elem as ReturnType<ReducerRegistry["getLoaded"]>);

    reducers[key] = reducer;
  });

  return combineReducers(reducers);
}
