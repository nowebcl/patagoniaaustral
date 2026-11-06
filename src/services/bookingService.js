// ====================================================
// AUSTRAL PATAGONIA NAVIERA - BOOKING & ADMIN SERVICE
// Reactive LocalStorage persistence for Bookings, Clients & Payments
// ====================================================

const STORAGE_KEYS = {
  RESERVATIONS: 'austral_patagonia_reservations_v1',
  CLIENTS: 'austral_patagonia_clients_v1',
  PAYMENTS: 'austral_patagonia_payments_v1',
};

const SEED_RESERVATIONS = [
  {
    id: 'APN-2026-1082',
    customerName: 'Camila Valenzuela',
    customerEmail: 'c.valenzuela@gmail.com',
    customerPhone: '+56 9 8451 2290',
    customerDoc: '18.421.905-3',
    cityCountry: 'Santiago, Chile',
    tourId: 1,
    tourTitle: 'Navegación Lago Todos los Santos y Villa Peulla',
    tourImage: '/assets/images/tours/navegacion-peulla.jpg',
    date: '2026-11-12',
    adults: 2,
    children: 1,
    hotel: 'Hotel Cumbres Puerto Varas',
    totalClp: 91800,
    totalUsd: 92,
    status: 'Confirmada', // Confirmada, Pendiente, Completada, Cancelada
    paymentStatus: 'Pagado', // Pagado, Pendiente, Reembolsado
    paymentMethod: 'WebPay / Tarjeta',
    createdAt: '2026-11-04 14:22',
    notes: 'Pasajeros solicitan asiento cerca de la ventana en catamarán.',
  },
  {
    id: 'APN-2026-1083',
    customerName: 'Matías Silva Echeverría',
    customerEmail: 'msilva@turismoaustral.cl',
    customerPhone: '+56 9 9123 4872',
    customerDoc: '15.932.110-K',
    cityCountry: 'Concepción, Chile',
    tourId: 2,
    tourTitle: 'Cruce Andino: Puerto Varas a Bariloche',
    tourImage: '/assets/images/tours/cruce-andino.jpg',
    date: '2026-11-15',
    adults: 2,
    children: 0,
    hotel: 'Hotel Radisson Puerto Varas',
    totalClp: 552000,
    totalUsd: 554,
    status: 'Confirmada',
    paymentStatus: 'Pagado',
    paymentMethod: 'Transferencia',
    createdAt: '2026-11-05 09:10',
    notes: 'Equipaje grande x 2 maletas. Conexión directa a hotel en Bariloche.',
  },
  {
    id: 'APN-2026-1084',
    customerName: 'Hans & Greta Weber',
    customerEmail: 'hans.weber@munich-travel.de',
    customerPhone: '+49 170 882194',
    customerDoc: 'C48291054',
    cityCountry: 'Múnich, Alemania',
    tourId: 3,
    tourTitle: 'Volcán Osorno y Saltos del Petrohué',
    tourImage: '/assets/images/tours/volcan-osorno-petrohue.jpg',
    date: '2026-11-18',
    adults: 2,
    children: 0,
    hotel: 'Hotel Diego de Almagro Puerto Montt',
    totalClp: 74000,
    totalUsd: 74,
    status: 'Pendiente',
    paymentStatus: 'Pendiente',
    paymentMethod: 'Transferencia',
    createdAt: '2026-11-05 18:40',
    notes: 'Guía en idioma inglés solicitado con anticipación.',
  },
  {
    id: 'APN-2026-1085',
    customerName: 'Luciana Di Marco',
    customerEmail: 'luciana.dimarco@hotmail.com',
    customerPhone: '+54 9 11 4402 1988',
    customerDoc: 'DNI 34.920.114',
    cityCountry: 'Buenos Aires, Argentina',
    tourId: 5,
    tourTitle: 'Chiloé Mágico: Castro, Dalcahue y Palafitos',
    tourImage: '/assets/images/tours/chiloe-castro-dalcahue.jpg',
    date: '2026-11-20',
    adults: 3,
    children: 1,
    hotel: 'Costanera Hotel Puerto Montt',
    totalClp: 187000,
    totalUsd: 187,
    status: 'Confirmada',
    paymentStatus: 'Pagado',
    paymentMethod: 'WebPay / Tarjeta',
    createdAt: '2026-11-06 08:05',
    notes: 'Interés especial en feria artesanal de Dalcahue y gastronomía chilota.',
  },
  {
    id: 'APN-2026-1086',
    customerName: 'Rodrigo Almonacid',
    customerEmail: 'ralmonacid@surinversiones.cl',
    customerPhone: '+56 9 7780 1209',
    customerDoc: '16.702.441-2',
    cityCountry: 'Puerto Montt, Chile',
    tourId: 6,
    tourTitle: 'Termas del Sol & Cochamó Relajante',
    tourImage: '/assets/images/tours/termas-del-sol.jpg',
    date: '2026-11-22',
    adults: 2,
    children: 0,
    hotel: 'Cabañas Puerto Varas',
    totalClp: 116000,
    totalUsd: 116,
    status: 'Completada',
    paymentStatus: 'Pagado',
    paymentMethod: 'Transferencia',
    createdAt: '2026-10-28 11:15',
    notes: 'Excursión realizada con éxito. Pasajeros muy conformes con el servicio.',
  },
  {
    id: 'APN-2026-1087',
    customerName: 'Esteban Morales',
    customerEmail: 'emorales@empresa.com',
    customerPhone: '+56 9 6610 9940',
    customerDoc: '17.112.580-4',
    cityCountry: 'Santiago, Chile',
    tourId: 7,
    tourTitle: 'Transfer Aeropuerto El Tepual a Puerto Varas / Puerto Montt',
    tourImage: '/assets/images/tours/transfer-el-tepual-puerto-varas.jpg',
    date: '2026-11-10',
    adults: 4,
    children: 0,
    hotel: 'Vuelo Latam LA071 (Llegada 14:15 hrs)',
    totalClp: 48000,
    totalUsd: 48,
    status: 'Cancelada',
    paymentStatus: 'Reembolsado',
    paymentMethod: 'WebPay / Tarjeta',
    createdAt: '2026-11-02 16:30',
    notes: 'Cancelado por reprogramación de vuelo de cliente. Reembolso procesado.',
  },
];

