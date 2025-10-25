"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from './types';
import { mockUsers } from './mock-data';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => void;
  logout: () => void;
  signup: (email: string, name: string) => User;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate checking for a logged-in user in localStorage
    const storedUser = localStorage.getItem('healthpal-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email: string) => {
    setLoading(true);
    // In a real app, you'd call Firebase Auth here.
    // For the demo, we'll find a mock user.
    const mockUser = mockUsers.find(u => u.email === email) || mockUsers[0];
    localStorage.setItem('healthpal-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const signup = (email: string, displayName: string): User => {
    setLoading(true);
    const newUser: User = {
      uid: `mock-uid-${Date.now()}`,
      email,
      displayName,
      avatarUrl: `https://picsum.photos/seed/${displayName}/200/200`,
    };
    // In a real app, create user in Firebase
    localStorage.setItem('healthpal-user', JSON.stringify(newUser));
    setUser(newUser);
    setLoading(false);
    return newUser;
  };


  const logout = () => {
    // In a real app, you'd call Firebase Auth signOut.
    localStorage.removeItem('healthpal-user');
    setUser(null);
  };

  const value = { user, loading, login, logout, signup };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
