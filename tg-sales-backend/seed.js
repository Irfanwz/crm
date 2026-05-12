import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seed() {
  console.log('🌱 Seeding database...\n');

  // ── 1. Sales Teams ─────────────────────────────────────────
  const { data: teams, error: teamsErr } = await supabase
    .from('sales_team')
    .insert([
      { name: 'Alpha Squad',   description: 'Enterprise & large account team' },
      { name: 'Beta Force',    description: 'SMB and mid-market team' },
      { name: 'Growth Hunters',description: 'New market expansion team' },
    ])
    .select();
  if (teamsErr) { console.error('❌ sales_team:', teamsErr.message); return; }
  console.log('✅ sales_team:', teams.length, 'rows');

  // ── 2. Sales Persons ───────────────────────────────────────
  const { data: persons, error: personsErr } = await supabase
    .from('sales_person')
    .insert([
      { sales_team_id: teams[0].id, hire_date: '2023-01-15', target: 120000, status: 'ACTIVE' },
      { sales_team_id: teams[0].id, hire_date: '2023-03-01', target: 95000,  status: 'ACTIVE' },
      { sales_team_id: teams[1].id, hire_date: '2023-06-10', target: 80000,  status: 'ACTIVE' },
      { sales_team_id: teams[1].id, hire_date: '2024-01-20', target: 75000,  status: 'ACTIVE' },
      { sales_team_id: teams[2].id, hire_date: '2024-03-05', target: 60000,  status: 'ACTIVE' },
    ])
    .select();
  if (personsErr) { console.error('❌ sales_person:', personsErr.message); return; }
  console.log('✅ sales_person:', persons.length, 'rows');

  const [sp1, sp2, sp3, sp4, sp5] = persons;

  // ── 3. Sales Quotes (Deals) ────────────────────────────────
  const { data: quotes, error: quotesErr } = await supabase
    .from('sales_quote')
    .insert([
      { sales_person_id: sp1.id, client_name: 'Nexus Corporation',   amount: 48500,  status: 'Closed Won',  activities: ['Contact: Ahmed Khan', 'Probability: 100%', 'Expected Close: 2025-03-15'] },
      { sales_person_id: sp1.id, client_name: 'Skyline Logistics',   amount: 32000,  status: 'Negotiation', activities: ['Contact: Sarah Lee', 'Probability: 75%', 'Expected Close: 2025-06-20'] },
      { sales_person_id: sp2.id, client_name: 'Innovate AI Ltd',     amount: 71000,  status: 'Proposal',    activities: ['Contact: James Wu', 'Probability: 55%', 'Expected Close: 2025-07-01'] },
      { sales_person_id: sp2.id, client_name: 'Gulf Traders FZCO',   amount: 19500,  status: 'Qualified',   activities: ['Contact: Fatima Al-Amin', 'Probability: 40%', 'Expected Close: 2025-08-10'] },
      { sales_person_id: sp3.id, client_name: 'TechBridge Solutions', amount: 55000, status: 'Discovery',   activities: ['Contact: Raj Patel', 'Probability: 20%', 'Expected Close: 2025-09-30'] },
      { sales_person_id: sp3.id, client_name: 'Orion Systems',       amount: 28000,  status: 'Closed Won',  activities: ['Contact: Maria Santos', 'Probability: 100%', 'Expected Close: 2025-04-01'] },
      { sales_person_id: sp4.id, client_name: 'Pinnacle Group',      amount: 42000,  status: 'Negotiation', activities: ['Contact: David Osei', 'Probability: 70%', 'Expected Close: 2025-06-15'] },
      { sales_person_id: sp4.id, client_name: 'CloudSync Inc',       amount: 15000,  status: 'Closed Lost', activities: ['Contact: Aiko Tanaka', 'Probability: 0%', 'Expected Close: 2025-05-01'] },
      { sales_person_id: sp5.id, client_name: 'Delta Ventures',      amount: 88000,  status: 'Proposal',    activities: ['Contact: Omar Hassan', 'Probability: 60%', 'Expected Close: 2025-07-20'] },
      { sales_person_id: sp5.id, client_name: 'Meridian Holdings',   amount: 33500,  status: 'Discovery',   activities: ['Contact: Priya Sharma', 'Probability: 25%', 'Expected Close: 2025-10-01'] },
    ])
    .select();
  if (quotesErr) { console.error('❌ sales_quote:', quotesErr.message); return; }
  console.log('✅ sales_quote:', quotes.length, 'rows');

  // ── 4. Sales Activities ────────────────────────────────────
  const { data: activities, error: activitiesErr } = await supabase
    .from('sales_activity')
    .insert([
      { sales_person_id: sp1.id, type: 'Call',    description: 'Discovery call with Nexus Corp stakeholders', date: '2025-05-01', outcome: 'Positive — requested full proposal' },
      { sales_person_id: sp1.id, type: 'Meeting', description: 'On-site demo at Skyline Logistics HQ',        date: '2025-05-03', outcome: 'Decision maker engaged, in final review' },
      { sales_person_id: sp2.id, type: 'Email',   description: 'Sent pricing deck to Innovate AI',            date: '2025-05-04', outcome: 'Follow-up scheduled for next week' },
      { sales_person_id: sp2.id, type: 'Call',    description: 'Qualification call with Gulf Traders',        date: '2025-05-05', outcome: 'Budget confirmed, moving to proposal' },
      { sales_person_id: sp3.id, type: 'Meeting', description: 'Initial pitch to TechBridge Solutions',       date: '2025-05-06', outcome: 'Interest shown, needs internal approval' },
      { sales_person_id: sp4.id, type: 'Call',    description: 'Contract negotiation with Pinnacle Group',    date: '2025-05-07', outcome: 'Minor revisions requested on SLA terms' },
      { sales_person_id: sp5.id, type: 'Email',   description: 'Sent ROI analysis to Delta Ventures',         date: '2025-05-07', outcome: 'Awaiting response from CFO' },
    ])
    .select();
  if (activitiesErr) { console.error('❌ sales_activity:', activitiesErr.message); return; }
  console.log('✅ sales_activity:', activities.length, 'rows');

  // ── 5. CRM Records ─────────────────────────────────────────
  const { data: crmRecords, error: crmErr } = await supabase
    .from('crm')
    .insert([
      { sales_person_id: sp1.id, client_name: 'Nexus Corporation',  contact_info: 'ahmed@nexus.com | +971-50-111-2222', scheduled_date: '2025-05-15', report_notes: 'Quarterly review meeting', status: 'SCHEDULED' },
      { sales_person_id: sp2.id, client_name: 'Innovate AI Ltd',    contact_info: 'james@innovateai.io | +1-415-555-0101', scheduled_date: '2025-05-20', report_notes: 'Technical requirements gathering', status: 'SCHEDULED' },
      { sales_person_id: sp3.id, client_name: 'Orion Systems',      contact_info: 'maria@orion.com | +44-20-7946-0321', scheduled_date: '2025-05-10', report_notes: 'Post-sale onboarding check-in', status: 'COMPLETED' },
      { sales_person_id: sp4.id, client_name: 'Pinnacle Group',     contact_info: 'david@pinnacle.co | +233-30-222-5678', scheduled_date: '2025-05-22', report_notes: 'Contract finalisation meeting', status: 'SCHEDULED' },
      { sales_person_id: sp5.id, client_name: 'Delta Ventures',     contact_info: 'omar@deltaventures.ae | +971-4-333-4444', scheduled_date: '2025-06-01', report_notes: 'Executive presentation to board', status: 'PENDING' },
    ])
    .select();
  if (crmErr) { console.error('❌ crm:', crmErr.message); return; }
  console.log('✅ crm:', crmRecords.length, 'rows');

  // ── 6. Inquiries ────────────────────────────────────────────
  const { data: inquiries, error: inquiriesErr } = await supabase
    .from('inquiry')
    .insert([
      { client_name: 'Startech FZCO',    contact_info: 'info@startech.ae',      message: 'Interested in enterprise CRM package for 200 users', status: 'NEW' },
      { client_name: 'BlueOcean Retail', contact_info: 'ops@blueocean.com',     message: 'Need demo of sales automation module',              status: 'IN_PROGRESS' },
      { client_name: 'Vertex Capital',   contact_info: 'vc@vertexcap.io',       message: 'Looking for portfolio management integration',      status: 'NEW' },
      { client_name: 'Momentum Freight', contact_info: 'tech@momentumfrt.com',  message: 'Custom reporting requirements for logistics',       status: 'CLOSED' },
      { client_name: 'Apex Digital',     contact_info: 'hello@apexdigital.co',  message: 'Pricing inquiry for 50-seat plan',                  status: 'IN_PROGRESS' },
    ])
    .select();
  if (inquiriesErr) { console.error('❌ inquiry:', inquiriesErr.message); return; }
  console.log('✅ inquiry:', inquiries.length, 'rows');

  // ── 7. Projects ─────────────────────────────────────────────
  const { data: projects, error: projectsErr } = await supabase
    .from('project')
    .insert([
      { name: 'CRM Phase 1 — Nexus Corp',      client_name: 'Nexus Corporation',  status: 'IN_PROGRESS', start_date: '2025-04-01', end_date: '2025-07-31' },
      { name: 'ERP Integration — Orion',        client_name: 'Orion Systems',      status: 'COMPLETED',   start_date: '2025-01-10', end_date: '2025-04-30' },
      { name: 'Mobile App — Delta Ventures',    client_name: 'Delta Ventures',     status: 'PLANNING',    start_date: '2025-06-01', end_date: '2025-10-31' },
      { name: 'Analytics Dashboard — Pinnacle', client_name: 'Pinnacle Group',     status: 'IN_PROGRESS', start_date: '2025-03-15', end_date: '2025-06-30' },
      { name: 'API Gateway — TechBridge',       client_name: 'TechBridge Solutions',status:'ON_HOLD',     start_date: '2025-05-01', end_date: '2025-09-01' },
    ])
    .select();
  if (projectsErr) { console.error('❌ project:', projectsErr.message); return; }
  console.log('✅ project:', projects.length, 'rows');

  // ── 8. Costing ──────────────────────────────────────────────
  const { data: costings, error: costingsErr } = await supabase
    .from('costing')
    .insert([
      { project_id: projects[0].id, proposal_details: 'CRM setup, data migration, training', man_hours: 320, hourly_rate: 85,  status: 'APPROVED' },
      { project_id: projects[1].id, proposal_details: 'ERP module integration & testing',    man_hours: 240, hourly_rate: 90,  status: 'INVOICED' },
      { project_id: projects[2].id, proposal_details: 'Mobile app UI/UX and backend APIs',   man_hours: 600, hourly_rate: 75,  status: 'DRAFT' },
      { project_id: projects[3].id, proposal_details: 'Custom dashboard & reporting suite',  man_hours: 180, hourly_rate: 95,  status: 'APPROVED' },
      { project_id: projects[4].id, proposal_details: 'API gateway design and deployment',   man_hours: 400, hourly_rate: 80,  status: 'PENDING' },
    ])
    .select();
  if (costingsErr) { console.error('❌ costing:', costingsErr.message); return; }
  console.log('✅ costing:', costings.length, 'rows');

  // ── 9. Commissions ──────────────────────────────────────────
  const closedWon = quotes.filter(q => q.status === 'Closed Won');
  if (closedWon.length > 0 && crmRecords.length > 0) {
    const { data: commissions, error: commissionsErr } = await supabase
      .from('commission')
      .insert(closedWon.map((q, i) => ({
        sales_person_id: q.sales_person_id,
        crm_id:          crmRecords[i % crmRecords.length].id,
        amount:          q.amount,
        percentage:      8,
        status:          'PENDING',
      })))
      .select();
    if (commissionsErr) { console.error('❌ commission:', commissionsErr.message); return; }
    console.log('✅ commission:', commissions.length, 'rows');
  }

  console.log('\n🎉 All done! Database seeded successfully.');
}

seed().catch(console.error);
