import api from './api';

const salesService = {
  // ── Teams ──
  getTeams:    () => api.get('/sales-team'),
  createTeam:  (data) => api.post('/sales-team', data),
  
  // ── Persons ──
  getPersons:  () => api.get('/sales-person'),
  createPerson:(data) => api.post('/sales-person', data),

  // ── Deals / Quotes ──
  getQuotes:   () => api.get('/sales-quote'),
  createQuote: (data) => api.post('/sales-quote', data),

  // ── Activities ──
  getActivities:   () => api.get('/sales-activity'),
  createActivity:  (data) => api.post('/sales-activity', data),

  // ── CRM Records ──
  getCRMRecords:   () => api.get('/crm'),
  createCRMRecord: (data) => api.post('/crm', data),

  // ── Commissions ──
  getCommissions:  () => api.get('/commission'),
  createCommission:(data) => api.post('/commission', data),

  // ── Inquiries ──
  getInquiries:    () => api.get('/inquiry'),
  createInquiry:   (data) => api.post('/inquiry', data),

  // ── Projects ──
  getProjects:     () => api.get('/project'),
  createProject:   (data) => api.post('/project', data),

  // ── Costing ──
  getCosting:      () => api.get('/costing'),
  createCosting:   (data) => api.post('/costing', data),
};

export default salesService;