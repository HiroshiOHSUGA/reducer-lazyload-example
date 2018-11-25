export namespace Prop2BActions {
  export enum Type {
    RANDOMIZE = "@app/prop2b/RANDOMIZE",
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
