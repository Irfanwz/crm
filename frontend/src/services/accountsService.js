import api from './api';

const accountsService = {
  // ── Chart of Accounts ──
  getAccounts:   ()      => api.get('/accounts/chart'),
  createAccount: (data)  => api.post('/accounts/chart', data),
  updateAccount: (id, d) => api.put(`/accounts/chart/${id}`, d),
  deleteAccount: (id)    => api.delete(`/accounts/chart/${id}`),

  // ── Vendors ──
  getVendors:   (params) => api.get('/accounts/vendors', { params }),
  createVendor: (data)   => api.post('/accounts/vendors', data),
  updateVendor: (id, d)  => api.put(`/accounts/vendors/${id}`, d),
  deleteVendor: (id)     => api.delete(`/accounts/vendors/${id}`),

  // ── Bills (AP) ──
  getBills:    (params) => api.get('/accounts/bills', { params }),
  getBill:     (id)     => api.get(`/accounts/bills/${id}`),
  createBill:  (data)   => api.post('/accounts/bills', data),
  updateBill:  (id, d)  => api.put(`/accounts/bills/${id}`, d),
  payBill:     (id, data) => api.post(`/accounts/bills/${id}/pay`, data),

  // ── Invoices (AR) ──
  getAllInvoices: (params) => api.get('/accounts/invoices', { params }),
  getArAging:    ()        => api.get('/accounts/ar-aging'),
  getApAging:    ()        => api.get('/accounts/ap-aging'),

  // ── Expenses ──
  getExpenses:    (params) => api.get('/accounts/expenses', { params }),
  getMyExpenses:  (params) => api.get('/accounts/expenses/my', { params }),
  createExpense:  (data)   => api.post('/accounts/expenses', data),
  updateExpense:  (id, d)  => api.put(`/accounts/expenses/${id}`, d),
  approveExpense: (id)     => api.put(`/accounts/expenses/${id}/approve`),
  rejectExpense:  (id)     => api.put(`/accounts/expenses/${id}/reject`),
  uploadReceipt:  (id, formData) => api.post(`/accounts/expenses/${id}/receipt`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),

  // ── Fixed Costs ──
  getFixedCosts:   ()      => api.get('/accounts/fixed-costs'),
  createFixedCost: (data)  => api.post('/accounts/fixed-costs', data),
  updateFixedCost: (id, d) => api.put(`/accounts/fixed-costs/${id}`, d),
  deleteFixedCost: (id)    => api.delete(`/accounts/fixed-costs/${id}`),

  // ── Cost Centers ──
  getCostCenters:   ()      => api.get('/accounts/cost-centers'),
  createCostCenter: (data)  => api.post('/accounts/cost-centers', data),
  updateCostCenter: (id, d) => api.put(`/accounts/cost-centers/${id}`, d),

  // ── Budgets ──
  getBudgets:    (params) => api.get('/accounts/budgets', { params }),
  createBudget:  (data)   => api.post('/accounts/budgets', data),
  updateBudget:  (id, d)  => api.put(`/accounts/budgets/${id}`, d),
  getBudgetVsActual: (params) => api.get('/accounts/budget-vs-actual', { params }),

  // ── P&L ──
  getCompanyPnL:  (params) => api.get('/accounts/pnl/company', { params }),
  getProjectPnL:  (projectId, params) => api.get(`/accounts/pnl/project/${projectId}`, { params }),
  getEmployeePnL: (employeeId, params) => api.get(`/accounts/pnl/employee/${employeeId}`, { params }),
  getMonthlyPnL:  (params) => api.get('/accounts/pnl/monthly', { params }),

  // ── Cost Calculations ──
  getEmployeeHourlyCost: (employeeId, month) =>
    api.get(`/accounts/costs/employee/${employeeId}`, { params: { month } }),
  getOrgOverheadHourly: (month) =>
    api.get('/accounts/costs/overhead', { params: { month } }),
  getProjectTrueCost: (projectId) =>
    api.get(`/accounts/costs/project/${projectId}`),
};

export default accountsService;