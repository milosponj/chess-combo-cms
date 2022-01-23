export type Player = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  hasAvatar: boolean;
};

export type Game = {
  id: string;
  pgn: string;
  date?: string;
  whitePlayer: Player;
  blackPlayer: Player;
  title: string;
  venue?: string;
  event?: string;
};

export type GameEntry = {
  pgn: string;
  date?: Date;
  whitePlayer: Player;
  blackPlayer: Player;
  title: string;
  venue?: string;
  event?: string;
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

export type Notification = {
  status?: Status;
  message: string;
};

export type Status = "info" | "warning" | "error" | "success";
