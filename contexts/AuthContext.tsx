
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem('flexiaura_admin_auth');
    if (authState === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pass,
      })

      if (error) throw error;

      if (data.user) {
        // Check if user is admin
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user.id)
          .single()

        if (profileError) {
          console.error('Profile fetch error:', profileError);
          return { success: false, error: 'Erro ao verificar perfil: ' + profileError.message };
        }

        if (profile?.role === 'admin') {
          setIsAuthenticated(true);
          localStorage.setItem('flexiaura_admin_auth', 'true');
          return { success: true };
        } else {
          console.warn('User is not admin or profile not found');
          await supabase.auth.signOut();
          return { success: false, error: 'Usuário não tem permissão de administrador.' };
        }
      }
      return { success: false, error: 'Usuário não encontrado.' };
    } catch (error: any) {
      console.error('Login error:', error);
      return { success: false, error: error.message || 'Erro desconhecido ao fazer login.' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setIsAuthenticated(false);
    localStorage.removeItem('flexiaura_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
