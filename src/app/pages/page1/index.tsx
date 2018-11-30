import * as React from "react";
import { RootState } from "app/store/state";

export type Page1Props = RootState["prop1"] & {
  update(): void;
};

export const Page1 = (props: Page1Props) => {
  return (
    <div>
      <h1>Page1</h1>
      <div>p1: {props.p1}</div>
      <div>p2: {props.p2}</div>
      <button onClick={props.update}>update</button>
    </div>
  );
};
