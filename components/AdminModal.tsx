import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose }) => {
  const { t, updateCustomContent, language } = useLanguage();
  
  const [heroTitle, setHeroTitle] = useState('');
  const [heroSubtitle, setHeroSubtitle] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  // Hydrate form with current translations when opened
  useEffect(() => {
    if (isOpen) {
      setHeroTitle(t('heroTitle'));
      setHeroSubtitle(t('heroSubtitle'));
      setContactInfo(t('contactInfo'));
    }
  }, [isOpen, language, t]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCustomContent({
      heroTitle,
      heroSubtitle,
      contactInfo
    });
    console.log('Alterações salvas com sucesso!');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[10000]">
      <div className="bg-card text-text rounded-2xl p-10 w-[90%] max-w-[700px] max-h-[90vh] overflow-y-auto shadow-custom animate-[fadeIn_0.3s_ease-out]">
        <h2 className="text-2xl font-bold mb-6 text-primary">Painel de Administração</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="editHeroTitle" className="font-medium">Título da Página Inicial</label>
            <input
              type="text"
              id="editHeroTitle"
              className="p-3 rounded-lg border border-gray bg-body text-text font-sans focus:outline-none focus:border-accent"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="editHeroSubtitle" className="font-medium">Subtítulo da Página Inicial</label>
            <textarea
              id="editHeroSubtitle"
              className="p-3 rounded-lg border border-gray bg-body text-text font-sans focus:outline-none focus:border-accent min-h-[120px] resize-y"
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="editContactInfo" className="font-medium">Informações de Contato</label>
            <textarea
              id="editContactInfo"
              className="p-3 rounded-lg border border-gray bg-body text-text font-sans focus:outline-none focus:border-accent min-h-[120px] resize-y"
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4 mt-5">
            <button
              type="button"
              className="px-6 py-3 rounded-lg font-medium cursor-pointer transition-all bg-light-gray text-text hover:bg-gray/20"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg font-medium cursor-pointer transition-all bg-accent text-black hover:opacity-90"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;