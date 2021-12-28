import {
  Combination,
  CombinationEntity,
  Game,
  Move,
  CombinationEntry,
  Player,
  PlayerEntity,
  PlayerEntry,
} from "./interfaces";
import { validate } from "uuid";
import { Chess } from "chess.js";
import { ParsedField } from "@anzp/azure-function-multipart/dist/types/parsed-field.type";

export const toCombinationEntry = (object: any): CombinationEntry => {
  const newEntry: CombinationEntry = {
    moves: parseMoves(object.moves),
    game: parseGame(object.game),
    description: object.description,
  };
  return newEntry;
};

export const toCombinationFromEntity = (
  object: CombinationEntity
): Combination => {
  const combination: Combination = {
    id: object.rowKey,
    game: JSON.parse(object.game),
    moves: JSON.parse(object.moves),
    description: object.description,
  };
  return combination;
};

export const toPlayerFromEntity = (object: PlayerEntity): Player => {
  const player: Player = {
    id: object.rowKey,
    firstName: object.firstName,
    lastName: object.lastName,
    fullName: object.fullName,
    dateOfBirth: new Date(object.dateOfBirth),
    placeOfBirth: object.placeOfBirth,
    hasAvatar: object.hasAvatar,
  };
  return player;
};

export const toPlayerEntry = (entryFields: ParsedField[]): PlayerEntry => {
  const newPlayer: PlayerEntry = {firstName: "", lastName: "", fullName: "", hasAvatar: false}
  entryFields.map((field) => {
    switch (field.fieldname) {
      case "fullName":
        newPlayer.fullName = parseName(field.value);
        break;
      case "lastName":
        newPlayer.lastName = parseName(field.value);
        break;
      case "firstName":
        newPlayer.firstName = parseName(field.value);
        break;
      case "dateOfBirth":
        newPlayer.dateOfBirth = parseDate(field.value);
        break;
      case "place":
        newPlayer.placeOfBirth = field.value;
        break;
    }
  });
  return newPlayer;
};

const parseMoves = (moves: any): Move[] => {
  if (!moves || !moves[0]) {
    throw new Error("Moves are not selected.");
  }
  return moves;
};

const parseGame = (game: any): Game => {
  if (!game) {
    throw new Error("Game is not defined.");
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
    throw new Error(`Incorrect or missing player.`);
  }
  return {
    id: parseUUID(player.id),
    firstName: parseName(player.firstName),
    lastName: parseName(player.lastName),
    fullName: parseName(player.fullName),
    hasAvatar: player.hasAvatar,
    dateOfBirth: parseDate(player.dateOfBirth),
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
  if (!pgn || !isString(pgn)) {
    throw new Error(`Incorrect data or missing pgn: ${pgn}.`);
  }
  if (!chess.load_pgn(pgn)) {
    throw new Error(`Invalid pgn: ${pgn}.`);
  }
  return pgn;
};

export const parseUUID = (uuid: any): string => {
  if (!uuid || !isString(uuid) || !validate(uuid)) {
    throw new Error(`Incorrect or missing id: ${uuid}.`);
  }
  return uuid;
};

const parseDate = (date: any): Date => {
  if (date && !isDate(date)) {
    throw new Error("Incorrect date format: " + date);
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isString = (text: any): text is string => {
  return typeof text === "string" || text instanceof String;
};
