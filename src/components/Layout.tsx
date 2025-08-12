import React, { ReactNode } from 'react';
import { LogOut, Bell, Search, Menu } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

interface LayoutProps {
  children: ReactNode;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }) => {
  const { user, logout } = useAuth();
  const { addNotification } = useNotification();

  const handleLogout = () => {
    logout();
    addNotification({
      type: 'success',
      message: 'You have been logged out successfully.'
    });
  };

  const handleNotificationClick = () => {
    addNotification({
      type: 'info',
      message: 'You have 3 new notifications: 2 leave approvals and 1 system update.'
    });
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'superadmin':
        return 'bg-gradient-to-r from-red-500 to-orange-500';
      case 'admin':
        return 'bg-gradient-to-r from-teal-500 to-cyan-500';
      default:
        return 'bg-gradient-to-r from-lime-500 to-green-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-coral-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-orange-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Menu className="w-6 h-6 text-gray-600 md:hidden" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-coral-600 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              <button 
                onClick={handleNotificationClick}
                className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-coral-500 rounded-full"></span>
              </button>

              <div className="flex items-center space-x-3">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full border-2 border-orange-200"
                />
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-800">{user?.name}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full text-white ${getRoleBadgeColor(user?.role || '')}`}>
                    {user?.role?.toUpperCase()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;