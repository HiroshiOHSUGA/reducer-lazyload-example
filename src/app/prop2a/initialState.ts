import { RootState } from "app/store/state";

export const getProp2aInitialState = (): RootState["prop2"]["prop2a"] => {
  return {
    p1: false,
    p2: false,
  };
};
