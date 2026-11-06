import React, { useState } from 'react';

const Activities = ({ language = 'es', onOpenBooking }) => {
  const [activeTab, setActiveTab] = useState('navegacion');
  const isEs = language === 'es';

  const tabsData = [
    {
      id: 'navegacion',
      iconClass: 'icon-Group-22',
      tabLabel: isEs ? 'Navegación Lacustre' : 'Lake Sailing',
      subtitle: isEs ? 'Austral Patagonia Naviera • Puerto Montt' : 'Austral Patagonia Naviera • Puerto Montt',
      title: isEs
        ? 'Navega por el Lago Todos los Santos hacia Villa Peulla'
        : 'Sail Across Todos los Santos Lake to Villa Peulla',
      feat1: isEs ? 'Catamaranes panorámicos modernos' : 'Modern panoramic catamarans',
      feat2: isEs ? 'Vistas al Volcán Osorno y Puntiagudo' : 'Views of Osorno & Puntiagudo Volcanoes',
      btnText: isEs ? 'Reservar Navegación' : 'Book Sailing',
      image: '/assets/images/tours/navegacion-peulla.jpg',
    },
    {
      id: 'volcanes',
      iconClass: 'icon-Group-31',
      tabLabel: isEs ? 'Volcanes y Saltos' : 'Volcanoes & Falls',
      subtitle: isEs ? 'Parque Nacional Vicente Pérez Rosales' : 'Vicente Pérez Rosales National Park',
      title: isEs
        ? 'Ascenso al Volcán Osorno y Saltos del Petrohué'
        : 'Osorno Volcano Ascent & Petrohué Waterfalls',
      feat1: isEs ? 'Guías certificados en alta montaña' : 'Certified mountain guides',
      feat2: isEs ? 'Senderos sobre roca volcánica y glaciares' : 'Trails over volcanic rock & glaciers',
      btnText: isEs ? 'Explorar Excursión' : 'Explore Excursion',
      image: '/assets/images/tours/volcan-osorno-petrohue.jpg',
    },
    {
      id: 'termas',
      iconClass: 'icon-fishing-1',
      tabLabel: isEs ? 'Termas y Relax' : 'Hot Springs & Relax',
      subtitle: isEs ? 'Puelo y Estuario de Reloncaví' : 'Puelo & Reloncaví Estuary',
      title: isEs
        ? 'Termas del Sol: 10 Piscinas Termales en la Patagonia'
        : 'Termas del Sol: 10 Thermal Pools in Patagonia',
      feat1: isEs ? 'Aguas termales ricas en minerales' : 'Mineral-rich thermal waters',
      feat2: isEs ? 'Traslado directo desde Puerto Montt' : 'Direct transfer from Puerto Montt',
      btnText: isEs ? 'Reservar Termas' : 'Book Hot Springs',
      image: '/assets/images/tours/termas-del-sol.jpg',
    },
    {
      id: 'chiloe',
      iconClass: 'icon-Group-4',
      tabLabel: isEs ? 'Isla de Chiloé' : 'Chiloé Island',
      subtitle: isEs ? 'Patrimonio de la Humanidad UNESCO' : 'UNESCO World Heritage',
      title: isEs
        ? 'Magia de Chiloé: Castro, Dalcahue, Palafitos e Iglesias'
        : 'Chiloé Magic: Castro, Dalcahue, Palafitos & Churches',
      feat1: isEs ? 'Cruce en ferry por el Canal de Chacao' : 'Ferry crossing through Chacao Channel',
      feat2: isEs ? 'Gastronomía típica y cultura chilota' : 'Traditional cuisine & Chilote culture',
      btnText: isEs ? 'Reservar Tour Chiloé' : 'Book Chiloé Tour',
      image: '/assets/images/tours/chiloe-castro-dalcahue.jpg',
    },
    {
      id: 'cruce',
      iconClass: 'icon-Group-22',
      tabLabel: isEs ? 'Cruce Andino' : 'Andean Crossing',
      subtitle: isEs ? 'Ruta Internacional Chile - Argentina' : 'Chile - Argentina International Route',
      title: isEs
        ? 'Cruce Andino desde Puerto Varas hasta San Carlos de Bariloche'
        : 'Andean Crossing from Puerto Varas to Bariloche',
      feat1: isEs ? '3 navegaciones y buses panorámicos' : '3 lake sailings & panoramic buses',
      feat2: isEs ? 'Travesía histórica por la Cordillera' : 'Historic journey across the Andes',
      btnText: isEs ? 'Reservar Cruce Andino' : 'Book Andean Crossing',
      image: '/assets/images/tours/cruce-andino.jpg',
    },
  ];

  const currentItem = tabsData.find((t) => t.id === activeTab) || tabsData[0];

  return (
    <section className="relative tf-widget-activities pd-main overflow-hidden">
      <img alt="mask" className="mask-top" src="/assets/images/page/mask-activiti.png" />
      <img alt="mask" className="mask-bottom" src="/assets/images/page/mask-print-2.png" />
      <div className="tf-container">
        <div className="row z-index3 relative">
          <div className="col-lg-12 mb-60">
            <div className="clip-text">
              {isEs ? 'Experiencias' : 'Experiences'}
            </div>
          </div>
          <div className="col-lg-12">
            <ul className="nav nav-tabs-activities justify-content-center" id="myTablist" role="tablist">
              {tabsData.map((tab) => (
                <li className="nav-item" key={tab.id}>
                  <button
                    type="button"
                    className={`nav-link ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <span className="icon flex-five">
                      <i className={tab.iconClass}></i>
                    </span>
                    <span>{tab.tabLabel}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="tab-content mt-44" id="myTabContents">
              <div className="tab-pane fade show active" role="tabpanel">
                <div className="tabs-activities-content flex">
                  <div className="activities-image">
                    <img
                      alt={currentItem.title}
                      src={currentItem.image}
                      style={{ width: '100%', height: '100%', minHeight: '360px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="activities-content relative">
                    <span className="sub-title text-white">{currentItem.subtitle}</span>
                    <h3 className="title-activitis text-white mb-40">{currentItem.title}</h3>
                    <div className="flex-three mb-30" style={{ flexWrap: 'wrap', gap: '16px' }}>
                      <div className="flex-three text-white icon-list-wrap">
                        <div className="icon">
                          <i className="icon-Page-1"></i>
                        </div>
                        <span className="icon-lists">{currentItem.feat1}</span>
                      </div>
                      <div className="flex-three text-white icon-list-wrap">
                        <div className="icon">
                          <i className="icon-rubber-ring-1"></i>
                        </div>
                        <span className="icon-lists">{currentItem.feat2}</span>
                      </div>
                    </div>
                    <div className="flex-three btn-wrap-activitis">
                      <a
                        className="icon-activitis flex-five"
                        href="#tours"
                        onClick={(e) => {
                          if (onOpenBooking) {
                            e.preventDefault();
                            onOpenBooking();
                          }
                        }}
                      >
                        <i className="icon-Vector-21"></i>
                      </a>
                      <a
                        className="text-white get-start"
                        href="#tours"
                        onClick={(e) => {
                          if (onOpenBooking) {
                            e.preventDefault();
                            onOpenBooking();
                          }
                        }}
                      >
                        {currentItem.btnText}
                      </a>
                    </div>
                    <img alt="mask" className="mask-tab" src="/assets/images/page/mask-tap.png" />
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

export default Activities;
