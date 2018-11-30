import { RootState } from "app/store/state";
import { getProp2aInitialState } from "app/prop2a/initialState";
import { Prop2aActions } from "app/prop2a/actions";

export const Prop2aReducer = (
  state: RootState["prop2"]["prop2a"] = getProp2aInitialState(),
  action: Prop2aActions.Action,
): RootState["prop2"]["prop2a"] => {
  switch (action.type) {
    case Prop2aActions.Type.RANDOMIZE:
      return {
        p1: Math.random() > 0.5,
        p2: Math.random() > 0.5,
      };
    default:
      return state;
  }
};
