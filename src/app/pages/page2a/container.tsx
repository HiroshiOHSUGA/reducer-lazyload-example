import { connectHelper } from "app/lib/connectHelper";
import { Page2a, Page2aProps } from "app/pages/page2a/index";
import { Prop2aActions } from "app/prop2a/actions";

export const Page2aContainer = connectHelper(
  (state, { dispatch }): Page2aProps => {
    return {
      ...state.prop2.prop2a,
      update: () => {
        dispatch(Prop2aActions.randomize());
      },
    };
  },
)(Page2a);
