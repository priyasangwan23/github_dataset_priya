import React, { createContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
          setToken(storedToken);
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to parse user profile from localStorage:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      const result = await loginUser(email, password);
      if (result.success && result.data) {
        const { user: loggedInUser, token: authToken } = result.data;
        
        setToken(authToken);
        setUser(loggedInUser);
        
        localStorage.setItem('token', authToken);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        return { success: true };
      } else {
        throw new Error(result.message || 'Authentication failed');
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Login failed. Check your network or credentials.';
      return { success: false, error: errMsg };
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const result = await registerUser(name, email, password);
      if (result.success) {
        return { success: true };
      } else {
        throw new Error(result.message || 'Registration failed');
      }
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Registration failed. Try again.';
      return { success: false, error: errMsg };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
