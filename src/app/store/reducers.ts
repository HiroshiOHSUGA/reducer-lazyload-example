import { IPrepareRequest, IReducerMap, ReducerRegistry } from "app/lib/ReducerRegistry";
import { RootState } from "app/store/state";
import { getProp1InitialState } from "app/prop1/initialState";
import { getProp2aInitialState } from "app/prop2a/initialState";
import { getProp2bInitialState } from "app/prop2b/initialState";
import { connectRouter } from "connected-react-router";

export const getReducerRegistry = (history: any) => {
  const reducerSetting: IReducerMap = {
    prop1: async () => {
      const {
        Prop1Reducer,
      } = await import(/* webpackChunkName: "Prop1Reducer" */ "app/prop1/reducer");
      return Prop1Reducer;
    },
    prop2: {
      prop2a: async () => {
        const {
          Prop2aReducer,
        } = await import(/* webpackChunkName: "Prop2aReducer" */ "app/prop2a/reducer");
        return Prop2aReducer;
      },
      prop2b: async () => {
        const {
          Prop2bReducer,
        } = await import(/* webpackChunkName: "Prop2bReducer" */ "app/prop2b/reducer");
        return Prop2bReducer;
      },
    },
    router: async () => {
      return Promise.resolve(connectRouter(history));
    },
  };

  return new ReducerRegistry(reducerSetting);
};

export const initialReducersMap: IPrepareRequest = {};

export const getInitialState = (): RootState => {
  return {
    prop1: getProp1InitialState(),
    prop2: {
      prop2a: getProp2aInitialState(),
      prop2b: getProp2bInitialState(),
    },
    router: {
      location: {
        pathname: "",
        search: "",
        state: "",
        hash: "",
      },
      action: "" as any,
    },
  };
};
