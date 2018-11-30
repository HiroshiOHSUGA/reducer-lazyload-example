import * as React from "react";
import { RootState } from "app/store/state";

export type Page2aProps = RootState["prop2"]["prop2a"] & {
  update(): void;
};

export const Page2a = (props: Page2aProps) => {
  return (
    <div>
      <h1>Page2a</h1>
      <div>p1: {props.p1 ? "hit" : "miss"}</div>
      <div>p2: {props.p2 ? "hit" : "miss"}</div>
      <button onClick={props.update}>update</button>
    </div>
  );
};
