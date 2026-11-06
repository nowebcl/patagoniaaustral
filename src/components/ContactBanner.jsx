import React from 'react';

const ContactBanner = ({ onOpenVideo, language = 'es' }) => {
  const isEs = language === 'es';

  return (
    <section className="widget-banner-contact relative">
      <div className="tf-container">
        <div className="row z-index3 relative">
          <div className="col-lg-7 content-banner-contact">
            <div className="mb-32">
              <span
                className="sub-title-heading text-main mb-15 font-yes fs-28-46 wow fadeInUp animated"
                style={{ color: '#38bdf8' }}
              >
                {isEs ? 'Explora la Patagonia' : 'Explore Patagonia'}
              </span>
              <h2 className="title-heading text-white wow fadeInUp animated">
                {isEs
                  ? '¿Listo para vivir una aventura real y navegar por la naturaleza austral?'
                  : 'Ready to experience real adventure & sail through southern nature?'}
              </h2>
            </div>
            <div className="flex-three">
              <div className="video-wrap wow fadeInUp animated">
                <a
                  className="widget-icon-video flex-five widget-videos"
                  href="#video"
                  onClick={(e) => {
                    e.preventDefault();
                    if (onOpenVideo) onOpenVideo('https://www.youtube.com/embed/ScMzIvxBSi4');
                  }}
                  style={{ backgroundColor: '#0001e2', cursor: 'pointer' }}
                >
                  <i className="icon-Polygon-4"></i>
                </a>
              </div>
              <address className="wow fadeInUp animated" style={{ color: '#ffffff' }}>
                {isEs ? 'Contáctanos en ' : 'Contact us at '}
                <a href="mailto:contacto@australpatagonia.cl" style={{ color: '#38bdf8', textDecoration: 'underline' }}>
                  contacto@australpatagonia.cl
                </a>
                <br />
                <span>Puerto Montt • Región de Los Lagos, Chile</span>
              </address>
            </div>
            <img alt="mask" className="mask-icon-banner" src="/assets/images/page/vector2.png" />
          </div>
          <div className="col-lg-5">
            <div className="image-banner-contact">
              <img alt="Austral Patagonia" src="/assets/images/page/ewewe1.png" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactBanner;
