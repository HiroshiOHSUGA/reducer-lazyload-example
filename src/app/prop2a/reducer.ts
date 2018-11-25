import { RootState } from "app/store/state";
import { getProp2AInitialState } from "app/prop2a/initialState";
import { Prop2AActions } from "app/prop2a/actions";

export const Prop2AReducer = (
  state: RootState["prop2"]["prop2a"] = getProp2AInitialState(),
  action: Prop2AActions.Action,
): RootState["prop2"]["prop2a"] => {
  switch (action.type) {
    case Prop2AActions.Type.RANDOMIZE:
      return {
        p1: Math.random() > 0.5,
        p2: Math.random() > 0.5,
      };
    default:
      return state;
  }
};
