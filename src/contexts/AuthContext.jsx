import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react';
import { login as loginRequest, UNAUTHORIZED_EVENT } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (token in localStorage)
    const token = localStorage.getItem('token');
    if (token) {
      // You can decode the JWT here to get user info, or make an API call
      // For now, we'll just set a basic user object
      setUser({ token });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    // api.js đã xoá token trước khi phát event; ở đây chỉ hạ trạng thái để router
    // đưa người dùng về trang login.
    const handleUnauthorized = () => {
      setUser(null);
      setSessionExpired(true);
    };

    window.addEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
    return () => window.removeEventListener(UNAUTHORIZED_EVENT, handleUnauthorized);
  }, []);

  const login = async (username, password) => {
    try {
      const data = await loginRequest(username, password);
      const token = data?.token;

      if (!token) {
        throw new Error('No token received');
      }

      localStorage.setItem('token', token);
      setUser({ token });
      setSessionExpired(false);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setSessionExpired(false);
  };

  const value = {
    user,
    login,
    logout,
    loading,
    sessionExpired,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

