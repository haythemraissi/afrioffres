
import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Bot, 
  Bell, 
  GraduationCap, 
  Settings,
  X
} from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, currentPage, setCurrentPage } = useStore();

  const menuItems = [
    { id: 'dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
    { id: 'hotels', label: 'Hôtels', icon: FileText },
    { id: 'competitors', label: 'Analyses concurrentielles', icon: FileText },
    { id: 'ai-assistant', label: 'Assistant IA', icon: Bot },
    { id: 'notifications', label: 'Alertes', icon: Bell },
    { id: 'analytics', label: 'Statistiques', icon: GraduationCap },
    { id: 'settings', label: 'Paramètres', icon: Settings },
  ];

  const handleMenuClick = (pageId: string) => {
    setCurrentPage(pageId);
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full bg-white border-r border-gray-200 shadow-lg z-50 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "w-64"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "default" : "ghost"}
                   className={cn(
                     "w-full justify-start h-12 px-4",
                     currentPage === item.id && "gradient-primary text-white"
                   )}
                  onClick={() => handleMenuClick(item.id)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="gradient-accent rounded-lg p-4 text-white">
              <h3 className="font-semibold text-sm">Passez au Premium</h3>
              <p className="text-xs opacity-90 mt-1">
                Accédez aux analyses avancées et alertes en temps réel
              </p>
              <Button 
                variant="secondary" 
                size="sm" 
                className="mt-2 w-full bg-white text-accent hover:bg-gray-100"
              >
                Découvrir
              </Button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
