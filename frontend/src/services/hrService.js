import api from './api';

const hrService = {
  // ── Employees ──
  getEmployees:  (params) => api.get('/hr/employees', { params }),
  getEmployee:   (id)     => api.get(`/hr/employees/${id}`),
  createEmployee:(data)   => api.post('/hr/employees', data),
  updateEmployee:(id, data) => api.put(`/hr/employees/${id}`, data),
  deleteEmployee:(id)     => api.delete(`/hr/employees/${id}`),

  // ── Departments ──
  getDepartments:  ()       => api.get('/hr/departments'),
  createDepartment:(data)   => api.post('/hr/departments', data),
  updateDepartment:(id, d)  => api.put(`/hr/departments/${id}`, d),
  deleteDepartment:(id)     => api.delete(`/hr/departments/${id}`),

  // ── Designations ──
  getDesignations:  ()      => api.get('/hr/designations'),
  createDesignation:(data)  => api.post('/hr/designations', data),
  updateDesignation:(id, d) => api.put(`/hr/designations/${id}`, d),

  // ── Organigram ──
  getOrganigram: () => api.get('/hr/organigram'),

  // ── Timesheets ──
  getTimesheets:     (params) => api.get('/hr/timesheets', { params }),
  createTimesheet:   (data)   => api.post('/hr/timesheets', data),
  updateTimesheet:   (id, d)  => api.put(`/hr/timesheets/${id}`, d),
  approveTimesheet:  (id)     => api.put(`/hr/timesheets/${id}/approve`),
  rejectTimesheet:   (id, reason) => api.put(`/hr/timesheets/${id}/reject`, { reason }),
  getMyTimesheets:   (params) => api.get('/hr/timesheets/my', { params }),

  // ── Leaves ──
  getLeaves:    (params) => api.get('/hr/leaves', { params }),
  getMyLeaves:  (params) => api.get('/hr/leaves/my', { params }),
  requestLeave: (data)   => api.post('/hr/leaves', data),
  approveLeave: (id)     => api.put(`/hr/leaves/${id}/approve`),
  rejectLeave:  (id)     => api.put(`/hr/leaves/${id}/reject`),

  // ── Salaries ──
  getSalaryHistory: (employeeId) => api.get(`/hr/employees/${employeeId}/salaries`),
  createSalary:     (data)       => api.post('/hr/salaries', data),

  // ── Recruitment ──
  getVacancies:    (params) => api.get('/hr/recruitment/vacancies', { params }),
  createVacancy:   (data)   => api.post('/hr/recruitment/vacancies', data),
  updateVacancy:   (id, d)  => api.put(`/hr/recruitment/vacancies/${id}`, d),
  getApplicants:   (vacancyId) => api.get(`/hr/recruitment/vacancies/${vacancyId}/applicants`),
  createApplicant: (data)   => api.post('/hr/recruitment/applicants', data),
  updateApplicantStage: (id, stage) => api.put(`/hr/recruitment/applicants/${id}/stage`, { stage }),

  // ── Performance ──
  getReviews:   (params) => api.get('/hr/performance/reviews', { params }),
  createReview: (data)   => api.post('/hr/performance/reviews', data),
  updateReview: (id, d)  => api.put(`/hr/performance/reviews/${id}`, d),

  // ── Skills Gap ──
  getSkillsGap:        (employeeId) => api.get(`/hr/skills-gap/${employeeId}`),
  getDeptSkillsGap:    (deptId)     => api.get(`/hr/skills-gap/dept/${deptId}`),
  updateEmployeeSkills:(id, data)   => api.put(`/hr/employees/${id}/skills`, data),
};

export default hrService;