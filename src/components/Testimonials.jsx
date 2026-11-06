import React, { useState } from 'react';

const Testimonials = ({ language = 'es' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isEs = language === 'es';

  const reviews = [
    {
      name: 'Camila Valdés',
      role: isEs ? 'Viajera de Santiago, Chile' : 'Traveler from Santiago, Chile',
      text: isEs
        ? 'Una experiencia inolvidable navegando por el Lago Todos los Santos hacia Villa Peulla con Austral Patagonia Naviera. La puntualidad desde Puerto Montt, el catamarán y los guías fueron de primer nivel.'
        : 'An unforgettable experience sailing across Todos los Santos Lake to Villa Peulla with Austral Patagonia Naviera. Punctuality from Puerto Montt and the guides were top notch.',
      avatar: '/assets/images/avata/9.jpg',
    },
    {
      name: 'Martín Echeverría',
      role: isEs ? 'Turista de Buenos Aires' : 'Tourist from Buenos Aires',
      text: isEs
        ? 'Realizamos el Cruce Andino y la excursión al Volcán Osorno y Saltos del Petrohué. Los paisajes son sobrecogedores y la organización de la agencia hizo que todo fuera súper cómodo y seguro.'
        : 'We did the Andean Crossing and the Osorno Volcano & Petrohué Falls tour. Breathtaking landscapes and seamless organization.',
      avatar: '/assets/images/avata/7.jpg',
    },
    {
      name: 'Sofía & Diego',
      role: isEs ? 'Viajeros en familia' : 'Family Travelers',
      text: isEs
        ? 'El tour a Chiloé y las Termas del Sol superaron todas nuestras expectativas. Excelente atención desde que reservamos en la web hasta el regreso a nuestro hotel en Puerto Varas.'
        : 'The Chiloé tour and Termas del Sol exceeded all our expectations. Excellent service from booking online to returning to our hotel.',
      avatar: '/assets/images/avata/8.jpg',
    },
  ];

  const current = reviews[activeIndex];

  return (
    <section className="widget-testimonial-style01">
      <div className="tf-container">
        <div className="row">
          <div className="col-md-5 relative">
            <div className="image-box-tesimonial box-testimonial1 wow fadeInLeft animated" data-wow-delay="0.1s">
              <img alt="Testimonio Patagonia" src="/assets/images/page/testimonial1.jpg" />
            </div>
            <div className="image-box-tesimonial box-testimonial2 wow fadeInUp animated" data-wow-delay="0.3s">
              <img alt="Viajeros Austral Patagonia" src="/assets/images/page/testimonial2.jpg" />
            </div>
          </div>
          <div className="col-md-7">
            <div className="widget-testimonial overflow-hidden">
              <div className="swiper mySwiper2">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="testimonial-content relative">
                      <div className="profile mb-15">
                        <h3 className="name">{current.name}</h3>
                        <span className="job" style={{ color: '#0001e2', fontWeight: '600' }}>
                          {current.role}
                        </span>
                      </div>
                      <p className="tes">{current.text}</p>
                      <span className="line"></span>
                      <div className="icon-tes flex-five" style={{ backgroundColor: '#0001e2', color: '#fff' }}>
                        <i className="icon-Group-1000002944"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="swiper testimonial-image" style={{ marginTop: '20px' }}>
                <div className="swiper-wrapper" style={{ display: 'flex', gap: '14px' }}>
                  {reviews.map((rev, idx) => (
                    <div
                      key={idx}
                      className="swiper-slide avata"
                      onClick={() => setActiveIndex(idx)}
                      style={{
                        cursor: 'pointer',
                        width: 'auto',
                        opacity: activeIndex === idx ? 1 : 0.5,
                        transform: activeIndex === idx ? 'scale(1.08)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <img
                        alt={rev.name}
                        src={rev.avatar}
                        style={{
                          borderRadius: '50%',
                          border: activeIndex === idx ? '3px solid #0001e2' : '2px solid transparent',
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
