import React, { createContext, useContext, useMemo, useState, ReactNode } from 'react';
import { API_URL } from '../constants';

type LoginResponse = {
  token: string;
  role: string; // Añadido para manejar el rol
};

type LoginData = {
  email: string;
  password: string;
};

type AuthContext = {
  isAuthenticated: boolean;
  role: string; // Añadido para manejar el rol
  login: (data: LoginData) => Promise<LoginResponse>;
  logout: () => void;
  token: string;
};

const AuthContext = createContext<AuthContext>({
  isAuthenticated: false,
  role: '', // Añadido para manejar el rol
  logout: () => {},
  login: () => Promise.reject('AuthProvider not yet initialized'),
  token: ''
});

interface AuthProviderProps {
  children: ReactNode; // Define el tipo de children como ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [role, setRole] = useState(localStorage.getItem('role') || '');

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
      setRole(data.role);

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = (): void => {
    setToken('');
    setRole('');

    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const isAuthenticated = !!token;

  const authContextValue = useMemo(
    () => ({ isAuthenticated, role, login, logout, token }),
    [isAuthenticated, role]
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
