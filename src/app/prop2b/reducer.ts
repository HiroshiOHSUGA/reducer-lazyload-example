import { RootState } from "app/store/state";
import { getProp2BInitialState } from "app/prop2b/initialState";
import { Prop2BActions } from "app/prop2b/actions";

export const Prop2BReducer = (
  state: RootState["prop2"]["prop2b"] = getProp2BInitialState(),
  action: Prop2BActions.Action,
): RootState["prop2"]["prop2b"] => {
  switch (action.type) {
    case Prop2BActions.Type.RANDOMIZE:
      return {
        p1: Math.random() > 0.5 ? "foo" : "bar",
        p2: Math.random() > 0.5 ? "foo" : "bar",
      };
    default:
      return state;
  }
};
