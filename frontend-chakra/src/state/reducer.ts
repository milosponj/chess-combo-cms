import { State } from "./state";
import { Game, Combination } from "../interfaces";

export type Action =
  | {
      type: "SET_LIST_OF_GAMES";
      payload: Game[];
    }
  | {
      type: "ADD_GAME";
      payload: Game;
    }
  | {
      type: "SET_LIST_OF_COMBINATIONS";
      payload: Combination[];
    }
  | {
      type: "ADD_COMBINATION";
      payload: Combination;
    }
  | {
      type: "EDIT_COMBINATION";
      payload: Combination;
    }
  | {
      type: "SET_COMBO";
      payload: { combo: Combination; game: Game };
    };

export const setGames = (games: Game[]): Action => {
  return {
    type: "SET_LIST_OF_GAMES",
    payload: games,
  };
};

export const addGame = (game: Game): Action => {
  return {
    type: "ADD_GAME",
    payload: game,
  };
};

export const setCombinations = (combinations: Combination[]): Action => {
  return {
    type: "SET_LIST_OF_COMBINATIONS",
    payload: combinations,
  };
};
export const setCombo = (combo: Combination, game: Game): Action => {
  return {
    type: "SET_COMBO",
    payload: { combo, game },
  };
};

export const addCombination = (combination: Combination): Action => {
  return {
    type: "ADD_COMBINATION",
    payload: combination,
  };
};

export const editCombination = (
  combination: Combination,
  id: number
): Action => {
  return {
    type: "EDIT_COMBINATION",
    payload: combination,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_LIST_OF_GAMES":
      return {
        ...state,
        games: {
          ...action.payload.reduce(
            (memo, game) => ({ ...memo, [game.id]: game }),
            {}
          ),
          ...state.games,
        },
      };
    case "SET_LIST_OF_COMBINATIONS":
      return {
        ...state,
        combinations: {
          ...action.payload.reduce(
            (memo, combination) => ({ ...memo, [combination.id]: combination }),
            {}
          ),
          ...state.combinations,
        },
      };
    case "SET_COMBO":
      return {
        ...state,
        combo: {...action.payload.combo, game: action.payload.game}
      };
    case "ADD_COMBINATION":
      return {
        ...state,
        combinations: {
          ...state.combinations,
          [action.payload.id]: action.payload,
        },
      };
    case "EDIT_COMBINATION":
      state.combinations[action.payload.id] = action.payload;
      return {
        ...state,
        combinations: state.combinations,
      };
    default:
      return state;
  }
};
