import { State } from "./state";
import { Game, Combination } from "../interfaces";

export type Action = {
  type: "SET_COMBO";
  payload: { combo: Combination; game: Game };
};

export const setCombo = (combo: Combination, game: Game): Action => {
  return {
    type: "SET_COMBO",
    payload: { combo, game },
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_COMBO":
      return {
        ...state,
        combo: { ...action.payload.combo, game: action.payload.game },
      };
    default:
      return state;
  }
};
