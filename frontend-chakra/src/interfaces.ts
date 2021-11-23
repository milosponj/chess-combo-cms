export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  fullName: string;
};

export enum Direction {
  Left,
  Right,
}

export type Game = {
  id: string;
  pgn: string;
  date?: string;
  whitePlayer: Player;
  whitePlayerId: string;
  blackPlayer: Player;
  blackPlayerId: string;
  description?: string;
  chessBaseUrl?: string;
  title?: string;
  venue?: string;
};

export type Combination = {
  id: string;
  game: Game;
  moves: Move[];
  description?: string;
};

export type EditCombinationRequest = {
  id: string;
  game: Game;
  combination: Move[];
  description?: string;
}

export type Move = {
  annotation: string;
  number: number;
  remark: string;
  sign: string;
  fen: string;
};
