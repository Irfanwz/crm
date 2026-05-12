import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, User, ChevronDown, LogOut, Sparkles, Mail, MapPin, Phone, Shield, Moon, Sun, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const NOTIFICATIONS = [
  { id: 1, title: 'New Deal Assigned', desc: 'Acme Corp ERP deal has been moved to your pipeline.', time: '2m ago', type: 'deal', read: false },
  { id: 2, title: 'Performance Milestone', desc: 'You have reached 80% of your monthly revenue goal.', time: '1h ago', type: 'goal', read: false },
  { id: 3, title: 'System Update', desc: 'TG Sales Ai v2.4.0 is now live with new 3D dashboard features.', time: '5h ago', type: 'system', read: true },
];

const TopBar = ({ onMenuToggle, theme, toggleTheme }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-30 bg-transparent backdrop-blur-xl border-b border-white/[0.04]">
      {/* Search */}
      <div className="flex-1 max-w-xl">
        <motion.div 
          animate={{ scale: searchFocused ? 1.01 : 1 }}
          className={`relative group rounded-2xl transition-all duration-500 ${searchFocused ? 'bg-white/[0.04] shadow-[0_0_40px_rgba(0,0,0,0.3)]' : 'bg-white/[0.02]'}`}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
            <Sparkles size={18} className={`transition-all duration-500 ${searchFocused ? 'text-indigo-400 scale-110' : 'text-slate-500'}`} />
          </div>
          <input
            type="text"
            placeholder="Ask AI or search anything..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="w-full pl-12 pr-4 py-3 bg-transparent border border-white/[0.05] rounded-2xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/30 transition-all duration-500"
          />
          <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
             <kbd className="hidden sm:inline-block border border-white/10 rounded-lg px-2 py-1 text-[10px] font-bold text-slate-500 bg-white/5 tracking-widest">⌘K</kbd>
          </div>
        </motion.div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        {/* <button 
          onClick={toggleTheme}
          className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all text-slate-400 hover:text-white group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          {theme === 'dark' ? <Sun size={20} className="relative z-10" /> : <Moon size={20} className="relative z-10" />}
        </button> */}

        {/* Notifications */}
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.05] transition-all group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <Bell size={20} className="text-slate-400 group-hover:text-white transition-colors relative z-10" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(99,102,241,0.8)] z-10"></span>
          </button>

          <AnimatePresence>
            {showNotifications && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowNotifications(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-80 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden glass-card z-50 border border-white/[0.08]"
                >
                  <div className="p-6 border-b border-white/[0.05] flex items-center justify-between">
                    <h3 className="text-white font-bold tracking-tight">Notifications</h3>
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-indigo-500 text-white uppercase">2 New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto scrollbar-hide">
                    {NOTIFICATIONS.map(n => (
                      <div key={n.id} className={`p-4 border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors cursor-pointer group ${!n.read ? 'bg-indigo-500/[0.02]' : ''}`}>
                        <div className="flex gap-4">
                          <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!n.read ? 'bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]' : 'bg-transparent'}`} />
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{n.title}</p>
                            <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{n.desc}</p>
                            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest pt-1">{n.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-4 text-[10px] font-black text-slate-500 hover:text-white uppercase tracking-[0.2em] transition-colors bg-white/[0.01]">View All Activity</button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="w-px h-8 bg-white/[0.05] mx-2"></div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowUserMenu(!showUserMenu);
            }}
            className="flex items-center gap-3 p-1.5 pr-4 rounded-2xl hover:bg-white/[0.04] border border-transparent hover:border-white/[0.08] transition-all group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.3)] group-hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-500 overflow-hidden">
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
                <User size={18} className="text-white relative z-10" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[#050505] shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-bold text-white tracking-tight group-hover:text-indigo-400 transition-colors">{user?.name || 'User'}</div>
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{user?.role || 'user'}</div>
            </div>
            <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${showUserMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <motion.div 
                  initial={{ opacity: 0, y: 15, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 15, scale: 0.95 }}
                  className="absolute right-0 mt-3 w-64 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden glass-card z-50 border border-white/[0.08]"
                >
                  <div className="p-3 space-y-1">
                    <div className="px-4 py-3 mb-2 rounded-xl bg-white/[0.03] border border-white/[0.05]">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Signed in as</div>
                      <div className="text-sm font-semibold text-white">{user?.email || ''}</div>
                    </div>
                    <button 
                      onClick={() => {
                        setShowProfileModal(true);
                        setShowUserMenu(false);
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all flex items-center gap-3 group"
                    >
                      <User size={16} className="text-indigo-400 group-hover:scale-110 transition-transform" />
                      My Profile
                    </button>
                    <button className="w-full px-4 py-3 text-left text-sm text-slate-300 hover:text-white hover:bg-white/[0.05] rounded-xl transition-all flex items-center gap-3 group">
                      <Shield size={16} className="text-indigo-400 group-hover:rotate-45 transition-transform" />
                      Account Settings
                    </button>
                    <div className="h-px w-full bg-white/[0.05] my-2" />
                    <button
                      onClick={async () => {
                        setShowUserMenu(false);
                        await logout();
                        navigate('/login', { replace: true });
                      }}
                      className="w-full px-4 py-3 text-left text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-xl transition-all flex items-center gap-3 group"
                    >
                      <LogOut size={16} className="group-hover:translate-x-1 transition-transform" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Profile Modal */}
      <Modal 
        open={showProfileModal} 
        onClose={() => setShowProfileModal(false)} 
        title="User Profile"
        size="lg"
      >
        <div className="space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-white/20 mix-blend-overlay"></div>
                <User size={64} className="text-white relative z-10" />
              </div>
              <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-emerald-500 border-4 border-[#050505] shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-3xl font-black text-white tracking-tight">{user?.name || 'User'}</h3>
              <p className="text-indigo-400 font-bold uppercase tracking-[0.2em] text-xs mt-1">{user?.role === 'admin' ? 'System Administrator' : user?.role === 'sales' ? 'Sales Team' : 'User'}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-slate-400 text-xs font-bold">
                  <Shield size={14} className="text-indigo-400" />
                  Full Access
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.05] text-slate-400 text-xs font-bold">
                  <Mail size={14} className="text-indigo-400" />
                  {user?.email || ''}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Contact Information</h4>
              <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] space-y-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400"><Mail size={16} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-bold text-white">{user?.email || ''}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400"><Phone size={16} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Phone Number</p>
                    <p className="text-sm font-bold text-white">+92 300 1234567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400"><MapPin size={16} /></div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</p>
                    <p className="text-sm font-bold text-white">Karachi, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] ml-1">Account Security</h4>
              <div className="p-6 rounded-[1.5rem] bg-white/[0.02] border border-white/[0.05] space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400"><Shield size={16} /></div>
                    <p className="text-sm font-bold text-white">Two-Factor Auth</p>
                  </div>
                  <span className="text-[10px] font-black px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-400 uppercase">Active</span>
                </div>
                <Button variant="secondary" fullWidth size="sm">Change Password</Button>
                <Button variant="danger" fullWidth size="sm">Deactivate Account</Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </header>
  );
};

export default TopBar;