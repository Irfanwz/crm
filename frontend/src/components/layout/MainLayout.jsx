import { useState } from 'react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';

const MainLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Sidebar collapsed={sidebarCollapsed} />
      
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        <TopBar 
          onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          userCollapsed={sidebarCollapsed}
        />
        
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;