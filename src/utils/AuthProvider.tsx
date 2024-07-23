import { createContext, useContext, useMemo, useState } from 'react';
import { API_URL } from '../constants';

type LoginResponse = {
  token: string;
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContext = {
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<LoginResponse>;
  logout: () => void;
  token: string;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  logout: () => {},
  login: () => Promise.reject('AuthProvider not yet initialized'),
  token: ''
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const login = async ({ email, password }: LoginData): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      setToken(data.token);

      localStorage.setItem('token', data.token);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setToken('');

    localStorage.removeItem('token');
  };

  // Check if the user is authenticated
  const isAuthenticated = !!token;

  // Create a useMemo hook to avoid creating a new object every time the component re-renders
  const authContextValue = useMemo(
    () => ({ isAuthenticated, login, logout, token }),
    [isAuthenticated]
  );

  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
