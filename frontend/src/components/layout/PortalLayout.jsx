import { Globe } from 'lucide-react';

const PortalLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
              <Globe className="text-white" size={20} />
            </div>
            <span className="font-bold text-xl text-[var(--color-text-primary)]">Client Portal</span>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-[var(--color-text-secondary)]">Welcome, Client Name</span>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  );
};

export default PortalLayout;