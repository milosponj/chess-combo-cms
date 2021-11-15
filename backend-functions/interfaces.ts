export interface ComboStyle {
  background: string;
  pieces: string;
  whiteColor: string;
  blackColor: string;
  whitePiecesColor: string;
  blackPiecesColor: string;
}

export interface NewCombinationEntry {
  game: Game;
  description: string;
  moves: Move[];
}

export interface CombinationEntity {
  partitionKey: string;
  rowKey: string
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

export interface Game {
  id: string;
  pgn: string;
  whitePlayerId: string;
  whitePlayer: Player;
  blackPlayerId: string;
  blackPlayer: Player;
  description?: string;
  chessBaseUrl?: string;
  title?: string;
  venue?: string;
}

export interface Move {
  fen: string;
  sign?: string;
  number: number;
  remark?: string;
  annotation: string;
}

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  placeOfBirth?: string;
  fullName: string;
}