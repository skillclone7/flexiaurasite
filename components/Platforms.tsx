import React, { useEffect, useRef, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

/* ── Minimal animation hook ─────────────────────────────────────── */
function useScrollReveal<T extends HTMLElement>(threshold = 0.15) {
    const ref = useRef<T>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);

    return { ref, visible };
}

/* ── Animated orbiting dot ─────────────────────────────────────── */
interface OrbitDotProps { radius: number; duration: number; size: number; color: string; startAngle?: number; }
const OrbitDot: React.FC<OrbitDotProps> = ({ radius, duration, size, color, startAngle = 0 }) => {
    const [angle, setAngle] = useState(startAngle);
    useEffect(() => {
        let raf: number;
        let last = performance.now();
        const tick = (now: number) => {
            const dt = now - last;
            last = now;
            setAngle(a => a + (360 / (duration * 1000)) * dt);
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [duration]);

    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;

    return (
        <div
            className="absolute rounded-full pointer-events-none"
            style={{
                width: size,
                height: size,
                background: color,
                top: '50%',
                left: '50%',
                transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                boxShadow: `0 0 ${size * 2}px ${color}`,
                transition: 'transform 16ms linear',
            }}
        />
    );
};

/* ── Card wrapper that slides in from a direction ――――――――――――― */
interface SlideCardProps {
    children: React.ReactNode;
    from: 'left' | 'right' | 'bottom';
    delay?: number;
    className?: string;
}
const SlideCard: React.FC<SlideCardProps> = ({ children, from, delay = 0, className = '' }) => {
    const { ref, visible } = useScrollReveal<HTMLDivElement>();

    const origin =
        from === 'left' ? 'translateX(-80px)' :
        from === 'right' ? 'translateX(80px)' : 'translateY(60px)';

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? 'translate(0,0)' : origin,
                transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(.23,1,.32,1) ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
};

/* ── Specific Platform Card Component with Toggleable Info ───── */
interface Platform {
    id: string;
    image: string;
    title: string;
    desc: string;
    descExtra?: string;
    badge?: string | null;
}

const PlatformCard: React.FC<{ platform: Platform; accentColor: string; shadowColor: string; }> = ({ platform, accentColor, shadowColor }) => {
    const { t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    return (
        <div className="group relative w-full">
            <div className={`absolute -inset-1 bg-gradient-to-r ${accentColor} rounded-2xl blur opacity-20 group-hover:opacity-50 transition duration-700`} />
            <div className={`relative bg-card border border-white/10 rounded-2xl p-10 shadow-2xl transition-all hover:shadow-${shadowColor}/10 hover:shadow-2xl flex flex-col items-center text-center min-h-[500px] h-full`}>
                
                {/* Image Container */}
                <div className="w-full aspect-square mb-8 overflow-hidden rounded-xl bg-white shadow-inner flex items-center justify-center p-4">
                    <img
                        src={platform.image}
                        alt={t(platform.title)}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-500"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 w-full">
                    <h3 className="font-serif text-3xl font-bold mb-3 text-primary">{t(platform.title)}</h3>
                    
                    {platform.badge && (
                        <div className="inline-block text-[10px] uppercase tracking-widest text-white bg-accent/80 font-bold px-3 py-1 rounded-full mb-4 self-center">
                            {t(platform.badge)}
                        </div>
                    )}

                    <p className="text-text/80 text-base leading-relaxed mb-4">
                        {t(platform.desc)}
                    </p>

                    {/* Expandable "Saiba Mais" section */}
                    <div 
                        className="overflow-hidden transition-all duration-500 ease-in-out"
                        style={{ maxHeight: isExpanded ? (contentRef.current?.scrollHeight || 500) + 'px' : '0px', opacity: isExpanded ? 1 : 0 }}
                    >
                        <div ref={contentRef} className="pt-2 pb-6 text-sm text-text/70 leading-relaxed text-left border-t border-gray/10 mt-2 italic shadow-inner px-4 bg-gray/5 rounded-lg">
                            {t(platform.descExtra || '')}
                        </div>
                    </div>

                    <button 
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-auto inline-flex items-center gap-2 text-xs font-bold text-accent uppercase tracking-widest border border-accent/30 px-5 py-2 rounded-full hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        {isExpanded ? t('platformShowLess') : t('platformLearnMore')}
                        <i className={`fas ${isExpanded ? 'fa-chevron-up' : 'fa-chevron-down'} text-[10px] transition-transform duration-300`}></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

/* ── Main component ──────────────────────────────────────────── */
const Platforms: React.FC = () => {
    const { t } = useLanguage();
    const { ref: hubRef, visible: hubVisible } = useScrollReveal<HTMLDivElement>(0.2);

    const platformsList: Platform[] = [
        { 
            id: 'market',
            image: '/fleximarket_full.png',  
            title: 'platformTitle1', 
            desc: 'platformDesc1', 
            descExtra: 'platformDesc1Extra',
            badge: null 
        },
        { 
            id: 'studios',
            image: '/flexistudio_full.png',  
            title: 'platformTitle2', 
            desc: 'platformDesc2', 
            badge: null 
        },
        { 
            id: 'help',
            image: '/flexihelp_full.png',    
            title: 'platformTitle3', 
            desc: 'platformDesc3', 
            descExtra: 'platformDesc3Extra',
            badge: 'socialInitiative' 
        },
    ];

    return (
        <section id="platforms" className="py-28 bg-body relative overflow-hidden">
            {/* background accents ... same as before */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />
            <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px] pointer-events-none" />
            <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-5 relative z-10">

                <div className="text-center mb-20">
                    <SlideCard from="bottom" delay={0}>
                        <p className="text-accent text-xs uppercase tracking-[0.35em] font-bold mb-3">
                            {t('platformsTagline')}
                        </p>
                        <h2 className="font-serif text-5xl mb-5 text-primary tracking-tight">
                            {t('platformsTitle')}
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-accent to-secondary mx-auto mb-6 rounded-full" />
                        <p className="text-gray-color max-w-[740px] mx-auto text-lg leading-relaxed">
                            {t('platformsSubtitle')}
                        </p>
                    </SlideCard>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-start max-w-7xl mx-auto">

                    {/* Left — Fleximarket */}
                    <SlideCard from="left" delay={100} className="h-full">
                        <PlatformCard 
                            platform={platformsList[0]} 
                            accentColor="from-secondary to-accent" 
                            shadowColor="accent"
                        />
                    </SlideCard>

                    {/* Centre — Hub + Flexistudios */}
                    <div className="flex flex-col gap-16 items-center">
                        <div
                            ref={hubRef}
                            className="relative w-72 h-72 flex items-center justify-center mb-4"
                            style={{
                                opacity: hubVisible ? 1 : 0,
                                transform: hubVisible ? 'scale(1)' : 'scale(0.75)',
                                transition: 'opacity 0.9s ease 200ms, transform 0.9s cubic-bezier(.23,1,.32,1) 200ms',
                            }}
                        >
                            <div className="absolute inset-0 border-2 border-secondary/25 rounded-full" style={{ animation: 'spin 18s linear infinite' }} />
                            <div className="absolute inset-6 border border-accent/30 rounded-full" style={{ animation: 'spin 26s linear infinite reverse' }} />
                            <div className="absolute inset-12 border-2 border-primary/10 rounded-full" />

                            {hubVisible && (
                                <>
                                    <OrbitDot radius={130} duration={8}  size={8}  color="rgba(66,153,225,0.8)"  startAngle={0}   />
                                    <OrbitDot radius={105} duration={14} size={6}  color="rgba(236,107,44,0.7)"  startAngle={90}  />
                                    <OrbitDot radius={130} duration={8}  size={5}  color="rgba(66,153,225,0.5)"  startAngle={180} />
                                    <OrbitDot radius={80}  duration={20} size={5}  color="rgba(26,54,93,0.6)"   startAngle={270} />
                                </>
                            )}

                            <div className="text-center relative z-10">
                                <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-black mb-1">{t('hubInnovation')}</div>
                                <div className="flex gap-3 justify-center my-2 items-center">
                                    <div className="w-5 h-5 rounded-full bg-primary shadow-[0_0_18px_rgba(26,54,93,0.6)]" />
                                </div>
                                <div className="text-[10px] uppercase tracking-[0.2em] text-accent font-black mt-1">{t('hubTechnology')}</div>
                            </div>

                            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 text-[9px] font-black text-gray uppercase tracking-tighter whitespace-nowrap">{t('hubIndustry')}</div>
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 text-[9px] font-black text-gray uppercase tracking-tighter whitespace-nowrap">{t('hubConsulting')}</div>
                            <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 text-[9px] text-accent/60 uppercase tracking-widest whitespace-nowrap font-bold">{t('platformHubLabel')}</div>
                        </div>

                        {/* Flexistudios card */}
                        <SlideCard from="bottom" delay={200} className="w-full">
                            <div className="group relative w-full">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-accent to-secondary rounded-xl blur opacity-20 group-hover:opacity-45 transition duration-700" />
                                <div className="relative bg-card border border-white/5 rounded-xl p-8 shadow-xl transition-all hover:scale-[1.03] flex items-center gap-8">
                                    <div className="w-36 h-24 flex-shrink-0 bg-white rounded-lg overflow-hidden p-2 shadow-sm">
                                        <img src={platformsList[1].image} alt="Flexistudios" className="w-full h-full object-contain transform group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-serif text-2xl font-bold text-primary">{t(platformsList[1].title)}</h3>
                                        <p className="text-text/70 text-sm mt-1 leading-relaxed">{t(platformsList[1].desc)}</p>
                                    </div>
                                </div>
                            </div>
                        </SlideCard>
                    </div>

                    {/* Right — Flexihelp */}
                    <SlideCard from="right" delay={150} className="h-full">
                        <PlatformCard 
                            platform={platformsList[2]} 
                            accentColor="from-accent to-secondary" 
                            shadowColor="secondary"
                        />
                    </SlideCard>
                </div>
            </div>

            <style>{`
                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default Platforms;