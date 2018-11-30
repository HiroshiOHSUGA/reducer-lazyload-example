import * as React from "react";
import { Async } from "app/lib/Async";

export const AsyncPage1Container = () => {
  return (
    <Async
      reducers={{ prop1: true }}
      loader={async () => {
        const {
          Page1Container,
        } = await import(/* webpackChunkName: "Page1Container" */ "./container");

        return Page1Container;
      }}
    />
  );
};
