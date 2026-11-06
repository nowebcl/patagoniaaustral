import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

const MobileBottomNav = ({ onOpenBooking, language = 'es' }) => {
  const t = translations[language] || translations.es;
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const toursSection = document.getElementById('tours');
      const destinosSection = document.getElementById('destinos');

      if (destinosSection && scrollY >= destinosSection.offsetTop - 220) {
        setActiveTab('destinos');
      } else if (toursSection && scrollY >= toursSection.offsetTop - 220) {
        setActiveTab('tours');
      } else if (scrollY < 300) {
        setActiveTab('home');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id, tabName) => {
    setActiveTab(tabName);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleHomeClick = () => {
    setActiveTab('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBookingClick = () => {
    setActiveTab('booking');
    if (onOpenBooking) onOpenBooking();
  };

  return (
    <nav className="mobile-app-bottom-nav" aria-label="Navegación móvil">
      <div className="bottom-nav-inner">
        {/* Inicio */}
        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'home' ? 'is-active' : ''}`}
          onClick={handleHomeClick}
          aria-label={t.nav.home}
          style={{
            color: activeTab === 'home' ? '#0001e2' : '#475569',
          }}
        >
          <span
            className="bottom-nav-icon-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              marginBottom: '3px',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={activeTab === 'home' ? '2.3' : '1.9'}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '22px', height: '22px', display: 'block' }}
            >
              <path d="M3 10.5L12 3l9 7.5V20a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-9.5z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </span>
          <span className="bottom-nav-label" style={{ color: activeTab === 'home' ? '#0001e2' : '#475569' }}>
            {t.nav.home}
          </span>
        </button>

        {/* Tours y Navegación */}
        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'tours' ? 'is-active' : ''}`}
          onClick={() => scrollTo('tours', 'tours')}
          aria-label="Tours"
          style={{
            color: activeTab === 'tours' ? '#0001e2' : '#475569',
          }}
        >
          <span
            className="bottom-nav-icon-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              marginBottom: '3px',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={activeTab === 'tours' ? '2.3' : '1.9'}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '22px', height: '22px', display: 'block' }}
            >
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </span>
          <span className="bottom-nav-label" style={{ color: activeTab === 'tours' ? '#0001e2' : '#475569' }}>
            Tours
          </span>
        </button>

        {/* Reservar (Botón central destacado) */}
        <button
          type="button"
          className="bottom-nav-item bottom-nav-highlight"
          onClick={handleBookingClick}
          aria-label={language === 'es' ? 'Reservar excursión' : 'Book tour'}
        >
          <div className="bottom-nav-highlight-circle">
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '22px', height: '22px', display: 'block' }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2.5" ry="2.5" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <polyline points="9 16 11.5 18.5 16 14" />
            </svg>
          </div>
          <span
            className="bottom-nav-label"
            style={{ color: '#0001e2', fontWeight: '800', marginTop: '2px' }}
          >
            {language === 'es' ? 'Reservar' : 'Book'}
          </span>
        </button>

        {/* Destinos */}
        <button
          type="button"
          className={`bottom-nav-item ${activeTab === 'destinos' ? 'is-active' : ''}`}
          onClick={() => scrollTo('destinos', 'destinos')}
          aria-label={t.nav.destinations}
          style={{
            color: activeTab === 'destinos' ? '#0001e2' : '#475569',
          }}
        >
          <span
            className="bottom-nav-icon-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              marginBottom: '3px',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={activeTab === 'destinos' ? '2.3' : '1.9'}
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '22px', height: '22px', display: 'block' }}
            >
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
          </span>
          <span className="bottom-nav-label" style={{ color: activeTab === 'destinos' ? '#0001e2' : '#475569' }}>
            {t.nav.destinations}
          </span>
        </button>

        {/* WhatsApp */}
        <a
          href="https://wa.me/56988880676?text=Hola%20Austral%20Patagonia%20Naviera,%20deseo%20consultar%20por%20sus%20excursiones%20desde%20Puerto%20Montt"
          target="_blank"
          rel="noopener noreferrer"
          className="bottom-nav-item"
          aria-label="WhatsApp"
          style={{ color: '#16a34a' }}
        >
          <span
            className="bottom-nav-icon-wrap"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              marginBottom: '3px',
            }}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '22px', height: '22px', display: 'block' }}
            >
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
            </svg>
          </span>
          <span className="bottom-nav-label" style={{ color: '#16a34a', fontWeight: '700' }}>
            WhatsApp
          </span>
        </a>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
