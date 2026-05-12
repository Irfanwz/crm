import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Target,
  Briefcase,
  TrendingUp,
  ShoppingCart,
  FolderKanban,
  Wallet,
  Headphones,
  Settings,
  FileText,
  Calendar,
  GraduationCap,
  Globe,
  Package
} from 'lucide-react';

const Sidebar = ({ collapsed = false }) => {
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/setup', icon: Settings, label: 'Setup' },
    { path: '/strategy', icon: Target, label: 'Strategy' },
    { path: '/hr', icon: Users, label: 'HR' },
    { path: '/marketing', icon: TrendingUp, label: 'Marketing' },
    { path: '/sales', icon: ShoppingCart, label: 'Sales' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/accounts', icon: Wallet, label: 'Accounts' },
    { path: '/aftersales', icon: Package, label: 'After Sales' },
    { path: '/support', icon: Headphones, label: 'Support' },
    { path: '/operations', icon: Briefcase, label: 'Operations' },
    { path: '/documents', icon: FileText, label: 'Documents' },
    { path: '/meetings', icon: Calendar, label: 'Meetings' },
    { path: '/training', icon: GraduationCap, label: 'Training' },
    { path: '/portal', icon: Globe, label: 'Client Portal' },
  ];

  return (
    <aside
      className={`
        fixed left-0 top-0 bottom-0
        bg-[var(--color-primary)] text-white
        transition-all duration-300 z-40
        ${collapsed ? 'w-20' : 'w-64'}
        flex flex-col
      `}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-xl">
            T
          </div>
          {!collapsed && <span className="font-bold text-lg tracking-tight">TG Sales Ai</span>}
        </div>
      </div>

      {/* Navigation (only this scrolls) */}
      <nav className="p-4 space-y-1 overflow-y-auto flex-1">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => `
              flex items-center gap-3 px-4 py-3 rounded-lg
              transition-all duration-200
              ${isActive
                ? 'bg-white/10 text-white'
                : 'text-white/70 hover:bg-white/5 hover:text-white'
              }
              ${collapsed ? 'justify-center' : ''}
            `}
          >
            <item.icon size={20} className="flex-shrink-0" />
            {!collapsed && <span className="font-medium">{item.label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;