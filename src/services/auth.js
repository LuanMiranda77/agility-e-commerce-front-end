
export let TOKEN_KEY = null;


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;


export const getToken = () => localStorage.getItem(TOKEN_KEY);


export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};


export const logout = () => {
  TOKEN_KEY = null;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem("p-text-left");
};