import {
  Combination,
  CombinationEntity,
  Game,
  Move,
  NewCombinationEntry,
  Player,
} from "./interfaces";
import { validate } from "uuid";
import { Chess } from "chess.js";

export const toNewCombinationEntry = (object: any): NewCombinationEntry => {
  const newEntry: NewCombinationEntry = {
    moves: parseMoves(object.moves),
    game: parseGame(object.game),
    description: object.description,
  };
  return newEntry;
};

export const toCombination = (object: CombinationEntity): Combination => {
  const combination: Combination = {
    id: object.rowKey,
    game: JSON.parse(object.game),
    moves: JSON.parse(object.moves),
    description: object.description,
  };
  return combination;
};

const parseMoves = (moves: any): Move[] => {
  if (!moves || !moves[0]) {
    throw new Error("Moves are not selected.");
  }
  return moves;
};

const parseGame = (game: any): Game => {
  if (!game) {
    throw new Error("Game is not define.");
  }
  return {
    id: parseUUID(game.id),
    pgn: parsePGN(game.pgn),
    blackPlayer: parsePlayer(game.blackPlayer),
    blackPlayerId: parseUUID(game.blackPlayerId),
    whitePlayer: parsePlayer(game.whitePlayer),
    whitePlayerId: parseUUID(game.whitePlayerId),
    date: game.date,
    description: game.description,
    chessBaseUrl: game.chessBaseUrl,
    title: game.title,
    venue: game.venue,
  };
};

const parsePlayer = (player: any): Player => {
  if (!player) {
    throw new Error(`Incorrect or missing player ${player}.`);
  }
  return {
    id: parseUUID(player.id),
    firstName: parseName(player.firstName),
    lastName: parseName(player.lastName),
    fullName: parseName(player.fullName),
    playerAvatarURL: player.playerAvatarURL,
    dateOfBirth: player.dateOfBirth,
    placeOfBirth: player.placeOfBirth,
  };
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing player's name: ${name}.`);
  }
  return name;
};

const parsePGN = (pgn: any): string => {
  const chess = new Chess();
  if (!pgn || !isString(pgn) || !chess.load_pgn(pgn)) {
    throw new Error(`Incorrect or missing pgn: ${pgn}.`);
  }
  return pgn;
};

export const parseUUID = (uuid: any): string => {
  if (!uuid || !isString(uuid) || !validate(uuid)) {
    throw new Error(`Incorrect or missing id: ${uuid}.`);
  }
  return uuid;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};
