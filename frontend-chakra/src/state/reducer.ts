import { State } from "./state";
import { Combination, Player } from "../interfaces";

export type Action =
  | {
      type: "SET_COMBO";
      payload: { combo: Combination };
    }
  | {
      type: "SET_COMBINATIONS";
      payload: Combination[];
    }
  | {
      type: "SET_PLAYER";
      payload: { player: Player };
    }
  | {
      type: "SET_PLAYERS";
      payload: Player[];
    };

export const setCombo = (combo: Combination): Action => {
  return {
    type: "SET_COMBO",
    payload: { combo },
  };
};

export const setCombinations = (combinations: Combination[]): Action => {
  return {
    type: "SET_COMBINATIONS",
    payload: combinations,
  };
};

export const setPlayer = (player: Player): Action => {
  return {
    type: "SET_PLAYER",
    payload: { player },
  };
};

export const setPlayers = (players: Player[]): Action => {
  return {
    type: "SET_PLAYERS",
    payload: players,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_COMBO":
      return {
        ...state,
        combo: { ...action.payload.combo },
      };
    case "SET_COMBINATIONS":
      return {
        ...state,
        combinations: [...action.payload],
      };
    case "SET_PLAYER":
      return {
        ...state,
        player: { ...action.payload.player },
      };
    case "SET_PLAYERS":
      return {
        ...state,
        players: [...action.payload],
      };
    default:
      return state;
  }
};
