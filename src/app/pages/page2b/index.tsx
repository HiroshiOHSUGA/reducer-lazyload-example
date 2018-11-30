import * as React from "react";
import { RootState } from "app/store/state";

export type Page2bProps = RootState["prop2"]["prop2b"] & {
  update(): void;
};

export const Page2b = (props: Page2bProps) => {
  return (
    <div>
      <h1>Page2b</h1>
      <div>p1: {props.p1}</div>
      <div>p2: {props.p2}</div>
      <button onClick={props.update}>update</button>
    </div>
  );
};
