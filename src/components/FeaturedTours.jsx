import React, { useState } from 'react';
import { toursData } from '../data/toursData';
import { translations } from '../data/translations';

const FeaturedTours = ({ onOpenBooking, language = 'es' }) => {
  const [activeTab, setActiveTab] = useState('todos');
  const t = translations[language]?.toursSection || translations.es.toursSection;

  const TABS = [
    { id: 'todos', label: t.allTours },
    { id: 'lagos', label: t.lakesTab },
    { id: 'volcanes', label: t.volcanoesTab },
    { id: 'chiloe', label: t.chiloeTab },
    { id: 'termas', label: t.hotSpringsTab },
    { id: 'cultura', label: t.cultureTab },
  ];

  const filteredTours = toursData.filter((tour) =>
    activeTab === 'todos' ? true : tour.categories.includes(activeTab)
  );

  return (
    <>
      <section className="tour-package pd-main" id="tours">
        <div className="tf-container w-1456">
          <div className="row">
            <div className="col-lg-12">
              <div className="center m0-auto w-text-heading">
                <span className="sub-title-heading text-main mb-15 fadeInUp wow" style={{ color: '#0001e2' }}>
                  {t.badge}
                </span>
                <h2 className="title-heading mb-40 fadeInUp wow">
                  {t.title}{' '}
                  <span className="text-gray font-yes" style={{ color: '#0001e2' }}>
                    {t.titleHighlight}
                  </span>
                </h2>
              </div>

              <div className="tab-tour-list">
                <ul className="nav justify-content-center tab-list mb-37" role="tablist">
                  {TABS.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        role="tab"
                        type="button"
                        className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                        style={{ cursor: 'pointer' }}
                      >
                        {tab.label}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="tab-content">
                  <div className="tab-pane fade show active">
                    <div className="row">
                      {filteredTours.map((tour, idx) => (
                        <div className="col-sm-6 col-lg-3 mb-30" key={tour.id}>
                          <div
                            className="tour-listing wow fadeInUp animated"
                            data-wow-delay={`${0.05 * (idx + 1)}s`}
                            style={{
                              borderRadius: '12px',
                              overflow: 'hidden',
                              background: '#fff',
                              boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                              display: 'flex',
                              flexDirection: 'column',
                              height: '100%',
                            }}
                          >
                            <div
                              className="tour-listing-image"
                              onClick={() => onOpenBooking && onOpenBooking(tour)}
                              style={{ display: 'block', position: 'relative', overflow: 'hidden', cursor: 'pointer' }}
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
                                  height: '220px',
                                  objectFit: 'cover',
                                  transition: 'transform 0.4s ease',
                                }}
                              />
                            </div>

                            <div
                              className="tour-listing-content relative"
                              style={{
                                padding: '24px 20px 20px',
                                display: 'flex',
                                flexDirection: 'column',
                                flex: 1,
                                position: 'relative',
                              }}
                            >
                              <div className="flex-two" style={{ marginBottom: '8px' }}>
                                <span
                                  className="tag-listing"
                                  style={{
                                    fontSize: '12px',
                                    fontWeight: '600',
                                    color: '#0001e2',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px',
                                  }}
                                >
                                  {tour.category}
                                </span>
                              </div>

                              <span
                                className="map flex align-center"
                                style={{
                                  fontSize: '13px',
                                  color: '#666',
                                  marginBottom: '8px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '5px',
                                }}
                              >
                                <i className="icon-Vector4" style={{ color: '#0001e2' }}></i>
                                {tour.location}
                              </span>

                              <h3
                                className="title-tour-list"
                                style={{
                                  fontSize: '16px',
                                  fontWeight: '700',
                                  lineHeight: '1.35',
                                  marginBottom: '10px',
                                  minHeight: '44px',
                                }}
                              >
                                <a
                                  href="#reservar"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onOpenBooking && onOpenBooking(tour);
                                  }}
                                  title={tour.title}
                                  style={{ color: '#081e2a', transition: 'color 0.2s' }}
                                >
                                  {tour.title}
                                </a>
                              </h3>

                              <div className="review" style={{ marginBottom: '12px' }}>
                                {[...Array(5)].map((_, i) => (
                                  <i
                                    className="icon-Star"
                                    key={i}
                                    style={{ color: '#ffb703', marginRight: '2px', fontSize: '13px' }}
                                  ></i>
                                ))}
                                <span style={{ fontSize: '12px', color: '#777', marginLeft: '6px' }}>
                                  ({tour.reviews} {t.reviews})
                                </span>
                              </div>

                              <div
                                className="icon-box flex-three"
                                style={{
                                  borderTop: '1px solid #f0f0f0',
                                  paddingTop: '12px',
                                  marginBottom: '16px',
                                  gap: '15px',
                                }}
                              >
                                <div className="icons flex-three" style={{ gap: '6px' }}>
                                  <i className="icon-time-left" style={{ color: '#0001e2' }}></i>
                                  <span style={{ fontSize: '13px', color: '#555' }}>{tour.duration}</span>
                                </div>
                                <div className="icons flex-three" style={{ gap: '6px' }}>
                                  <i className="icon-day" style={{ color: '#0001e2', fontSize: '14px' }}></i>
                                  <span style={{ fontSize: '13px', color: '#555' }}>{tour.schedule}</span>
                                </div>
                              </div>

                              <div
                                className="flex-two center-bottom"
                                style={{
                                  marginTop: 'auto',
                                  borderTop: '1px solid #f0f0f0',
                                  paddingTop: '14px',
                                  alignItems: 'center',
                                }}
                              >
                                <div className="price-box">
                                  <span style={{ fontSize: '11px', color: '#888', display: 'block', textTransform: 'uppercase' }}>
                                    {t.from}
                                  </span>
                                  <span
                                    className="price-sale"
                                    style={{
                                      fontSize: '18px',
                                      fontWeight: '800',
                                      color: '#0001e2',
                                    }}
                                  >
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
                                    padding: '8px 18px',
                                    borderRadius: '6px',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.2s ease',
                                  }}
                                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0001b5')}
                                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0001e2')}
                                >
                                  {t.bookBtn}
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
          </div>
        </div>
      </section>
    </>
  );
};

export default FeaturedTours;