const SEED_CLIENTS = [
  {
    id: 'CLI-001',
    name: 'Camila Valenzuela',
    email: 'c.valenzuela@gmail.com',
    phone: '+56 9 8451 2290',
    doc: '18.421.905-3',
    cityCountry: 'Santiago, Chile',
    totalBookings: 1,
    totalSpentClp: 91800,
    status: 'Activo',
    lastBookingDate: '2026-11-04',
  },
  {
    id: 'CLI-002',
    name: 'Matías Silva Echeverría',
    email: 'msilva@turismoaustral.cl',
    phone: '+56 9 9123 4872',
    doc: '15.932.110-K',
    cityCountry: 'Concepción, Chile',
    totalBookings: 2,
    totalSpentClp: 686000,
    status: 'VIP',
    lastBookingDate: '2026-11-05',
  },
  {
    id: 'CLI-003',
    name: 'Hans & Greta Weber',
    email: 'hans.weber@munich-travel.de',
    phone: '+49 170 882194',
    doc: 'C48291054',
    cityCountry: 'Múnich, Alemania',
    totalBookings: 1,
    totalSpentClp: 74000,
    status: 'Nuevo',
    lastBookingDate: '2026-11-05',
  },
  {
    id: 'CLI-004',
    name: 'Luciana Di Marco',
    email: 'luciana.dimarco@hotmail.com',
    phone: '+54 9 11 4402 1988',
    doc: 'DNI 34.920.114',
    cityCountry: 'Buenos Aires, Argentina',
    totalBookings: 1,
    totalSpentClp: 187000,
    status: 'Activo',
    lastBookingDate: '2026-11-06',
  },
  {
    id: 'CLI-005',
    name: 'Rodrigo Almonacid',
    email: 'ralmonacid@surinversiones.cl',
    phone: '+56 9 7780 1209',
    doc: '16.702.441-2',
    cityCountry: 'Puerto Montt, Chile',
    totalBookings: 3,
    totalSpentClp: 312000,
    status: 'VIP',
    lastBookingDate: '2026-10-28',
  },
  {
    id: 'CLI-006',
    name: 'Esteban Morales',
    email: 'emorales@empresa.com',
    phone: '+56 9 6610 9940',
    doc: '17.112.580-4',
    cityCountry: 'Santiago, Chile',
    totalBookings: 1,
    totalSpentClp: 0,
    status: 'Inactivo',
    lastBookingDate: '2026-11-02',
  },
];

