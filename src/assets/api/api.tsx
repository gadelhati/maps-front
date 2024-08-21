import axios from "axios"
import { getAccessToken } from "../../service/service.token"

export const api = axios.create({
  // baseURL: "http://localhost:3123/wms",
  baseURL: "http://localhost:3700/maps",
  // baseURL: "https://marce4175.c44.integrator.host/maps-back",
  // baseURL: "http://18.217.181.203:3122/maps",
  // baseURL: "http://maps.institutohidrografico.com:3122/maps",
  // baseURL: "http://15.235.55.109:13739/maps",
  headers: { 'content-type': 'application/json' }
});

api.interceptors.request.use(async config => {
  const token = getAccessToken();
  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }
  return config;
})