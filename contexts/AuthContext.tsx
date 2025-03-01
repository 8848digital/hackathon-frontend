'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (credentials: { usr: string; pwd: string }) => Promise<void>;
  logout: () => void;
  currentUser: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState('');
  
    useEffect(() => {
      const userCookie = document.cookie.split(';').find(c => c.trim().startsWith('full_name='));
      if (userCookie) {
        const userName = userCookie.split('=')[1];
        setIsAuthenticated(!!userName && userName !== "Guest");
        setCurrentUser(userName);
      }
    }, []);
  
    const login = async ({ usr, pwd }: { usr: string; pwd: string }) => {
      try {
        const response = await axios.post(
          'https://hackathon.8848digitalerp.com/api/method/hackathon.API.api_login.login',
          { usr, pwd }
        );
        if (response.data.message.success_key === 0) {
            console.error("Login failed:", response.data.message.error);
            throw new Error(response.data.message.error || 'Login failed');
          }
        if (response.data.message.success_key === 1) {
          document.cookie = `sid=${response.data.message.sid};`;
          document.cookie = `token=${response.data.message.api_secret.token};`;
          document.cookie = `api_key=${response.data.message.api_key};`;
          document.cookie = `full_name=${response.data.full_name};`;
          setIsAuthenticated(true);
          setCurrentUser(response.data.full_name);
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    const logout = useCallback(() => {
      document.cookie = "sid='';";
      document.cookie = "token='';";
      document.cookie = "api_key='';";
      document.cookie = "full_name=Guest;";
      setIsAuthenticated(false);
    }, []);
  
    const value = useMemo(() => ({ isAuthenticated, login, logout, currentUser }), [isAuthenticated, login, logout, currentUser]);
  
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
  };
  
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
