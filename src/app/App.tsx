import * as React from "react";
import { Route, Switch } from "react-router";
import { Link } from "react-router-dom";
export const App = () => (
  <Route path="/static">
    <Switch>
      <Route exact path="/">
        <ul>
          <li>
            <Link to="/page1">page1</Link>
          </li>
          <li>
            <Link to="/page2a">page2a</Link>
          </li>
          <li>
            <Link to="/page2b">page2b</Link>
          </li>
        </ul>
      </Route>
      <Route path="/page1">
        <div>p1</div>
      </Route>
      <Route path="/page2a">
        <div>p2a</div>
      </Route>
      <Route path="/page2b">
        <div>p2b</div>
      </Route>
    </Switch>
  </Route>
);
