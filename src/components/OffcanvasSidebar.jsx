import React from 'react';
import { translations } from '../data/translations';

const OffcanvasSidebar = ({ isOpen, onClose, onOpenBooking, onNavigateToAdmin, language = 'es' }) => {
  const t = translations[language] || translations.es;

  return (
    <>
      {isOpen && (
        <div
          className="offcanvas-backdrop fade show"
          onClick={onClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(8, 30, 42, 0.6)',
            backdropFilter: 'blur(3px)',
            zIndex: 1040,
          }}
        />
      )}
      <div
        className={`offcanvas offcanvas-end ${isOpen ? 'show' : ''}`}
        id="offcanvasRight"
        style={{
          visibility: isOpen ? 'visible' : 'hidden',
          backgroundColor: '#ffffff',
          width: '360px',
        }}
        tabIndex="-1"
      >
        <div className="offcanvas-header" style={{ padding: '24px 24px 10px' }}>
          <button
            aria-label="Close"
            className="btn-close"
            type="button"
            onClick={onClose}
            style={{ fontSize: '16px' }}
          />
        </div>
        <div className="offcanvas-body" style={{ padding: '10px 24px 30px' }}>
          <div className="logo-canvas" style={{ marginBottom: '20px' }}>
            <img
              alt="Austral Patagonia Naviera"
              src="/assets/images/austral-logo.png?v=3"
              style={{ maxWidth: '170px', height: 'auto' }}
            />
          </div>
          <p className="des" style={{ color: '#475569', fontSize: '14px', lineHeight: '1.6', marginBottom: '24px' }}>
            {t.footer.description}
          </p>

          <button
            type="button"
            onClick={() => {
              onClose();
              if (onOpenBooking) onOpenBooking();
            }}
            style={{
              width: '100%',
              backgroundColor: '#0001e2',
              color: '#fff',
              border: 'none',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              marginBottom: '12px',
            }}
          >
            {t.bookingNow}
          </button>

          {onNavigateToAdmin && (
            <button
              type="button"
              onClick={() => {
                onClose();
                onNavigateToAdmin();
              }}
              style={{
                width: '100%',
                backgroundColor: '#f8fafc',
                color: '#081e2a',
                border: '1px solid #cbd5e1',
                padding: '10px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
                marginBottom: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
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

          <ul className="canvas-info" style={{ listStyle: 'none', padding: 0, margin: '0 0 24px' }}>
            <li className="flex-three" style={{ marginBottom: '14px', gap: '10px' }}>
              <i className="icon-noun-mail-5780740-1" style={{ color: '#0001e2', fontSize: '18px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>
                <a href={`mailto:${t.email}`} style={{ color: '#081e2a', textDecoration: 'none' }}>
                  {t.email}
                </a>
              </p>
            </li>
            <li className="flex-three" style={{ marginBottom: '14px', gap: '10px' }}>
              <i className="icon-Group-9" style={{ color: '#0001e2', fontSize: '18px' }} />
              <p style={{ margin: 0, fontSize: '14px' }}>
                <a href={`tel:${t.mobile.replace(/\s+/g, '')}`} style={{ color: '#081e2a', textDecoration: 'none' }}>
                  {t.phone}
                </a>
              </p>
            </li>
            <li className="flex-three" style={{ marginBottom: '14px', gap: '10px' }}>
              <i className="icon-Layer-19" style={{ color: '#0001e2', fontSize: '18px' }} />
              <p style={{ margin: 0, fontSize: '14px', color: '#081e2a' }}>
                {t.address}
              </p>
            </li>
          </ul>

          <ul className="social flex-three" style={{ gap: '12px', padding: 0, listStyle: 'none' }}>
            <li>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#f1f5f9', color: '#0001e2' }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default OffcanvasSidebar;
