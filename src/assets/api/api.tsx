import axios from "axios"
import { getAccessToken } from "../../service/service.token"

const token = getAccessToken();

export const api = axios.create({
  baseURL: "http://localhost:3122/maps",
  // baseURL: "http://15.235.55.109:13739/maps",
  // headers: { 'content-type': 'application/json' }
});

api.interceptors.request.use(async config => {
  const token = getAccessToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})