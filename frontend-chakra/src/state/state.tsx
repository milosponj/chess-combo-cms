import React, { createContext, useContext, useReducer } from "react";
import { Combination } from "../interfaces";
import { Action } from "./reducer";

export type State = {
  combo: Combination;
  combinations: Combination[];
};

const initialState: State = {
  combo: {
    id: "",
    game: {
      id: "",
      pgn: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      whitePlayer: {
        id: "",
        firstName: "",
        lastName: "",
        fullName: "",
      },
      whitePlayerId: "",
      blackPlayer: {
        id: "",
        firstName: "",
        lastName: "",
        fullName: "",
      },
      blackPlayerId: "",
    },
    moves: [
      {
        number: 0,
        sign: "",
        remark: "",
        annotation: "",
        fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      },
    ],
  },
  combinations: []
};

export const StateContext = createContext<[State, React.Dispatch<Action>]>([
  initialState,
  () => initialState,
]);

type StateProviderProps = {
  reducer: React.Reducer<State, Action>;
  children: React.ReactElement;
};

export const StateProvider: React.FC<StateProviderProps> = ({
  reducer,
  children,
}: StateProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StateContext.Provider value={[state, dispatch]}>
      {children}
    </StateContext.Provider>
  );
};
export const useStateValue = () => useContext(StateContext);
