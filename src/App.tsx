import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Login from './components/Login';
import SuperadminDashboard from './components/Dashboard/SuperadminDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import NotificationToast from './components/NotificationToast';

const AppContent: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-400 via-coral-400 to-red-400 flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-2xl">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="text-center mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  switch (user.role) {
    case 'superadmin':
      return <SuperadminDashboard />;
    case 'admin':
      return <AdminDashboard />;
    case 'employee':
      return <EmployeeDashboard />;
    default:
      return <EmployeeDashboard />;
  }
};

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <AppContent />
        <NotificationToast />
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;