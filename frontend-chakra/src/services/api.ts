import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Combination, EditCombinationRequest, Game } from "../interfaces";

export const getCombo = (id: string) => {
  const request = axios.get<Combination>(`${apiBaseUrl}/combinations/${id}`);
  return request.then((response) => response.data);
};

export const getCombos = () => {
  const request = axios.get<Combination[]>(`${apiBaseUrl}/combinations`);
  return request.then((response) => response.data);
};

export const getGame = (id: string) => {
  const request = axios.get<Game>(`${apiBaseUrl}/games/${id}`);
  return request.then((response) => response.data);
};

export const updateCombo = (
  id: string,
  updatedObject: EditCombinationRequest
) => {
  const request = axios.put(`${apiBaseUrl}/combinations/${id}`, updatedObject);
  return request.then((response) => response.data);
};
