import { IPrepareRequest, IReducerMap, ReducerRegistry } from "app/lib/ReducerRegistry";
import { RootState } from "app/store/state";
import { getProp1InitialState } from "app/prop1/initialState";
import { getProp2AInitialState } from "app/prop2a/initialState";
import { getProp2BInitialState } from "app/prop2b/initialState";
import { connectRouter } from "connected-react-router";

export const getReducerRegistory = (history: any) => {
  const reducerSetting: IReducerMap = {
    prop1: async () => {
      const { Prop1Reducer } = await import("app/prop1/reducer");
      return Prop1Reducer;
    },
    prop2: {
      prop2a: async () => {
        const { Prop2AReducer } = await import("app/prop2a/reducer");
        return Prop2AReducer;
      },
      prop2b: async () => {
        const { Prop2BReducer } = await import("app/prop2b/reducer");
        return Prop2BReducer;
      },
    },
    router: async () => {
      return Promise.resolve(connectRouter(history));
    },
  };

  return new ReducerRegistry(reducerSetting);
};

export const initialReducersMap: IPrepareRequest = {
  prop1: true,
};

export const getInitialState = (): RootState => {
  return {
    prop1: getProp1InitialState(),
    prop2: {
      prop2a: getProp2AInitialState(),
      prop2b: getProp2BInitialState(),
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
