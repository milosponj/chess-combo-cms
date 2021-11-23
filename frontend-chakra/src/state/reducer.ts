import { State } from "./state";
import { Combination } from "../interfaces";

export type Action =
  | {
      type: "SET_COMBO";
      payload: { combo: Combination };
    }
  | {
      type: "SET_COMBINATIONS";
      payload: Combination[];
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
    default:
      return state;
  }
};
