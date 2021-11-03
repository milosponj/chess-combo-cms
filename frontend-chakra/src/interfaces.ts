export type Player = {
  id: number;
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
  id: number;
  pgn: string;
  date?: string;
  whitePlayer: Player;
  whitePlayerId: number;
  blackPlayer: Player;
  blackPlayerId: number;
  description?: string;
  chessBaseUrl?: string;
  title?: string;
  venue?: string;
};

export type Combination = {
  id: number;
  game: Game;
  gameId: number;
  player: Player | null;
  playerId: number;
  moves: Move[];
  description?: string;
  category?: string;
};

export type EditCombinationRequest = {
  id: number;
  gameId: number;
  playerId: number;
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
