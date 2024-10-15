import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types/user';

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = PropsWithChildren & {
  isSignedIn?: boolean;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    const username = Cookies.get('username');

    if (token && role && username) {
      setUser({ token, role, username });
    }

    setIsLoading(false);
  }, []);

  const logout = () => {
    setUser(null);
    Cookies.remove('token');
    Cookies.remove('role');
    Cookies.remove('username');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
