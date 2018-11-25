import { RootState } from "app/store/state";
import { getProp1InitialState } from "app/prop1/initialState";
import { Prop1Actions } from "app/prop1/actions";

export const Prop1Reducer = (
  state: RootState["prop1"] = getProp1InitialState(),
  action: Prop1Actions.Action,
): RootState["prop1"] => {
  switch (action.type) {
    case Prop1Actions.Type.RANDOMIZE:
      return {
        p1: Math.random(),
        p2: Math.random(),
      };
    default:
      return state;
  }
};
