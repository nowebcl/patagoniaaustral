import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import SearchFilterBar from './components/SearchFilterBar';
import AboutUs from './components/AboutUs';
import FeaturedTours from './components/FeaturedTours';
import Activities from './components/Activities';
import OfferPackage from './components/OfferPackage';
import CounterSection from './components/CounterSection';
import Destinations from './components/Destinations';
import BrandPartners from './components/BrandPartners';
import AdventureWidget from './components/AdventureWidget';
import Testimonials from './components/Testimonials';
import ContactBanner from './components/ContactBanner';
import LatestNews from './components/LatestNews';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';
import OffcanvasSidebar from './components/OffcanvasSidebar';
import MobileBottomNav from './components/MobileBottomNav';
import ReservationPage from './components/ReservationPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [language, setLanguage] = useState('es');
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'booking' | 'admin'
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/ScMzIvxBSi4');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  // Sync view with URL Hash
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('#admin') || hash.includes('#panel')) {
        setCurrentView('admin');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash.includes('#reservar') || hash.includes('#booking')) {
        setCurrentView('booking');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (hash === '' || hash === '#' || hash === '#inicio') {
        setCurrentView('home');
      }
    };

    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  const handleOpenVideo = (url) => {
    if (url) setVideoUrl(url);
    setIsVideoOpen(true);
  };

  const handleOpenBooking = (tour = null) => {
    setSelectedTour(tour);
    setCurrentView('booking');
    window.location.hash = '#reservar';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToAdmin = () => {
    setCurrentView('admin');
    window.location.hash = '#admin';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    window.history.pushState(null, '', window.location.pathname);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // --------------------------------------------------
  // FULL PAGE: ADMIN DASHBOARD
  // --------------------------------------------------
  if (currentView === 'admin') {
    return (
      <AdminDashboard
        onBackToHome={handleBackToHome}
        onOpenPublicBooking={() => handleOpenBooking(null)}
      />
    );
  }

  // --------------------------------------------------
  // FULL PAGE: RESERVATION EXPERIENCE (NOT A POPUP)
  // --------------------------------------------------
  if (currentView === 'booking') {
    return (
      <ReservationPage
        initialTourId={selectedTour?.id || 1}
        language={language}
        onBackToHome={handleBackToHome}
        onNavigateToAdmin={handleNavigateToAdmin}
      />
    );
  }

  // --------------------------------------------------
  // FULL PAGE: MAIN HOMEPAGE & TOUR CATALOG
  // --------------------------------------------------
  return (
    <>
      <div id="top" />
      <div id="wrapper">
        <div id="pagee" className="clearfix">
          <Header
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenBooking={() => handleOpenBooking(null)}
            onNavigateToAdmin={handleNavigateToAdmin}
            language={language}
            onLanguageChange={(newLang) => setLanguage(newLang)}
          />
          <main className="main">
            <HeroSlider
              onOpenVideo={handleOpenVideo}
              onOpenBooking={() => handleOpenBooking(null)}
              language={language}
            />
            <SearchFilterBar language={language} />
            <AboutUs
              onOpenVideo={handleOpenVideo}
              onOpenBooking={() => handleOpenBooking(null)}
              language={language}
            />
            <FeaturedTours
              onOpenBooking={(tour) => handleOpenBooking(tour)}
              language={language}
            />
            <Activities
              onOpenVideo={handleOpenVideo}
              onOpenBooking={() => handleOpenBooking(null)}
              language={language}
            />
            <OfferPackage
              onOpenBooking={(tour) => handleOpenBooking(tour)}
              language={language}
            />
            <CounterSection
              onOpenBooking={() => handleOpenBooking(null)}
              language={language}
            />
            <Destinations
              onOpenVideo={handleOpenVideo}
              language={language}
            />
            <BrandPartners onOpenVideo={handleOpenVideo} language={language} />
            <AdventureWidget
              onOpenVideo={handleOpenVideo}
              onOpenBooking={(tour) => handleOpenBooking(tour)}
              language={language}
            />
            <Testimonials onOpenVideo={handleOpenVideo} language={language} />
            <ContactBanner onOpenVideo={handleOpenVideo} language={language} />
            <LatestNews
              onOpenVideo={handleOpenVideo}
              onOpenBooking={() => handleOpenBooking(null)}
              language={language}
            />
            <Newsletter
              onOpenVideo={handleOpenVideo}
              onOpenBooking={() => handleOpenBooking(null)}
              language={language}
            />
          </main>
          <Footer
            language={language}
            onNavigateToAdmin={handleNavigateToAdmin}
          />
        </div>
      </div>

      <OffcanvasSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenBooking={() => handleOpenBooking(null)}
        onNavigateToAdmin={handleNavigateToAdmin}
        language={language}
      />

      {/* Mobile App Bottom Navigation */}
      <MobileBottomNav
        onOpenBooking={() => handleOpenBooking(null)}
        language={language}
      />

      {/* Video Lightbox Modal */}
      {isVideoOpen && (
        <div
          className="modal-video"
          tabIndex="-1"
          role="dialog"
          aria-label="video"
          onClick={() => setIsVideoOpen(false)}
        >
          <div className="modal-video-body">
            <div className="modal-video-inner">
              <div
                className="modal-video-movie-wrap"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="modal-video-close-btn"
                  aria-label="close"
                  onClick={() => setIsVideoOpen(false)}
                />
                <iframe
                  width="100%"
                  height="100%"
                  src={`${videoUrl}?autoplay=1`}
                  title="Video Player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
