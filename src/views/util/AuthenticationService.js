import axios from "axios";

export const TOKEN_SESSION_ATTRIBUTE_NAME = "token";
export const EXPIRATION_SESSION_ATTRIBUTE_NAME = "expiration";
// Nova constante para o tipo de usuário
//export const ROLE_SESSION_ATTRIBUTE_NAME = "tipo";

export const registerSuccessfulLoginForJwt = (token, expiration, tipo) => {
  localStorage.setItem(TOKEN_SESSION_ATTRIBUTE_NAME, token);
  localStorage.setItem(EXPIRATION_SESSION_ATTRIBUTE_NAME, expiration);
  //localStorage.setItem(ROLE_SESSION_ATTRIBUTE_NAME, tipo); // Salva a role

  setupAxiosInterceptors();
};

export const setupAxiosInterceptors = () => {
  let token = createJWTToken(
    localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME),
  );

  if (isUserLoggedIn()) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const createJWTToken = (token) => {
  return "Bearer " + token;
};

export const logout = () => {
  localStorage.clear();
  delete axios.defaults.headers.common["Authorization"];
};

export const isTokenExpired = () => {
  let expiration = localStorage.getItem(EXPIRATION_SESSION_ATTRIBUTE_NAME);
  return expiration === null || expiration < new Date().getTime();
};

export const isUserLoggedIn = () => {
  let user = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);

  if (user === null) {
    return false;
  } else {
    return true;
  }
};

export const getToken = () => {
  let token = localStorage.getItem(TOKEN_SESSION_ATTRIBUTE_NAME);
  if (token === null) return "";
  return token;
};

// --- NOVAS FUNÇÕES ---

// 3. Função para buscar a role atual do usuário
//export const getUserRole = () => {
//  return localStorage.getItem(ROLE_SESSION_ATTRIBUTE_NAME);
//};

// 4. Função para validar se o usuário tem a role necessária
// Aceita tanto uma única string (ex: 'ADMIN') quanto uma lista (ex: ['ADMIN', 'GERENTE'])
//export const hasAnyRole = (allowedRoles) => {
//  if (!isUserLoggedIn() || isTokenExpired()) return false;
  
//  const currentRole = getUserRole();
  
//  if (Array.isArray(allowedRoles)) {
//    return allowedRoles.includes(currentRole);
//  }
  
//  return currentRole === allowedRoles;
//};
