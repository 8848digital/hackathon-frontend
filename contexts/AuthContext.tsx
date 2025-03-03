'use client';

import { axiosInstance } from '@/lib/api/axios';
import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';

interface LoginCredentials {
  usr: string;
  pwd: string;
}

interface LoginResponse {
  message: {
    success_key: number;
    error?: string;
    sid?: string;
    api_key?: string;
    api_secret?: {
      token: string;
    };
  };
  full_name: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  currentUser: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  
  useEffect(() => {
    const userName = getCookie('full_name');
    const isValid = !!userName && userName !== "Guest";
    
    setIsAuthenticated(isValid);
    setCurrentUser(userName || '');
  }, []);
  
  // Login function
  const login = async ({ usr, pwd }: LoginCredentials): Promise<void> => {
    try {
      const response = await axiosInstance.post<LoginResponse>(
        '/api/method/hackathon.API.api_login.login',
        { usr, pwd }
      );
      
      const { message, full_name } = response.data;
      
      if (message.success_key === 0) {
        throw new Error(message.error || 'Login failed');
      }
      
      if (message.success_key === 1 && message.sid && message.api_key && message.api_secret?.token) {
        setCookie('sid', message.sid);
        setCookie('token', message.api_secret.token);
        setCookie('api_key', message.api_key);
        setCookie('full_name', full_name);
        
        setIsAuthenticated(true);
        setCurrentUser(full_name);
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  
  // Logout function
  const logout = useCallback(() => {
    removeCookie('sid');
    removeCookie('token');
    removeCookie('api_key');
    setCookie('full_name', 'Guest');
    
    setIsAuthenticated(false);
    setCurrentUser('');
  }, []);
  
  // Memoize context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({ isAuthenticated, login, logout, currentUser }),
    [isAuthenticated, currentUser, logout]
  );
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
