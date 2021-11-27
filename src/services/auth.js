
export const TOKEN_KEY = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNjkwNTExNH0.e3ThA6KD1NkEM9fJoCHxNe_STouxxIVe-QXlpBUlxuq_f0PwQeuTV-LrhSXX1oE6PhmGw-og0LxSUWZFl6B41w";


export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;


export const getToken = () => localStorage.getItem(TOKEN_KEY);


export const login = token => {
  token = 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTYzNjkwNTExNH0.e3ThA6KD1NkEM9fJoCHxNe_STouxxIVe-QXlpBUlxuq_f0PwQeuTV-LrhSXX1oE6PhmGw-og0LxSUWZFl6B41w';
  localStorage.setItem(TOKEN_KEY, token);
};


export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};