const SEED_PAYMENTS = [
  {
    id: 'PAY-301',
    bookingId: 'APN-2026-1082',
    clientName: 'Camila Valenzuela',
    amountClp: 91800,
    amountUsd: 92,
    method: 'WebPay / Transbank',
    status: 'Pagado',
    date: '2026-11-04 14:23',
    refNumber: 'TBK-8849102',
  },
  {
    id: 'PAY-302',
    bookingId: 'APN-2026-1083',
    clientName: 'Matías Silva Echeverría',
    amountClp: 552000,
    amountUsd: 554,
    method: 'Transferencia Bancaria',
    status: 'Pagado',
    date: '2026-11-05 09:20',
    refNumber: 'STDR-339201',
  },
  {
    id: 'PAY-303',
    bookingId: 'APN-2026-1084',
    clientName: 'Hans & Greta Weber',
    amountClp: 74000,
    amountUsd: 74,
    method: 'Transferencia Bancaria',
    status: 'Pendiente',
    date: '2026-11-05 18:40',
    refNumber: 'PEND-77192',
  },
  {
    id: 'PAY-304',
    bookingId: 'APN-2026-1085',
    clientName: 'Luciana Di Marco',
    amountClp: 187000,
    amountUsd: 187,
    method: 'WebPay / Transbank',
    status: 'Pagado',
    date: '2026-11-06 08:06',
    refNumber: 'TBK-9901428',
  },
  {
    id: 'PAY-305',
    bookingId: 'APN-2026-1086',
    clientName: 'Rodrigo Almonacid',
    amountClp: 116000,
    amountUsd: 116,
    method: 'Transferencia Bancaria',
    status: 'Pagado',
    date: '2026-10-28 11:20',
    refNumber: 'BCH-102948',
  },
  {
    id: 'PAY-306',
    bookingId: 'APN-2026-1087',
    clientName: 'Esteban Morales',
    amountClp: 48000,
    amountUsd: 48,
    method: 'WebPay / Transbank',
    status: 'Reembolsado',
    date: '2026-11-03 10:15',
    refNumber: 'REEMB-00491',
  },
];

// Helper to notify all subscribers across components
const notifyChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('austral_data_changed'));
  }
};

