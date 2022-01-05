import axios from "axios";
import {
  Combination,
  CombinationEntry,
  Player,
} from "../interfaces";

export const getCombo = (id: string) => {
  const request = axios.get<Combination>(`${process.env.REACT_APP_API_BASE_URL}/combinations/${id}`);
  return request.then((response) => response.data);
};

export const getCombos = () => {
  const request = axios.get<Combination[]>(`${process.env.REACT_APP_API_BASE_URL}/combinations`);
  return request.then((response) => response.data);
};

export const updateCombo = (id: string, updatedObject: CombinationEntry) => {
  const request = axios.put(`${process.env.REACT_APP_API_BASE_URL}/combinations/${id}`, updatedObject);
  return request.then((response) => response.data);
};

export const getPlayer = (id: string) => {
  const request = axios.get<Player>(`${process.env.REACT_APP_API_BASE_URL}/players/${id}`);
  return request.then((response) => response.data);
};

export const getPlayers = () => {
  const request = axios.get<Player[]>(`${process.env.REACT_APP_API_BASE_URL}/players`);
  return request.then((response) => response.data);
};

export const addPlayer = (form: FormData) => {
  const request = axios({
    method: "post",
    url: `${process.env.REACT_APP_API_BASE_URL}/players`,
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return request.then((response) => response.data);
};

export const updatePlayer = (id: string, form: FormData) => {
  const request = axios({
    method: "put",
    url: `${process.env.REACT_APP_API_BASE_URL}/players/${id}`,
    data: form,
    headers: { "Content-Type": "multipart/form-data" },
  });

  return request.then((response) => response.data);
};
