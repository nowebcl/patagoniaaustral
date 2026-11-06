import React from 'react';
import { toursData } from '../data/toursData';
import { translations } from '../data/translations';

const OfferPackage = ({ onOpenBooking, language = 'es' }) => {
  const featuredOfferTours = toursData.slice(0, 4);
  const t = translations[language]?.offersSection || translations.es.offersSection;

  return (
    <>
      <section className="offer-package pd-main bg-1 relative" id="ofertas">
        <img
          alt="image"
          className="feature-ofer"
          src="/assets/images/tours/volcan-osorno-petrohue.jpg"
          style={{ opacity: 0.25, objectFit: 'cover' }}
        />
        <div className="tf-container">
          <div className="row align-center z-index3 relative">
            <div className="col-lg-5">
              <div className="content">
                <div className="mb-50">
                  <span
                    className="sub-title-heading text-main mb-15 fadeInUp wow"
                    style={{ color: '#0001e2' }}
                  >
                    {t.badge}
                  </span>
                  <h2 className="title-heading mb-32 fadeInUp wow">
                    {t.title}{' '}
                    <span className="text-gray font-yes" style={{ color: '#0001e2' }}>
                      {t.titleHighlight}
                    </span>
                  </h2>
                  <p className="des-heading fadeInUp wow">
                    {t.description}
                  </p>
                </div>

                <div className="inner-content flex-three">
                  <div className="offer fadeInUp wow" style={{ backgroundColor: '#0001e2' }}>
                    <span className="number" style={{ color: '#ffffff' }}>{t.discount}</span>
                  </div>
                  <p className="font-italic fadeInUp wow">
                    {t.discountDesc}
                  </p>
                </div>

                <div className="count-dow-wrap flex-three mb-50">
                  <div className="title-counters fadeInUp wow">
                    <span>{t.hurry}</span>
                    <p>{t.offerEnds}</p>
                  </div>
                  <div className="count-down relative fadeInUp wow">
                    <div className="featured-countdown">
                      <div className="js-countdown">
                        <div aria-hidden="true" className="countdown__timer">
                          <span className="countdown__item">
                            <span className="countdown__value">2</span>
                            <span className="countdown__label">{t.days}</span>
                          </span>
                          <span className="countdown__item">
                            <span className="countdown__value">14</span>
                            <span className="countdown__label">{t.hours}</span>
                          </span>
                          <span className="countdown__item">
                            <span className="countdown__value">35</span>
                            <span className="countdown__label">{t.minutes}</span>
                          </span>
                          <span className="countdown__item">
                            <span className="countdown__value">40</span>
                            <span className="countdown__label">{t.seconds}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="btn-wap fadeInUp wow">
                  <a
                    className="btn-main"
                    href="#tours"
                    style={{ backgroundColor: '#0001e2', borderColor: '#0001e2' }}
                  >
                    <p className="btn-main-text">{t.viewMore}</p>
                    <p className="iconer">
                      <i className="icon-arrow-right"></i>
                    </p>
                  </a>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="relative on-week-swipper-wrap">
                <div className="row">
                  {featuredOfferTours.map((tour, idx) => (
                    <div className="col-sm-6 mb-30" key={tour.id}>
                      <div
                        className="tour-listing wow fadeInUp animated"
                        data-wow-delay={`${0.1 * (idx + 1)}s`}
                        style={{
                          borderRadius: '12px',
                          overflow: 'hidden',
                          background: '#fff',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          display: 'flex',
                          flexDirection: 'column',
                          height: '100%',
                        }}
                      >
                        <div
                          className="tour-listing-image"
                          onClick={() => onOpenBooking && onOpenBooking(tour)}
                          style={{ position: 'relative', display: 'block', overflow: 'hidden', cursor: 'pointer' }}
                        >
                          <div className="badge-top flex-two">
                            <span
                              className="feature"
                              style={{
                                backgroundColor: '#0001e2',
                                color: '#fff',
                                fontWeight: '600',
                                padding: '4px 12px',
                                borderRadius: '4px',
                              }}
                            >
                              {tour.badge}
                            </span>
                            <div className="badge-media flex-five">
                              <span className="media">
                                <i className="icon-Group-1000002909"></i> {tour.reviews > 100 ? '9+' : '5'}
                              </span>
                              <span className="media">
                                <i className="icon-Group-1000002910"></i> 2
                              </span>
                            </div>
                          </div>
                          <img
                            alt={tour.title}
                            src={tour.image}
                            style={{
                              width: '100%',
                              height: '210px',
                              objectFit: 'cover',
                            }}
                          />
                        </div>

                        <div className="tour-listing-content" style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                          <span
                            className="tag-listing"
                            style={{
                              fontSize: '11px',
                              fontWeight: '700',
                              color: '#0001e2',
                              textTransform: 'uppercase',
                              letterSpacing: '0.5px',
                              marginBottom: '6px',
                            }}
                          >
                            {tour.category}
                          </span>
                          <span
                            className="map flex align-center"
                            style={{ fontSize: '13px', color: '#666', marginBottom: '8px', display: 'flex', gap: '5px' }}
                          >
                            <i className="icon-Vector4" style={{ color: '#0001e2' }}></i>
                            {tour.location}
                          </span>

                          <h3 className="title-tour-list" style={{ fontSize: '15px', fontWeight: '700', lineHeight: '1.35', minHeight: '42px', marginBottom: '8px' }}>
                            <a
                              href="#reservar"
                              onClick={(e) => {
                                e.preventDefault();
                                onOpenBooking && onOpenBooking(tour);
                              }}
                              title={tour.title}
                              style={{ color: '#081e2a' }}
                            >
                              {tour.title}
                            </a>
                          </h3>

                          <div className="review" style={{ marginBottom: '10px' }}>
                            {[...Array(5)].map((_, i) => (
                              <i className="icon-Star" key={i} style={{ color: '#ffb703', fontSize: '12px' }}></i>
                            ))}
                            <span style={{ fontSize: '12px', color: '#777', marginLeft: '6px' }}>
                              ({tour.reviews} Reseñas)
                            </span>
                          </div>

                          <div className="icon-box flex-three" style={{ borderTop: '1px solid #f0f0f0', paddingTop: '10px', marginBottom: '14px', gap: '15px' }}>
                            <div className="icons flex-three" style={{ gap: '5px' }}>
                              <i className="icon-time-left" style={{ color: '#0001e2' }}></i>
                              <span style={{ fontSize: '12px', color: '#555' }}>{tour.duration}</span>
                            </div>
                            <div className="icons flex-three" style={{ gap: '5px' }}>
                              <i className="icon-day" style={{ color: '#0001e2' }}></i>
                              <span style={{ fontSize: '12px', color: '#555' }}>{tour.schedule}</span>
                            </div>
                          </div>

                          <div className="flex-two center-bottom" style={{ marginTop: 'auto', borderTop: '1px solid #f0f0f0', paddingTop: '12px', alignItems: 'center' }}>
                            <div className="price-box">
                              <span style={{ fontSize: '11px', color: '#888', display: 'block' }}>Desde</span>
                              <span className="price-sale" style={{ fontSize: '17px', fontWeight: '800', color: '#0001e2' }}>
                                {tour.price_clp}
                              </span>
                              <span style={{ fontSize: '12px', color: '#777', marginLeft: '4px' }}>
                                ({tour.price_usd} USD)
                              </span>
                            </div>

                            <button
                              type="button"
                              className="btn-tour"
                              onClick={() => onOpenBooking && onOpenBooking(tour)}
                              style={{
                                backgroundColor: '#0001e2',
                                color: '#fff',
                                padding: '6px 14px',
                                borderRadius: '5px',
                                fontSize: '12px',
                                fontWeight: '600',
                                border: 'none',
                                cursor: 'pointer',
                              }}
                            >
                              Reservar
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OfferPackage;
