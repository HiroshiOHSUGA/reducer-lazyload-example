import * as React from "react";
import { IPrepareRequest } from "app/lib/ReducerRegistry";
import { RequireReducer } from "app/store/configureStore";
export const RequireReducerContext = React.createContext<null | RequireReducer>(null);

export type AsyncProps = {
  reducers: IPrepareRequest;
  loader(): Promise<React.ComponentType>;
};

export class Async<T> extends React.Component<AsyncProps, any> {
  public render() {
    const props = this.props;
    return (
      <RequireReducerContext.Consumer>
        {(requireReducer: RequireReducer | null) =>
          requireReducer === null ? (
            <div>wait registry</div>
          ) : (
            <Loader
              requireReducer={requireReducer}
              reducers={props.reducers}
              loader={props.loader}
            />
          )
        }
      </RequireReducerContext.Consumer>
    );
  }
}
type LoaderProps = {
  requireReducer: RequireReducer;
  reducers: IPrepareRequest;
  loader(): Promise<React.ComponentType>;
};

class Loader extends React.Component<LoaderProps> {
  public shouldComponentUpdate() {
    return false;
  }

  render() {
    const { requireReducer, reducers, loader } = this.props;

    const Lazy = React.lazy(() => {
      return Promise.all([loader(), requireReducer(reducers)]).then(results => {
        return {
          // hack https://github.com/facebook/react/blob/95a313ec0b957f71798a69d8e83408f40e76765b/packages/shared/ReactLazyComponent.js#L16
          default: results[0],
        };
      });
    });

    return (
      <React.Suspense fallback={<div>loading...</div>}>
        <Lazy />
      </React.Suspense>
    );
  }
}
