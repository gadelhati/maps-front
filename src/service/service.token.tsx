import { Header, Payload } from "../component/token/token";

export const existsToken = (): boolean => {
  return localStorage.getItem(`token`) != null;
}

export const isValidToken = (): boolean => {
  if (existsToken()) {
    var expiration: string = new Date(getPayload().exp).getTime().toString().concat('000')
    return (new Date(Number(expiration)).getTime() > new Date().getTime())
  } else {
    return false
  }
}

export const decodeJwt = () => {
  if (existsToken()) {
    var base64Url = getToken().accessToken.split(".")[1];
    var base64 = decodeURIComponent(atob(base64Url).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return base64
  } else {
    return null
  }
}

export const getToken = () => {
  return JSON.parse(`${localStorage.getItem(`token`)}`);
}

export const getHeader = (): Header => {
  if (existsToken()) {
    var base64 = getAccessToken().split('.')[0].replace(/-/g, '+').replace(/_/g, '/');
    var header = decodeURIComponent(window.atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(header);
  } else {
    let error: Header = { alg: '', typ: '' }
    return error
  }
}

export const getPayload = (): Payload => {
  if (existsToken()) {
  var base64 = getAccessToken().split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  var payload = decodeURIComponent(window.atob(base64).split('').map((c) => {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(payload);
} else {
  let error: Payload = { jti: '', iss: '', iat: '', nbf: '', exp: '', sub: '', aud: '' }
  return error
}
}

export const setToken = (token: any) => {
  localStorage.setItem(`token`, JSON.stringify(token));
}

export const getAccessToken = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.accessToken;
}

export const getTokenType = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.tokenType;
}

export const getRoles = () => {
  const token = JSON.parse(`${localStorage.getItem(`token`)}`);
  return token?.roles;
}

export const removeToken = () => {
  localStorage.clear()
  window.location.reload()
}