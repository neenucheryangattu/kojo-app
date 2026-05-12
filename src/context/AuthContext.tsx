import React, { createContext, useState, useContext, ReactNode } from 'react';
import { mockUser } from '../api/mockData';

type User = typeof mockUser;

interface AuthContextType {
  user: User | null;
  token: string | null;
  signIn: (token: string, user: User) => void;
  signOut: () => void;
  isSignout: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<{ user: User | null; token: string | null; isSignout: boolean }>({
    user: null,
    token: null,
    isSignout: false,
  });

  const signIn = (token: string, user: User) => {
    setState({ user, token, isSignout: false });
  };

  const signOut = () => {
    setState({ user: null, token: null, isSignout: true });
  };

  return (
    <AuthContext.Provider value={{ ...state, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
