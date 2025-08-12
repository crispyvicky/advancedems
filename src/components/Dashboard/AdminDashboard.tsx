import React, { useState } from 'react';
import { Users, Calendar, FileText, TrendingUp, Clock, UserPlus, MessageSquare, Award } from 'lucide-react';
import Layout from '../Layout';
import Modal from '../Modal';
import { useNotification } from '../../contexts/NotificationContext';

const AdminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [showDirectoryModal, setShowDirectoryModal] = useState(false);
  const [showReportsModal, setShowReportsModal] = useState(false);
  const { addNotification } = useNotification();

  const stats = [
    { label: 'Team Members', value: '156', change: '+8', icon: Users, color: 'from-orange-500 to-coral-500' },
    { label: 'Pending Leaves', value: '12', change: '-2', icon: Calendar, color: 'from-teal-500 to-cyan-500' },
    { label: 'This Month Hires', value: '8', change: '+3', icon: UserPlus, color: 'from-lime-500 to-green-500' },
    { label: 'Average Rating', value: '4.7', change: '+0.2', icon: Award, color: 'from-red-500 to-orange-500' }
  ];

  const leaveRequests = [
    { name: 'John Smith', type: 'Annual Leave', duration: '3 days', status: 'pending', dates: 'Mar 15-17' },
    { name: 'Sarah Wilson', type: 'Sick Leave', duration: '1 day', status: 'approved', dates: 'Mar 14' },
    { name: 'Mike Johnson', type: 'Personal Leave', duration: '2 days', status: 'pending', dates: 'Mar 20-21' },
    { name: 'Lisa Brown', type: 'Annual Leave', duration: '5 days', status: 'approved', dates: 'Mar 25-29' }
  ];

  const recentActivities = [
    { action: 'New employee onboarded', person: 'Alex Chen', time: '2 hours ago' },
    { action: 'Performance review completed', person: 'Emma Davis', time: '4 hours ago' },
    { action: 'Leave request approved', person: 'Mark Wilson', time: '6 hours ago' },
    { action: 'Training session scheduled', person: 'Team Development', time: '8 hours ago' }
  ];

  const handleApproveLeave = (name: string) => {
    addNotification({
      type: 'success',
      message: `${name}'s leave request has been approved.`
    });
  };

  const handleRejectLeave = (name: string) => {
    addNotification({
      type: 'warning',
      message: `${name}'s leave request has been rejected.`
    });
  };

  const handleAddEmployee = () => {
    setShowAddEmployeeModal(false);
    addNotification({
      type: 'success',
      message: 'New employee has been added to the system.'
    });
  };

  const handleViewOnboarding = () => {
    setShowOnboardingModal(false);
    addNotification({
      type: 'info',
      message: 'Onboarding pipeline opened.'
    });
  };

  const handleBrowseDirectory = () => {
    setShowDirectoryModal(false);
    addNotification({
      type: 'info',
      message: 'Employee directory opened.'
    });
  };

  const handleViewReports = () => {
    setShowReportsModal(false);
    addNotification({
      type: 'info',
      message: 'Performance reports generated.'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'employees', label: 'Employee Management', icon: Users },
    { id: 'leaves', label: 'Leave Management', icon: Calendar },
    { id: 'payroll', label: 'Payroll', icon: FileText },
    { id: 'communication', label: 'Communication', icon: MessageSquare }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout title="HR Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-500 rounded-2xl text-white p-6">
          <h2 className="text-3xl font-bold mb-2">Good morning, Mike!</h2>
          <p className="text-teal-100">Ready to manage your team today? You have 12 pending approvals.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  <p className="text-sm text-green-600 font-medium">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-gradient-to-r ${stat.color}`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                    selectedTab === tab.id
                      ? 'border-teal-500 text-teal-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {selectedTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Pending Leave Requests</h3>
                  {leaveRequests.map((request, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-teal-50 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{request.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                      </div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <p>{request.type} • {request.duration}</p>
                        <p>{request.dates}</p>
                      </div>
                      {request.status === 'pending' && (
                        <div className="flex space-x-2 mt-3">
                          <button 
                            onClick={() => handleApproveLeave(request.name)}
                            className="px-3 py-1 bg-gradient-to-r from-green-500 to-lime-500 text-white text-xs rounded-lg hover:from-green-600 hover:to-lime-600"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={() => handleRejectLeave(request.name)}
                            className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs rounded-lg hover:from-red-600 hover:to-orange-600"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Recent Activities</h3>
                  {recentActivities.map((activity, index) => (
                    <div key={index} className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Clock className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <p className="font-medium text-gray-800">{activity.action}</p>
                          <p className="text-sm text-gray-600">{activity.person}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {selectedTab === 'employees' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-bold text-gray-800">Employee Management</h3>
                  <button 
                    onClick={() => setShowAddEmployeeModal(true)}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200"
                  >
                    Add New Employee
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-100 to-coral-100 p-6 rounded-lg">
                    <UserPlus className="w-8 h-8 text-orange-600 mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Onboarding</h4>
                    <p className="text-sm text-gray-600 mb-4">Manage new employee onboarding process</p>
                    <button 
                      onClick={() => setShowOnboardingModal(true)}
                      className="text-orange-600 font-medium hover:text-orange-700"
                    >
                      View Pipeline →
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-6 rounded-lg">
                    <Users className="w-8 h-8 text-teal-600 mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Directory</h4>
                    <p className="text-sm text-gray-600 mb-4">View and manage employee profiles</p>
                    <button 
                      onClick={() => setShowDirectoryModal(true)}
                      className="text-teal-600 font-medium hover:text-teal-700"
                    >
                      Browse Directory →
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-lime-100 to-green-100 p-6 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-lime-600 mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Performance</h4>
                    <p className="text-sm text-gray-600 mb-4">Track and evaluate employee performance</p>
                    <button 
                      onClick={() => setShowReportsModal(true)}
                      className="text-lime-600 font-medium hover:text-lime-700"
                    >
                      View Reports →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {['leaves', 'payroll', 'communication'].includes(selectedTab) && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {selectedTab === 'leaves' && 'Leave Management'}
                  {selectedTab === 'payroll' && 'Payroll Processing'}
                  {selectedTab === 'communication' && 'Team Communication'}
                </h3>
                <p className="text-gray-500">Advanced features coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <Modal isOpen={showAddEmployeeModal} onClose={() => setShowAddEmployeeModal(false)} title="Add New Employee">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input 
                  type="text" 
                  placeholder="John"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input 
                type="email" 
                placeholder="john.doe@company.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                  <option>Engineering</option>
                  <option>Sales</option>
                  <option>Marketing</option>
                  <option>HR</option>
                  <option>Finance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                <input 
                  type="text" 
                  placeholder="Software Engineer"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
              <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500" />
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleAddEmployee}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600"
              >
                Add Employee
              </button>
              <button 
                onClick={() => setShowAddEmployeeModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showOnboardingModal} onClose={() => setShowOnboardingModal(false)} title="Onboarding Pipeline" size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">Pending (3)</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded">Alex Chen - Engineer</div>
                  <div className="bg-white p-2 rounded">Maria Garcia - Designer</div>
                  <div className="bg-white p-2 rounded">David Kim - Analyst</div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">In Progress (2)</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded">Lisa Wong - Manager</div>
                  <div className="bg-white p-2 rounded">Tom Brown - Developer</div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Completed (5)</h4>
                <div className="space-y-2 text-sm">
                  <div className="bg-white p-2 rounded">Emma Davis - Developer</div>
                  <div className="bg-white p-2 rounded">John Smith - Sales</div>
                  <div className="bg-white p-2 rounded">+ 3 more</div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleViewOnboarding}
                className="flex-1 bg-gradient-to-r from-orange-500 to-coral-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-coral-600"
              >
                Manage Pipeline
              </button>
              <button 
                onClick={() => setShowOnboardingModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showDirectoryModal} onClose={() => setShowDirectoryModal(false)} title="Employee Directory" size="lg">
          <div className="space-y-4">
            <div className="flex space-x-4">
              <input 
                type="text" 
                placeholder="Search employees..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500"
              />
              <select className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500">
                <option>All Departments</option>
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
              </select>
            </div>
            <div className="max-h-64 overflow-y-auto space-y-2">
              {[
                { name: 'Emma Davis', role: 'Software Developer', dept: 'Engineering', status: 'Active' },
                { name: 'John Smith', role: 'Sales Manager', dept: 'Sales', status: 'Active' },
                { name: 'Sarah Wilson', role: 'Marketing Lead', dept: 'Marketing', status: 'On Leave' },
                { name: 'Mike Johnson', role: 'HR Specialist', dept: 'HR', status: 'Active' },
                { name: 'Lisa Brown', role: 'Financial Analyst', dept: 'Finance', status: 'Active' }
              ].map((employee, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg flex justify-between items-center">
                  <div>
                    <h4 className="font-semibold text-gray-800">{employee.name}</h4>
                    <p className="text-sm text-gray-600">{employee.role} • {employee.dept}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    employee.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {employee.status}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleBrowseDirectory}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600"
              >
                View Full Directory
              </button>
              <button 
                onClick={() => setShowDirectoryModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showReportsModal} onClose={() => setShowReportsModal(false)} title="Performance Reports" size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-lime-50 border border-lime-200 rounded-lg p-4">
                <h4 className="font-semibold text-lime-800 mb-2">Top Performers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Emma Davis</span>
                    <span className="font-medium">4.9/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>John Smith</span>
                    <span className="font-medium">4.8/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sarah Wilson</span>
                    <span className="font-medium">4.7/5.0</span>
                  </div>
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Department Averages</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Engineering</span>
                    <span className="font-medium">4.6/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales</span>
                    <span className="font-medium">4.4/5.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Marketing</span>
                    <span className="font-medium">4.5/5.0</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleViewReports}
                className="flex-1 bg-gradient-to-r from-lime-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-lime-600 hover:to-green-600"
              >
                Generate Full Report
              </button>
              <button 
                onClick={() => setShowReportsModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default AdminDashboard;