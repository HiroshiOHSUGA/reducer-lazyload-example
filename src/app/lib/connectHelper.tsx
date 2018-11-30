import { connect as reactReduxConnect } from "react-redux";
import { RootState } from "app/store/state";
import { Dispatch } from "redux";

const mapStateToProps = (state: RootState): RootState => state;
const mapDispatchToProps = (dispatch: Dispatch) => ({ dispatch });

export type IMergeProps<ComponentProps, OwnProps> = (
  state: RootState,
  dispatches: { dispatch: Dispatch },
  ownProps: OwnProps,
) => ComponentProps;

export const connectHelper = <ComponentProps, OwnProps = any>(
  mergeProps: IMergeProps<ComponentProps, OwnProps>,
) => {
  return reactReduxConnect(mapStateToProps, mapDispatchToProps, mergeProps);
};
