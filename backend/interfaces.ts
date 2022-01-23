export interface ComboStyle {
  background: string;
  pieces: string;
  whiteColor: string;
  blackColor: string;
  whitePiecesColor: string;
  blackPiecesColor: string;
}

export interface CombinationEntry {
  game: Game;
  description: string;
  moves: Move[];
}

export interface CombinationEntity {
  partitionKey: string;
  rowKey: string;
  game: string;
  description?: string;
  moves: string;
}

export interface Combination {
  id: string;
  game: Game;
  description?: string;
  moves: Move[];
}

export interface GameEntity {
  partitionKey: string;
  rowKey: string;
  pgn: string;
  whitePlayer: string;
  blackPlayer: string;
  date?: string;
  venue?: string;
  event: string;
  title: string;
}

export interface GameEntry {
  pgn: string;
  whitePlayer: Player;
  blackPlayer: Player;
  date?: Date;
  venue?: string;
  event: string;
  title: string;
}

export interface Game {
  id: string;
  pgn: string;
  whitePlayer: Player;
  blackPlayer: Player;
  date?: Date;
  venue?: string;
  event: string;
  title?: string;
}

export interface Move {
  annotation: string;
  number: number;
  remark?: string;
  sign?: string;
  fen: string;
}

export interface PlayerEntity {
  partitionKey: string;
  rowKey: string;
  firstName: string;
  lastName: string;
  fullName: string;
  hasAvatar: boolean;
  dateOfBirth?: string;
  placeOfBirth?: string;
}

export interface PlayerEntry {
  firstName: string;
  lastName: string;
  fullName: string;
  hasAvatar: boolean;
  dateOfBirth?: Date;
  placeOfBirth?: string;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  hasAvatar: boolean;
  dateOfBirth?: Date;
  placeOfBirth?: string;
}
