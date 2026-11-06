import React, { useState } from 'react';
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
import BookingModal from './components/BookingModal';
import MobileBottomNav from './components/MobileBottomNav';

function App() {
  const [language, setLanguage] = useState('es');
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/embed/ScMzIvxBSi4');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTour, setSelectedTour] = useState(null);

  const handleOpenVideo = (url) => {
    if (url) setVideoUrl(url);
    setIsVideoOpen(true);
  };

  const handleOpenBooking = (tour = null) => {
    setSelectedTour(tour);
    setIsBookingOpen(true);
  };

  return (
    <>
      <div id="top" />
      <div id="wrapper">
        <div id="pagee" className="clearfix">
          <Header
            onOpenSidebar={() => setIsSidebarOpen(true)}
            onOpenBooking={() => handleOpenBooking(null)}
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
          <Footer language={language} />
        </div>
      </div>

      <OffcanvasSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onOpenBooking={() => handleOpenBooking(null)}
        language={language}
      />

      {/* Mobile App Bottom Navigation */}
      <MobileBottomNav
        onOpenBooking={() => handleOpenBooking(null)}
        language={language}
      />

      {/* Minimalist Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedTour={selectedTour}
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
