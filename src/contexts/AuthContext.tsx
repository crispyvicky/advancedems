import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'employee';
  avatar?: string;
  department?: string;
  position?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    email: 'ceo@company.com',
    role: 'superadmin',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150',
    position: 'CEO'
  },
  {
    id: '2',
    name: 'Mike Chen',
    email: 'hr@company.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=150',
    department: 'Human Resources',
    position: 'HR Manager'
  },
  {
    id: '3',
    name: 'Emma Davis',
    email: 'employee@company.com',
    role: 'employee',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=150',
    department: 'Engineering',
    position: 'Software Developer'
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('ems_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = mockUsers.find(u => u.email === email);
    if (foundUser && password === 'password') {
      setUser(foundUser);
      localStorage.setItem('ems_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ems_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};