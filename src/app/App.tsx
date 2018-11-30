import * as React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
import { AsyncPage1Container } from "app/pages/page1/async";
import { AsyncPage2aContainer } from "app/pages/page2a/async";
import { AsyncPage2bContainer } from "app/pages/page2b/async";

export const App = () => (
  <div>
    <ul>
      <li>
        <Link to="/static/page1">page1</Link>
      </li>
      <li>
        <Link to="/static/page2a">page2a</Link>
      </li>
      <li>
        <Link to="/static/page2b">page2b</Link>
      </li>
    </ul>
    <Route path="/static/*">
      <Switch>
        <Route path="/static/page1" component={AsyncPage1Container} />
        <Route path="/static/page2a" component={AsyncPage2aContainer} />
        <Route path="/static/page2b" component={AsyncPage2bContainer} />
      </Switch>
    </Route>
  </div>
);
