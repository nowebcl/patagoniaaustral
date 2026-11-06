import React, { useState, useEffect } from 'react';
import { toursData } from '../data/toursData';
import { translations } from '../data/translations';

const BookingModal = ({ isOpen, onClose, selectedTour, language = 'es' }) => {
  const t = translations[language].bookingModal;

  const [tourId, setTourId] = useState(selectedTour?.id || 1);
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [hotel, setHotel] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (selectedTour) {
      setTourId(selectedTour.id);
    }
  }, [selectedTour]);

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (!date) setDate(minDate);
  }, []);

  if (!isOpen) return null;

  const currentTour = toursData.find((item) => item.id === Number(tourId)) || toursData[0];

  // Calculate price estimate
  const numericPriceClp = parseInt((currentTour.price_clp || '$0').replace(/\D/g, ''), 10) || 0;
  const numericPriceUsd = parseInt((currentTour.price_usd || '$0').replace(/\D/g, ''), 10) || 0;
  const totalClp = (numericPriceClp * adults + numericPriceClp * 0.7 * children).toLocaleString('es-CL');
  const totalUsd = Math.round(numericPriceUsd * adults + numericPriceUsd * 0.7 * children);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hola Austral Patagonia Naviera! Quisiera reservar la siguiente excursión desde Puerto Montt:
