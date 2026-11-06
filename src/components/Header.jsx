import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

const Header = ({ onOpenSidebar, onOpenBooking, onNavigateToAdmin, language = 'es', onLanguageChange }) => {
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

                {onNavigateToAdmin && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateToAdmin();
                    }}
                    style={{
                      border: 'none',
                      background: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#475569',
                      fontWeight: '600',
                      fontSize: '13px',
                      marginLeft: '12px',
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="9" rx="1" />
                      <rect x="14" y="3" width="7" height="5" rx="1" />
                      <rect x="14" y="12" width="7" height="9" rx="1" />
                      <rect x="3" y="16" width="7" height="5" rx="1" />
                    </svg>
                    <span>Admin</span>
                  </button>
                )}

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
                            {onNavigateToAdmin && (
                              <li>
                                <a
                                  href="#admin"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onNavigateToAdmin();
                                  }}
                                  style={{ color: '#0001e2', fontWeight: '700' }}
                                >
                                  Admin
                                </a>
                              </li>
                            )}
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#38bdf8' }}>
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>{t.address}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#38bdf8' }}>
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a href={`mailto:${t.email}`} style={{ color: '#38bdf8', textDecoration: 'none' }}>
                  {t.email}
                </a>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: '#38bdf8' }}>
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
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
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.699c.971.53 1.77.813 2.796.813 3.179 0 5.766-2.587 5.767-5.766.001-3.182-2.585-5.799-5.767-5.799zm9.969 5.766c0 5.514-4.486 10-10 10-1.748 0-3.385-.45-4.821-1.238l-7.179 1.882 1.916-6.997c-.901-1.503-1.416-3.26-1.416-5.147 0-5.514 4.486-10 10-10s10 4.486 10 10z" />
                </svg>
                <span>WhatsApp Directo</span>
              </a>

              {onNavigateToAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onNavigateToAdmin();
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    backgroundColor: 'rgba(255,255,255,0.08)',
                    color: '#cbd5e1',
                    border: '1px solid rgba(255,255,255,0.15)',
                    padding: '11px',
                    borderRadius: '10px',
                    fontWeight: '600',
                    fontSize: '13px',
                    cursor: 'pointer',
                    marginTop: '4px',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="3" width="7" height="5" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                    <rect x="3" y="16" width="7" height="5" rx="1" />
                  </svg>
                  <span>{language === 'es' ? 'Panel de Administración' : 'Admin Panel'}</span>
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;
