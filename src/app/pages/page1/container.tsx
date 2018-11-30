import { connectHelper } from "app/lib/connectHelper";
import { Page1, Page1Props } from "app/pages/page1/index";
import { Prop1Actions } from "app/prop1/actions";

export const Page1Container = connectHelper(
  (state, { dispatch }): Page1Props => {
    return {
      ...state.prop1,
      update: () => {
        dispatch(Prop1Actions.randomize());
      },
    };
  },
)(Page1);
