import { RootState } from "app/store/state";

export const getProp1InitialState = (): RootState["prop1"] => {
  return {
    p1: 0,
    p2: 1,
  };
};
