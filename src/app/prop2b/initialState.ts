import { RootState } from "app/store/state";

export const getProp2bInitialState = (): RootState["prop2"]["prop2b"] => {
  return {
    p1: "str1",
    p2: "str2",
  };
};
