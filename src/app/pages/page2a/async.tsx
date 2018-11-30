import * as React from "react";
import { Async } from "app/lib/Async";

export const AsyncPage2aContainer = () => {
  return (
    <Async
      reducers={{ prop2: { prop2a: true } }}
      loader={async () => {
        const {
          Page2aContainer,
        } = await import(/* webpackChunkName: "Page2aContainer" */ "./container");

        return Page2aContainer;
      }}
    />
  );
};
