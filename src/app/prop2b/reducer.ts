import { RootState } from "app/store/state";
import { getProp2bInitialState } from "app/prop2b/initialState";
import { Prop2bActions } from "app/prop2b/actions";

export const Prop2bReducer = (
  state: RootState["prop2"]["prop2b"] = getProp2bInitialState(),
  action: Prop2bActions.Action,
): RootState["prop2"]["prop2b"] => {
  switch (action.type) {
    case Prop2bActions.Type.RANDOMIZE:
      return {
        p1: Math.random() > 0.5 ? "foo" : "bar",
        p2: Math.random() > 0.5 ? "foo" : "bar",
      };
    default:
      return state;
  }
};
