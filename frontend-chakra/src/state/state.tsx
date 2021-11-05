import React, { createContext, useContext, useReducer } from "react";
import { Combination } from "../interfaces";
import { Action } from "./reducer";

export type State = {
  combo: Combination;
};

const initialState: State = {
  combo: {
    id: 0,
    gameId: 0,
    player: null,
    playerId: 0,
    game: {
      id: 0,
      pgn: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      whitePlayer: {
        id: 0,
        firstName: "",
        lastName: "",
        fullName: "",
      },
      whitePlayerId: 0,
      blackPlayer: {
        id: 0,
        firstName: "",
        lastName: "",
        fullName: "",
      },
      blackPlayerId: 0,
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
