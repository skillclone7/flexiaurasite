
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

interface AdminLoginProps {
  onClose: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(email, password);

    if (!result.success) {
      setError(result.error || 'Credenciais inválidas ou sem permissão.');
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[10000]">
      <div className="bg-card p-8 rounded-2xl shadow-2xl w-full max-w-md relative animate-[fadeIn_0.3s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray hover:text-text"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-lock text-primary text-2xl"></i>
          </div>
          <h2 className="text-2xl font-bold text-primary">Acesso Administrativo</h2>
          <p className="text-gray text-sm mt-2">Área restrita apenas para gestores.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-text mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray bg-body text-text focus:border-accent outline-none transition-colors"
              placeholder="admin@flexiaura.com"
              autoFocus
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text mb-1">Senha de Acesso</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray bg-body text-text focus:border-accent outline-none transition-colors"
              placeholder="••••••••"
            />
            {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent text-black font-bold py-3 rounded-lg hover:bg-opacity-90 transition-opacity mt-2 disabled:opacity-50"
          >
            {isLoading ? 'Entrando...' : 'Entrar no Dashboard'}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-gray-400">
          <p>Acesso restrito</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
