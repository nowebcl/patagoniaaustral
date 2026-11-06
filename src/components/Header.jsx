import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

const Header = ({ onOpenSidebar, onOpenBooking, language = 'es', onLanguageChange }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const t = translations[language] || translations.es;

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLangChange = (e) => {
    const val = e.target.value;
    if (onLanguageChange) {
      onLanguageChange(val);
    }
  };

  // Real current date formatted dynamically
  const now = new Date();
  const rawDate = now.toLocaleDateString(language === 'es' ? 'es-CL' : 'en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  const formattedDate = rawDate.charAt(0).toUpperCase() + rawDate.slice(1);

  return (
    <>
      <header className="main-header flex">
        <div id="header">
          {/* Header Top Bar (Desktop only) */}
          <div className="header-top d-none-mobile">
            <div className="header-top-wrap flex-two">
              <div className="header-top-right">
                <ul className="flex-three">
                  <li className="flex-three">
                    <i className="icon-day" style={{ color: '#0001e2' }}></i>
                    <span>{formattedDate}</span>
                  </li>
                  <li className="flex-three">
                    <i className="icon-mail" style={{ color: '#0001e2' }}></i>
                    <a href={`mailto:${t.email}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <span>{t.email}</span>
                    </a>
                  </li>
                  <li className="flex-three">
                    <i className="icon-phone" style={{ color: '#0001e2' }}></i>
                    <a href={`tel:${t.phone.replace(/\s+/g, '')}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      <span>{t.phone}</span>
                    </a>
                  </li>
                </ul>
              </div>

              <div className="header-top-left flex-two">
                <button
                  type="button"
                  className="booking"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenBooking) onOpenBooking();
                  }}
                  style={{
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    color: '#0001e2',
                    fontWeight: '700',
                    fontSize: '14px',
                  }}
                >
                  <i className="icon-19" style={{ color: '#0001e2' }}></i>
                  <span>{t.bookingNow}</span>
                </button>

                <div className="follow-social flex-two" style={{ alignItems: 'center', gap: '8px' }}>
                  <span>{t.followUs}</span>
                  <ul className="flex-two" style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    <li>
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        title="Instagram"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0001e2',
                        }}
                      >
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Header Lower Navigation */}
          <div className={`header-lower ${isSticky ? 'is-fixed is-small' : ''}`}>
            <div className="tf-container full">
              <div className="row">
                <div className="col-lg-12">
                  <div className="inner-container flex justify-space align-center mobile-header-bar">
                    {/* Left: Mobile hamburger */}
                    <div
                      className="mobile-nav-toggler mobie-mt mobile-button"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setIsMobileMenuOpen(true)}
                      aria-label="Abrir menú"
                    >
                      <i className="icon-Vector3"></i>
                    </div>

                    {/* Logo Box (No airplane image next to it) */}
                    <div className="logo-box">
                      <div className="logo">
                        <a href="/">
                          <img
                            alt="Austral Patagonia Naviera"
                            src="/assets/images/austral-logo.png?v=3"
                            className="header-logo-img"
                          />
                        </a>
                      </div>
                    </div>

                    {/* Desktop Main Menu Nav: Inicio, Tours y Navegación, Destinos ONLY */}
                    <div className="nav-outer flex align-center desktop-nav-outer">
                      <nav className="main-menu show navbar-expand-md">
                        <div className="navbar-collapse collapse clearfix" id="navbarSupportedContent">
                          <ul className="navigation clearfix">
                            <li className="current">
                              <a href="/">{t.nav.home}</a>
                            </li>
                            <li className="dropdown2">
                              <a href="#tours">
                                {language === 'es' ? 'Tours y Navegación' : 'Tours & Sailing'}
                              </a>
                              <ul>
                                <li><a href="#tours">Navegación Lago Todos los Santos</a></li>
                                <li><a href="#tours">Cruce Andino Bariloche</a></li>
                                <li><a href="#tours">Volcán Osorno y Petrohué</a></li>
                                <li><a href="#tours">Isla de Chiloé (Castro / Dalcahue)</a></li>
                                <li><a href="#tours">Termas del Sol &amp; Cochamó</a></li>
                              </ul>
                              <div className="dropdown2-btn"></div>
                            </li>
                            <li>
                              <a href="#destinos">{t.nav.destinations}</a>
                            </li>
                          </ul>
                        </div>
                      </nav>

                      {/* Header Account: Language + Booking */}
                      <div className="header-account flex align-center" style={{ gap: '12px', marginLeft: '28px' }}>
                        <div className="language-selector">
                          <select
                            value={language}
                            onChange={handleLangChange}
                            className="lang-select-pill"
                            aria-label="Seleccionar idioma"
                          >
                            <option value="es">🇨🇱 Español (ES)</option>
                            <option value="en">🇬🇧 English (EN)</option>
                          </select>
                        </div>

                        <button
                          type="button"
                          onClick={onOpenBooking}
                          className="btn-header-booking"
                        >
                          <span>{t.bookingNow}</span>
                        </button>
                      </div>
                    </div>

                    {/* Mobile Right Action: ONLY Language Switcher */}
                    <div className="mobile-actions flex align-center d-flex-mobile">
                      <select
                        value={language}
                        onChange={handleLangChange}
                        className="mobile-lang-select"
                        aria-label="Cambiar idioma"
                      >
                        <option value="es">🇨🇱 ES</option>
                        <option value="en">🇬🇧 EN</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Header Sidebar Button (Desktop only) */}
        <a
          className="header-sidebar flex-three desktop-sidebar-btn"
          style={{ cursor: 'pointer', backgroundColor: '#0001e2' }}
          onClick={onOpenSidebar}
          title="Menú Austral Patagonia"
        >
          <i className="icon-Bars"></i>
        </a>
      </header>

      {/* Full-Screen Mobile Menu Drawer (Rendered outside <header> so it is never clipped) */}
      {isMobileMenuOpen && (
        <div
          className="custom-mobile-drawer-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setIsMobileMenuOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(8, 30, 42, 0.7)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer Box */}
          <nav
            style={{
              position: 'relative',
              zIndex: 2,
              width: '86%',
              maxWidth: '340px',
              height: '100vh',
              backgroundColor: '#081e2a',
              color: '#ffffff',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              boxShadow: '6px 0 30px rgba(0,0,0,0.45)',
              padding: '16px 20px 82px',
            }}
          >
            {/* Top Header of Drawer: Logo + Close Button */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.12)',
                paddingBottom: '12px',
                marginBottom: '14px',
              }}
            >
              <a href="/" onClick={() => setIsMobileMenuOpen(false)}>
                <img
                  alt="Austral Patagonia Naviera"
                  src="/assets/images/austral-logo-white.png?v=4"
                  style={{ maxWidth: '150px', height: 'auto', display: 'block' }}
                />
              </a>

              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
                style={{
                  width: '38px',
                  minWidth: '38px',
                  maxWidth: '38px',
                  height: '38px',
                  padding: 0,
                  flexShrink: 0,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.25)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#ffffff',
                  fontSize: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            {/* Navigation Links */}
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: '0 0 14px 0',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <li>
                <a
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '15px',
                  }}
                >
                  <span>{t.nav.home}</span>
                  <span style={{ color: '#38bdf8' }}>→</span>
                </a>
              </li>

              <li>
                <a
                  href="#tours"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '15px',
                  }}
                >
                  <span>{language === 'es' ? 'Tours y Navegación' : 'Tours & Sailing'}</span>
                  <span style={{ color: '#38bdf8' }}>→</span>
                </a>

                {/* Sub-list of featured tours */}
                <ul
                  style={{
                    listStyle: 'none',
                    padding: '6px 0 4px 14px',
                    margin: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '5px',
                  }}
                >
                  <li>
                    <a
                      href="#tours"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px' }}
                    >
                      • Navegación Lago Todos los Santos
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tours"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px' }}
                    >
                      • Cruce Andino a Bariloche
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tours"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px' }}
                    >
                      • Volcán Osorno y Saltos del Petrohué
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tours"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px' }}
                    >
                      • Isla de Chiloé (Castro / Dalcahue)
                    </a>
                  </li>
                  <li>
                    <a
                      href="#tours"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '13px' }}
                    >
                      • Termas del Sol &amp; Cochamó
                    </a>
                  </li>
                </ul>
              </li>

              <li>
                <a
                  href="#destinos"
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    color: '#ffffff',
                    textDecoration: 'none',
                    fontWeight: '700',
                    fontSize: '15px',
                  }}
                >
                  <span>{t.nav.destinations}</span>
                  <span style={{ color: '#38bdf8' }}>→</span>
                </a>
              </li>
            </ul>

            {/* Language Selector inside Drawer */}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '11.5px', color: '#94a3b8', display: 'block', marginBottom: '4px' }}>
                {language === 'es' ? 'Idioma:' : 'Language:'}
              </label>
              <select
                value={language}
                onChange={handleLangChange}
                style={{
                  width: '100%',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  backgroundColor: '#0f293a',
                  color: '#ffffff',
                }}
              >
                <option value="es">🇨🇱 Español (ES)</option>
                <option value="en">🇬🇧 English (EN)</option>
              </select>
            </div>

            {/* Contact Details in Drawer */}
            <div
              style={{
                borderTop: '1px solid rgba(255,255,255,0.12)',
                paddingTop: '12px',
                marginBottom: '14px',
                fontSize: '12.5px',
                color: '#cbd5e1',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
              }}
            >
              <div>📍 {t.address}</div>
              <div>
                ✉️{' '}
                <a href={`mailto:${t.email}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                  {t.email}
                </a>
              </div>
              <div>
                📞{' '}
                <a href={`tel:${t.phone.replace(/\s+/g, '')}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                  {t.phone}
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (onOpenBooking) onOpenBooking();
                }}
                style={{
                  width: '100%',
                  backgroundColor: '#0001e2',
                  color: '#fff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '10px',
                  fontWeight: '800',
                  fontSize: '15px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(0, 1, 226, 0.4)',
                }}
              >
                {t.bookingNow}
              </button>

              <a
                href="https://wa.me/56988880676"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  backgroundColor: '#25D366',
                  color: '#fff',
                  padding: '12px',
                  borderRadius: '10px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '14px',
                }}
              >
                💬 WhatsApp Directo
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
