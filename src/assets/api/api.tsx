import axios from "axios"
import { getToken } from "../../service/service.token"

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