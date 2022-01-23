import axios from "axios";
import { apiBaseUrl } from "../constants";
import {
  Combination,
  CombinationEntry,
  Game,
  GameEntry,
  Player,
} from "../interfaces";

export const getCombo = (id: string) => {
  const request = axios.get<Combination>(`${apiBaseUrl}/combinations/${id}`);
  return request.then((response) => response.data);
};

export const getCombos = () => {
  const request = axios.get<Combination[]>(`${apiBaseUrl}/combinations`);
  return request.then((response) => response.data);
};

export const updateCombo = (id: string, updatedObject: CombinationEntry) => {
  const request = axios.put(`${apiBaseUrl}/combinations/${id}`, updatedObject);
  return request.then((response) => response.data);
};

export const getPlayer = (id: string) => {
  const request = axios.get<Player>(`${apiBaseUrl}/players/${id}`);
  return request.then((response) => response.data);
};

export const getPlayers = () => {
  const request = axios.get<Player[]>(`${apiBaseUrl}/players`);
  return request.then((response) => response.data);
};

export const addPlayer = (form: FormData) => {
  const request = axios({
    method: "post",
    url: `${apiBaseUrl}/players`,
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return request.then((response) => response.data);
};

export const updatePlayer = (id: string, form: FormData) => {
  const request = axios({
    method: "put",
    url: `${apiBaseUrl}/players/${id}`,
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return request.then((response) => response.data);
};

export const getGames = () => {
  const request = axios.get<Game[]>(`${apiBaseUrl}/games`);
  return request.then((response) => response.data);
};

export const addGame = (newObject: GameEntry) => {
  const request = axios.post(`${apiBaseUrl}/games/`, newObject);
  return request.then((response) => response.data);
};

export const getGame = (id: string) => {
  const request = axios.get<Game>(`${apiBaseUrl}/games/${id}`);
  return request.then((response) => response.data);
};

export const updateGame = (id: string, updatedObject: GameEntry) => {
  const request = axios.put(`${apiBaseUrl}/games/${id}`, updatedObject);
  return request.then((response) => response.data);
};
