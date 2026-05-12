import api from './api';

const projectService = {
  // ── Estimates ──
  getEstimates:    (params) => api.get('/projects/estimates', { params }),
  getEstimate:     (id)     => api.get(`/projects/estimates/${id}`),
  createEstimate:  (data)   => api.post('/projects/estimates', data),
  updateEstimate:  (id, d)  => api.put(`/projects/estimates/${id}`, d),
  approveEstimate: (id)     => api.put(`/projects/estimates/${id}/approve`),
  rejectEstimate:  (id)     => api.put(`/projects/estimates/${id}/reject`),
  sendEstimate:    (id)     => api.put(`/projects/estimates/${id}/send`),

  // ── Projects ──
  getProjects:    (params) => api.get('/projects', { params }),
  getProject:     (id)     => api.get(`/projects/${id}`),
  createProject:  (data)   => api.post('/projects', data),
  updateProject:  (id, d)  => api.put(`/projects/${id}`, d),
  deleteProject:  (id)     => api.delete(`/projects/${id}`),
  getProjectStats:(id)     => api.get(`/projects/${id}/stats`),

  // ── Tasks / WBS ──
  getTasks:     (projectId, params) => api.get(`/projects/${projectId}/tasks`, { params }),
  getTask:      (projectId, taskId) => api.get(`/projects/${projectId}/tasks/${taskId}`),
  createTask:   (projectId, data)   => api.post(`/projects/${projectId}/tasks`, data),
  updateTask:   (projectId, taskId, d) => api.put(`/projects/${projectId}/tasks/${taskId}`, d),
  deleteTask:   (projectId, taskId) => api.delete(`/projects/${projectId}/tasks/${taskId}`),
  reorderTasks: (projectId, order)  => api.put(`/projects/${projectId}/tasks/reorder`, { order }),

  // ── Deliverables ──
  getDeliverables:   (projectId) => api.get(`/projects/${projectId}/deliverables`),
  createDeliverable: (projectId, data) => api.post(`/projects/${projectId}/deliverables`, data),
  updateDeliverable: (projectId, id, d) => api.put(`/projects/${projectId}/deliverables/${id}`, d),
  approveDeliverable:(projectId, id) => api.put(`/projects/${projectId}/deliverables/${id}/approve`),

  // ── Invoices ──
  getInvoices:   (projectId) => api.get(`/projects/${projectId}/invoices`),
  createInvoice: (projectId, data) => api.post(`/projects/${projectId}/invoices`, data),
  updateInvoice: (projectId, id, d) => api.put(`/projects/${projectId}/invoices/${id}`, d),
  recordPayment: (projectId, id, data) => api.post(`/projects/${projectId}/invoices/${id}/payment`, data),
  downloadInvoice:(projectId, id) => api.get(`/projects/${projectId}/invoices/${id}/pdf`, { responseType: 'blob' }),

  // ── Documents ──
  getProjectDocs:    (projectId) => api.get(`/projects/${projectId}/documents`),
  uploadProjectDoc:  (projectId, formData) => api.post(`/projects/${projectId}/documents`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  deleteProjectDoc:  (projectId, docId) => api.delete(`/projects/${projectId}/documents/${docId}`),

  // ── Meeting Minutes ──
  getProjectMeetings:  (projectId) => api.get(`/projects/${projectId}/meetings`),
  createProjectMeeting:(projectId, data) => api.post(`/projects/${projectId}/meetings`, data),
  updateProjectMeeting:(projectId, id, d) => api.put(`/projects/${projectId}/meetings/${id}`, d),

  // ── ClickUp ──
  syncClickUp:  (projectId) => api.post(`/projects/${projectId}/sync-clickup`),
  setClickUpList:(projectId, listId) => api.put(`/projects/${projectId}/clickup`, { list_id: listId }),

  // ── Client Portal ──
  getPortalProject:  (id) => api.get(`/portal/projects/${id}`),
  getPortalProjects: ()   => api.get('/portal/projects'),
  portalLogin: (email, password) => api.post('/portal/login', { email, password }),

  // ── Clients ──
  getClients:   (params) => api.get('/projects/clients', { params }),
  getClient:    (id)     => api.get(`/projects/clients/${id}`),
  createClient: (data)   => api.post('/projects/clients', data),
  updateClient: (id, d)  => api.put(`/projects/clients/${id}`, d),
};

export default projectService;