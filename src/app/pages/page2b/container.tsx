import { connectHelper } from "app/lib/connectHelper";
import { Page2b, Page2bProps } from "app/pages/page2b/index";
import { Prop2bActions } from "app/prop2b/actions";

export const Page2bContainer = connectHelper(
  (state, { dispatch }): Page2bProps => {
    return {
      ...state.prop2.prop2b,
      update: () => {
        dispatch(Prop2bActions.randomize());
      },
    };
  },
)(Page2b);
