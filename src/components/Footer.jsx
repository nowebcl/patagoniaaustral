import React from 'react';
import { translations } from '../data/translations';

const Footer = ({ language = 'es', onNavigateToAdmin }) => {
  const t = translations[language] || translations.es;

  return (
    <>
      <footer className="footer footer-style1" id="contacto">
        <div className="tf-container">
          <div className="footer-main">
            {/* Logo and About Agency */}
            <div className="footer-logo">
              <div className="logo-footer">
                <a href="/">
                  <img alt="Austral Patagonia Naviera" src="/assets/images/austral-logo-white.png?v=4" />
                </a>
              </div>
              <p className="des-footer" style={{ color: '#cbd5e1', lineHeight: '1.6', fontSize: '14px', marginBottom: '22px' }}>
                {t.footer.description}
              </p>
              <ul className="footer-info">
                <li className="flex-three" style={{ marginBottom: '12px' }}>
                  <i className="icon-noun-mail-5780740-1" style={{ color: '#3b82f6', fontSize: '18px', marginRight: '10px' }}></i>
                  <p style={{ margin: 0 }}>
                    <a href={`mailto:${t.email}`} style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px' }}>
                      {t.email}
                    </a>
                  </p>
                </li>
                <li className="flex-three" style={{ marginBottom: '12px' }}>
                  <i className="icon-Group-9" style={{ color: '#3b82f6', fontSize: '18px', marginRight: '10px' }}></i>
                  <p style={{ margin: 0 }}>
                    <a href={`tel:${t.mobile.replace(/\s+/g, '')}`} style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px' }}>
                      {t.phone} • {t.mobile}
                    </a>
                  </p>
                </li>
                <li className="flex-three">
                  <i className="icon-Layer-19" style={{ color: '#3b82f6', fontSize: '18px', marginRight: '10px' }}></i>
                  <p style={{ color: '#ffffff', margin: 0, fontSize: '14px' }}>
                    {t.address}
                  </p>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="footer-service">
              <h5 className="title-footer title" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '700', marginBottom: '22px' }}>
                {t.footer.linksTitle}
              </h5>
              <ul className="footer-menu">
                <li><a href="#tours">Navegación Lago Todos los Santos</a></li>
                <li><a href="#tours">Cruce Andino a Bariloche</a></li>
                <li><a href="#tours">Volcán Osorno y Petrohué</a></li>
                <li><a href="#tours">Isla de Chiloé (Castro / Dalcahue)</a></li>
                <li><a href="#tours">Termas del Sol &amp; Cochamó</a></li>
                <li><a href="#tours">Transfers Aeropuerto El Tepual</a></li>
              </ul>
            </div>

            {/* Destination Gallery */}
            <div className="footer-gallery">
              <h5 className="title-footer title" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '700', marginBottom: '22px' }}>
                {t.footer.galleryTitle || t.destinationsSection.titleHighlight}
              </h5>
              <div className="gallery-img" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <a href="#destinos">
                  <img alt="Peulla" src="/assets/images/tours/navegacion-peulla.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                </a>
                <a href="#destinos">
                  <img alt="Volcán Osorno" src="/assets/images/tours/volcan-osorno-petrohue.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                </a>
                <a href="#destinos">
                  <img alt="Chiloé" src="/assets/images/tours/chiloe-castro-dalcahue.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                </a>
                <a href="#destinos">
                  <img alt="Termas" src="/assets/images/tours/termas-del-sol.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                </a>
                <a href="#destinos">
                  <img alt="Cruce Andino" src="/assets/images/tours/cruce-andino.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                </a>
                <a href="#destinos">
                  <img alt="Frutillar" src="/assets/images/tours/frutillar-teatro-del-lago.jpg" style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '6px' }} />
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className="footer-newsletter">
              <h5 className="title-footer title" style={{ color: '#ffffff', fontSize: '18px', fontWeight: '700', marginBottom: '22px' }}>
                {t.footer.newsletterTitle}
              </h5>
              <p className="des-newsletter" style={{ color: '#cbd5e1', fontSize: '14px', lineHeight: '1.5' }}>
                {t.footer.newsletterDesc}
              </p>
              <form
                action="#"
                id="form-email-footer"
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(language === 'es' ? '¡Gracias por suscribirte a Austral Patagonia!' : 'Thank you for subscribing to Austral Patagonia!');
                }}
                style={{ marginTop: '18px' }}
              >
                <div
                  className="input-email relative"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    borderRadius: '8px',
                    boxShadow: '0 4px 14px rgba(0, 0, 0, 0.15)',
                    overflow: 'hidden',
                  }}
                >
                  <input
                    placeholder={t.footer.emailPlaceholder}
                    type="email"
                    required
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '48px',
                      padding: '0 52px 0 16px',
                      backgroundColor: '#ffffff',
                      border: 'none',
                      outline: 'none',
                      color: '#081e2a',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                  />
                  <button
                    type="submit"
                    aria-label={t.footer.subscribeBtn || 'Suscribirse'}
                    style={{
                      position: 'absolute',
                      right: '4px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      width: '40px',
                      height: '40px',
                      borderRadius: '6px',
                      backgroundColor: '#0001e2',
                      color: '#ffffff',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      padding: 0,
                      transition: 'background-color 0.2s ease, transform 0.15s ease',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = '#0001b5')}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = '#0001e2')}
                  >
                    <i className="icon-paper-plane" style={{ fontSize: '15px', color: '#ffffff', transform: 'translateX(-1px)' }}></i>
                  </button>
                </div>
                <div
                  className="checkbox"
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    marginTop: '12px',
                  }}
                >
                  <input
                    defaultChecked
                    id="check3"
                    name="check"
                    type="checkbox"
                    style={{
                      marginTop: '3px',
                      accentColor: '#0001e2',
                      cursor: 'pointer',
                      width: '15px',
                      height: '15px',
                      flexShrink: 0,
                    }}
                  />
                  <label
                    htmlFor="check3"
                    style={{
                      color: '#cbd5e1',
                      fontSize: '12px',
                      lineHeight: '1.4',
                      margin: 0,
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}
                  >
                    {t.footer.termsAccept}
                  </label>
                </div>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="footer-bottom flex-two" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', paddingBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
                &copy; 2026 {t.footer.copyright}
              </p>
              {onNavigateToAdmin && (
                <button
                  type="button"
                  onClick={onNavigateToAdmin}
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#94a3b8',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#94a3b8';
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="7" height="9" rx="1" />
                    <rect x="14" y="3" width="7" height="5" rx="1" />
                    <rect x="14" y="12" width="7" height="9" rx="1" />
                    <rect x="3" y="16" width="7" height="5" rx="1" />
                  </svg>
                  <span>{language === 'es' ? 'Portal de Administración' : 'Admin Portal'}</span>
                </button>
              )}
            </div>
            <ul className="social-footer flex-three" style={{ gap: '15px' }}>
              <li>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: '#fff', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  <span style={{ fontSize: '13px' }}>Instagram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
