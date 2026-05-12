import api from './api';

const aiService = {
  // Sales research — given a company name, returns structured intel
  salesResearch: (company_name) =>
    api.post('/ai/sales-research', { company_name }),

  // Summarize raw meeting notes into agenda / decisions / action items
  summarizeMeeting: (raw_notes) =>
    api.post('/ai/meeting-summary', { raw_notes }),

  // Generate email draft for follow-up
  generateFollowupEmail: (deal_context) =>
    api.post('/ai/followup-email', { deal_context }),

  // Analyze deal and suggest next best action
  dealInsights: (deal_id) =>
    api.post('/ai/deal-insights', { deal_id }),

  // Generate job description from designation info
  generateJD: (data) =>
    api.post('/ai/generate-jd', data),

  // Generate SOPs from description
  generateSOP: (data) =>
    api.post('/ai/generate-sop', data),

  // Project risk analysis
  projectRiskAnalysis: (project_id) =>
    api.post('/ai/project-risk', { project_id }),

  // Budget anomaly detection
  budgetAnomalyCheck: (data) =>
    api.post('/ai/budget-anomaly', data),
};

export default aiService;