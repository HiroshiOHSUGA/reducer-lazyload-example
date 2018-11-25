export namespace Prop1Actions {
  export enum Type {
    RANDOMIZE = "@app/prop1/RANDOMIZE",
  }

  export type Action = {
    type: Type.RANDOMIZE;
  };

  export const randomize = (): Action => {
    return {
      type: Type.RANDOMIZE,
    };
  };
}
