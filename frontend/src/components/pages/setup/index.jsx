import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings, Plus, BookOpen, ShieldCheck, Flag, ListChecks, Globe, Palette, Calendar, CreditCard, Lock, Bell, Activity } from 'lucide-react'
import { GlassCard } from '../../ui/GlassCard'
import Button from '../../ui/Button'
import Modal from '../../ui/Modal'
import { Input } from '../../ui/Input'
import { toast } from 'react-hot-toast'

const SETUP_CONTENT = {
  'Company details': {
    title: 'Company Identity',
    icon: Globe,
    items: [
      { label: 'Company Name', content: 'TG Sales Ai Technologies Inc.' },
      { label: 'Industry', content: 'Enterprise Software / SaaS' },
      { label: 'Headquarters', content: 'San Francisco, CA' }
    ]
  },
  'Logo & branding': {
    title: 'Brand Assets',
    icon: Palette,
    items: [
      { label: 'Primary Logo', content: 'nex_logo_dark.svg' },
      { label: 'Brand Color', content: '#6366f1 (Indigo)' },
      { label: 'Typography', content: 'Inter / Plus Jakarta Sans' }
    ]
  },
  'Fiscal settings': {
    title: 'Financial Configuration',
    icon: Calendar,
    items: [
      { label: 'Fiscal Year Start', content: 'January 1st' },
      { label: 'Tax ID', content: 'XX-XXXXXXX' },
      { label: 'Reporting Basis', content: 'Accrual' }
    ]
  },
  'Currencies': {
    title: 'Multi-Currency Support',
    icon: CreditCard,
    items: [
      { label: 'Base Currency', content: 'USD ($)' },
      { label: 'Enabled Currencies', content: 'EUR, GBP, JPY, AUD' },
      { label: 'FX Sync', content: 'Automatic (Daily)' }
    ]
  },
  'User roles & permissions': {
    title: 'Access Control',
    icon: Lock,
    items: [
      { label: 'Default Role', content: 'Standard User' },
      { label: 'Auth Method', content: 'SSO / SAML 2.0' },
      { label: 'MFA', content: 'Enforced for Admins' }
    ]
  },
  'Notification settings': {
    title: 'System Alerts',
    icon: Bell,
    items: [
      { label: 'Email Alerts', content: 'Daily Digest' },
      { label: 'Push Notifications', content: 'Enabled' },
      { label: 'Webhook URL', content: 'https://hooks.nexttocrm.io/...' }
    ]
  }
}

export default function Setup() {
  const [subTab, setSubTab] = useState('Company details')
  const [showDeepDive, setShowDeepDive] = useState(false)

  return (
    <div className="space-y-10 pb-20">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                <Settings size={18} className="text-indigo-400" />
              </div>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.3em]">Setup</span>
            </motion.div>
            <h1 className="text-5xl font-black text-white tracking-tightest">Setup</h1>
            <p className="text-slate-500 text-sm mt-4 font-medium max-w-2xl leading-relaxed">
              Central configuration for your company identity — logo, branding, contact details, fiscal year, currencies, and system-wide preferences.
            </p>
          </div>

          {/* Setup Tags */}
          <div className="flex flex-wrap gap-3">
            {Object.keys(SETUP_CONTENT).map(tag => (
              <span 
                key={tag} 
                onClick={() => setSubTab(tag)}
                className={`px-5 py-2.5 rounded-full border transition-all cursor-pointer text-xs font-bold
                  ${subTab === tag 
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                    : 'bg-white/[0.03] border-white/[0.05] text-slate-400 hover:text-white hover:bg-white/[0.06]'}`}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="pt-4 border-t border-white/[0.05]">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-[10px] font-black text-slate-600 uppercase tracking-widest">Integrates with:</span>
              <div className="flex gap-2">
                <span className="px-4 py-1.5 rounded-xl bg-indigo-500/5 border border-indigo-500/10 text-indigo-400/80 text-[10px] font-black uppercase tracking-widest">
                  All modules
                </span>
              </div>
            </div>

            <button 
              onClick={() => setShowDeepDive(true)}
              className="px-8 py-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-white text-sm font-bold flex items-center gap-3 hover:bg-white/[0.05] transition-all group"
            >
              Deep dive into Setup module
              <svg className="w-4 h-4 text-slate-500 group-hover:text-white transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" className="hidden group-hover:block" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tab Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={subTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {(() => {
            const Icon = SETUP_CONTENT[subTab].icon;
            return (
              <GlassCard className="p-8">
                <h3 className="text-indigo-400 font-bold text-lg mb-6 flex items-center gap-3">
                  <Icon size={20} />
                  {SETUP_CONTENT[subTab].title}
                </h3>
                <div className="space-y-6">
                  {SETUP_CONTENT[subTab].items.map((item, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/10 transition-all">
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">{item.label}</p>
                      <p className="text-white text-sm leading-relaxed font-medium">{item.content}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })()}
          
          <GlassCard className="p-8 flex flex-col justify-center items-center text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Settings size={32} className="text-indigo-500" />
            </div>
            <h4 className="text-white font-bold">System Configuration</h4>
            <p className="text-slate-500 text-xs max-w-[250px]">All {subTab} changes apply globally across NexCRM.</p>
            <Button variant="secondary" size="sm" onClick={() => toast.success(`${subTab} management coming soon!`)}>Manage {subTab}</Button>
          </GlassCard>
        </motion.div>
      </AnimatePresence>

      {/* Deep Dive Modal */}
      <Modal
        open={showDeepDive}
        onClose={() => setShowDeepDive(false)}
        title="Setup Module: Deep Dive"
        size="lg"
        footer={<Button variant="primary" onClick={() => setShowDeepDive(false)}>Close Overview</Button>}
      >
        <div className="space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Globe, title: 'Identity', desc: 'Centralized company profile and global branding assets.' },
              { icon: Lock, title: 'Security', desc: 'Enterprise-grade access control and role-based permissions.' },
              { icon: Bell, title: 'Automation', desc: 'System-wide notification routing and webhook management.' },
            ].map((box, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/[0.05] space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center">
                  <box.icon size={24} className="text-indigo-400" />
                </div>
                <h5 className="text-white font-bold">{box.title}</h5>
                <p className="text-slate-500 text-xs leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>

          <div className="p-8 rounded-[2.5rem] bg-indigo-500/5 border border-indigo-500/10">
            <div className="flex items-center gap-4 mb-6">
              <ListChecks className="text-indigo-400" />
              <h5 className="text-white font-bold text-lg">Foundation Framework</h5>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              The Setup module is the bedrock of your NexCRM instance. It handles the critical "source of truth" configurations that power all other functional modules, from financial reporting to user access.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Global Preferences', 'Role Governance', 'Brand Sync', 'Multi-currency Core'].map(feat => (
                <span key={feat} className="px-3 py-1 rounded-lg bg-white/[0.03] text-[10px] font-bold text-slate-500 uppercase tracking-widest border border-white/[0.05]">
                  {feat}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}
