import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Profile } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  token: string | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; password: string; learningGoal?: string }) => Promise<void>;
  logout: () => Promise<void>;
  enableGuestMode: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('tamizh_cholai_token'));
  const [isGuest, setIsGuest] = useState<boolean>(localStorage.getItem('tamizh_cholai_guest') === 'true');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const initAuth = async () => {
      if (token) {
        try {
          const userData = await authService.getMe();
          setUser(userData);
          setProfile(userData.profile);
          setIsGuest(false);
        } catch {
          // Token expired or invalid
          localStorage.removeItem('tamizh_cholai_token');
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const data = await authService.login({ email, password });
    localStorage.setItem('tamizh_cholai_token', data.token);
    localStorage.removeItem('tamizh_cholai_guest');
    setToken(data.token);
    setUser(data.user);
    setProfile(data.profile);
    setIsGuest(false);
  };

  const register = async (reqData: { name: string; email: string; password: string; learningGoal?: string }) => {
    const data = await authService.register(reqData);
    localStorage.setItem('tamizh_cholai_token', data.token);
    localStorage.removeItem('tamizh_cholai_guest');
    setToken(data.token);
    setUser(data.user);
    setProfile(data.profile);
    setIsGuest(false);
  };

  const logout = async () => {
    try {
      await authService.logout();
    } finally {
      localStorage.removeItem('tamizh_cholai_token');
      localStorage.removeItem('tamizh_cholai_guest');
      setToken(null);
      setUser(null);
      setProfile(null);
      setIsGuest(false);
    }
  };

  const enableGuestMode = () => {
    localStorage.setItem('tamizh_cholai_guest', 'true');
    setIsGuest(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        token,
        isAuthenticated: !!user,
        isGuest,
        isLoading,
        login,
        register,
        logout,
        enableGuestMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
