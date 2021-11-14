import { Game, Move, NewCombinationEntry, Player } from "./interfaces";
import { validate } from "uuid";
import { Chess } from "chess.js";

export const toNewCombinationEntry = (object: any): NewCombinationEntry => {
  const newEntry: NewCombinationEntry = {
    moves: parseMoves(object.moves),
    game: parseGame(object.game),
    description: parseDescription(object.description),
  };
  return newEntry;
};

const parseMoves = (moves: any): Move[] => {
  if (!moves || !moves[0]) {
    throw new Error("Moves are not selected!");
  }
  return moves;
};

const parseGame = (game: any): Game => {
  if (!game) {
    throw new Error("Game is not define");
  }
  return {
    id: parseUUID(game.id),
    pgn: parsePGN(game.pgn),
    blackPlayer: parsePlayer(game.blackPlayer),
    blackPlayerId: parseUUID(game.blackPlayerId),
    whitePlayer: parsePlayer(game.whitePlayer),
    whitePlayerId: parseUUID(game.whitePlayerId),
    description: parseDescription(game.description),
    chessBaseUrl: game.chessBaseUrl,
    title: game.title,
    venue: game.venue,
  };
};

const parseDescription = (description: any): string => {
  if (description && !isString(description)) {
    throw new Error("Incorrect description: " + description);
  }
  return description;
};

const parsePlayer = (player: any): Player => {
  if (!player) {
    throw new Error("Incorrect or missing player: " + player);
  }
  return {
    id: parseUUID(player.id),
    firstName: parseName(player.firstName),
    lastName: parseName(player.lastName),
    fullName: parseName(player.fullName),
    dateOfBirth: parseDateOfBirth(player.dateOfBirth),
    placeOfBirth: parsePlaceOfBirth(player.placeOfBirth),
  };
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing player's name: " + name);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (date && !isDate(date)) {
    throw new Error("Incorrect date: " + date);
  }
  return date;
};

const parsePlaceOfBirth = (place: any): string => {
  if (place && !isString(place)) {
    throw new Error("Incorrect place of birth: " + place);
  }
  return place;
};

const parsePGN = (pgn: any): string => {
  const chess = new Chess();
  if (!pgn || !isString(pgn) || !chess.load_pgn(pgn)) {
    throw new Error("Incorrect or missing pgn: " + pgn);
  }
  return pgn;
};

const parseUUID = (uuid: any): string => {
  if (!uuid || !isString(uuid) || !validate(uuid)) {
    throw new Error("Incorrect or missing id: " + uuid);
  }
  return uuid;
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isNumber = (number: any): number is number => {
    return typeof number === "number" || number instanceof Number;
  };
  

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};