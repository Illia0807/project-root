const TOKEN_KEY = 'access_token';

export const useToken = () => {
  const getToken = () => localStorage.getItem(TOKEN_KEY);
  const setToken = (token: string) => localStorage.setItem(TOKEN_KEY, token);
  const clearToken = () => localStorage.removeItem(TOKEN_KEY);

  return { getToken, setToken, clearToken };
};
