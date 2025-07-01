import axios from "axios"
import { getToken } from "../../service/service.token"

export const apiNWS = axios.create({
  baseURL: import.meta.env.VITE_API_NWS,
  headers: { 'content-type': 'application/json' }
});

export const apiNOAA = axios.create({
  baseURL: import.meta.env.VITE_API_NOAA,
  headers: {
    'content-type': 'application/json',
    'token': import.meta.env.VITE_API_TOKEN
  }
});

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_RENDER,
  headers: { 'content-type': 'application/json' }
});

api.interceptors.request.use(async config => {
  const token = getToken()?.accessToken;
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})
