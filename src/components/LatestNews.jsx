import React from 'react';

const LatestNews = ({ language = 'es', onOpenBooking }) => {
  const isEs = language === 'es';

  const articles = [
    {
      id: 1,
      image: '/assets/images/tours/navegacion-peulla.jpg',
      category: isEs ? 'Navegación' : 'Sailing',
      date: isEs ? '15 Oct 2026' : 'Oct 15, 2026',
      comments: isEs ? 'Comentarios (12)' : 'Comments (12)',
      title: isEs
        ? 'Guía completa para navegar el Lago Todos los Santos y visitar Peulla'
        : 'Complete guide to sailing Todos los Santos Lake & visiting Peulla',
      desc: isEs
        ? 'Descubre qué llevar, los mejores miradores del Volcán Osorno y cómo aprovechar al máximo tu zarpe desde Petrohué.'
        : 'Discover what to pack, the best viewpoints of Osorno Volcano and how to make the most of your sailing.',
    },
    {
      id: 2,
      image: '/assets/images/tours/chiloe-castro-dalcahue.jpg',
      category: isEs ? 'Cultura y Rutas' : 'Culture & Routes',
      date: isEs ? '24 Oct 2026' : 'Oct 24, 2026',
      comments: isEs ? 'Comentarios (08)' : 'Comments (08)',
      title: isEs
        ? 'Los 5 lugares imperdibles en tu excursión a la Isla Grande de Chiloé'
        : 'Top 5 must-see places on your excursion to Chiloé Island',
      desc: isEs
        ? 'Desde los tradicionales palafitos de Castro hasta el mercado artesanal de Dalcahue y sus iglesias patrimoniales.'
        : 'From the traditional palafitos of Castro to the artisan market of Dalcahue and its heritage churches.',
    },
    {
      id: 3,
      image: '/assets/images/tours/termas-del-sol.jpg',
      category: isEs ? 'Bienestar Austral' : 'Southern Wellness',
      date: isEs ? '02 Nov 2026' : 'Nov 02, 2026',
      comments: isEs ? 'Comentarios (15)' : 'Comments (15)',
      title: isEs
        ? 'Termas del Sol y Cochamó: desconexión total saliendo desde Puerto Montt'
        : 'Termas del Sol & Cochamó: total relaxation departing from Puerto Montt',
      desc: isEs
        ? 'Relájate en 10 piscinas termales rodeadas de bosque nativo patagónico y vistas al estuario de Reloncaví.'
        : 'Relax in 10 thermal pools surrounded by native Patagonian forest and views of the Reloncaví estuary.',
    },
  ];

  return (
    <section className="pd-main">
      <div className="tf-container">
        <div className="row">
          <div className="col-lg-12">
            <div className="center m0-auto w-text-heading">
              <span className="sub-title-heading text-main mb-15 wow fadeInUp animated" style={{ color: '#0001e2' }}>
                {isEs ? 'Blog y Consejos de Viaje' : 'Travel Blog & Tips'}
              </span>
              <h2 className="title-heading mb-40 wow fadeInUp animated">
                {isEs ? 'Últimas noticias y guías ' : 'Latest news & guides '}
                <span className="text-gray font-yes" style={{ color: '#0001e2' }}>
                  {isEs ? 'de la Patagonia' : 'from Patagonia'}
                </span>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          {articles.map((art, idx) => (
            <div className="col-md-4 wow fadeInUp animated" data-wow-delay={`0.${idx + 1}s`} key={art.id}>
              <div className="tf-widget-blog blog-style">
                <a
                  className="blog-image"
                  href="#tours"
                  onClick={(e) => {
                    if (onOpenBooking) {
                      e.preventDefault();
                      onOpenBooking();
                    }
                  }}
                >
                  <img
                    alt={art.title}
                    src={art.image}
                    style={{ width: '100%', height: '240px', objectFit: 'cover', borderRadius: '10px' }}
                  />
                  <div className="category-blog" style={{ backgroundColor: '#0001e2' }}>
                    <i className="icon-Group-8"></i>
                    <span>{art.category}</span>
                  </div>
                </a>
                <div className="blog-content">
                  <ul className="meta-list flex-three">
                    <li>
                      <i className="icon-4" style={{ color: '#0001e2' }}></i>
                      <a href="#tours">
                        <span>{art.date}</span>
                      </a>
                    </li>
                    <li>
                      <i className="icon-7" style={{ color: '#0001e2' }}></i>
                      <a href="#tours">
                        <span>{art.comments}</span>
                      </a>
                    </li>
                  </ul>
                  <h3 className="entry-title">
                    <a
                      href="#tours"
                      onClick={(e) => {
                        if (onOpenBooking) {
                          e.preventDefault();
                          onOpenBooking();
                        }
                      }}
                    >
                      {art.title}
                    </a>
                  </h3>
                  <p className="des">{art.desc}</p>
                  <a
                    className="btn-read-more"
                    href="#tours"
                    style={{ color: '#0001e2', fontWeight: '700' }}
                    onClick={(e) => {
                      if (onOpenBooking) {
                        e.preventDefault();
                        onOpenBooking();
                      }
                    }}
                  >
                    {isEs ? 'Ver Excursión ' : 'View Excursion '}
                    <i className="icon-Vector-4"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