- Tour: ${currentTour.title}
- Fecha: ${date}
- Pasajeros: ${adults} adultos${children > 0 ? `, ${children} niños` : ''}
- A nombre de: ${fullName || 'Viajero'}
- Hotel: ${hotel || 'Por coordinar'}
- Teléfono: ${phone || 'No indicado'}`;
    const url = `https://wa.me/56988880676?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setIsSubmitted(true);
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(8, 30, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        zIndex: 999999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '16px',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          maxWidth: '560px',
          width: '100%',
          maxHeight: '92vh',
          overflowY: 'auto',
          boxShadow: '0 25px 50px -12px rgba(0, 1, 226, 0.25)',
          padding: '28px 32px',
          position: 'relative',
          border: '1px solid #e0e7ff',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: '#f1f5f9',
            border: 'none',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#475569',
            transition: 'background 0.2s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e2e8f0')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f1f5f9')}
        >
          ✕
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div style={{ textAlign: 'center', marginBottom: '22px' }}>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: 'rgba(0, 1, 226, 0.08)',
                  color: '#0001e2',
                  fontSize: '12px',
                  fontWeight: '700',
                  padding: '4px 12px',
                  borderRadius: '20px',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                  marginBottom: '8px',
                }}
              >
                {t.subtitle}
              </span>
              <h3
                style={{
                  fontSize: '22px',
                  fontWeight: '800',
                  color: '#081e2a',
                  margin: 0,
                  lineHeight: '1.25',
                }}
              >
                {t.title}
              </h3>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Tour Selection */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  {t.selectTour}
                </label>
                <select
                  value={tourId}
                  onChange={(e) => setTourId(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#081e2a',
                    fontWeight: '600',
                    backgroundColor: '#f8fafc',
                  }}
                >
                  {toursData.map((tour) => (
                    <option key={tour.id} value={tour.id}>
                      {tour.title} — {tour.price_clp} ({tour.price_usd} USD)
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Passengers Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '16px',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    {t.tourDate}
                  </label>
                  <input
                    type="date"
                    min={minDate}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      color: '#081e2a',
                      backgroundColor: '#f8fafc',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    {t.passengers}
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      color: '#081e2a',
                      backgroundColor: '#f8fafc',
                    }}
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Adulto' : 'Adultos'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Personal Details */}
              <div style={{ marginBottom: '14px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  {t.fullName}
                </label>
                <input
                  type="text"
                  placeholder="Ej: Marcelo González"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#081e2a',
                    backgroundColor: '#f8fafc',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '14px',
                }}
              >
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    {t.email}
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      color: '#081e2a',
                      backgroundColor: '#f8fafc',
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: '700',
                      color: '#1e293b',
                      marginBottom: '6px',
                    }}
                  >
                    {t.phone}
                  </label>
                  <input
                    type="tel"
                    placeholder="+56 9 1234 5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      color: '#081e2a',
                      backgroundColor: '#f8fafc',
                    }}
                  />
                </div>
              </div>

              {/* Hotel / Pickup */}
              <div style={{ marginBottom: '16px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#1e293b',
                    marginBottom: '6px',
                  }}
                >
                  {t.hotel}
                </label>
                <input
                  type="text"
                  placeholder="Ej: Hotel Diego de Almagro, Puerto Montt"
                  value={hotel}
                  onChange={(e) => setHotel(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '14px',
                    color: '#081e2a',
                    backgroundColor: '#f8fafc',
                  }}
                />
              </div>

              {/* Price Calculation Box */}
              <div
                style={{
                  backgroundColor: '#f0f5ff',
                  border: '1.5px solid #c7d7fe',
                  borderRadius: '10px',
                  padding: '12px 18px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '18px',
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', color: '#475569', display: 'block' }}>
                    {t.estimatedTotal}
                  </span>
                  <strong style={{ fontSize: '20px', color: '#0001e2', fontWeight: '800' }}>
                    ${totalClp} CLP
                  </strong>
                  <span style={{ fontSize: '13px', color: '#64748b', marginLeft: '6px' }}>
                    (${totalUsd} USD)
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748b', textAlign: 'right' }}>
                  <span>{adults} {adults === 1 ? 'pasajero' : 'pasajeros'}</span>
                  <br />
                  <span style={{ color: '#0001e2', fontWeight: '600' }}>Confirmación Inmediata</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    backgroundColor: '#0001e2',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '8px',
                    fontSize: '15px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0001b5')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0001e2')}
                >
                  {t.submitBtn}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  style={{
                    width: '100%',
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    padding: '12px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#20ba59')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
                >
                  <i className="icon-Vector5" style={{ display: 'none' }}></i>
                  💬 {t.whatsappBtn}
                </button>
              </div>

              <p
                style={{
                  fontSize: '11px',
                  color: '#94a3b8',
                  textAlign: 'center',
                  marginTop: '12px',
                  marginBottom: 0,
                }}
              >
                🔒 {t.secureNote}
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation Success Screen */
          <div style={{ textAlign: 'center', padding: '20px 10px' }}>
            <div
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 1, 226, 0.1)',
                color: '#0001e2',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '32px',
                margin: '0 auto 16px',
              }}
            >
              ✓
            </div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#081e2a', marginBottom: '8px' }}>
              {t.successTitle}
            </h3>
            <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', marginBottom: '20px' }}>
              {t.successMsg}
            </p>

            <div
              style={{
                backgroundColor: '#f8fafc',
                borderRadius: '10px',
                padding: '16px',
                textAlign: 'left',
                marginBottom: '22px',
                fontSize: '13px',
                color: '#334155',
                border: '1px solid #e2e8f0',
              }}
            >
              <p style={{ margin: '0 0 6px' }}><strong>Excursión:</strong> {currentTour.title}</p>
              <p style={{ margin: '0 0 6px' }}><strong>Fecha:</strong> {date}</p>
              <p style={{ margin: '0 0 6px' }}><strong>Pasajeros:</strong> {adults} adultos</p>
              <p style={{ margin: '0 0 6px' }}><strong>Titular:</strong> {fullName || 'Viajero'}</p>
              <p style={{ margin: 0 }}><strong>Total Estimado:</strong> ${totalClp} CLP (${totalUsd} USD)</p>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  flex: 1,
                  backgroundColor: '#0001e2',
                  color: '#fff',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                {t.closeBtn}
              </button>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                style={{
                  flex: 1,
                  backgroundColor: '#f1f5f9',
                  color: '#334155',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
              >
                {t.newBooking}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
