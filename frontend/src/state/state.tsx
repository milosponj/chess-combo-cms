import React, { createContext, useContext, useReducer } from "react";
import { Combination, Player, Notification, Game } from "../interfaces";
import { Action } from "./reducer";

export type State = {
  combo: Combination;
  combinations: Combination[];
  player: Player;
  players: Player[];
  game: Game;
  games: Game[];
  notification: Notification;
};

export const initialGameState: Game = {
  id: "",
  whitePlayer: {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    hasAvatar: false,
  },
  blackPlayer: {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    hasAvatar: false,
  },
  pgn: "",
  title: "",
  venue: "",
  date: "",
  event: "",
};

const initialState: State = {
  combo: {
    id: "",
    game: { ...initialGameState },
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
  combinations: [],
  game: initialGameState,
  player: {
    id: "",
    firstName: "",
    lastName: "",
    fullName: "",
    hasAvatar: false,
  },
  players: [],

  games: [],
  notification: { message: "" },
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
