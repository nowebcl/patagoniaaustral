import React, { useState } from 'react';
import { toursData } from '../data/toursData';

const AdventureWidget = ({ language = 'es', onOpenBooking }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const isEs = language === 'es';

  const categories = [
    {
      id: 'all',
      icon: 'icon-Group1',
      label: isEs ? 'Trekking y Volcanes' : 'Hiking & Volcanoes',
    },
    {
      id: 'lagos',
      icon: 'icon-river-1',
      label: isEs ? 'Navegación Lacustre' : 'Lake Sailing',
    },
    {
      id: 'chiloe',
      icon: 'icon-adventure-1',
      label: isEs ? 'Excursiones y Chiloé' : 'Chiloé & Excursions',
    },
    {
      id: 'termas',
      icon: 'icon-deer-1',
      label: isEs ? 'Termas y Naturaleza' : 'Hot Springs & Nature',
    },
  ];

  const displayedTours =
    activeCategory === 'all'
      ? toursData.slice(0, 8)
      : toursData.filter((t) => t.categories.includes(activeCategory)).concat(toursData).slice(0, 8);

  return (
    <section className="widget-adventure">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-40">
              <span className="sub-title-heading text-main mb-15 fadeInUp wow" style={{ color: '#0001e2' }}>
                {isEs ? 'Explora el Sur de Chile' : 'Explore Southern Chile'}
              </span>
              <h2 className="title-heading fadeInUp wow">
                {isEs ? 'Aventuras para todos en la Patagonia' : 'Patagonia Adventures for Everyone'}
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="adventure-content">
              <nav className="mb-40 adventure-scroll">
                <div className="nav nav-justified nav-tabs-adventure" id="nav-tab" role="tablist">
                  {categories.map((cat) => (
                    <li
                      key={cat.id}
                      className={`nav-link flex-three ${activeCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat.id)}
                      style={{ cursor: 'pointer' }}
                    >
                      <i className={cat.icon}></i>
                      <span>{cat.label}</span>
                    </li>
                  ))}
                </div>
              </nav>
              <div className="tab-content" id="nav-tabContent">
                <div className="tab-pane fade show active" role="tabpanel">
                  <div className="row">
                    {displayedTours.map((tour, index) => (
                      <div className="col-6 col-sm-6 col-lg-3" key={`${tour.id}-${index}`}>
                        <div className="tf-adventure flex-three mb-43">
                          <a
                            className="adventure-image"
                            href="#tours"
                            onClick={(e) => {
                              if (onOpenBooking) {
                                e.preventDefault();
                                onOpenBooking(tour);
                              }
                            }}
                          >
                            <img
                              alt={tour.title}
                              src={tour.image}
                              style={{ width: '90px', height: '90px', objectFit: 'cover', borderRadius: '10px' }}
                            />
                          </a>
                          <div className="adventure-image">
                            <span className="tour-ad" style={{ fontSize: '12px', color: '#64748b' }}>
                              ({tour.duration})
                            </span>
                            <h6 className="title-ad" style={{ fontSize: '14px', lineHeight: '1.3', margin: '4px 0' }}>
                              <a
                                href="#tours"
                                onClick={(e) => {
                                  if (onOpenBooking) {
                                    e.preventDefault();
                                    onOpenBooking(tour);
                                  }
                                }}
                              >
                                {tour.location}
                              </a>
                            </h6>
                            <p className="price-ad text-main" style={{ color: '#0001e2', fontWeight: '800' }}>
                              {tour.price_clp}
                            </p>
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
  );
};

export default AdventureWidget;
