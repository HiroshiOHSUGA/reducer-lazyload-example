import { RouterState } from "connected-react-router";

export type RootState = {
  prop1: {
    p1: number;
    p2: number;
  };
  prop2: {
    prop2a: {
      p1: boolean;
      p2: boolean;
    };
    prop2b: {
      p1: string;
      p2: string;
    };
  };
  router?: RouterState;
};
