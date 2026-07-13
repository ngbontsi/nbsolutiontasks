import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import api from '../services/api';

export interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post('/api/auth/login', { email, password });
    const d = res.data;
    const u: AuthUser = { id: d.userId, email: d.email, firstName: d.firstName, lastName: d.lastName, role: d.role };
    localStorage.setItem('auth_token', d.token);
    localStorage.setItem('auth_user', JSON.stringify(u));
    setToken(d.token);
    setUser(u);
  };

  const register = async (data: RegisterData) => {
    const res = await api.post('/api/auth/register', {
      email: data.email,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    });
    const d = res.data;
    const u: AuthUser = { id: d.userId, email: d.email, firstName: d.firstName, lastName: d.lastName, role: d.role };
    localStorage.setItem('auth_token', d.token);
    localStorage.setItem('auth_user', JSON.stringify(u));
    setToken(d.token);
    setUser(u);
  };

  const logout = () => {
    const t = localStorage.getItem('auth_token');
    if (t) {
      api.post('/api/auth/logout', null, { headers: { Authorization: `Bearer ${t}` } }).catch(() => {});
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
