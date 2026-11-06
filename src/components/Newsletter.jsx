import React from 'react';

const Newsletter = ({ language = 'es', onOpenBooking }) => {
  const isEs = language === 'es';

  return (
    <section className="mb--93">
      <div className="tf-container">
        <div className="callt-to-action flex-two" style={{ backgroundColor: '#0001e2' }}>
          <div className="callt-to-action-content flex-three">
            <div className="image">
              <img alt="Austral Patagonia" src="/assets/images/page/ready.png" />
            </div>
            <div className="content">
              <h2 className="title-call" style={{ color: '#ffffff' }}>
                {isEs
                  ? '¿Listo para zarpar hacia la aventura patagónica?'
                  : 'Ready to set sail for your Patagonian adventure?'}
              </h2>
              <p className="des" style={{ color: 'rgba(255,255,255,0.9)' }}>
                {isEs
                  ? 'Reserva hoy tus excursiones y navegaciones desde Puerto Montt y Puerto Varas con confirmación inmediata.'
                  : 'Book your excursions and sailings from Puerto Montt and Puerto Varas today with instant confirmation.'}
              </p>
            </div>
          </div>
          <img alt="" className="shape-ab" src="/assets/images/page/vector4.png" />
          <div className="callt-to-action-button">
            <button
              type="button"
              className="get-call"
              onClick={() => onOpenBooking && onOpenBooking()}
              style={{
                border: 'none',
                cursor: 'pointer',
                fontWeight: '800',
              }}
            >
              {isEs ? 'Reservar Ahora' : 'Book Now'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
