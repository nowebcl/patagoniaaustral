import React from 'react';
import { translations } from '../data/translations';

const CounterSection = ({ onOpenBooking, language = 'es' }) => {
  const t = translations[language] || translations.es;

  const counterItems = [
    {
      num: t.counters.c1Num,
      label: t.counters.c1Label,
      delay: '0.1s',
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0001e2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      num: t.counters.c2Num,
      label: t.counters.c2Label,
      delay: '0.2s',
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0001e2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
          <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76" />
          <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
          <path d="M12 10v4" />
          <path d="M12 2v3" />
        </svg>
      ),
    },
    {
      num: t.counters.c3Num,
      label: t.counters.c3Label,
      delay: '0.3s',
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0001e2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      num: t.counters.c4Num,
      label: t.counters.c4Label,
      delay: '0.4s',
      icon: (
        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#0001e2" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="8" r="7" />
          <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
        </svg>
      ),
    },
  ];

  return (
    <section className="widget-counter relative" style={{ backgroundColor: '#081e2a', padding: '90px 0' }}>
      <img alt="image" className="counter-top" src="/assets/images/page/couter-top.png" />
      <img alt="image" className="counter-bottom" src="/assets/images/page/counter-bottom.png" />
      <div className="tf-container">
        <div className="row mb-50 align-center">
          <div className="col-lg-9 flex-three cta-wrap" style={{ gap: '24px' }}>
            <div className="image fadeInLeft wow">
              <img alt="Austral Patagonia" src="/assets/images/page/ready.png" />
            </div>
            <div className="content">
              <h2 className="title-call text-white mb-14 fadeInUp wow" style={{ fontSize: '32px', fontWeight: '800' }}>
                {language === 'es' ? '¿Listo para navegar y explorar la Patagonia?' : 'Ready to sail and explore Patagonia?'}
              </h2>
              <p className="des text-white fadeInUp wow" style={{ color: '#cbd5e1', fontSize: '16px' }}>
                {language === 'es'
                  ? 'Austral Patagonia Naviera te conecta con las maravillas del sur de Chile desde Puerto Montt.'
                  : 'Austral Patagonia Naviera connects you with southern Chile wonderlands from Puerto Montt.'}
              </p>
            </div>
          </div>
          <div className="col-lg-3">
            <div className="callt-to-action-button text-end fadeInRight wow">
              <button
                type="button"
                className="get-call"
                onClick={onOpenBooking}
                style={{
                  backgroundColor: '#0001e2',
                  color: '#fff',
                  border: 'none',
                  padding: '14px 28px',
                  borderRadius: '30px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '15px',
                }}
              >
                {t.bookingNow}
              </button>
            </div>
          </div>
        </div>

        <div className="row relative z-index3" style={{ marginTop: '40px' }}>
          {counterItems.map((item, index) => (
            <div
              key={index}
              className="col-6 col-lg-3 mb-20 wow fadeInUp animated"
              data-wow-delay={item.delay}
            >
              <div
                className="tf-counter center tf-countto"
                style={{
                  textAlign: 'center',
                  backgroundColor: '#ffffff',
                  borderRadius: '20px',
                  padding: '32px 20px',
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
                  {item.icon}
                </div>
                <div
                  className="number-counter"
                  style={{
                    fontSize: 'clamp(28px, 4vw, 42px)',
                    fontWeight: '900',
                    color: '#0001e2',
                    lineHeight: '1.1',
                    marginBottom: '8px',
                  }}
                >
                  {item.num}
                </div>
                <span
                  className="line"
                  style={{
                    display: 'inline-block',
                    width: '44px',
                    height: '3px',
                    backgroundColor: '#0001e2',
                    border: 'none',
                    margin: '8px 0 12px',
                  }}
                />
                <p
                  className="title-counter"
                  style={{
                    color: '#081e2a',
                    fontSize: '15px',
                    fontWeight: '700',
                    margin: 0,
                    lineHeight: '1.35',
                  }}
                >
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CounterSection;
