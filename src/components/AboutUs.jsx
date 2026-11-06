import React from 'react';
import { translations } from '../data/translations';

const AboutUs = ({ onOpenVideo, language = 'es' }) => {
  const t = translations[language] || translations.es;

  return (
    <>
      <section className="about-us pb-150" id="nosotros">
        <div className="tf-container">
          <div className="row pt-35">
            <div className="col-lg-12 flex">
              <div className="image-list flex-three">
                <img alt="Viajero" className="item" src="/assets/images/avata/6.jpg" />
                <img alt="Viajero" className="item" src="/assets/images/avata/5.jpg" />
                <img alt="Viajero" className="item" src="/assets/images/avata/4.jpg" />
                <img alt="Viajero" className="item" src="/assets/images/avata/3.jpg" />
                <img alt="Viajero" className="item" src="/assets/images/avata/1.jpg" />
                <img alt="Viajero" className="item" src="/assets/images/avata/2.jpg" />
                <div
                  className="icon text-white item flex-five"
                  style={{ backgroundColor: '#0001e2' }}
                >
                  <i className="icon-uniE914"></i>
                </div>
              </div>
              <p className="client fadeInUp wow">{t.about.clientStats}</p>
            </div>
          </div>

          <div className="row pt-115 align-center">
            <div className="col-lg-6">
              <div className="travel-video relative">
                <img
                  alt="Austral Patagonia Naviera"
                  className="image-video"
                  src="/assets/images/about-us/image-video.png"
                  style={{ borderRadius: '16px', objectFit: 'cover' }}
                />
                <div className="video-wrap">
                  <a
                    className="widget-icon-video widget-videos flex-five z-index3"
                    href="#video"
                    onClick={(e) => {
                      e.preventDefault();
                      onOpenVideo && onOpenVideo('https://www.youtube.com/embed/ScMzIvxBSi4');
                    }}
                    style={{ backgroundColor: '#0001e2' }}
                  >
                    <i className="icon-Polygon-4"></i>
                  </a>
                </div>
                <img alt="" className="mask-video tf-anime-rorate" src="/assets/images/about-us/vali.png" />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="inner-content-about">
                <span
                  className="sub-title-heading text-main mb-15 fadeInUp wow"
                  style={{ color: '#0001e2' }}
                >
                  {t.about.badge}
                </span>
                <h2 className="title-heading mb-18 fadeInUp wow">
                  {t.about.title}
                </h2>
                <p className="des-heading fadeInUp wow" style={{ lineHeight: '1.7', color: '#475569' }}>
                  {t.about.description}
                </p>

                <div className="row mt-27 fadeInUp wow">
                  <div className="col-sm-6">
                    <div className="icon-box-style3" style={{ padding: '16px', borderRadius: '10px', background: '#f8fafc' }}>
                      <div className="icon flex-three" style={{ color: '#0001e2', marginBottom: '12px' }}>
                        <i className="icon-Vector-151" style={{ fontSize: '32px' }}></i>
                      </div>
                      <h6 className="title mb-10" style={{ fontWeight: '700' }}>
                        {t.about.guideTitle}
                      </h6>
                      <p className="des" style={{ fontSize: '13px', color: '#64748b' }}>
                        {t.about.guideDesc}
                      </p>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="icon-box-style3" style={{ padding: '16px', borderRadius: '10px', background: '#f8fafc' }}>
                      <div className="icon flex-three" style={{ color: '#0001e2', marginBottom: '12px' }}>
                        <i className="icon-19" style={{ fontSize: '32px' }}></i>
                      </div>
                      <h6 className="title mb-10" style={{ fontWeight: '700' }}>
                        {t.about.customTitle}
                      </h6>
                      <p className="des" style={{ fontSize: '13px', color: '#64748b' }}>
                        {t.about.customDesc}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-three btn-wrap-about mb-30 fadeInUp wow" style={{ marginTop: '24px' }}>
                  <a
                    className="btn-main"
                    href="#tours"
                    style={{ backgroundColor: '#0001e2', borderColor: '#0001e2' }}
                  >
                    <p className="btn-main-text">{t.about.moreBtn}</p>
                    <p className="iconer">
                      <i className="icon-arrow-right"></i>
                    </p>
                  </a>
                  <div className="profile flex-three" style={{ marginLeft: '24px' }}>
                    <div className="info" style={{ marginLeft: '12px' }}>
                      <h6 className="name" style={{ fontWeight: '800', color: '#081e2a' }}>
                        Austral Patagonia Naviera
                      </h6>
                      <p className="des" style={{ color: '#0001e2', fontWeight: '600', fontSize: '13px' }}>
                        Puerto Montt • Chile
                      </p>
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

export default AboutUs;
