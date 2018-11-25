//tslint:disable:strict-boolean-expressions boiler plateのサンプルコードなので無視
import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, createStore, Reducer, Store } from "redux";
import {
  IPrepareRequest,
  recursiveCombineReducers,
  ReducerRegistry,
} from "app/lib/ReducerRegistry";
import { getInitialState, getReducerRegistory, initialReducersMap } from "./reducers";
import { RootState } from "./state";

export type AddToStore = (request: IPrepareRequest) => Promise<void>;

interface IReturnObject {
  store: Store<RootState>;

  addToStore: AddToStore;

  initializeReducers(): Promise<void>;
}

export function configureStore(
  history: History,
  preloadState: RootState = getInitialState(),
): IReturnObject {
  const reducerRegistry = getReducerRegistory(history);
  const middleware = applyMiddleware(routerMiddleware(history));

  const initialReducer = () => {
    return preloadState;
  };

  const store: Store<RootState> = createStore(initialReducer, preloadState, middleware);

  const addToStore = async (request: IPrepareRequest) => {
    await reducerRegistry.prepare(request);
    store.replaceReducer(getReducers(reducerRegistry));
  };

  return {
    store,
    async initializeReducers() {
      return addToStore(initialReducersMap);
    },
    addToStore,
  };
}

function getReducers(reducerRegistry: ReducerRegistry): Reducer<any> {
  return recursiveCombineReducers(reducerRegistry.getLoaded());
}
