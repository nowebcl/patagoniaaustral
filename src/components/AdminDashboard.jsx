import React, { useState, useEffect } from 'react';
import { bookingService } from '../services/bookingService';
import { toursData } from '../data/toursData';

const AdminDashboard = ({ onBackToHome, onOpenPublicBooking }) => {
  const [activeTab, setActiveTab] = useState('overview'); // overview, reservations, clients, payments
  const [reservations, setReservations] = useState([]);
  const [clients, setClients] = useState([]);
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({});

  // Search & Filters
  const [resSearch, setResSearch] = useState('');
  const [resStatusFilter, setResStatusFilter] = useState('all');
  const [clientSearch, setClientSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('all');

  // Modals
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [showNewBookingModal, setShowNewBookingModal] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);

  // Load data function
  const loadData = () => {
    setReservations(bookingService.getReservations());
    setClients(bookingService.getClients());
    setPayments(bookingService.getPayments());
    setStats(bookingService.getStats());
  };

  useEffect(() => {
    loadData();
    const handleUpdate = () => loadData();
    window.addEventListener('austral_data_changed', handleUpdate);
    return () => window.removeEventListener('austral_data_changed', handleUpdate);
  }, []);

  // Filtered lists
  const filteredReservations = reservations.filter((r) => {
    const matchesSearch =
      r.customerName?.toLowerCase().includes(resSearch.toLowerCase()) ||
      r.id?.toLowerCase().includes(resSearch.toLowerCase()) ||
      r.tourTitle?.toLowerCase().includes(resSearch.toLowerCase()) ||
      r.customerEmail?.toLowerCase().includes(resSearch.toLowerCase());
    const matchesStatus = resStatusFilter === 'all' || r.status === resStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const filteredClients = clients.filter((c) => {
    return (
      c.name?.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.email?.toLowerCase().includes(clientSearch.toLowerCase()) ||
      c.phone?.includes(clientSearch) ||
      c.doc?.toLowerCase().includes(clientSearch.toLowerCase())
    );
  });

  const filteredPayments = payments.filter((p) => {
    return paymentFilter === 'all' || p.status === paymentFilter;
  });

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['ID,Cliente,Email,Telefono,RUT_Pasaporte,Tour,Fecha,Pasajeros,Total_CLP,Total_USD,Estado,Pago,Metodo,Fecha_Creacion'];
    const rows = reservations.map((r) =>
      [
        r.id,
        `"${r.customerName}"`,
        r.customerEmail,
        `"${r.customerPhone}"`,
        `"${r.customerDoc || ''}"`,
        `"${r.tourTitle}"`,
        r.date,
        r.adults + r.children,
        r.totalClp,
        r.totalUsd,
        r.status,
        r.paymentStatus,
        `"${r.paymentMethod}"`,
        r.createdAt,
      ].join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `reservas_austral_patagonia_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status Badge Colors
  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmada':
      case 'Pagado':
      case 'VIP':
      case 'Activo':
        return { bg: '#dcfce7', text: '#15803d', border: '#bbf7d0' };
      case 'Pendiente':
      case 'Nuevo':
        return { bg: '#fef9c3', text: '#854d0e', border: '#fef08a' };
      case 'Completada':
        return { bg: '#eff6ff', text: '#1e40af', border: '#bfdbfe' };
      case 'Cancelada':
      case 'Reembolsado':
      case 'Inactivo':
        return { bg: '#fee2e2', text: '#b91c1c', border: '#fecaca' };
      default:
        return { bg: '#f1f5f9', text: '#475569', border: '#e2e8f0' };
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* ====================================================
          SIDEBAR NAVIGATION
          ==================================================== */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#081e2a',
          color: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid #1e293b',
          flexShrink: 0,
        }}
      >
        {/* Brand Header */}
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src="/assets/images/austral-logo-white.png"
              alt="Austral Patagonia"
              style={{ height: '32px', width: 'auto' }}
            />
          </div>
          <div style={{ marginTop: '10px', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.8px', fontWeight: '700' }}>
            Panel de Administración
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ padding: '16px 12px', flex: 1 }}>
          <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', padding: '0 12px 8px' }}>
            Módulos de Gestión
          </div>

          {[
            { id: 'overview', label: 'Resumen General', icon: '📊', count: null },
            { id: 'reservations', label: 'Reservaciones', icon: '🎫', count: reservations.length },
            { id: 'clients', label: 'Clientes', icon: '👥', count: clients.length },
            { id: 'payments', label: 'Pagos & Cobros', icon: '💳', count: payments.length },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '11px 14px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#0001e2' : 'transparent',
                  color: isActive ? '#ffffff' : '#cbd5e1',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: isActive ? '700' : '500',
                  marginBottom: '4px',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
                onMouseEnter={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)')}
                onMouseLeave={(e) => !isActive && (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {item.count !== null && (
                  <span
                    style={{
                      fontSize: '11px',
                      padding: '2px 8px',
                      borderRadius: '12px',
                      backgroundColor: isActive ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)',
                      color: '#ffffff',
                    }}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}

          <div style={{ margin: '20px 0 10px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px' }}>
            <div style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700', padding: '0 12px 8px' }}>
              Acciones Rápidas
            </div>
            <button
              onClick={() => setShowNewBookingModal(true)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(37, 211, 102, 0.15)',
                color: '#4ade80',
                border: '1px solid rgba(74, 222, 128, 0.25)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
                marginBottom: '8px',
              }}
            >
              <span>➕</span>
              <span>Nueva Reserva</span>
            </button>

            <button
              onClick={handleExportCSV}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '8px',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#cbd5e1',
                border: '1px solid rgba(255,255,255,0.1)',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '500',
              }}
            >
              <span>📥</span>
              <span>Exportar a CSV</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer: Back to public website */}
        <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={onBackToHome}
            style={{
              width: '100%',
              backgroundColor: 'rgba(255,255,255,0.08)',
              color: '#ffffff',
              border: '1px solid rgba(255,255,255,0.15)',
              padding: '10px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.16)')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.08)')}
          >
            ← Volver al Sitio Web
          </button>
        </div>
      </aside>

      {/* ====================================================
          MAIN DASHBOARD BODY
          ==================================================== */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, overflowY: 'auto' }}>
        {/* Top Navbar */}
        <header
          style={{
            height: '68px',
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 10,
          }}
        >
          <div>
            <h1 style={{ fontSize: '20px', fontWeight: '800', margin: 0, color: '#081e2a' }}>
              {activeTab === 'overview' && 'Panel General de Operaciones'}
              {activeTab === 'reservations' && 'Gestión de Reservaciones'}
              {activeTab === 'clients' && 'Directorio de Clientes'}
              {activeTab === 'payments' && 'Control de Pagos y Recaudación'}
            </h1>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
              Austral Patagonia Naviera • Base Puerto Montt, Chile
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                color: '#15803d',
                backgroundColor: '#dcfce7',
                padding: '4px 10px',
                borderRadius: '20px',
                fontWeight: '600',
              }}
            >
              ● Sistema Activo
            </span>

            {onOpenPublicBooking && (
              <button
                onClick={onOpenPublicBooking}
                style={{
                  backgroundColor: '#f1f5f9',
                  color: '#081e2a',
                  border: '1px solid #cbd5e1',
                  padding: '8px 14px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                🌐 Ver Flujo de Reserva
              </button>
            )}

            <button
              onClick={() => {
                if (confirm('¿Restablecer los datos de demostración originales?')) {
                  bookingService.resetDemoData();
                }
              }}
              title="Restaurar datos demo"
              style={{
                background: 'none',
                border: '1px solid #e2e8f0',
                color: '#64748b',
                padding: '8px 12px',
                borderRadius: '6px',
                fontSize: '12px',
                cursor: 'pointer',
              }}
            >
              🔄 Reset Demo
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div style={{ padding: '32px' }}>
          {/* ==================================================
              TAB 1: OVERVIEW (RESUMEN)
              ================================================== */}
          {activeTab === 'overview' && (
            <div>
              {/* KPI Cards Grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                  gap: '20px',
                  marginBottom: '28px',
                }}
              >
                {/* Revenue Card */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '22px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                      Ingresos Totales (Pagados)
                    </span>
                    <span style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '4px 8px', borderRadius: '6px', fontSize: '16px' }}>
                      💰
                    </span>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#081e2a' }}>
                    ${Number(stats.totalRevenueClp || 0).toLocaleString('es-CL')} CLP
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    Aprox. ${stats.totalRevenueUsd || 0} USD • {stats.paidPaymentsCount || 0} transacciones
                  </div>
                </div>

                {/* Total Reservations Card */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '22px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                      Total Reservaciones
                    </span>
                    <span style={{ backgroundColor: '#eff6ff', color: '#0001e2', padding: '4px 8px', borderRadius: '6px', fontSize: '16px' }}>
                      🎫
                    </span>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#081e2a' }}>
                    {stats.totalReservations || 0}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    <span style={{ color: '#15803d', fontWeight: '700' }}>{stats.confirmedReservations || 0} confirmadas</span> • {stats.pendingReservations || 0} pendientes
                  </div>
                </div>

                {/* Active Clients Card */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '22px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                      Clientes Registrados
                    </span>
                    <span style={{ backgroundColor: '#f3e8ff', color: '#7e22ce', padding: '4px 8px', borderRadius: '6px', fontSize: '16px' }}>
                      👥
                    </span>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#081e2a' }}>
                    {stats.totalClients || 0}
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    Pasajeros nacionales e internacionales
                  </div>
                </div>

                {/* Pending Payments Card */}
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '22px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>
                      Por Cobrar / Pendiente
                    </span>
                    <span style={{ backgroundColor: '#fef9c3', color: '#854d0e', padding: '4px 8px', borderRadius: '6px', fontSize: '16px' }}>
                      ⏳
                    </span>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: '900', color: '#854d0e' }}>
                    ${Number(stats.pendingRevenueClp || 0).toLocaleString('es-CL')} CLP
                  </div>
                  <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>
                    {stats.pendingPaymentsCount || 0} pagos en espera de acreditación
                  </div>
                </div>
              </div>

              {/* Recent Bookings Section with Quick Controls */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    padding: '20px 24px',
                    borderBottom: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                  }}
                >
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: '800', margin: 0, color: '#081e2a' }}>
                      Últimas Reservaciones Realizadas
                    </h3>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0' }}>
                      Monitoreo en tiempo real de zarpes y solicitudes
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('reservations')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0001e2',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    Ver todas las reservas →
                  </button>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700' }}>
                        <th style={{ padding: '12px 24px' }}>Código</th>
                        <th style={{ padding: '12px 16px' }}>Cliente</th>
                        <th style={{ padding: '12px 16px' }}>Tour</th>
                        <th style={{ padding: '12px 16px' }}>Fecha Zarpe</th>
                        <th style={{ padding: '12px 16px' }}>Total</th>
                        <th style={{ padding: '12px 16px' }}>Estado</th>
                        <th style={{ padding: '12px 16px' }}>Pago</th>
                        <th style={{ padding: '12px 24px', textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.slice(0, 5).map((r) => {
                        const sBadge = getStatusBadge(r.status);
                        const pBadge = getStatusBadge(r.paymentStatus);
                        return (
                          <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '14px 24px', fontWeight: '700', color: '#0001e2' }}>
                              {r.id}
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <div style={{ fontWeight: '700', color: '#081e2a' }}>{r.customerName}</div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>{r.customerPhone}</div>
                            </td>
                            <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                              <div style={{ fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {r.tourTitle}
                              </div>
                              <div style={{ fontSize: '11px', color: '#64748b' }}>
                                {r.adults} adultos {r.children > 0 ? `+ ${r.children} niños` : ''}
                              </div>
                            </td>
                            <td style={{ padding: '14px 16px', fontWeight: '600', color: '#081e2a' }}>
                              {r.date}
                            </td>
                            <td style={{ padding: '14px 16px', fontWeight: '700', color: '#081e2a' }}>
                              ${Number(r.totalClp).toLocaleString('es-CL')}
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '3px 10px',
                                  borderRadius: '12px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  backgroundColor: sBadge.bg,
                                  color: sBadge.text,
                                  border: `1px solid ${sBadge.border}`,
                                }}
                              >
                                {r.status}
                              </span>
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <span
                                style={{
                                  display: 'inline-block',
                                  padding: '3px 10px',
                                  borderRadius: '12px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  backgroundColor: pBadge.bg,
                                  color: pBadge.text,
                                  border: `1px solid ${pBadge.border}`,
                                }}
                              >
                                {r.paymentStatus}
                              </span>
                            </td>
                            <td style={{ padding: '14px 24px', textAlign: 'right' }}>
                              <button
                                onClick={() => setSelectedReservation(r)}
                                style={{
                                  backgroundColor: '#f1f5f9',
                                  border: '1px solid #cbd5e1',
                                  padding: '5px 12px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                  cursor: 'pointer',
                                  color: '#334155',
                                }}
                              >
                                Ver Detalle
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              TAB 2: RESERVATIONS MANAGEMENT
              ================================================== */}
          {activeTab === 'reservations' && (
            <div>
              {/* Filter & Search Bar */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, minWidth: '280px' }}>
                  <input
                    type="text"
                    placeholder="🔍 Buscar por cliente, código, email o tour..."
                    value={resSearch}
                    onChange={(e) => setResSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <select
                    value={resStatusFilter}
                    onChange={(e) => setResStatusFilter(e.target.value)}
                    style={{
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13px',
                      fontWeight: '600',
                      backgroundColor: '#ffffff',
                      color: '#081e2a',
                    }}
                  >
                    <option value="all">Todos los Estados</option>
                    <option value="Confirmada">Confirmadas</option>
                    <option value="Pendiente">Pendientes</option>
                    <option value="Completada">Completadas</option>
                    <option value="Cancelada">Canceladas</option>
                  </select>

                  <button
                    onClick={() => setShowNewBookingModal(true)}
                    style={{
                      backgroundColor: '#0001e2',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      fontSize: '13px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    + Registrar Reserva
                  </button>
                </div>
              </div>

              {/* Reservations Table */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700' }}>
                        <th style={{ padding: '14px 20px' }}>ID Reserva</th>
                        <th style={{ padding: '14px 16px' }}>Pasajero / Cliente</th>
                        <th style={{ padding: '14px 16px' }}>Excursión</th>
                        <th style={{ padding: '14px 16px' }}>Fecha Zarpe</th>
                        <th style={{ padding: '14px 16px' }}>Pasajeros</th>
                        <th style={{ padding: '14px 16px' }}>Total CLP</th>
                        <th style={{ padding: '14px 16px' }}>Estado Reserva</th>
                        <th style={{ padding: '14px 16px' }}>Estado Pago</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredReservations.length === 0 ? (
                        <tr>
                          <td colSpan={9} style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                            No se encontraron reservaciones que coincidan con la búsqueda.
                          </td>
                        </tr>
                      ) : (
                        filteredReservations.map((r) => {
                          const sBadge = getStatusBadge(r.status);
                          const pBadge = getStatusBadge(r.paymentStatus);
                          return (
                            <tr key={r.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '14px 20px', fontWeight: '800', color: '#0001e2' }}>
                                {r.id}
                              </td>
                              <td style={{ padding: '14px 16px' }}>
                                <div style={{ fontWeight: '700', color: '#081e2a' }}>{r.customerName}</div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>
                                  {r.customerEmail} • {r.customerPhone}
                                </div>
                              </td>
                              <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                                <div style={{ fontWeight: '600', color: '#1e293b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                  {r.tourTitle}
                                </div>
                                <div style={{ fontSize: '11px', color: '#64748b' }}>{r.hotel}</div>
                              </td>
                              <td style={{ padding: '14px 16px', fontWeight: '700', color: '#081e2a' }}>
                                {r.date}
                              </td>
                              <td style={{ padding: '14px 16px', color: '#334155' }}>
                                {r.adults}A {r.children > 0 ? `+ ${r.children}N` : ''}
                              </td>
                              <td style={{ padding: '14px 16px', fontWeight: '800', color: '#081e2a' }}>
                                ${Number(r.totalClp).toLocaleString('es-CL')}
                              </td>
                              {/* Inline Status Dropdown */}
                              <td style={{ padding: '14px 16px' }}>
                                <select
                                  value={r.status}
                                  onChange={(e) => {
                                    bookingService.updateReservation(r.id, { status: e.target.value });
                                  }}
                                  style={{
                                    backgroundColor: sBadge.bg,
                                    color: sBadge.text,
                                    border: `1px solid ${sBadge.border}`,
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <option value="Confirmada">Confirmada</option>
                                  <option value="Pendiente">Pendiente</option>
                                  <option value="Completada">Completada</option>
                                  <option value="Cancelada">Cancelada</option>
                                </select>
                              </td>
                              {/* Inline Payment Status Dropdown */}
                              <td style={{ padding: '14px 16px' }}>
                                <select
                                  value={r.paymentStatus}
                                  onChange={(e) => {
                                    bookingService.updateReservation(r.id, { paymentStatus: e.target.value });
                                  }}
                                  style={{
                                    backgroundColor: pBadge.bg,
                                    color: pBadge.text,
                                    border: `1px solid ${pBadge.border}`,
                                    padding: '4px 8px',
                                    borderRadius: '8px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                  }}
                                >
                                  <option value="Pagado">Pagado</option>
                                  <option value="Pendiente">Pendiente</option>
                                  <option value="Reembolsado">Reembolsado</option>
                                </select>
                              </td>
                              <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                                  <button
                                    onClick={() => setSelectedReservation(r)}
                                    title="Ver Detalles"
                                    style={{
                                      backgroundColor: '#f1f5f9',
                                      border: '1px solid #cbd5e1',
                                      padding: '5px 10px',
                                      borderRadius: '6px',
                                      fontSize: '12px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    👁️
                                  </button>
                                  <button
                                    onClick={() => {
                                      if (confirm(`¿Eliminar la reserva ${r.id}?`)) {
                                        bookingService.deleteReservation(r.id);
                                      }
                                    }}
                                    title="Eliminar Reserva"
                                    style={{
                                      backgroundColor: '#fee2e2',
                                      border: '1px solid #fecaca',
                                      color: '#b91c1c',
                                      padding: '5px 10px',
                                      borderRadius: '6px',
                                      fontSize: '12px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              TAB 3: CLIENTS MANAGEMENT
              ================================================== */}
          {activeTab === 'clients' && (
            <div>
              {/* Client Filter & Search Bar */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <input
                    type="text"
                    placeholder="🔍 Buscar cliente por nombre, email, RUT o teléfono..."
                    value={clientSearch}
                    onChange={(e) => setClientSearch(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1.5px solid #cbd5e1',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                <button
                  onClick={() => setShowNewClientModal(true)}
                  style={{
                    backgroundColor: '#0001e2',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  + Agregar Cliente
                </button>
              </div>

              {/* Clients Table */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700' }}>
                        <th style={{ padding: '14px 20px' }}>Cliente</th>
                        <th style={{ padding: '14px 16px' }}>RUT / Pasaporte</th>
                        <th style={{ padding: '14px 16px' }}>Teléfono / WhatsApp</th>
                        <th style={{ padding: '14px 16px' }}>Ciudad / Origen</th>
                        <th style={{ padding: '14px 16px' }}>Reservas</th>
                        <th style={{ padding: '14px 16px' }}>Total Invertido</th>
                        <th style={{ padding: '14px 16px' }}>Categoría</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Contacto</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredClients.length === 0 ? (
                        <tr>
                          <td colSpan={8} style={{ textAlign: 'center', padding: '36px', color: '#94a3b8' }}>
                            No hay clientes registrados que coincidan con la búsqueda.
                          </td>
                        </tr>
                      ) : (
                        filteredClients.map((c) => {
                          const badge = getStatusBadge(c.status);
                          return (
                            <tr key={c.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                              <td style={{ padding: '14px 20px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                  <div
                                    style={{
                                      width: '36px',
                                      height: '36px',
                                      borderRadius: '50%',
                                      backgroundColor: '#eff6ff',
                                      color: '#0001e2',
                                      fontWeight: '800',
                                      fontSize: '14px',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                    }}
                                  >
                                    {c.name?.charAt(0) || 'C'}
                                  </div>
                                  <div>
                                    <div style={{ fontWeight: '700', color: '#081e2a' }}>{c.name}</div>
                                    <div style={{ fontSize: '12px', color: '#64748b' }}>{c.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td style={{ padding: '14px 16px', fontWeight: '600', color: '#334155' }}>
                                {c.doc || '—'}
                              </td>
                              <td style={{ padding: '14px 16px', color: '#334155' }}>
                                {c.phone || '—'}
                              </td>
                              <td style={{ padding: '14px 16px', color: '#64748b' }}>
                                {c.cityCountry || 'Chile'}
                              </td>
                              <td style={{ padding: '14px 16px', fontWeight: '700', color: '#081e2a' }}>
                                {c.totalBookings || 0}
                              </td>
                              <td style={{ padding: '14px 16px', fontWeight: '800', color: '#0001e2' }}>
                                ${Number(c.totalSpentClp || 0).toLocaleString('es-CL')}
                              </td>
                              <td style={{ padding: '14px 16px' }}>
                                <span
                                  style={{
                                    display: 'inline-block',
                                    padding: '3px 10px',
                                    borderRadius: '12px',
                                    fontSize: '11px',
                                    fontWeight: '700',
                                    backgroundColor: badge.bg,
                                    color: badge.text,
                                    border: `1px solid ${badge.border}`,
                                  }}
                                >
                                  {c.status}
                                </span>
                              </td>
                              <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                                {c.phone && (
                                  <a
                                    href={`https://wa.me/${c.phone.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${c.name}, te escribimos de Austral Patagonia Naviera.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      backgroundColor: '#25D366',
                                      color: '#ffffff',
                                      textDecoration: 'none',
                                      padding: '6px 10px',
                                      borderRadius: '6px',
                                      fontSize: '12px',
                                      fontWeight: '700',
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: '4px',
                                    }}
                                  >
                                    💬 Chat
                                  </a>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* ==================================================
              TAB 4: PAYMENTS MANAGEMENT
              ================================================== */}
          {activeTab === 'payments' && (
            <div>
              {/* Payment Filters Bar */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  border: '1px solid #e2e8f0',
                  marginBottom: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '14px',
                }}
              >
                <div style={{ display: 'flex', gap: '10px' }}>
                  {['all', 'Pagado', 'Pendiente', 'Reembolsado'].map((status) => (
                    <button
                      key={status}
                      onClick={() => setPaymentFilter(status)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '6px',
                        border: paymentFilter === status ? '2px solid #0001e2' : '1px solid #cbd5e1',
                        backgroundColor: paymentFilter === status ? '#eff6ff' : '#ffffff',
                        color: paymentFilter === status ? '#0001e2' : '#475569',
                        fontWeight: '700',
                        fontSize: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      {status === 'all' ? 'Todos los Pagos' : status}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setShowNewPaymentModal(true)}
                  style={{
                    backgroundColor: '#0001e2',
                    color: '#ffffff',
                    border: 'none',
                    padding: '10px 16px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: '700',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  + Registrar Pago Manual
                </button>
              </div>

              {/* Payments Table */}
              <div
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  overflow: 'hidden',
                }}
              >
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                    <thead>
                      <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#64748b', textTransform: 'uppercase', fontSize: '11px', fontWeight: '700' }}>
                        <th style={{ padding: '14px 20px' }}>ID Transacción</th>
                        <th style={{ padding: '14px 16px' }}>Reserva Vinculada</th>
                        <th style={{ padding: '14px 16px' }}>Cliente</th>
                        <th style={{ padding: '14px 16px' }}>Monto CLP</th>
                        <th style={{ padding: '14px 16px' }}>Monto USD</th>
                        <th style={{ padding: '14px 16px' }}>Método de Pago</th>
                        <th style={{ padding: '14px 16px' }}>Estado</th>
                        <th style={{ padding: '14px 16px' }}>Referencia</th>
                        <th style={{ padding: '14px 20px', textAlign: 'right' }}>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPayments.map((p) => {
                        const badge = getStatusBadge(p.status);
                        return (
                          <tr key={p.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '14px 20px', fontWeight: '800', color: '#081e2a' }}>
                              {p.id}
                            </td>
                            <td style={{ padding: '14px 16px', fontWeight: '700', color: '#0001e2' }}>
                              {p.bookingId}
                            </td>
                            <td style={{ padding: '14px 16px', fontWeight: '600', color: '#081e2a' }}>
                              {p.clientName}
                            </td>
                            <td style={{ padding: '14px 16px', fontWeight: '800', color: '#081e2a' }}>
                              ${Number(p.amountClp).toLocaleString('es-CL')}
                            </td>
                            <td style={{ padding: '14px 16px', color: '#64748b' }}>
                              ${p.amountUsd} USD
                            </td>
                            <td style={{ padding: '14px 16px', color: '#334155' }}>
                              {p.method}
                            </td>
                            <td style={{ padding: '14px 16px' }}>
                              <select
                                value={p.status}
                                onChange={(e) => {
                                  bookingService.updatePayment(p.id, { status: e.target.value });
                                }}
                                style={{
                                  backgroundColor: badge.bg,
                                  color: badge.text,
                                  border: `1px solid ${badge.border}`,
                                  padding: '4px 8px',
                                  borderRadius: '8px',
                                  fontSize: '11px',
                                  fontWeight: '700',
                                  cursor: 'pointer',
                                }}
                              >
                                <option value="Pagado">Pagado</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Reembolsado">Reembolsado</option>
                              </select>
                            </td>
                            <td style={{ padding: '14px 16px', fontSize: '12px', color: '#64748b', fontFamily: 'monospace' }}>
                              {p.refNumber}
                            </td>
                            <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                              <button
                                onClick={() => {
                                  alert(`Comprobante de Pago\nID: ${p.id}\nCliente: ${p.clientName}\nMonto: $${Number(p.amountClp).toLocaleString('es-CL')} CLP\nEstado: ${p.status}\nRef: ${p.refNumber}`);
                                }}
                                style={{
                                  backgroundColor: '#f1f5f9',
                                  border: '1px solid #cbd5e1',
                                  padding: '4px 10px',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                }}
                              >
                                Recibo
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ====================================================
          MODAL: VIEW RESERVATION DETAILS
          ==================================================== */}
      {selectedReservation && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 30, 42, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setSelectedReservation(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '100%',
              padding: '28px',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <span style={{ fontSize: '11px', color: '#64748b', textTransform: 'uppercase', fontWeight: '700' }}>
                  Ficha de Reserva
                </span>
                <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#0001e2', margin: '2px 0 0' }}>
                  {selectedReservation.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedReservation(null)}
                style={{ background: '#f1f5f9', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px', marginBottom: '20px' }}>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>CLIENTE</strong>
                <span style={{ fontWeight: '700', color: '#081e2a' }}>{selectedReservation.customerName}</span>
              </div>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>RUT / PASAPORTE</strong>
                <span style={{ fontWeight: '600' }}>{selectedReservation.customerDoc || 'No especificado'}</span>
              </div>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>EMAIL</strong>
                <span>{selectedReservation.customerEmail}</span>
              </div>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>TELÉFONO</strong>
                <span>{selectedReservation.customerPhone}</span>
              </div>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>EXCURSIÓN</strong>
                <span style={{ fontWeight: '700', color: '#081e2a' }}>{selectedReservation.tourTitle}</span>
              </div>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>FECHA ZARPE</strong>
                <span style={{ fontWeight: '700', color: '#0001e2' }}>{selectedReservation.date}</span>
              </div>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>PASAJEROS</strong>
                <span>{selectedReservation.adults} adultos {selectedReservation.children > 0 ? `+ ${selectedReservation.children} niños` : ''}</span>
              </div>
              <div>
                <strong style={{ color: '#64748b', display: 'block', fontSize: '11px' }}>HOTEL / PICKUP</strong>
                <span>{selectedReservation.hotel || 'Por coordinar'}</span>
              </div>
            </div>

            {selectedReservation.notes && (
              <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '13px', marginBottom: '20px', border: '1px solid #e2e8f0' }}>
                <strong style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px' }}>NOTAS / SOLICITUDES:</strong>
                {selectedReservation.notes}
              </div>
            )}

            <div style={{ backgroundColor: '#eff6ff', padding: '14px 18px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Total a Pagar:</span>
                <div style={{ fontSize: '20px', fontWeight: '900', color: '#0001e2' }}>
                  ${Number(selectedReservation.totalClp).toLocaleString('es-CL')} CLP
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Estado:</span>
                <div style={{ fontWeight: '700', color: '#15803d' }}>
                  {selectedReservation.status} • {selectedReservation.paymentStatus}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setSelectedReservation(null)}
                style={{ flex: 1, backgroundColor: '#0001e2', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================
          MODAL: ADD MANUAL BOOKING
          ==================================================== */}
      {showNewBookingModal && (
        <NewBookingModal
          onClose={() => setShowNewBookingModal(false)}
          onCreated={() => {
            setShowNewBookingModal(false);
            loadData();
          }}
        />
      )}

      {/* ====================================================
          MODAL: ADD CLIENT
          ==================================================== */}
      {showNewClientModal && (
        <NewClientModal
          onClose={() => setShowNewClientModal(false)}
          onCreated={() => {
            setShowNewClientModal(false);
            loadData();
          }}
        />
      )}

      {/* ====================================================
          MODAL: ADD MANUAL PAYMENT
          ==================================================== */}
      {showNewPaymentModal && (
        <NewPaymentModal
          onClose={() => setShowNewPaymentModal(false)}
          onCreated={() => {
            setShowNewPaymentModal(false);
            loadData();
          }}
        />
      )}
    </div>
  );
};

// ====================================================
// SUB-MODAL: NEW BOOKING
// ====================================================
const NewBookingModal = ({ onClose, onCreated }) => {
  const [tourId, setTourId] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('WebPay / Tarjeta');
  const [notes, setNotes] = useState('');

  const currentTour = toursData.find((t) => t.id === Number(tourId)) || toursData[0];
  const numericPriceClp = parseInt((currentTour.price_clp || '$0').replace(/\D/g, ''), 10) || 0;
  const totalClp = numericPriceClp * adults + Math.round(numericPriceClp * 0.7 * children);
  const totalUsd = Math.round(totalClp / 1000);

  const handleSubmit = (e) => {
    e.preventDefault();
    bookingService.createReservation({
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      tourId: currentTour.id,
      tourTitle: currentTour.title,
      tourImage: currentTour.image,
      date,
      adults,
      children,
      totalClp,
      totalUsd,
      paymentMethod,
      notes,
      status: 'Confirmada',
    });
    onCreated();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(8, 30, 42, 0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', maxWidth: '520px', width: '100%', padding: '28px', maxHeight: '90vh', overflowY: 'auto' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 16px', color: '#081e2a' }}>Registrar Nueva Reserva Manual</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Excursión</label>
            <select value={tourId} onChange={(e) => setTourId(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}>
              {toursData.map((t) => (
                <option key={t.id} value={t.id}>{t.title} ({t.price_clp})</option>
              ))}
            </select>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Nombre Cliente</label>
              <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Teléfono</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Correo Electrónico</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Fecha</label>
              <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Adultos</label>
              <input type="number" min="1" value={adults} onChange={(e) => setAdults(Number(e.target.value))} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Niños</label>
              <input type="number" min="0" value={children} onChange={(e) => setChildren(Number(e.target.value))} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
          </div>
          <div style={{ backgroundColor: '#f1f5f9', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: '700' }}>
            <span>Total a Cobrar:</span>
            <span style={{ color: '#0001e2' }}>${totalClp.toLocaleString('es-CL')} CLP</span>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '11px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" style={{ flex: 1, padding: '11px', border: 'none', background: '#0001e2', color: '#fff', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>Guardar Reserva</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ====================================================
// SUB-MODAL: NEW CLIENT
// ====================================================
const NewClientModal = ({ onClose, onCreated }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [doc, setDoc] = useState('');
  const [cityCountry, setCityCountry] = useState('Chile');

  const handleSubmit = (e) => {
    e.preventDefault();
    bookingService.createClient({ name, email, phone, doc, cityCountry });
    onCreated();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(8, 30, 42, 0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', maxWidth: '480px', width: '100%', padding: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 16px', color: '#081e2a' }}>Agregar Nuevo Cliente</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Nombre Completo</label>
            <input type="text" required value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Correo Electrónico</label>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Teléfono</label>
              <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>RUT / Pasaporte</label>
              <input type="text" value={doc} onChange={(e) => setDoc(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Ciudad / País</label>
            <input type="text" value={cityCountry} onChange={(e) => setCityCountry(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '11px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" style={{ flex: 1, padding: '11px', border: 'none', background: '#0001e2', color: '#fff', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>Guardar Cliente</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ====================================================
// SUB-MODAL: NEW PAYMENT
// ====================================================
const NewPaymentModal = ({ onClose, onCreated }) => {
  const [bookingId, setBookingId] = useState('');
  const [clientName, setClientName] = useState('');
  const [amountClp, setAmountClp] = useState(50000);
  const [method, setMethod] = useState('Transferencia Bancaria');
  const [status, setStatus] = useState('Pagado');

  const handleSubmit = (e) => {
    e.preventDefault();
    bookingService.createPayment({
      bookingId: bookingId || 'DIRECTO',
      clientName: clientName || 'Cliente Particular',
      amountClp: Number(amountClp),
      amountUsd: Math.round(Number(amountClp) / 1000),
      method,
      status,
    });
    onCreated();
  };

  return (
    <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(8, 30, 42, 0.75)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', maxWidth: '480px', width: '100%', padding: '28px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', margin: '0 0 16px', color: '#081e2a' }}>Registrar Pago Manual</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Cliente</label>
            <input type="text" required value={clientName} onChange={(e) => setClientName(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
          </div>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Código Reserva (Opcional)</label>
            <input type="text" placeholder="Ej: APN-2026-1082" value={bookingId} onChange={(e) => setBookingId(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Monto CLP</label>
              <input type="number" required value={amountClp} onChange={(e) => setAmountClp(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '4px' }}>Medio de Pago</label>
              <select value={method} onChange={(e) => setMethod(e.target.value)} style={{ width: '100%', padding: '9px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}>
                <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                <option value="WebPay / Transbank">WebPay / Transbank</option>
                <option value="Efectivo en Muelle">Efectivo en Muelle</option>
                <option value="Tarjeta Presencial POS">Tarjeta Presencial POS</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} style={{ flex: 1, padding: '11px', border: '1px solid #cbd5e1', background: '#fff', borderRadius: '6px', cursor: 'pointer' }}>Cancelar</button>
            <button type="submit" style={{ flex: 1, padding: '11px', border: 'none', background: '#0001e2', color: '#fff', borderRadius: '6px', fontWeight: '700', cursor: 'pointer' }}>Registrar Pago</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminDashboard;
