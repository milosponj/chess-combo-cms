import axios from "axios";
import { apiBaseUrl } from "../constants";
import { Combination, EditCombinationRequest, Game } from "../interfaces";

export const getCombo = (id: number) => {
  const request = axios.get<Combination>(`${apiBaseUrl}/combinations/${id}`);
  return request.then((response) => response.data);
};

export const getGame = (id: number) => {
  const request = axios.get<Game>(`${apiBaseUrl}/games/${id}`);
  return request.then((response) => response.data);
};

export const updateCombo = (
  id: number,
  updatedObject: EditCombinationRequest
) => {
  const request = axios.put(`${apiBaseUrl}/combinations/${id}`, updatedObject);
  return request.then((response) => response.data);
};
