'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  agencyName?: string;
  phone?: string;
  avatar?: string;
  savedSearches: string[];
  favoriteProperties: string[];
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  addToFavorites: (propertyId: string) => void;
  removeFromFavorites: (propertyId: string) => void;
  saveSearch: (searchData: any) => void;
  removeSavedSearch: (searchId: string) => void;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  agencyName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session on mount
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    try {
      const response = await fetch('/api/auth/me');
      const data = await response.json();
      
      if (data.user) {
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error checking auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }

      setUser(data.user);
    } catch (error: any) {
      throw new Error(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setUser(data.user);
    } catch (error: any) {
      throw new Error(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
    }
  };

  const addToFavorites = async (propertyId: string) => {
    if (!user || user.favoriteProperties.includes(propertyId)) return;

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, action: 'add' }),
      });

      if (response.ok) {
        const updatedUser = {
          ...user,
          favoriteProperties: [...user.favoriteProperties, propertyId]
        };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const removeFromFavorites = async (propertyId: string) => {
    if (!user) return;

    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ propertyId, action: 'remove' }),
      });

      if (response.ok) {
        const updatedUser = {
          ...user,
          favoriteProperties: user.favoriteProperties.filter(id => id !== propertyId)
        };
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error removing from favorites:', error);
    }
  };

  const saveSearch = async (searchData: any) => {
    if (!user) return;

    try {
      // TODO: Create saved searches API endpoint
      const searchId = Date.now().toString();
      const updatedUser = {
        ...user,
        savedSearches: [...user.savedSearches, searchId]
      };
      setUser(updatedUser);
      console.log('Save search:', searchData);
    } catch (error) {
      console.error('Error saving search:', error);
    }
  };

  const removeSavedSearch = async (searchId: string) => {
    if (!user) return;

    try {
      // TODO: Create saved searches API endpoint
      const updatedUser = {
        ...user,
        savedSearches: user.savedSearches.filter(id => id !== searchId)
      };
      setUser(updatedUser);
      console.log('Remove search:', searchId);
    } catch (error) {
      console.error('Error removing saved search:', error);
    }
  };

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    updateUser,
    addToFavorites,
    removeFromFavorites,
    saveSearch,
    removeSavedSearch
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}