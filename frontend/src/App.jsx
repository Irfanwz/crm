import { BrowserRouter, Routes, Route, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import {
  Target,
  DollarSign,
  Megaphone,
  Users,
  Briefcase,
  BarChart3,
  RefreshCcw,
  Headphones,
  Settings as SettingsIcon,
  FileText,
  Calendar,
  GraduationCap,
  ChevronLeft,
  ChevronRight,
  Globe,
  LayoutDashboard,
  Settings,
  Zap,
  LogOut,
  ShieldCheck,
} from 'lucide-react'

// Auth
import Login from './components/pages/auth/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
// Setup
import Setup from './components/pages/setup/index'
// Dashboard
import Dashboard from './components/pages/dashboard/index'
// Portal (standalone, no sidebar)
import Portal from './components/pages/portal/index'
// Main app pages
import Strategy from './components/pages/strategy/index'
import HR from './components/pages/hr/index'
import Marketing from './components/pages/marketing/index'
import Sales from './components/pages/sales/index'
import Projects from './components/pages/projects/index'
import Accounts from './components/pages/accounts/index'
import AfterSales from './components/pages/aftersales/index'
import Support from './components/pages/support/index'
import Operations from './components/pages/operations/index'
import Documents from './components/pages/documents/index'
import Meetings from './components/pages/meetings/index'
import Training from './components/pages/training/index'

// 3D Background
import Background3D from './components/layout/Background3D'
// TopBar
import TopBar from './components/layout/TopBar'

// roles: which roles can see this nav item (omit = all roles)
const NAV = [
  { path: '/dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { path: '/strategy',   label: 'Strategy',   icon: Target,       roles: ['admin'] },
  { path: '/sales',      label: 'Sales',      icon: DollarSign,   roles: ['admin', 'sales'] },
  { path: '/marketing',  label: 'Marketing',  icon: Megaphone,    roles: ['admin', 'sales'] },
  { path: '/hr',         label: 'HR',         icon: Users,        roles: ['admin'] },
  { path: '/projects',   label: 'Projects',   icon: Briefcase,    roles: ['admin', 'sales'] },
  { path: '/accounts',   label: 'Accounts',   icon: BarChart3,    roles: ['admin'] },
  { path: '/operations', label: 'Operations', icon: Zap,          roles: ['admin'] },
  { path: '/aftersales', label: 'After Sales',icon: RefreshCcw,   roles: ['admin', 'sales'] },
  { path: '/support',    label: 'Support',    icon: Headphones,   roles: ['admin', 'sales'] },
  { path: '/documents',  label: 'Documents',  icon: FileText },
  { path: '/meetings',   label: 'Meetings',   icon: Calendar,     roles: ['admin', 'sales'] },
  { path: '/training',   label: 'Training',   icon: GraduationCap },
  { path: '/setup',      label: 'Setup',      icon: Settings,     roles: ['admin'] },
]

// Redirects to /login if not authenticated
function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" replace />;
}

// Redirects to /dashboard if user lacks required role
// Usage: <RoleRoute roles={['admin']}><AdminPage /></RoleRoute>
function RoleRoute({ roles, children }) {
  const { hasRole } = useAuth();
  return hasRole(...roles) ? children : <Navigate to="/dashboard" replace />;
}

const ROLE_BADGE = {
  admin: { label: 'Admin',  color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  sales: { label: 'Sales',  color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
  user:  { label: 'User',   color: 'bg-slate-500/20 text-slate-400 border-slate-500/30' },
}

function Sidebar({ collapsed, setCollapsed }) {
  const location = useLocation()
  const navigate  = useNavigate()
  const { user, logout, hasRole } = useAuth()

  const visibleNav = NAV.filter(item =>
    !item.roles || item.roles.some(r => hasRole(r))
  )

  const handleLogout = async () => {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 88 : 280 }}
      className="flex-shrink-0 flex flex-col h-screen sticky top-0 transition-all duration-300 z-40 bg-white/[0.01] dark:bg-black/[0.01] backdrop-blur-2xl border-r border-white/[0.05] shadow-[10px_0_40px_rgba(0,0,0,0.1)]"
    >
      {/* Logo */}
      <div className="flex items-center gap-4 px-6 py-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(99,102,241,0.4)] relative overflow-hidden group">
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <span className="text-white font-bold text-xl drop-shadow-md">T</span>
        </div>
        {!collapsed && (
          <motion.span
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-indigo-600 dark:text-white font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-cyan-400 dark:from-white dark:to-white/60"
          >
            TG Sales Ai
          </motion.span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden px-4 space-y-1.5 scrollbar-hide">
        {visibleNav.map((item) => (
          <NavLink key={item.path} to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group
              ${isActive
                ? 'text-indigo-600 dark:text-white bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white hover:bg-white/[0.03] border border-transparent'}`
            }>
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-indigo-400 to-cyan-400 rounded-r-full shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                  />
                )}
                <item.icon size={20} className={`shrink-0 transition-all duration-300 ${isActive ? 'text-indigo-400 scale-110' : 'group-hover:scale-110 group-hover:text-white'}`} />
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="truncate tracking-wide"
                  >
                    {item.label}
                  </motion.span>
                )}
                {!isActive && !collapsed && (
                  <div className="ml-auto w-1 h-1 rounded-full bg-white/0 group-hover:bg-indigo-400/50 transition-all duration-300"></div>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Collapse Toggle */}
      <div className="px-4 py-4">
        <button
          onClick={() => setCollapsed(c => !c)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/[0.02] dark:bg-black/[0.02] hover:bg-white/[0.05] dark:hover:bg-black/[0.05] border border-white/[0.05] dark:border-black/[0.05] text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-all duration-300 group"
        >
          {collapsed ? <ChevronRight size={20} /> : (
            <>
              <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-xs font-semibold uppercase tracking-widest">Collapse</span>
            </>
          )}
        </button>
      </div>

      {/* Portal link */}
      <div className="px-4 pt-4 border-t border-white/[0.05]">
        <NavLink to="/portal"
          className={({ isActive }) => `flex items-center gap-4 px-4 py-4 rounded-xl text-sm font-medium transition-all duration-500 border border-white/[0.05] shadow-xl group
                     ${isActive
                       ? 'text-indigo-600 dark:text-white bg-indigo-500/10 shadow-[0_0_20px_rgba(99,102,241,0.2)]'
                       : 'text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white bg-gradient-to-br from-white/[0.05] to-transparent hover:from-white/[0.08]'}`}
        >
          <Globe size={20} className="shrink-0 group-hover:rotate-12 transition-transform duration-500" />
          {!collapsed && <span className="tracking-wide font-semibold">Client Portal</span>}
        </NavLink>
      </div>

      {/* User info + Logout */}
      {user && (
        <div className="p-4 border-t border-white/[0.05] space-y-2">
          {!collapsed && (
            <div className="px-3 py-2 rounded-xl bg-white/[0.02] border border-white/[0.05]">
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={12} className="text-indigo-400" />
                <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border ${ROLE_BADGE[user.role]?.color || ROLE_BADGE.user.color}`}>
                  {ROLE_BADGE[user.role]?.label || user.role}
                </span>
              </div>
              <p className="text-white text-xs font-semibold truncate">{user.name}</p>
              <p className="text-slate-500 text-[10px] truncate">{user.email}</p>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 hover:border-red-500/30 text-slate-500 hover:text-red-400 transition-all duration-300 text-xs font-semibold"
          >
            <LogOut size={16} />
            {!collapsed && <span>Sign Out</span>}
          </button>
        </div>
      )}
    </motion.aside>
  )
}

function AppShell() {
  const [collapsed, setCollapsed] = useState(false)
  const [theme, setTheme] = useState('dark')
  const location = useLocation()

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('light', newTheme === 'light')
  }

  return (
    <div className={`flex h-screen relative overflow-hidden transition-colors duration-500 ${theme === 'dark' ? 'text-white' : 'text-slate-900'} bg-transparent`}>
      <Background3D />
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      <div className="flex-1 flex flex-col min-w-0 z-10 relative h-full">
        <TopBar onMenuToggle={() => setCollapsed(!collapsed)} theme={theme} toggleTheme={toggleTheme} />

        <main className="flex-1 overflow-y-auto p-8 lg:p-10 scroll-smooth">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 15, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -15, scale: 0.99 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-[1400px] mx-auto w-full"
            >
              <Routes location={location}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/setup" element={<Setup />} />
                <Route path="/strategy" element={<Strategy />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/marketing" element={<Marketing />} />
                <Route path="/hr" element={<HR />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/aftersales" element={<AfterSales />} />
                <Route path="/support" element={<Support />} />
                <Route path="/operations" element={<Operations />} />
                <Route path="/documents" element={<Documents />} />
                <Route path="/meetings" element={<Meetings />} />
                <Route path="/training" element={<Training />} />
                <Route path="/portal" element={<Portal />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1e293b',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/*" element={
            <PrivateRoute>
              <AppShell />
            </PrivateRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
