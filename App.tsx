
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Platforms from './components/Platforms';
import GamesArea from './components/Games/GamesArea';
import AdSection from './components/AdSection';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminLogin from './components/Admin/AdminLogin';

import FlexiStudiosVideos from './components/FlexiStudiosVideos';
import About from './components/About';
import QuizSection from './components/QuizSection';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';


function AppContent() {
  const { t } = useLanguage();
  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);



  const { isAuthenticated } = useAuth();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Keyboard shortcut for Admin Login (Ctrl + Shift + A)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        setShowAdminLogin(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isAuthenticated) {
    return <AdminDashboard onClose={() => { }} />;
  }

  return (
    <>
      {showAdminLogin && <AdminLogin onClose={() => setShowAdminLogin(false)} />}
      <Header />
      <main>
        <Hero />
        <Services />
        <Platforms />
        <FlexiStudiosVideos />
        <About />
        <GamesArea />
        <section id="quiz" className="py-20 bg-body">
          <div className="container mx-auto px-5">
            <h2 className="text-4xl font-bold text-center mb-4 text-text">
              {t('quizTitle')}
            </h2>
            <p className="text-center text-gray mb-12 max-w-2xl mx-auto">
              {t('quizSubtitle')}
            </p>
            <QuizSection />
          </div>
        </section>
        <AdSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
