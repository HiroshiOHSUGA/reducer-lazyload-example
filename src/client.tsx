import * as React from "react";
import * as ReactDOM from "react-dom";
import { App } from "app/App";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import createBrowserHistory from "history/createBrowserHistory";
import { configureStore } from "app/store/configureStore";

const history = createBrowserHistory();
const { store, initializeReducers } = configureStore(history);
const root = document.getElementById("root");

initializeReducers().then(() => {
  const appElement = (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  );
  ReactDOM.render(appElement, root);
});