export const bookingService = {
  // --- RESERVATIONS ---
  getReservations() {
    if (typeof window === 'undefined') return SEED_RESERVATIONS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RESERVATIONS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(SEED_RESERVATIONS));
        return SEED_RESERVATIONS;
      }
      return JSON.parse(stored);
    } catch {
      return SEED_RESERVATIONS;
    }
  },

  createReservation(bookingData) {
    const reservations = this.getReservations();
    const payments = this.getPayments();
    const clients = this.getClients();

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newId = `APN-2026-${randomNum}`;

    const now = new Date();
    const createdAt = now.toISOString().replace('T', ' ').substring(0, 16);

    const isPaid = bookingData.paymentMethod?.includes('WebPay') || bookingData.paymentStatus === 'Pagado';

    const newReservation = {
      id: newId,
      customerName: bookingData.customerName || 'Cliente Particular',
      customerEmail: bookingData.customerEmail || '',
      customerPhone: bookingData.customerPhone || '',
      customerDoc: bookingData.customerDoc || '',
      cityCountry: bookingData.cityCountry || 'Chile',
      tourId: Number(bookingData.tourId) || 1,
      tourTitle: bookingData.tourTitle || 'Excursión Austral Patagonia',
      tourImage: bookingData.tourImage || '/assets/images/tours/navegacion-peulla.jpg',
      date: bookingData.date || new Date().toISOString().split('T')[0],
      adults: Number(bookingData.adults) || 1,
      children: Number(bookingData.children) || 0,
      hotel: bookingData.hotel || 'Por coordinar',
      totalClp: Number(bookingData.totalClp) || 0,
      totalUsd: Number(bookingData.totalUsd) || 0,
      status: bookingData.status || (isPaid ? 'Confirmada' : 'Pendiente'),
      paymentStatus: isPaid ? 'Pagado' : 'Pendiente',
      paymentMethod: bookingData.paymentMethod || 'WebPay / Tarjeta',
      createdAt,
      notes: bookingData.notes || '',
    };

    // Prepend new reservation
    const updatedReservations = [newReservation, ...reservations];
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updatedReservations));

    // Create corresponding Payment
    const newPayment = {
      id: `PAY-${Math.floor(100 + Math.random() * 900)}`,
      bookingId: newId,
      clientName: newReservation.customerName,
      amountClp: newReservation.totalClp,
      amountUsd: newReservation.totalUsd,
      method: newReservation.paymentMethod,
      status: newReservation.paymentStatus,
      date: createdAt,
      refNumber: isPaid ? `TBK-${Math.floor(1000000 + Math.random() * 9000000)}` : `TRF-${Math.floor(100000 + Math.random() * 900000)}`,
    };
    const updatedPayments = [newPayment, ...payments];
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(updatedPayments));

    // Upsert Client
    const existingClientIndex = clients.findIndex(
      (c) => c.email.toLowerCase() === (newReservation.customerEmail || '').toLowerCase()
    );

    let updatedClients = [...clients];
    if (existingClientIndex >= 0) {
      const existing = updatedClients[existingClientIndex];
      updatedClients[existingClientIndex] = {
        ...existing,
        totalBookings: existing.totalBookings + 1,
        totalSpentClp: existing.totalSpentClp + (isPaid ? newReservation.totalClp : 0),
        lastBookingDate: newReservation.date,
        status: existing.totalBookings >= 2 ? 'VIP' : 'Activo',
        phone: newReservation.customerPhone || existing.phone,
        doc: newReservation.customerDoc || existing.doc,
      };
    } else if (newReservation.customerEmail) {
      updatedClients.unshift({
        id: `CLI-00${clients.length + 1}`,
        name: newReservation.customerName,
        email: newReservation.customerEmail,
        phone: newReservation.customerPhone,
        doc: newReservation.customerDoc,
        cityCountry: newReservation.cityCountry,
        totalBookings: 1,
        totalSpentClp: isPaid ? newReservation.totalClp : 0,
        status: 'Nuevo',
        lastBookingDate: newReservation.date,
      });
    }
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(updatedClients));

    notifyChange();
    return newReservation;
  },

  updateReservation(id, updates) {
    const list = this.getReservations();
    const updated = list.map((item) => (item.id === id ? { ...item, ...updates } : item));
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(updated));

    // Also update associated payment if paymentStatus changed
    if (updates.paymentStatus) {
      const payments = this.getPayments().map((p) => {
        if (p.bookingId === id) {
          return { ...p, status: updates.paymentStatus };
        }
        return p;
      });
      localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
    }

    notifyChange();
    return updated;
  },

  deleteReservation(id) {
    const list = this.getReservations().filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(list));

    const payments = this.getPayments().filter((p) => p.bookingId !== id);
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));

    notifyChange();
    return list;
  },

  // --- CLIENTS ---
  getClients() {
    if (typeof window === 'undefined') return SEED_CLIENTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CLIENTS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(SEED_CLIENTS));
        return SEED_CLIENTS;
      }
      return JSON.parse(stored);
    } catch {
      return SEED_CLIENTS;
    }
  },

  createClient(clientData) {
    const clients = this.getClients();
    const newClient = {
      id: `CLI-00${clients.length + 1}`,
      name: clientData.name || 'Nuevo Cliente',
      email: clientData.email || '',
      phone: clientData.phone || '',
      doc: clientData.doc || '',
      cityCountry: clientData.cityCountry || 'Chile',
      totalBookings: 0,
      totalSpentClp: 0,
      status: 'Nuevo',
      lastBookingDate: 'Sin reservas',
      ...clientData,
    };
    const updated = [newClient, ...clients];
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(updated));
    notifyChange();
    return newClient;
  },

  updateClient(id, updates) {
    const list = this.getClients().map((c) => (c.id === id ? { ...c, ...updates } : c));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(list));
    notifyChange();
    return list;
  },

  deleteClient(id) {
    const list = this.getClients().filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(list));
    notifyChange();
    return list;
  },

  // --- PAYMENTS ---
  getPayments() {
    if (typeof window === 'undefined') return SEED_PAYMENTS;
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(SEED_PAYMENTS));
        return SEED_PAYMENTS;
      }
      return JSON.parse(stored);
    } catch {
      return SEED_PAYMENTS;
    }
  },

  updatePayment(id, updates) {
    const list = this.getPayments().map((p) => (p.id === id ? { ...p, ...updates } : p));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(list));

    // If payment status changed, sync to reservation
    if (updates.status) {
      const payment = list.find((p) => p.id === id);
      if (payment && payment.bookingId) {
        const reservations = this.getReservations().map((r) => {
          if (r.id === payment.bookingId) {
            return {
              ...r,
              paymentStatus: updates.status,
              status: updates.status === 'Pagado' ? 'Confirmada' : r.status,
            };
          }
          return r;
        });
        localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(reservations));
      }
    }

    notifyChange();
    return list;
  },

  createPayment(paymentData) {
    const payments = this.getPayments();
    const newPayment = {
      id: `PAY-${Math.floor(100 + Math.random() * 900)}`,
      bookingId: paymentData.bookingId || 'DIRECTO',
      clientName: paymentData.clientName || 'Cliente',
      amountClp: Number(paymentData.amountClp) || 0,
      amountUsd: Number(paymentData.amountUsd) || 0,
      method: paymentData.method || 'Transferencia Bancaria',
      status: paymentData.status || 'Pagado',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      refNumber: paymentData.refNumber || `MANUAL-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    const updated = [newPayment, ...payments];
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(updated));
    notifyChange();
    return newPayment;
  },

  // --- STATS & KPIS ---
  getStats() {
    const reservations = this.getReservations();
    const clients = this.getClients();
    const payments = this.getPayments();

    const totalRevenueClp = payments
      .filter((p) => p.status === 'Pagado')
      .reduce((sum, p) => sum + (Number(p.amountClp) || 0), 0);

    const totalRevenueUsd = payments
      .filter((p) => p.status === 'Pagado')
      .reduce((sum, p) => sum + (Number(p.amountUsd) || 0), 0);

    const pendingRevenueClp = payments
      .filter((p) => p.status === 'Pendiente')
      .reduce((sum, p) => sum + (Number(p.amountClp) || 0), 0);

    const totalReservations = reservations.length;
    const confirmedReservations = reservations.filter((r) => r.status === 'Confirmada').length;
    const pendingReservations = reservations.filter((r) => r.status === 'Pendiente').length;
    const completedReservations = reservations.filter((r) => r.status === 'Completada').length;
    const cancelledReservations = reservations.filter((r) => r.status === 'Cancelada').length;

    return {
      totalRevenueClp,
      totalRevenueUsd,
      pendingRevenueClp,
      totalReservations,
      confirmedReservations,
      pendingReservations,
      completedReservations,
      cancelledReservations,
      totalClients: clients.length,
      totalPayments: payments.length,
      paidPaymentsCount: payments.filter((p) => p.status === 'Pagado').length,
      pendingPaymentsCount: payments.filter((p) => p.status === 'Pendiente').length,
    };
  },

  // Reset to original demo data
  resetDemoData() {
    localStorage.setItem(STORAGE_KEYS.RESERVATIONS, JSON.stringify(SEED_RESERVATIONS));
    localStorage.setItem(STORAGE_KEYS.CLIENTS, JSON.stringify(SEED_CLIENTS));
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(SEED_PAYMENTS));
    notifyChange();
  },
};
