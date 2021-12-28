import React, {
  createContext,
  useReducer,
  Reducer,
  Dispatch,
  PropsWithChildren,
} from "react";
import { ReducerCaller } from "./BlogContext";
/*
 * export type ReducerCaller<A> = (
 *  arg0: Dispatch<A>
 * ) => (...args: any | undefined) => void;
 */
type BoundActionsType<T> = Record<
  string,
  (...args: any) => ReturnType<Dispatch<T>>
>;

type ContextType<T, R> = {
  state: T;
  update: BoundActionsType<R>;
};

export default <S, A, C extends ReducerCaller<A>>(
  reducer: Reducer<S, A>,
  initialState: S,
  actions: Record<string, C>
) => {
  const Context = createContext({} as ContextType<S, A>);

  const Provider = (props: PropsWithChildren<{}>) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: BoundActionsType<A> = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider
        value={{ state, update: { ...boundActions } }}
        {...props}
      />
    );
  };

  return { Context, Provider };
};
