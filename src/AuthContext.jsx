import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { refreshAccessToken, logoutApi } from './api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('orbit_access_token') || null);
  const [user, setUser] = useState(null);
  const [sessionState, setSessionState] = useState('Checking...'); // For visualizing RT logic

  const parseToken = async (accessToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      // Check if access token is expired
      if (decoded.exp * 1000 < Date.now()) {
        setSessionState('Access Token Expired. Attempting Refresh...');
        try {
          const newAT = await refreshAccessToken();
          setToken(newAT);
          setSessionState('Refresh Successful');
        } catch (err) {
          setSessionState('Refresh Token Expired. Please login.');
          forceLogout();
        }
      } else {
        setUser({ username: decoded.sub, roles: decoded.roles || [] });
        setSessionState('Active');
      }
    } catch (e) {
      forceLogout();
    }
  };

  useEffect(() => {
    if (token) {
      parseToken(token);
      
      // Setup interval to continually check AT validity (simulating an interceptor)
      const interval = setInterval(() => {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
           parseToken(token);
        }
      }, 5000); // check every 5 seconds
      
      return () => clearInterval(interval);
    } else {
      setUser(null);
      setSessionState('Logged Out');
    }
  }, [token]);

  const login = (accessToken) => {
    setToken(accessToken);
  };

  const forceLogout = () => {
    setToken(null);
    logoutApi();
  };

  return (
    <AuthContext.Provider value={{ token, user, sessionState, login, logout: forceLogout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
