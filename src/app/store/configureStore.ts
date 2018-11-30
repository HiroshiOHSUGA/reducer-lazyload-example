import { routerMiddleware } from "connected-react-router";
import { History } from "history";
import { applyMiddleware, createStore, Reducer, Store } from "redux";
import {
  IPrepareRequest,
  recursiveCombineReducers,
  ReducerRegistry,
} from "app/lib/ReducerRegistry";
import { getInitialState, getReducerRegistry, initialReducersMap } from "./reducers";
import { RootState } from "./state";

export type RequireReducer = (request: IPrepareRequest) => Promise<void>;

interface IReturnObject {
  store: Store<RootState>;

  requireReducer: RequireReducer;

  initializeReducers(): Promise<void>;
}

export function configureStore(
  history: History,
  preloadState: RootState = getInitialState(),
): IReturnObject {
  const reducerRegistry = getReducerRegistry(history);
  const middleware = applyMiddleware(routerMiddleware(history));

  const initialReducer = () => {
    return preloadState;
  };

  const store: Store<RootState> = createStore(initialReducer, preloadState, middleware);

  const requireReducer = async (request: IPrepareRequest) => {
    await reducerRegistry.prepare(request);
    store.replaceReducer(getReducers(reducerRegistry));
  };

  return {
    store,
    async initializeReducers() {
      return requireReducer(initialReducersMap);
    },
    requireReducer,
  };
}

function getReducers(reducerRegistry: ReducerRegistry): Reducer<any> {
  return recursiveCombineReducers(reducerRegistry.getLoaded());
}
