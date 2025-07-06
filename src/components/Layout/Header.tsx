
import React from 'react';
import { Bell, Search, User, Menu, MessageCircle } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';

const Header = () => {
  const { 
    user, 
    isAuthenticated, 
    unreadCount, 
    setSidebarOpen, 
    sidebarOpen,
    setChatbotOpen,
    logout 
  } = useStore();

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
              #AfriOffres
            </h1>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            {/* Chatbot Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatbotOpen(true)}
              className="relative"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={logout}
                  className="flex items-center space-x-2"
                >
                  <User className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <Button variant="default" size="sm">
                Se connecter
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
