import React from 'react';
import { destinationsData } from '../data/toursData';
import { translations } from '../data/translations';

const Destinations = ({ language = 'es' }) => {
  const t = translations[language]?.destinationsSection || translations.es.destinationsSection;

  return (
    <>
      <section className="widget-destination" id="destinos">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="center m0-auto w-text-heading mb-40">
                <span className="sub-title-heading text-main mb-15 fadeInUp wow" style={{ color: '#0001e2' }}>
                  {t.badge}
                </span>
                <h2 className="title-heading fadeInUp wow">
                  {t.title}{' '}
                  <span className="text-gray font-yes" style={{ color: '#0001e2' }}>
                    {t.titleHighlight}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="grid-three-destination">
            {destinationsData.map((dest, idx) => (
              <div
                className="tf-widget-destination wow fadeInUp animated"
                data-wow-delay={`${0.1 * (idx + 1)}s`}
                key={dest.id}
              >
                <a className="destination-imgae" href="#tours">
                  <span className="tour" style={{ backgroundColor: '#0001e2' }}>
                    {dest.toursCount}
                  </span>
                  <img
                    alt={dest.title}
                    src={dest.image}
                    style={{ width: '100%', height: '240px', objectFit: 'cover' }}
                  />
                </a>
                <div className="destination-content">
                  <span className="nation">{dest.nation}</span>
                  <div className="flex-two btn-destination">
                    <h6 className="title">
                      <a href="#tours">{dest.title}</a>
                    </h6>
                    <a
                      className="flex-five btn-view"
                      href="#tours"
                      style={{ backgroundColor: '#0001e2', color: '#fff' }}
                      title={t.viewAll}
                    >
                      <i className="icon-Vector-32"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Destinations;
