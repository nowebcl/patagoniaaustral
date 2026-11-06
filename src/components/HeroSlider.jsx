import React, { useState, useEffect } from 'react';
import { translations } from '../data/translations';

const HeroSlider = ({ language = 'es', onOpenBooking }) => {
  const t = translations[language] || translations.es;
  const words = t.hero.words;

  const [activeSlide, setActiveSlide] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [typedText, setTypedText] = useState(words[0]);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    setWordIndex(0);
    setTypedText(words[0]);
    setIsDeleting(false);
  }, [language]);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];
    const typeSpeed = isDeleting ? 40 : 90;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTypedText(currentWord.substring(0, typedText.length + 1));
        if (typedText.length + 1 === currentWord.length) {
          setTimeout(() => setIsDeleting(true), 1400);
        }
      } else {
        setTypedText(currentWord.substring(0, typedText.length - 1));
        if (typedText.length - 1 === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, isDeleting, wordIndex, words]);

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % 3);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + 3) % 3);

  const slideImages = [
    '/assets/images/slide/slide1.jpg',
    '/assets/images/tours/navegacion-peulla.jpg',
    '/assets/images/tours/volcan-osorno-petrohue.jpg',
  ];

  return (
    <section className="slider relative" id="inicio" style={{ overflow: 'hidden', width: '100%', maxWidth: '100vw' }}>
      <div className="swiper mySwiper" style={{ overflow: 'hidden', width: '100%' }}>
        <div
          className="swiper-wrapper"
          style={{
            transform: `translate3d(-${activeSlide * 100}%, 0px, 0px)`,
            transitionDuration: '500ms',
          }}
        >
          {slideImages.map((imgSrc, idx) => (
            <div
              key={idx}
              className={`slider-home1 relative overflow-hidden swiper-slide ${
                activeSlide === idx ? 'swiper-slide-active' : ''
              }`}
              style={{ width: '100%', maxWidth: '100%' }}
            >
              <div className="silider-image">
                <img
                  alt="Austral Patagonia"
                  className="image-slide"
                  src={imgSrc}
                  style={{ objectFit: 'cover' }}
                />
                <img alt="Overlay" className="mask-slide" src="/assets/images/slide/mask-slide.png" />
                <img alt="Overlay" className="mask-flane" src="/assets/images/slide/mask-fly.png" />
                <div
                  className="booking-title tf-anime-rorate hero-booking-badge"
                  onClick={onOpenBooking}
                  style={{ cursor: 'pointer' }}
                  title="Reservar Ahora"
                >
                  <p className="booking" style={{ borderColor: '#0001e2', color: '#fff' }}>
                    {t.hero.bookingBadge}
                  </p>
                  <span />
                </div>
              </div>

              <div className="slider-content hero-slider-content">
                <div className="tf-container">
                  <div className="row">
                    <div className="col-lg-9 col-md-11 col-12">
                      <span
                        className="sub-title font-yes hero-badge-text"
                        style={{
                          color: '#38bdf8',
                          fontSize: 'clamp(18px, 2.5vw, 26px)',
                          fontWeight: '600',
                          display: 'inline-block',
                          marginBottom: '8px',
                          textShadow: '0 2px 4px rgba(0,0,0,0.5)',
                        }}
                      >
                        {t.hero.welcomeBadge}
                      </span>

                      <h1 className="title-slide text-white mb-32 hero-main-heading">
                        Austral Patagonia Naviera
                        <br />
                        <span className="hero-subline">{t.hero.titlePrefix} </span>
                        <span className="animationtext clip hero-typed-span">
                          <span className="cd-words-wrapper">
                            <span
                              className="item-text is-visible hero-typed-word"
                              style={{
                                color: '#38bdf8',
                                fontWeight: 800,
                                marginLeft: '6px',
                                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                              }}
                            >
                              {typedText}
                            </span>
                          </span>
                        </span>
                      </h1>

                      <p className="des text-white mb-45 hero-description">
                        {t.hero.description}
                      </p>

                      <div className="btn-group hero-buttons-group" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        <a
                          className="btn-main hero-btn-explore"
                          href="#tours"
                          style={{
                            backgroundColor: '#0001e2',
                            borderColor: '#0001e2',
                            margin: 0,
                          }}
                        >
                          <span className="btn-main-text" style={{ margin: 0 }}>
                            {t.hero.btnStart}
                          </span>
                          <span className="iconer" style={{ margin: 0, marginLeft: '10px' }}>
                            <i className="icon-arrow-right" />
                          </span>
                        </a>

                        <button
                          type="button"
                          className="hero-btn-booking"
                          onClick={onOpenBooking}
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                            <line x1="16" y1="2" x2="16" y2="6" />
                            <line x1="8" y1="2" x2="8" y2="6" />
                            <line x1="3" y1="10" x2="21" y2="10" />
                          </svg>
                          <span>{t.bookingNow}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="btn-nex-prev d-none-mobile">
          <div className="swiper-button-next next-home1" onClick={nextSlide} />
          <div className="swiper-button-prev prev-home1" onClick={prevSlide} />
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
