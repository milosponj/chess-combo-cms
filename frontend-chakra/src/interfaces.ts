export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  avatar?: string;
};

export type PlayerEntry = {
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth?: Date;
  placeOfBirth?: string;
  avatar?: string;
};

export type Game = {
  id: string;
  pgn: string;
  date?: Date;
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

export type CombinationEntry = {
  game: Game;
  moves: Move[];
  description?: string;
};

export type Move = {
  annotation: string;
  number: number;
  remark: string;
  sign: string;
  fen: string;
};

export enum Direction {
  Left,
  Right,
}
