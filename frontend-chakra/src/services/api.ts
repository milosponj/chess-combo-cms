import axios from "axios";
import { apiBaseUrl } from "../constants";
import {
  Combination,
  CombinationEntry,
  Player,
  PlayerEntry,
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

export const addPlayer = (newObject: PlayerEntry) => {
  const request = axios.post(`${apiBaseUrl}/players`, newObject);
  return request.then((response) => response.data);
};

export const updatePlayer = (id: string, updatedObject: PlayerEntry) => {
  const request = axios.put(`${apiBaseUrl}/players/${id}`, updatedObject);
  return request.then((response) => response.data);
};
