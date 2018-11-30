import * as React from "react";
import { Async } from "app/lib/Async";

export const AsyncPage2bContainer = () => {
  return (
    <Async
      reducers={{ prop2: { prop2b: true } }}
      loader={async () => {
        const {
          Page2bContainer,
        } = await import(/* webpackChunkName: "Page2bContainer" */ "./container");

        return Page2bContainer;
      }}
    />
  );
};
