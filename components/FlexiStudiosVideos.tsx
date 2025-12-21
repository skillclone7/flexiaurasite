
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const FlexiStudiosVideos: React.FC = () => {
  const { t, customContent } = useLanguage();
  const videos = customContent.videos || [];
  const [visibleCount, setVisibleCount] = useState(6);

  const visibleVideos = videos.slice(0, visibleCount);
  const hasMore = visibleCount < videos.length;

  return (
    <section id="videos" className="py-24 bg-[#1a1a1a] text-white">
      <div className="container mx-auto px-5">
        <FadeIn>
          <div className="flex flex-col items-center mb-16">
            <div className="text-accent text-3xl mb-4">
              <i className="fas fa-film"></i>
            </div>
            <h2 className="font-serif text-4xl mb-4 text-center">{t('flexiStudiosTitle')}</h2>
            <p className="text-center text-gray-400 max-w-[700px] text-lg">
              {t('flexiStudiosSubtitle')}
            </p>
          </div>
        </FadeIn>

        {videos.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <i className="fas fa-video-slash text-4xl mb-3"></i>
            <p>Nenhum vídeo disponível no momento.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleVideos.map((video, index) => (
                <FadeIn key={video.id} delay={index * 150}>
                  <div className="bg-[#252525] rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-2 hover:shadow-2xl h-full flex flex-col">
                    <div className="aspect-video w-full">
                      <iframe
                        width="100%"
                        height="100%"
                        src={`https://www.youtube.com/embed/${video.id}`}
                        title={video.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full object-cover"
                      ></iframe>
                    </div>
                    <div className="p-5 flex-grow">
                      <h3 className="font-semibold text-lg text-white mb-2 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center text-sm text-gray-500 gap-2">
                        <span className="bg-accent text-black text-xs font-bold px-2 py-0.5 rounded">FLEXISTUDIOS</span>
                        <span>• YouTube</span>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>

            {hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="bg-accent text-black px-8 py-3 rounded-full font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-lg"
                >
                  <i className="fas fa-plus-circle mr-2"></i>
                  Load More Videos
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default FlexiStudiosVideos;
