import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "app/App";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import createBrowserHistory from "history/createBrowserHistory";
import { configureStore } from "app/store/configureStore";
import { RequireReducerContext } from "app/lib/Async";

const history = createBrowserHistory();
const { store, initializeReducers, requireReducer } = configureStore(history);
const root = document.getElementById("root");

initializeReducers().then(() => {
  const appElement = (
    <RequireReducerContext.Provider value={requireReducer}>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    </RequireReducerContext.Provider>
  );
  ReactDOM.render(appElement, root);
});
