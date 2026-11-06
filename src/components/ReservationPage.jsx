import React, { useState, useEffect } from 'react';
import { toursData } from '../data/toursData';
import { translations } from '../data/translations';
import { bookingService } from '../services/bookingService';

const ReservationPage = ({
  initialTourId = 1,
  language = 'es',
  onBackToHome,
  onNavigateToAdmin,
}) => {
  const isEs = language === 'es';
  const t = translations[language]?.bookingModal || translations.es.bookingModal;

  const [tourId, setTourId] = useState(initialTourId || 1);
  const [date, setDate] = useState('');
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [customerDoc, setCustomerDoc] = useState('');
  const [cityCountry, setCityCountry] = useState(isEs ? 'Chile' : 'International');
  const [hotel, setHotel] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('WebPay / Tarjeta');
  const [confirmedBooking, setConfirmedBooking] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Set min date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (!date) setDate(minDate);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const currentTour = toursData.find((item) => item.id === Number(tourId)) || toursData[0];

  // Price calculations
  const numericPriceClp = parseInt((currentTour.price_clp || '$0').replace(/\D/g, ''), 10) || 0;
  const numericPriceUsd = parseInt((currentTour.price_usd || '$0').replace(/\D/g, ''), 10) || 0;
  const adultsTotalClp = numericPriceClp * adults;
  const childrenTotalClp = Math.round(numericPriceClp * 0.7 * children);
  const totalClp = adultsTotalClp + childrenTotalClp;

  const adultsTotalUsd = numericPriceUsd * adults;
  const childrenTotalUsd = Math.round(numericPriceUsd * 0.7 * children);
  const totalUsd = adultsTotalUsd + childrenTotalUsd;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newBooking = bookingService.createReservation({
      customerName: fullName,
      customerEmail: email,
      customerPhone: phone,
      customerDoc,
      cityCountry,
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      tourImage: currentTour.image,
      date,
      adults,
      children,
      hotel,
      notes,
      totalClp,
      totalUsd,
      paymentMethod,
      status: paymentMethod.includes('WebPay') ? 'Confirmada' : 'Pendiente',
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setConfirmedBooking(newBooking);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 400);
  };

  const handleWhatsAppBooking = () => {
    const msg = `Hola Austral Patagonia Naviera! Deseo solicitar reserva para la siguiente excursión:
- Tour: ${currentTour.title}
- Fecha: ${date}
- Pasajeros: ${adults} adultos${children > 0 ? `, ${children} niños` : ''}
- Nombre Titular: ${fullName || 'Viajero'}
- RUT / Pasaporte: ${customerDoc || 'A indicar'}
- Hotel / Pickup: ${hotel || 'Puerto Montt / Puerto Varas'}
- Teléfono: ${phone || 'A indicar'}
- Total Estimado: $${totalClp.toLocaleString('es-CL')} CLP ($${totalUsd} USD)`;

    const url = `https://wa.me/56988880676?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');

    bookingService.createReservation({
      customerName: fullName || 'Reserva WhatsApp',
      customerEmail: email || 'whatsapp@contacto.cl',
      customerPhone: phone,
      customerDoc,
      cityCountry,
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      tourImage: currentTour.image,
      date,
      adults,
      children,
      hotel,
      notes: `Reserva iniciada vía WhatsApp. ${notes}`,
      totalClp,
      totalUsd,
      paymentMethod: 'Asistido WhatsApp',
      status: 'Pendiente',
    });
  };

  // ----------------------------------------------------
  // CONFIRMATION FULL PAGE SCREEN
  // ----------------------------------------------------
  if (confirmedBooking) {
    return (
      <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', color: '#f8fafc', paddingBottom: '80px' }}>
        {/* Top Navbar */}
        <header
          style={{
            backgroundColor: '#1e293b',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onBackToHome}
              style={{
                background: 'rgba(255,255,255,0.08)',
                color: '#fff',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '8px 16px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              ← {isEs ? 'Volver al Inicio' : 'Back to Home'}
            </button>
            <img
              src="/assets/images/austral-logo-white.png"
              alt="Austral Patagonia Naviera"
              style={{ height: '36px', width: 'auto' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {onNavigateToAdmin && (
              <button
                onClick={onNavigateToAdmin}
                style={{
                  background: '#0001e2',
                  color: '#ffffff',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                ⚙️ {isEs ? 'Ver en Panel Admin' : 'View in Admin'}
              </button>
            )}
          </div>
        </header>

        {/* Voucher Content */}
        <div style={{ maxWidth: '820px', margin: '40px auto 0', padding: '0 20px' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              color: '#0f172a',
              borderRadius: '16px',
              padding: '40px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              border: '1px solid #e2e8f0',
            }}
          >
            {/* Success Banner */}
            <div style={{ textAlign: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '24px' }}>
              <div
                style={{
                  width: '72px',
                  height: '72px',
                  borderRadius: '50%',
                  backgroundColor: '#dcfce7',
                  color: '#15803d',
                  fontSize: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  fontWeight: 'bold',
                }}
              >
                ✓
              </div>
              <span
                style={{
                  display: 'inline-block',
                  backgroundColor: '#eff6ff',
                  color: '#0001e2',
                  fontSize: '12px',
                  fontWeight: '700',
                  padding: '4px 14px',
                  borderRadius: '20px',
                  letterSpacing: '0.5px',
                  marginBottom: '8px',
                }}
              >
                {isEs ? 'RESERVA CONFIRMADA & REGISTRADA' : 'BOOKING CONFIRMED & REGISTERED'}
              </span>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#081e2a', margin: '0 0 6px' }}>
                {isEs ? '¡Tu Aventura en la Patagonia Comienza Aquí!' : 'Your Patagonia Journey Begins Here!'}
              </h2>
              <p style={{ color: '#64748b', fontSize: '14px', margin: 0 }}>
                {isEs
                  ? 'Hemos enviado el comprobante oficial a tu correo. Guarda tu código de reserva.'
                  : 'We have dispatched your confirmation voucher. Save your booking reference code.'}
              </p>
            </div>

            {/* Voucher Details Card */}
            <div
              style={{
                backgroundColor: '#f8fafc',
                border: '1.5px dashed #cbd5e1',
                borderRadius: '12px',
                padding: '24px',
                margin: '28px 0',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottom: '1px solid #e2e8f0',
                  paddingBottom: '14px',
                  marginBottom: '16px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '600' }}>
                    {isEs ? 'Código de Reserva Oficial' : 'Official Booking Code'}
                  </span>
                  <div style={{ fontSize: '24px', fontWeight: '900', color: '#0001e2', letterSpacing: '1px' }}>
                    {confirmedBooking.id}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: confirmedBooking.status === 'Confirmada' ? '#dcfce7' : '#fef9c3',
                      color: confirmedBooking.status === 'Confirmada' ? '#15803d' : '#854d0e',
                      padding: '4px 12px',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                    }}
                  >
                    ● {confirmedBooking.status}
                  </span>
                  <div style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>
                    {isEs ? 'Pago:' : 'Payment:'} {confirmedBooking.paymentStatus} ({confirmedBooking.paymentMethod})
                  </div>
                </div>
              </div>

              {/* Grid with Booking Details */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                    {isEs ? 'Excursión / Tour:' : 'Excursion / Tour:'}
                  </strong>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                    {confirmedBooking.tourTitle}
                  </span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                    {isEs ? 'Fecha de Zarpe:' : 'Sailing Date:'}
                  </strong>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                    {confirmedBooking.date}
                  </span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                    {isEs ? 'Pasajeros:' : 'Passengers:'}
                  </strong>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                    {confirmedBooking.adults} {isEs ? 'Adultos' : 'Adults'}
                    {confirmedBooking.children > 0 ? `, ${confirmedBooking.children} ${isEs ? 'Niños' : 'Children'}` : ''}
                  </span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                    {isEs ? 'Pasajero Titular:' : 'Primary Passenger:'}
                  </strong>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>
                    {confirmedBooking.customerName}
                  </span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                    {isEs ? 'Contacto Directo:' : 'Contact Phone / Email:'}
                  </strong>
                  <span style={{ fontSize: '13px', color: '#334155' }}>
                    {confirmedBooking.customerPhone} • {confirmedBooking.customerEmail}
                  </span>
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '12px', color: '#64748b' }}>
                    {isEs ? 'Punto de Recogida / Hotel:' : 'Pickup Point / Hotel:'}
                  </strong>
                  <span style={{ fontSize: '13px', color: '#334155' }}>
                    {confirmedBooking.hotel || 'Por coordinar con Austral Patagonia'}
                  </span>
                </div>
              </div>

              {/* Total Banner */}
              <div
                style={{
                  marginTop: '20px',
                  paddingTop: '16px',
                  borderTop: '1px solid #e2e8f0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '14px', fontWeight: '600', color: '#475569' }}>
                  {isEs ? 'Monto Total de la Reserva:' : 'Total Booking Amount:'}
                </span>
                <div>
                  <strong style={{ fontSize: '22px', color: '#0001e2', fontWeight: '800' }}>
                    ${Number(confirmedBooking.totalClp).toLocaleString('es-CL')} CLP
                  </strong>
                  <span style={{ fontSize: '14px', color: '#64748b', marginLeft: '6px' }}>
                    (${confirmedBooking.totalUsd} USD)
                  </span>
                </div>
              </div>
            </div>

            {/* Travel Advice Notes */}
            <div
              style={{
                backgroundColor: '#eff6ff',
                borderRadius: '8px',
                padding: '16px 20px',
                fontSize: '13px',
                color: '#1e40af',
                lineHeight: '1.6',
                marginBottom: '28px',
              }}
            >
              <strong>⚓ {isEs ? 'Recomendaciones Importantes de Zarpe:' : 'Sailing Boarding Instructions:'}</strong>
              <ul style={{ margin: '8px 0 0', paddingLeft: '20px' }}>
                <li>{isEs ? 'Presentarse con 20 minutos de anticipación al horario fijado.' : 'Arrive 20 minutes prior to scheduled departure.'}</li>
                <li>{isEs ? 'Llevar vestimenta en capas, cortaviento impermeable y calzado cómodo.' : 'Dress in warm layers with a windbreaker jacket.'}</li>
                <li>{isEs ? 'Embarcaciones equipadas con salón calefaccionado, cafetería y cubiertas panorámicas.' : 'Vessels feature heated cabins, panoramic observation decks and bar service.'}</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => window.print()}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  backgroundColor: '#f1f5f9',
                  color: '#1e293b',
                  border: '1px solid #cbd5e1',
                  padding: '14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                }}
              >
                🖨️ {isEs ? 'Imprimir / Descargar Voucher' : 'Print / Download Voucher'}
              </button>

              {onNavigateToAdmin && (
                <button
                  type="button"
                  onClick={onNavigateToAdmin}
                  style={{
                    flex: 1,
                    minWidth: '200px',
                    backgroundColor: '#0001e2',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '700',
                    cursor: 'pointer',
                  }}
                >
                  ⚙️ {isEs ? 'Ver en Panel de Clientes y Reservas' : 'Manage in Admin Dashboard'}
                </button>
              )}

              <button
                type="button"
                onClick={onBackToHome}
                style={{
                  flex: 1,
                  minWidth: '200px',
                  backgroundColor: '#081e2a',
                  color: '#ffffff',
                  border: 'none',
                  padding: '14px',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '700',
                  cursor: 'pointer',
                }}
              >
                🏠 {isEs ? 'Volver al Sitio Web' : 'Return to Home'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // FULL PAGE RESERVATION FORM SCREEN
  // ----------------------------------------------------
  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', color: '#0f172a' }}>
      {/* Top Banner Navigation */}
      <header
        style={{
          backgroundColor: '#081e2a',
          color: '#ffffff',
          padding: '14px 24px',
          borderBottom: '2px solid #0001e2',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button
              onClick={onBackToHome}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.2)',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)')}
            >
              ← {isEs ? 'Volver al Inicio' : 'Back to Home'}
            </button>
            <a href="/" onClick={(e) => { e.preventDefault(); onBackToHome(); }}>
              <img
                src="/assets/images/austral-logo-white.png"
                alt="Austral Patagonia Naviera"
                style={{ height: '38px', width: 'auto', display: 'block' }}
              />
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                fontSize: '12px',
                color: '#94a3b8',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ color: '#22c55e', fontSize: '14px' }}>●</span>
              <span>{isEs ? 'Conexión SSL Segura • Sistema Oficial' : 'Secure SSL • Official System'}</span>
            </div>

            {onNavigateToAdmin && (
              <button
                onClick={onNavigateToAdmin}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.25)',
                  color: '#e2e8f0',
                  padding: '6px 12px',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                ⚙️ {isEs ? 'Panel Admin' : 'Admin'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Hero Title Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, #081e2a 0%, #1e293b 100%)',
          color: '#ffffff',
          padding: '40px 20px 48px',
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span
            style={{
              backgroundColor: 'rgba(0, 1, 226, 0.4)',
              color: '#93c5fd',
              fontSize: '12px',
              fontWeight: '700',
              padding: '6px 16px',
              borderRadius: '20px',
              letterSpacing: '0.6px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '12px',
              border: '1px solid rgba(147, 197, 253, 0.3)',
            }}
          >
            {isEs ? 'ZARPES DESDE PUERTO MONTT & PUERTO VARAS' : 'SAILINGS FROM PUERTO MONTT & PUERTO VARAS'}
          </span>
          <h1 style={{ fontSize: '32px', fontWeight: '900', margin: '0 0 10px', color: '#ffffff' }}>
            {isEs ? 'Reserva de Excursión y Navegación' : 'Book Tour & Boat Navigation'}
          </h1>
          <p style={{ fontSize: '15px', color: '#cbd5e1', margin: 0 }}>
            {isEs
              ? 'Completa tu información a continuación para asegurar tus cupos con confirmación inmediata y política de cancelación flexible.'
              : 'Complete your booking details below to secure your spots with instant confirmation and flexible cancellation policy.'}
          </p>
        </div>
      </section>

      {/* Main 2-Column Content */}
      <main style={{ maxWidth: '1240px', margin: '-24px auto 60px', padding: '0 20px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.7fr) minmax(0, 1.1fr)',
            gap: '28px',
            alignItems: 'start',
          }}
        >
          {/* LEFT: Complete Booking Form */}
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.06)',
              border: '1px solid #e2e8f0',
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* STEP 1: Select Tour */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#0001e2',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    1
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#081e2a' }}>
                    {isEs ? 'Selecciona tu Excursión' : 'Select Your Excursion'}
                  </h3>
                </div>

                <select
                  value={tourId}
                  onChange={(e) => setTourId(Number(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    borderRadius: '10px',
                    border: '1.5px solid #cbd5e1',
                    fontSize: '15px',
                    fontWeight: '700',
                    color: '#081e2a',
                    backgroundColor: '#f8fafc',
                    cursor: 'pointer',
                    outline: 'none',
                  }}
                >
                  {toursData.map((tour) => (
                    <option key={tour.id} value={tour.id}>
                      {tour.title} — {tour.price_clp} ({tour.price_usd} USD) • {tour.duration}
                    </option>
                  ))}
                </select>
              </div>

              {/* STEP 2: Date & Passengers */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#0001e2',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    2
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#081e2a' }}>
                    {isEs ? 'Fecha del Viaje y Pasajeros' : 'Travel Date & Passengers'}
                  </h3>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: '16px',
                  }}
                >
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      {isEs ? 'Fecha de Zarpe / Tour *' : 'Tour Date *'}
                    </label>
                    <input
                      type="date"
                      min={minDate}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        color: '#081e2a',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      {isEs ? 'Adultos (12+ años)' : 'Adults (12+ yrs)'}
                    </label>
                    <select
                      value={adults}
                      onChange={(e) => setAdults(Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        color: '#081e2a',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? (isEs ? 'Adulto' : 'Adult') : (isEs ? 'Adultos' : 'Adults')}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      {isEs ? 'Niños (3 a 11 años) -30%' : 'Children (3-11 yrs) -30%'}
                    </label>
                    <select
                      value={children}
                      onChange={(e) => setChildren(Number(e.target.value))}
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        color: '#081e2a',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    >
                      {[0, 1, 2, 3, 4, 5, 6].map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? (isEs ? 'Niño' : 'Child') : (isEs ? 'Niños' : 'Children')}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* STEP 3: Primary Contact Information */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#0001e2',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    3
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#081e2a' }}>
                    {isEs ? 'Datos del Pasajero Titular' : 'Lead Passenger Details'}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      {isEs ? 'Nombre y Apellidos Completos *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      placeholder={isEs ? 'Ej: Rodrigo Valenzuela' : 'e.g. John Doe'}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        color: '#081e2a',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      {isEs ? 'RUT / DNI / Pasaporte *' : 'ID / Passport Number *'}
                    </label>
                    <input
                      type="text"
                      placeholder={isEs ? '17.849.120-K o Pasaporte' : 'Passport / ID'}
                      value={customerDoc}
                      onChange={(e) => setCustomerDoc(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        color: '#081e2a',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      {isEs ? 'Correo Electrónico *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      placeholder="nombre@correo.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        color: '#081e2a',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                      {isEs ? 'Teléfono / WhatsApp *' : 'Phone / WhatsApp *'}
                    </label>
                    <input
                      type="tel"
                      placeholder="+56 9 8888 0676"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '11px 14px',
                        borderRadius: '8px',
                        border: '1.5px solid #cbd5e1',
                        fontSize: '14px',
                        color: '#081e2a',
                        backgroundColor: '#f8fafc',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '14px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    {isEs ? 'Lugar de Recogida / Hotel en Puerto Montt o Puerto Varas' : 'Pickup Point / Hotel in Puerto Montt or Puerto Varas'}
                  </label>
                  <input
                    type="text"
                    placeholder={isEs ? 'Ej: Hotel Cumbres, Puerto Varas o Muelle Costanera' : 'e.g. Hotel Cumbres, Puerto Varas'}
                    value={hotel}
                    onChange={(e) => setHotel(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      color: '#081e2a',
                      backgroundColor: '#f8fafc',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                    {isEs ? 'Notas Especiales o Requerimientos' : 'Special Notes or Requests'}
                  </label>
                  <textarea
                    rows={2}
                    placeholder={isEs ? 'Requerimientos dietéticos, movilidad reducida, equipaje especial...' : 'Dietary requests, accessibility, luggage...'}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '14px',
                      color: '#081e2a',
                      backgroundColor: '#f8fafc',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                </div>
              </div>

              {/* STEP 4: Payment Method Selection */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                  <span
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: '#0001e2',
                      color: '#fff',
                      fontSize: '13px',
                      fontWeight: '800',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    4
                  </span>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', margin: 0, color: '#081e2a' }}>
                    {isEs ? 'Forma de Pago Preferida' : 'Preferred Payment Method'}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  {[
                    {
                      id: 'WebPay / Tarjeta',
                      title: isEs ? 'WebPay Plus / Tarjetas' : 'Credit / Debit Card',
                      subtitle: isEs ? 'Crédito, Débito, Prepago' : 'Visa, Mastercard, AMEX',
                      icon: '💳',
                    },
                    {
                      id: 'Transferencia',
                      title: isEs ? 'Transferencia Bancaria' : 'Bank Transfer',
                      subtitle: isEs ? 'Banco Santander Chile' : 'Direct Electronic Wire',
                      icon: '🏦',
                    },
                    {
                      id: 'Efectivo / Muelle',
                      title: isEs ? 'Pago en Muelle / Oficina' : 'Pay at Pier / Office',
                      subtitle: isEs ? 'Efectivo o POS antes de zarpe' : 'Cash or Card at boarding',
                      icon: '⚓',
                    },
                    {
                      id: 'Asistido WhatsApp',
                      title: isEs ? 'Asistencia WhatsApp' : 'WhatsApp Assistance',
                      subtitle: isEs ? 'Coordinar con ejecutivo' : 'Direct travel agent chat',
                      icon: '💬',
                    },
                  ].map((m) => (
                    <label
                      key={m.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '14px',
                        borderRadius: '10px',
                        border: paymentMethod === m.id ? '2px solid #0001e2' : '1.5px solid #e2e8f0',
                        backgroundColor: paymentMethod === m.id ? '#eff6ff' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'all 0.2s',
                      }}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={m.id}
                        checked={paymentMethod === m.id}
                        onChange={() => setPaymentMethod(m.id)}
                        style={{ marginTop: '3px', accentColor: '#0001e2' }}
                      />
                      <div>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: '#081e2a' }}>
                          {m.icon} {m.title}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
                          {m.subtitle}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === 'Transferencia' && (
                  <div
                    style={{
                      marginTop: '14px',
                      backgroundColor: '#f1f5f9',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '14px',
                      fontSize: '12px',
                      color: '#334155',
                      lineHeight: '1.6',
                    }}
                  >
                    <strong>Datos Bancarios Oficiales Austral Patagonia Naviera:</strong>
                    <br />• <strong>Banco:</strong> Banco Santander Chile
                    <br />• <strong>Tipo de Cuenta:</strong> Cuenta Corriente N° 8492019-2
                    <br />• <strong>RUT:</strong> 77.489.120-4 • Austral Patagonia Naviera SpA
                    <br />• <strong>Email Comprobante:</strong> pagos@australpatagonia.cl
                  </div>
                )}
              </div>

              {/* Submit Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: '#0001e2',
                    color: '#ffffff',
                    border: 'none',
                    padding: '16px',
                    borderRadius: '10px',
                    fontSize: '16px',
                    fontWeight: '800',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: '0 4px 15px rgba(0, 1, 226, 0.35)',
                    transition: 'background 0.2s, transform 0.1s',
                  }}
                  onMouseEnter={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#0001b5')}
                  onMouseLeave={(e) => !isSubmitting && (e.currentTarget.style.backgroundColor = '#0001e2')}
                >
                  🔒 {isSubmitting ? (isEs ? 'Procesando Reserva...' : 'Processing...') : (isEs ? 'Confirmar Reserva de Excursión' : 'Confirm Excursion Booking')}
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppBooking}
                  style={{
                    backgroundColor: '#25D366',
                    color: '#ffffff',
                    border: 'none',
                    padding: '14px',
                    borderRadius: '10px',
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
                  💬 {isEs ? 'O Reserva Directo con un Asistente en WhatsApp' : 'Or Book Directly with an Agent on WhatsApp'}
                </button>
              </div>

              <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '12px', color: '#94a3b8' }}>
                🛡️ {isEs ? 'Sin cobros sorpresa. Cancelación flexible hasta 24 horas antes.' : 'No hidden fees. Flexible cancellation up to 24 hours prior.'}
              </div>
            </form>
          </div>

          {/* RIGHT: Sticky Live Tour Summary Box */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 10px 30px -5px rgba(0,0,0,0.08)',
                border: '1px solid #e2e8f0',
              }}
            >
              {/* Tour Image Header */}
              <div style={{ position: 'relative', height: '180px', overflow: 'hidden' }}>
                <img
                  src={currentTour.image}
                  alt={currentTour.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    backgroundColor: '#0001e2',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '4px 10px',
                    borderRadius: '4px',
                    textTransform: 'uppercase',
                  }}
                >
                  {currentTour.category}
                </span>
                <span
                  style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(8, 30, 42, 0.85)',
                    color: '#ffffff',
                    fontSize: '12px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ⏱️ {currentTour.duration}
                </span>
              </div>

              {/* Tour Details */}
              <div style={{ padding: '24px' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#081e2a', margin: '0 0 8px', lineHeight: '1.3' }}>
                  {currentTour.title}
                </h4>
                <p style={{ fontSize: '13px', color: '#64748b', margin: '0 0 16px', lineHeight: '1.5' }}>
                  {currentTour.desc}
                </p>

                <div
                  style={{
                    backgroundColor: '#f8fafc',
                    borderRadius: '10px',
                    padding: '14px',
                    marginBottom: '18px',
                    fontSize: '13px',
                    color: '#334155',
                    border: '1px solid #f1f5f9',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>📍 {isEs ? 'Punto de Zarpe:' : 'Departure Point:'}</span>
                    <strong style={{ color: '#081e2a' }}>{currentTour.location}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span>📅 {isEs ? 'Fecha de Viaje:' : 'Travel Date:'}</span>
                    <strong style={{ color: '#081e2a' }}>{date || minDate}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>👥 {isEs ? 'Pasajeros:' : 'Passengers:'}</span>
                    <strong style={{ color: '#081e2a' }}>
                      {adults} {isEs ? 'adultos' : 'adults'}{children > 0 ? `, ${children} ${isEs ? 'niños' : 'children'}` : ''}
                    </strong>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '16px', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
                    <span>{adults} × {isEs ? 'Adulto' : 'Adult'} ({currentTour.price_clp})</span>
                    <span>${adultsTotalClp.toLocaleString('es-CL')} CLP</span>
                  </div>
                  {children > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
                      <span>{children} × {isEs ? 'Niño (-30%)' : 'Child (-30%)'}</span>
                      <span>${childrenTotalClp.toLocaleString('es-CL')} CLP</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#16a34a', marginBottom: '12px' }}>
                    <span>{isEs ? 'Tasas de Navegación & Seguros' : 'Maritime Fees & Insurance'}</span>
                    <span>{isEs ? 'INCLUIDAS' : 'INCLUDED'}</span>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      borderTop: '1.5px solid #0001e2',
                      paddingTop: '12px',
                    }}
                  >
                    <div>
                      <span style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', display: 'block' }}>
                        {isEs ? 'Total a Pagar' : 'Total Payable'}
                      </span>
                      <strong style={{ fontSize: '24px', fontWeight: '900', color: '#0001e2' }}>
                        ${totalClp.toLocaleString('es-CL')} CLP
                      </strong>
                    </div>
                    <span style={{ fontSize: '14px', color: '#64748b', fontWeight: '600' }}>
                      (${totalUsd} USD)
                    </span>
                  </div>
                </div>

                {/* Guarantee Badges */}
                <div style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.7', borderTop: '1px solid #f1f5f9', paddingTop: '14px' }}>
                  <div>✓ {isEs ? 'Confirmación electrónica inmediata' : 'Instant digital voucher'}</div>
                  <div>✓ {isEs ? 'Embarcaciones certificadas por Armada de Chile' : 'Certified vessels & captains'}</div>
                  <div>✓ {isEs ? 'Cancelación sin costo hasta 24h antes' : 'Free cancellation up to 24h before'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ReservationPage;
