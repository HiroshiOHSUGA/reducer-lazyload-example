export namespace Prop2AActions {
  export enum Type {
    RANDOMIZE = "@app/prop2a/RANDOMIZE",
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
