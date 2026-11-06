import React, { useState } from 'react';
import { translations } from '../data/translations';

const SearchFilterBar = ({ language = 'es' }) => {
  const [filterOpen, setFilterOpen] = useState(false);
  const t = translations[language]?.search || translations.es.search;

  return (
    <>
      <div className="search-widget-wrapper z-index4 relative">
        <div className="tf-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="search-form-widget-slider relative">
                <form action="#tours" id="search-form-slider" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex wd-search">
                    <div className="form-group flex">
                      <i className="icon-18" style={{ color: '#0001e2', fontSize: '20px' }}></i>
                      <div className="search-bar-group">
                        <label>{t.destination}</label>
                        <select
                          className="nice-select"
                          tabIndex="0"
                          defaultValue="puerto-montt"
                        >
                          <option value="puerto-montt">Puerto Montt &amp; Seno Reloncaví</option>
                          <option value="puerto-varas">Puerto Varas &amp; Lago Llanquihue</option>
                          <option value="peulla">Villa Peulla &amp; Todos los Santos</option>
                          <option value="volcan-osorno">Volcán Osorno &amp; Petrohué</option>
                          <option value="chiloe">Isla de Chiloé (Castro / Ancud)</option>
                          <option value="termas">Termas del Sol &amp; Cochamó</option>
                          <option value="frutillar">Frutillar &amp; Teatro del Lago</option>
                          <option value="cruce">Cruce Andino a Bariloche</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group flex">
                      <i className="icon-hiking-1-1" style={{ color: '#0001e2', fontSize: '20px' }}></i>
                      <div className="search-bar-group">
                        <label>{t.type}</label>
                        <select
                          className="nice-select"
                          tabIndex="0"
                          defaultValue="todos"
                        >
                          <option value="todos">{t.typeDefault}</option>
                          <option value="navegacion">Navegación Lacustre &amp; Marítima</option>
                          <option value="aventura">Aventura y Volcanes</option>
                          <option value="termas">Termas y Bienestar</option>
                          <option value="cultura">Patrimonio y Tradición Chiloé</option>
                          <option value="transfers">Transfers Oficiales Aeropuerto</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group flex">
                      <i className="icon-time-left" style={{ color: '#0001e2', fontSize: '20px' }}></i>
                      <div className="search-bar-group">
                        <label>{t.duration}</label>
                        <select
                          className="nice-select"
                          tabIndex="0"
                          defaultValue="cualquiera"
                        >
                          <option value="cualquiera">{t.durationDefault}</option>
                          <option value="medio-dia">Medio Día (4 - 5 hrs)</option>
                          <option value="full-day">Full Day (7 - 10 hrs)</option>
                          <option value="cruce">Cruce Andino (12 hrs)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group flex">
                      <i className="icon-user" style={{ color: '#0001e2', fontSize: '20px' }}></i>
                      <div className="search-bar-group">
                        <label>{t.guests}</label>
                        <select
                          className="nice-select"
                          tabIndex="0"
                          defaultValue="2"
                        >
                          <option value="1">1 Pasajero</option>
                          <option value="2">2 Pasajeros</option>
                          <option value="3">3 - 5 Pasajeros</option>
                          <option value="6">Grupo (6+)</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group flex-two">
                      <div
                        className="icon-icon-filter"
                        style={{ cursor: 'pointer', color: '#0001e2' }}
                        onClick={() => setFilterOpen(!filterOpen)}
                        title="Filtros"
                      >
                        <i className="icon-14"></i>
                      </div>

                      <a
                        className="btn-search"
                        href="#tours"
                        style={{
                          backgroundColor: '#0001e2',
                          borderColor: '#0001e2',
                        }}
                      >
                        <i className="icon-Vector5"></i> {t.searchBtn}
                      </a>
                    </div>
                  </div>

                  <div className={`wd-search-form ${filterOpen ? 'show' : ''}`} style={{ marginTop: '14px' }}>
                    <div className="input-group-grid">
                      <fieldset className="group-select relative">
                        <label>{t.filterPrice}</label>
                        <div className="widget widget-price">
                          <div className="group-form">
                            <div className="group-range-title mt-2">
                              <label className="d-flex justify-content-between mb-0">
                                <span>Desde $14.000 CLP</span>
                                <span>Hasta $276.000 CLP</span>
                              </label>
                            </div>
                          </div>
                        </div>
                      </fieldset>

                      <fieldset className="group-select relative input-npd">
                        <div className="search-bar-group relative">
                          <label>{t.guideLang}</label>
                          <select className="nice-select" tabIndex="0" defaultValue="es">
                            <option value="es">{t.bilingual}</option>
                            <option value="de">Deutsch / Alemán</option>
                            <option value="pt">Português</option>
                          </select>
                        </div>
                      </fieldset>

                      <fieldset className="group-select relative input-npd">
                        <div className="search-bar-group relative">
                          <label>{t.season}</label>
                          <select className="nice-select" tabIndex="0" defaultValue="todo-el-ano">
                            <option value="todo-el-ano">{t.allYear}</option>
                            <option value="verano">Verano (Dic - Mar)</option>
                            <option value="nieve">Otoño / Invierno (Nieve)</option>
                          </select>
                        </div>
                      </fieldset>

                      <div className="group-check-box-wrap">
                        <div className="checkbox">
                          <input id="check4" name="check" type="checkbox" defaultChecked />
                          <label htmlFor="check4">Webpay / Tarjetas</label>
                        </div>
                        <div className="checkbox">
                          <input id="check5" name="check" type="checkbox" defaultChecked />
                          <label htmlFor="check5">{t.hotelPickup}</label>
                        </div>
                      </div>

                      <div className="group-check-box-wrap">
                        <div className="checkbox">
                          <input id="check6" name="check" type="checkbox" defaultChecked />
                          <label htmlFor="check6">{t.certifiedGuide}</label>
                        </div>
                        <div className="checkbox">
                          <input id="check7" name="check" type="checkbox" defaultChecked />
                          <label htmlFor="check7">Seguro en Navegación</label>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilterBar;
