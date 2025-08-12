import React, { useState } from 'react';
import { Users, TrendingUp, DollarSign, Building, BarChart3, Shield, Settings, FileText } from 'lucide-react';
import Layout from '../Layout';
import Modal from '../Modal';
import { useNotification } from '../../contexts/NotificationContext';

const SuperadminDashboard: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showReportModal, setShowReportModal] = useState(false);
  const [showApprovalsModal, setShowApprovalsModal] = useState(false);
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [showHireModal, setShowHireModal] = useState(false);
  const [showRolesModal, setShowRolesModal] = useState(false);
  const [showPerformanceModal, setShowPerformanceModal] = useState(false);
  const { addNotification } = useNotification();

  const stats = [
    { label: 'Total Employees', value: '1,247', change: '+12%', icon: Users, color: 'from-orange-500 to-coral-500' },
    { label: 'Monthly Revenue', value: '$2.4M', change: '+8%', icon: DollarSign, color: 'from-teal-500 to-cyan-500' },
    { label: 'Active Branches', value: '15', change: '+2', icon: Building, color: 'from-lime-500 to-green-500' },
    { label: 'Performance Score', value: '94.2%', change: '+3.1%', icon: TrendingUp, color: 'from-red-500 to-orange-500' }
  ];

  const departments = [
    { name: 'Engineering', employees: 342, budget: '$890K', performance: 95 },
    { name: 'Sales', employees: 189, budget: '$456K', performance: 87 },
    { name: 'Marketing', employees: 156, budget: '$234K', performance: 91 },
    { name: 'HR', employees: 78, budget: '$123K', performance: 89 },
    { name: 'Finance', employees: 45, budget: '$567K', performance: 93 }
  ];

  const handleGenerateReport = () => {
    setShowReportModal(false);
    addNotification({
      type: 'success',
      message: 'Monthly report generated successfully! Check your downloads.'
    });
  };

  const handleApproveAll = () => {
    setShowApprovalsModal(false);
    addNotification({
      type: 'success',
      message: 'All pending approvals have been processed.'
    });
  };

  const handleScheduleMeeting = () => {
    setShowMeetingModal(false);
    addNotification({
      type: 'success',
      message: 'All-hands meeting scheduled for next Friday at 2 PM.'
    });
  };

  const handleStartHireProcess = () => {
    setShowHireModal(false);
    addNotification({
      type: 'success',
      message: 'New employee onboarding process initiated.'
    });
  };

  const handleConfigureRoles = () => {
    setShowRolesModal(false);
    addNotification({
      type: 'success',
      message: 'Role permissions updated successfully.'
    });
  };

  const handleScheduleReview = () => {
    setShowPerformanceModal(false);
    addNotification({
      type: 'success',
      message: 'Performance review cycle scheduled for Q2.'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'employees', label: 'Employee Management', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'security', label: 'Security & Compliance', icon: Shield },
    { id: 'settings', label: 'System Settings', icon: Settings }
  ];

  return (
    <Layout title="CEO Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-orange-500 to-coral-500 rounded-2xl text-white p-6">
          <h2 className="text-3xl font-bold mb-2">Welcome back, Sarah!</h2>
          <p className="text-orange-100">Here's what's happening with your company today.</p>
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
                      ? 'border-orange-500 text-orange-600'
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
              <div className="space-y-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Department Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="bg-gradient-to-r from-gray-50 to-orange-50 rounded-lg p-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-gray-800">{dept.name}</h4>
                          <span className="text-sm text-gray-600">{dept.employees} employees</span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-gray-600">Budget: {dept.budget}</span>
                          <span className="text-sm font-medium text-green-600">{dept.performance}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-orange-500 to-coral-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${dept.performance}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-lime-50 rounded-lg p-6">
                    <h4 className="font-bold text-gray-800 mb-4">Quick Actions</h4>
                    <div className="space-y-3">
                      <button 
                        onClick={() => setShowReportModal(true)}
                        className="w-full bg-gradient-to-r from-orange-500 to-coral-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-coral-600 transition-all duration-200"
                      >
                        Generate Monthly Report
                      </button>
                      <button 
                        onClick={() => setShowApprovalsModal(true)}
                        className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600 transition-all duration-200"
                      >
                        Review Pending Approvals
                      </button>
                      <button 
                        onClick={() => setShowMeetingModal(true)}
                        className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-lime-600 hover:to-green-600 transition-all duration-200"
                      >
                        Schedule All-Hands Meeting
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'employees' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-800">Employee Management</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-orange-100 to-coral-100 p-6 rounded-lg">
                    <FileText className="w-8 h-8 text-orange-600 mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Hire New Employee</h4>
                    <p className="text-sm text-gray-600 mb-4">Start the onboarding process for new team members</p>
                    <button 
                      onClick={() => setShowHireModal(true)}
                      className="text-orange-600 font-medium hover:text-orange-700"
                    >
                      Start Process →
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-teal-100 to-cyan-100 p-6 rounded-lg">
                    <Users className="w-8 h-8 text-teal-600 mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Manage Roles</h4>
                    <p className="text-sm text-gray-600 mb-4">Configure permissions and access levels</p>
                    <button 
                      onClick={() => setShowRolesModal(true)}
                      className="text-teal-600 font-medium hover:text-teal-700"
                    >
                      Configure →
                    </button>
                  </div>
                  <div className="bg-gradient-to-br from-lime-100 to-green-100 p-6 rounded-lg">
                    <TrendingUp className="w-8 h-8 text-lime-600 mb-3" />
                    <h4 className="font-semibold text-gray-800 mb-2">Performance Review</h4>
                    <p className="text-sm text-gray-600 mb-4">Schedule and manage performance evaluations</p>
                    <button 
                      onClick={() => setShowPerformanceModal(true)}
                      className="text-lime-600 font-medium hover:text-lime-700"
                    >
                      Schedule →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {selectedTab === 'analytics' && (
              <div className="text-center py-12">
                <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Advanced Analytics</h3>
                <p className="text-gray-500">Comprehensive charts and reports coming soon...</p>
              </div>
            )}

            {selectedTab === 'security' && (
              <div className="text-center py-12">
                <Shield className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">Security & Compliance</h3>
                <p className="text-gray-500">Security settings and audit logs coming soon...</p>
              </div>
            )}

            {selectedTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-700 mb-2">System Settings</h3>
                <p className="text-gray-500">System configuration options coming soon...</p>
              </div>
            )}
          </div>
        </div>

        {/* Modals */}
        <Modal isOpen={showReportModal} onClose={() => setShowReportModal(false)} title="Generate Monthly Report">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option>Financial Summary</option>
                <option>Employee Performance</option>
                <option>Attendance Report</option>
                <option>Department Analysis</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
                <input type="date" className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500" />
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleGenerateReport}
                className="flex-1 bg-gradient-to-r from-orange-500 to-coral-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-coral-600"
              >
                Generate Report
              </button>
              <button 
                onClick={() => setShowReportModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showApprovalsModal} onClose={() => setShowApprovalsModal(false)} title="Pending Approvals" size="lg">
          <div className="space-y-4">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800">Leave Requests (8)</h4>
              <p className="text-sm text-yellow-700">Annual leave, sick leave, and personal time requests</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800">Budget Approvals (3)</h4>
              <p className="text-sm text-blue-700">Department budget requests and expense approvals</p>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800">Hiring Requests (2)</h4>
              <p className="text-sm text-green-700">New position approvals and candidate selections</p>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleApproveAll}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600"
              >
                Review All
              </button>
              <button 
                onClick={() => setShowApprovalsModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showMeetingModal} onClose={() => setShowMeetingModal(false)} title="Schedule All-Hands Meeting">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Meeting Title</label>
              <input 
                type="text" 
                placeholder="Q1 All-Hands Meeting"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                <input type="time" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Agenda</label>
              <textarea 
                rows={3}
                placeholder="Meeting agenda and topics..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500"
              ></textarea>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleScheduleMeeting}
                className="flex-1 bg-gradient-to-r from-lime-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-lime-600 hover:to-green-600"
              >
                Schedule Meeting
              </button>
              <button 
                onClick={() => setShowMeetingModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showHireModal} onClose={() => setShowHireModal(false)} title="Start Hiring Process">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position Title</label>
              <input 
                type="text" 
                placeholder="Senior Software Engineer"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option>Engineering</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>HR</option>
                <option>Finance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Hiring Manager</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500">
                <option>John Smith - Engineering Lead</option>
                <option>Sarah Wilson - Sales Director</option>
                <option>Mike Johnson - Marketing Manager</option>
              </select>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleStartHireProcess}
                className="flex-1 bg-gradient-to-r from-orange-500 to-coral-500 text-white px-4 py-2 rounded-lg hover:from-orange-600 hover:to-coral-600"
              >
                Start Process
              </button>
              <button 
                onClick={() => setShowHireModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showRolesModal} onClose={() => setShowRolesModal(false)} title="Configure Roles & Permissions" size="lg">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-semibold text-orange-800 mb-2">Superadmin</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    Full System Access
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    User Management
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    Financial Reports
                  </label>
                </div>
              </div>
              <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
                <h4 className="font-semibold text-teal-800 mb-2">Admin/HR</h4>
                <div className="space-y-2 text-sm">
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    Employee Management
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" checked className="mr-2" />
                    Leave Approvals
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    Payroll Access
                  </label>
                </div>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleConfigureRoles}
                className="flex-1 bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-teal-600 hover:to-cyan-600"
              >
                Save Changes
              </button>
              <button 
                onClick={() => setShowRolesModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>

        <Modal isOpen={showPerformanceModal} onClose={() => setShowPerformanceModal(false)} title="Schedule Performance Review">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Review Cycle</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500">
                <option>Q2 2024 Performance Review</option>
                <option>Annual Review 2024</option>
                <option>Mid-Year Review 2024</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-500" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Departments</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  All Departments
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Engineering Only
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Sales & Marketing
                </label>
              </div>
            </div>
            <div className="flex space-x-3 pt-4">
              <button 
                onClick={handleScheduleReview}
                className="flex-1 bg-gradient-to-r from-lime-500 to-green-500 text-white px-4 py-2 rounded-lg hover:from-lime-600 hover:to-green-600"
              >
                Schedule Review
              </button>
              <button 
                onClick={() => setShowPerformanceModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
};

export default SuperadminDashboard;