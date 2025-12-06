import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import { useAuth } from '../../contexts/AuthContext';

type Tab = 'overview' | 'content' | 'videos' | 'integrations';

interface Integration {
    name: string;
    desc: string;
    icon: string;
    color: string;
    connected: boolean;
    fields: string[];
}

const IntegrationCard: React.FC<{ integration: Integration }> = ({ integration }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});

    return (
        <div className="bg-card rounded-xl border border-gray/10 overflow-hidden">
            <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                    <div className={`w-12 h-12 rounded-lg ${integration.color} flex items-center justify-center text-white text-xl`}>
                        <i className={`fas ${integration.icon}`}></i>
                    </div>
                    <div className="flex-1">
                        <h4 className="font-bold text-text">{integration.name}</h4>
                        <p className="text-xs text-gray">{integration.desc}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" checked={integration.connected} readOnly />
                        <div className="w-11 h-6 bg-gray/30 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                    </label>
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="text-text hover:text-accent transition-colors p-2"
                    >
                        <i className={`fas fa-chevron-${isExpanded ? 'up' : 'down'}`}></i>
                    </button>
                </div>
            </div>

            {isExpanded && (
                <div className="px-6 pb-6 border-t border-gray/10 pt-4">
                    <h5 className="text-sm font-semibold mb-4 text-text">Configuration</h5>
                    <div className="space-y-4">
                        {integration.fields.map((field, idx) => (
                            <div key={idx}>
                                <label className="block text-xs font-medium mb-1 text-gray">{field}</label>
                                <input
                                    type="text"
                                    placeholder={`Enter ${field}`}
                                    className="w-full p-3 bg-body border border-gray/20 rounded-lg text-text outline-none focus:border-accent"
                                    value={formData[field] || ''}
                                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                                />
                            </div>
                        ))}
                        <button className="bg-accent text-black px-6 py-2 rounded-lg font-semibold hover:brightness-110 transition-all">
                            Save Configuration
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

interface AdminDashboardContentProps {
    onClose: () => void;
    isModal?: boolean;
}

export const AdminDashboardContent: React.FC<AdminDashboardContentProps> = ({ onClose, isModal = true }) => {
    const { t, updateCustomContent, customContent, addVideo, removeVideo } = useLanguage();
    const { logout } = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>('overview');

    // Content States
    const [heroTitle, setHeroTitle] = useState('');
    const [heroSubtitle, setHeroSubtitle] = useState('');
    const [contactInfo, setContactInfo] = useState('');

    // Video States
    const [newVideoId, setNewVideoId] = useState('');
    const [newVideoTitle, setNewVideoTitle] = useState('');

    // Hydrate form
    useEffect(() => {
        setHeroTitle(t('heroTitle'));
        setHeroSubtitle(t('heroSubtitle'));
        setContactInfo(t('contactInfo'));
    }, []);

    const handleSaveContent = (e: React.FormEvent) => {
        e.preventDefault();
        updateCustomContent({
            heroTitle,
            heroSubtitle,
            contactInfo
        });
        alert('Conteúdo atualizado com sucesso!');
    };

    const handleAddVideo = (e: React.FormEvent) => {
        e.preventDefault();
        if (newVideoId && newVideoTitle) {
            addVideo({ id: newVideoId, title: newVideoTitle });
            setNewVideoId('');
            setNewVideoTitle('');
        }
    };

    const SidebarItem = ({ tab, icon, label }: { tab: Tab, icon: string, label: string }) => (
        <button
            onClick={() => setActiveTab(tab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors text-left ${activeTab === tab ? 'bg-accent text-black font-semibold' : 'text-gray-400 hover:bg-white/5'}`}
        >
            <i className={`fas ${icon} w-5`}></i>
            <span>{label}</span>
        </button>
    );

    return (
        <div className={`flex flex-col md:flex-row h-full overflow-hidden bg-body ${!isModal ? 'w-full h-screen' : ''}`}>
            {/* Sidebar */}
            <div className="w-full md:w-64 bg-card border-r border-white/10 flex flex-col p-5">
                <div className="mb-10 flex items-center gap-2 px-2">
                    <span className="text-2xl">✨</span>
                    <span className="font-serif font-bold text-xl text-primary">Admin</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem tab="overview" icon="fa-chart-pie" label="Visão Geral" />
                    <SidebarItem tab="content" icon="fa-pen-to-square" label="Editor de Conteúdo" />
                    <SidebarItem tab="videos" icon="fa-youtube" label="Gestão de Vídeos" />
                    <SidebarItem tab="integrations" icon="fa-plug" label="Integrações" />
                </nav>

                <div className="mt-auto pt-5 border-t border-white/10">
                    <button onClick={() => { logout(); onClose(); }} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                        <i className="fas fa-sign-out-alt w-5"></i>
                        <span>Sair</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col h-full overflow-hidden bg-body">
                {/* Header */}
                <header className="h-16 bg-card border-b border-white/10 flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-text capitalize">{activeTab.replace('-', ' ')}</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-light-gray flex items-center justify-center hover:bg-gray/20">
                        <i className="fas fa-times"></i>
                    </button>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8">

                    {/* OVERVIEW TAB */}
                    {activeTab === 'overview' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'Visitantes Hoje', val: '0', icon: 'fa-users', color: 'text-blue-500' },
                                { label: 'Tempo Médio', val: '0m', icon: 'fa-clock', color: 'text-green-500' },
                                { label: 'Vídeos Assistidos', val: '0', icon: 'fa-play-circle', color: 'text-red-500' },
                                { label: 'Leads Gerados', val: '0', icon: 'fa-envelope', color: 'text-yellow-500' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-card p-6 rounded-xl shadow-sm border border-white/5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`p-3 rounded-lg bg-gray/5 ${stat.color}`}>
                                            <i className={`fas ${stat.icon} text-xl`}></i>
                                        </div>
                                        {/* <span className="text-xs text-green-500 font-medium">+12%</span> */}
                                    </div>
                                    <h3 className="text-3xl font-bold text-text mb-1">{stat.val}</h3>
                                    <p className="text-gray text-sm">{stat.label}</p>
                                </div>
                            ))}

                            <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-card p-6 rounded-xl shadow-sm border border-white/5 mt-4">
                                <h3 className="text-lg font-semibold mb-4">Atividade Recente</h3>
                                <div className="text-center text-gray py-8">
                                    <p>Nenhuma atividade recente registrada.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* CONTENT EDITOR TAB */}
                    {activeTab === 'content' && (
                        <div className="max-w-3xl mx-auto bg-card p-8 rounded-xl shadow-sm">
                            <h3 className="text-lg font-semibold mb-6 pb-4 border-b border-gray/20">Editar Textos Principais</h3>
                            <form onSubmit={handleSaveContent} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Título Principal (Hero)</label>
                                    <input
                                        type="text"
                                        className="w-full p-3 bg-body border border-gray/20 rounded-lg text-text focus:border-accent outline-none"
                                        value={heroTitle}
                                        onChange={e => setHeroTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Subtítulo Principal</label>
                                    <textarea
                                        className="w-full p-3 bg-body border border-gray/20 rounded-lg text-text focus:border-accent outline-none h-32 resize-none"
                                        value={heroSubtitle}
                                        onChange={e => setHeroSubtitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Informações de Rodapé</label>
                                    <textarea
                                        className="w-full p-3 bg-body border border-gray/20 rounded-lg text-text focus:border-accent outline-none h-24 resize-none"
                                        value={contactInfo}
                                        onChange={e => setContactInfo(e.target.value)}
                                    />
                                </div>
                                <div className="flex justify-end pt-4">
                                    <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors">
                                        Salvar Alterações
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* VIDEOS MANAGER TAB */}
                    {activeTab === 'videos' && (
                        <div className="max-w-4xl mx-auto space-y-8">
                            {/* Add Form */}
                            <div className="bg-card p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-semibold mb-4">Adicionar Vídeo do YouTube</h3>
                                <form onSubmit={handleAddVideo} className="flex gap-4 items-end flex-wrap">
                                    <div className="flex-1 min-w-[200px]">
                                        <label className="block text-xs font-medium mb-1 text-gray">Título do Vídeo</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: FlexiAura Promo"
                                            className="w-full p-3 bg-body border border-gray/20 rounded-lg text-text outline-none focus:border-accent"
                                            value={newVideoTitle}
                                            onChange={e => setNewVideoTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="w-full md:w-1/3">
                                        <label className="block text-xs font-medium mb-1 text-gray">ID do YouTube</label>
                                        <input
                                            type="text"
                                            placeholder="Ex: dQw4w9WgXcQ"
                                            className="w-full p-3 bg-body border border-gray/20 rounded-lg text-text outline-none focus:border-accent"
                                            value={newVideoId}
                                            onChange={e => setNewVideoId(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="bg-accent text-black font-medium px-6 py-3 rounded-lg hover:brightness-110 w-full md:w-auto">
                                        Adicionar
                                    </button>
                                </form>
                            </div>

                            {/* List */}
                            <div className="bg-card p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-semibold mb-4">Vídeos Ativos ({customContent.videos.length})</h3>
                                <div className="space-y-3">
                                    {customContent.videos.map(video => (
                                        <div key={video.id} className="flex items-center justify-between p-4 bg-body rounded-lg border border-gray/10 group">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                                                    alt="thumbnail"
                                                    className="w-24 h-16 object-cover rounded-md"
                                                />
                                                <div>
                                                    <h4 className="font-medium text-text">{video.title}</h4>
                                                    <p className="text-xs text-gray font-mono">{video.id}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <a
                                                    href={`https://youtu.be/${video.id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-gray hover:text-accent transition-colors"
                                                >
                                                    <i className="fas fa-external-link-alt"></i>
                                                </a>
                                                <button
                                                    onClick={() => removeVideo(video.id)}
                                                    className="text-red-400 hover:text-red-600 transition-colors p-2"
                                                >
                                                    <i className="fas fa-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                    {customContent.videos.length === 0 && (
                                        <p className="text-center text-gray py-8">Nenhum vídeo adicionado.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* INTEGRATIONS TAB */}
                    {activeTab === 'integrations' && (
                        <div className="space-y-6">
                            {[
                                { name: 'Google Analytics', desc: 'Rastreie o tráfego do site', icon: 'fa-chart-simple', color: 'bg-orange-500', connected: false, fields: ['Tracking ID', 'Property ID'] },
                                { name: 'Stripe Payments', desc: 'Processe pagamentos globalmente', icon: 'fa-credit-card', color: 'bg-indigo-500', connected: false, fields: ['API Key', 'Secret Key'] },
                                { name: 'Mailchimp', desc: 'Automação de e-mail marketing', icon: 'fa-envelope-open-text', color: 'bg-yellow-400', connected: false, fields: ['API Key', 'List ID'] },
                                { name: 'HubSpot CRM', desc: 'Gerenciamento de relacionamento', icon: 'fa-hubspot', color: 'bg-orange-600', connected: false, fields: ['API Key', 'Portal ID'] },
                                { name: 'Slack Bot', desc: 'Notificações de equipe', icon: 'fa-slack', color: 'bg-purple-600', connected: false, fields: ['Webhook URL', 'Bot Token'] },
                                { name: 'Gemini 3 AI', desc: 'Integração com Google Gemini AI', icon: 'fa-brain', color: 'bg-gradient-to-r from-purple-500 to-pink-500', connected: false, fields: ['API Key', 'Model Version'] },
                            ].map((integration, idx) => (
                                <IntegrationCard key={idx} integration={integration} />
                            ))}

                            {/* Future Implementations Section */}
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 rounded-xl border-2 border-purple-400 mt-8">
                                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                    <i className="fas fa-rocket"></i>
                                    Future Implementations
                                </h3>
                                <p className="text-white/80 mb-6 text-sm">
                                    Configure APIs for upcoming platform features. These integrations are in development.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { name: 'AI Chat API', icon: 'fa-comments', fields: ['API Endpoint', 'Auth Token', 'Model ID'] },
                                        { name: 'Blockchain Integration', icon: 'fa-link', fields: ['Network RPC', 'Contract Address', 'Private Key'] },
                                        { name: 'AR/VR API', icon: 'fa-vr-cardboard', fields: ['SDK Key', 'Project ID', 'Environment'] },
                                        { name: 'Voice Assistant', icon: 'fa-microphone', fields: ['API Key', 'Language Code', 'Voice ID'] },
                                    ].map((future, idx) => (
                                        <div key={idx} className="bg-white/10 backdrop-blur p-4 rounded-lg border border-white/20">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center text-white">
                                                    <i className={`fas ${future.icon}`}></i>
                                                </div>
                                                <h4 className="font-semibold text-white">{future.name}</h4>
                                            </div>
                                            <div className="space-y-2">
                                                {future.fields.map((field, fidx) => (
                                                    <input
                                                        key={fidx}
                                                        type="text"
                                                        placeholder={field}
                                                        className="w-full p-2 bg-white/10 border border-white/30 rounded text-white placeholder-white/50 text-sm outline-none focus:border-white/60"
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-white text-center mt-8">
                                <h3 className="text-xl font-bold mb-2">Precisa de mais integrações?</h3>
                                <p className="mb-6 opacity-90">A FlexiAura suporta Webhooks e API personalizada.</p>
                                <button className="bg-white text-primary px-6 py-2 rounded-lg font-semibold hover:bg-accent hover:text-black transition-colors">
                                    Ver Documentação da API
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};
