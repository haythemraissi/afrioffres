
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
    <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40 backdrop-blur-md bg-white/95">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left section */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden hover:bg-orange-50 transition-colors"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h1 className="text-2xl font-bold text-gradient">
                Medina
              </h1>
              {user?.role === 'premium' && (
                <Badge className="gradient-accent text-white text-xs px-2 py-1 ml-2">
                  PRO
                </Badge>
              )}
            </div>
          </div>

          {/* Center - Search Bar (hidden on mobile) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Recherche rapide..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-gray-50 focus:bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-3">
            {/* Chatbot Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setChatbotOpen(true)}
              className="relative hover:bg-orange-50 transition-colors group"
            >
              <MessageCircle className="h-5 w-5 group-hover:text-orange-600 transition-colors" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="relative hover:bg-orange-50 transition-colors group">
              <Bell className="h-5 w-5 group-hover:text-orange-600 transition-colors" />
              {unreadCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 border-0 animate-bounce"
                >
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>

            {/* User menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 capitalize flex items-center gap-1">
                    {user?.role}
                    {user?.role === 'premium' && <span className="text-yellow-500">★</span>}
                  </p>
                </div>
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-2 hover:bg-orange-50 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  </Button>
                  {user?.role === 'premium' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-2 border-white"></div>
                  )}
                </div>
              </div>
            ) : (
              <Button className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-6 shadow-lg hover:shadow-xl transition-all duration-200">
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
