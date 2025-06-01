const TOKEN_KEY = 'pharminc_auth_token';
const USER_KEY = 'pharminc_user_data';

export const tokenStorage = {
  setToken: (token: string) => {
    localStorage.setItem(TOKEN_KEY, token);
  },

  getToken: (): string | null => {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken: () => {
    localStorage.removeItem(TOKEN_KEY);
  },

  setUser: (user: any) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  getUser: () => {
    const userData = localStorage.getItem(USER_KEY);
    return userData ? JSON.parse(userData) : null;
  },

  removeUser: () => {
    localStorage.removeItem(USER_KEY);
  },

  clearAll: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};