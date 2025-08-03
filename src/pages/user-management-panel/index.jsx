import React, { useState, useEffect } from 'react';
import AdminNavigation from '../../components/ui/AdminNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import UserStatsCard from './components/UserStatsCard';
import UserTable from './components/UserTable';
import FilterToolbar from './components/FilterToolbar';
import BulkActionsPanel from './components/BulkActionsPanel';
import RoleDistributionChart from './components/RoleDistributionChart';
import AddUserModal from './components/AddUserModal';

const UserManagementPanel = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUsers = [
    {
      id: "user_001",
      name: "Sarah Johnson",
      email: "sarah.johnson@ohho.com",
      phone: "+1 (555) 123-4567",
      department: "engineering",
      role: "admin",
      status: "active",
      registrationDate: "2023-01-15T10:30:00Z",
      lastLogin: "2025-08-02T14:22:00Z",
      loginCount: 247,
      recentActivity: [
        { action: "Updated user permissions for John Doe", date: "2025-08-02T14:22:00Z" },
        { action: "Created new user account", date: "2025-08-02T09:15:00Z" },
        { action: "Generated monthly user report", date: "2025-08-01T16:45:00Z" }
      ],
      permissions: [
        { name: "Read Access", granted: true, description: "View system data" },
        { name: "Write Access", granted: true, description: "Create and edit data" },
        { name: "Delete Access", granted: true, description: "Remove data from system" },
        { name: "User Management", granted: true, description: "Manage other users" },
        { name: "System Settings", granted: true, description: "Configure system settings" },
        { name: "Reports Access", granted: true, description: "Generate and view reports" }
      ]
    },
    {
      id: "user_002",
      name: "Michael Chen",
      email: "michael.chen@ohho.com",
      phone: "+1 (555) 234-5678",
      department: "marketing",
      role: "manager",
      status: "active",
      registrationDate: "2023-03-22T08:45:00Z",
      lastLogin: "2025-08-02T11:30:00Z",
      loginCount: 189,
      recentActivity: [
        { action: "Reviewed marketing campaign analytics", date: "2025-08-02T11:30:00Z" },
        { action: "Updated team member roles", date: "2025-08-01T15:20:00Z" },
        { action: "Exported user engagement report", date: "2025-08-01T10:10:00Z" }
      ],
      permissions: [
        { name: "Read Access", granted: true, description: "View system data" },
        { name: "Write Access", granted: true, description: "Create and edit data" },
        { name: "Delete Access", granted: false, description: "Remove data from system" },
        { name: "User Management", granted: false, description: "Manage other users" },
        { name: "System Settings", granted: false, description: "Configure system settings" },
        { name: "Reports Access", granted: true, description: "Generate and view reports" }
      ]
    },
    {
      id: "user_003",
      name: "Emily Rodriguez",
      email: "emily.rodriguez@ohho.com",
      phone: "+1 (555) 345-6789",
      department: "sales",
      role: "user",
      status: "active",
      registrationDate: "2023-06-10T14:20:00Z",
      lastLogin: "2025-08-02T13:45:00Z",
      loginCount: 156,
      recentActivity: [
        { action: "Updated client contact information", date: "2025-08-02T13:45:00Z" },
        { action: "Generated sales report", date: "2025-08-02T09:30:00Z" },
        { action: "Logged client meeting notes", date: "2025-08-01T16:15:00Z" }
      ],
      permissions: [
        { name: "Read Access", granted: true, description: "View system data" },
        { name: "Write Access", granted: true, description: "Create and edit data" },
        { name: "Delete Access", granted: false, description: "Remove data from system" },
        { name: "User Management", granted: false, description: "Manage other users" },
        { name: "System Settings", granted: false, description: "Configure system settings" },
        { name: "Reports Access", granted: false, description: "Generate and view reports" }
      ]
    },
    {
      id: "user_004",
      name: "David Thompson",
      email: "david.thompson@ohho.com",
      phone: "+1 (555) 456-7890",
      department: "hr",
      role: "manager",
      status: "inactive",
      registrationDate: "2023-02-28T11:15:00Z",
      lastLogin: "2025-07-28T10:20:00Z",
      loginCount: 203,
      recentActivity: [
        { action: "Processed employee onboarding", date: "2025-07-28T10:20:00Z" },
        { action: "Updated HR policies", date: "2025-07-27T14:30:00Z" },
        { action: "Conducted performance review", date: "2025-07-26T16:45:00Z" }
      ],
      permissions: [
        { name: "Read Access", granted: true, description: "View system data" },
        { name: "Write Access", granted: true, description: "Create and edit data" },
        { name: "Delete Access", granted: false, description: "Remove data from system" },
        { name: "User Management", granted: true, description: "Manage other users" },
        { name: "System Settings", granted: false, description: "Configure system settings" },
        { name: "Reports Access", granted: true, description: "Generate and view reports" }
      ]
    },
    {
      id: "user_005",
      name: "Lisa Wang",
      email: "lisa.wang@ohho.com",
      phone: "+1 (555) 567-8901",
      department: "finance",
      role: "user",
      status: "pending",
      registrationDate: "2025-08-01T09:00:00Z",
      lastLogin: null,
      loginCount: 0,
      recentActivity: [
        { action: "Account created", date: "2025-08-01T09:00:00Z" }
      ],
      permissions: [
        { name: "Read Access", granted: true, description: "View system data" },
        { name: "Write Access", granted: false, description: "Create and edit data" },
        { name: "Delete Access", granted: false, description: "Remove data from system" },
        { name: "User Management", granted: false, description: "Manage other users" },
        { name: "System Settings", granted: false, description: "Configure system settings" },
        { name: "Reports Access", granted: false, description: "Generate and view reports" }
      ]
    }
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setUsers(mockUsers);
      setFilteredUsers(mockUsers);
      setIsLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = users;

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(user =>
        user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        user?.department?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Role filter
    if (selectedRole !== 'all') {
      filtered = filtered?.filter(user => user?.role === selectedRole);
    }

    // Status filter
    if (selectedStatus !== 'all') {
      filtered = filtered?.filter(user => user?.status === selectedStatus);
    }

    // Date range filter
    if (dateRange?.start) {
      filtered = filtered?.filter(user => 
        new Date(user.registrationDate) >= new Date(dateRange.start)
      );
    }
    if (dateRange?.end) {
      filtered = filtered?.filter(user => 
        new Date(user.registrationDate) <= new Date(dateRange.end)
      );
    }

    setFilteredUsers(filtered);
  }, [users, searchTerm, selectedRole, selectedStatus, dateRange]);

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev?.includes(userId)
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    setSelectedUsers(
      selectedUsers?.length === filteredUsers?.length
        ? []
        : filteredUsers?.map(user => user?.id)
    );
  };

  const handleBulkAction = async (actionData) => {
    console.log('Executing bulk action:', actionData);
    
    if (actionData?.action === 'clear_selection') {
      setSelectedUsers([]);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Update users based on action
    if (actionData?.action === 'activate') {
      setUsers(prev => prev?.map(user =>
        actionData?.userIds?.includes(user?.id)
          ? { ...user, status: 'active' }
          : user
      ));
    } else if (actionData?.action === 'deactivate') {
      setUsers(prev => prev?.map(user =>
        actionData?.userIds?.includes(user?.id)
          ? { ...user, status: 'inactive' }
          : user
      ));
    } else if (actionData?.action === 'change_role') {
      setUsers(prev => prev?.map(user =>
        actionData?.userIds?.includes(user?.id)
          ? { ...user, role: actionData?.newRole }
          : user
      ));
    }
    
    setSelectedUsers([]);
  };

  const handleUserUpdate = (updatedUser) => {
    setUsers(prev => prev?.map(user =>
      user?.id === updatedUser?.id ? updatedUser : user
    ));
  };

  const handleAddUser = (newUser) => {
    setUsers(prev => [...prev, newUser]);
    setShowAddModal(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedRole('all');
    setSelectedStatus('all');
    setDateRange({ start: '', end: '' });
  };

  const userStats = {
    total: users?.length,
    active: users?.filter(u => u?.status === 'active')?.length,
    inactive: users?.filter(u => u?.status === 'inactive')?.length,
    pending: users?.filter(u => u?.status === 'pending')?.length
  };

  const roleDistribution = {
    admin: users?.filter(u => u?.role === 'admin')?.length,
    manager: users?.filter(u => u?.role === 'manager')?.length,
    user: users?.filter(u => u?.role === 'user')?.length
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavigation />
        <div className="pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-center h-96">
              <div className="text-center space-y-4">
                <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto" />
                <p className="text-lg font-medium text-text-primary">Loading User Management Panel</p>
                <p className="text-text-secondary">Fetching user data and permissions...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminNavigation />
      <div className="pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary font-medium">User Management</span>
          </div>

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary">User Management</h1>
              <p className="text-text-secondary mt-2">
                Manage user accounts, roles, and permissions across your organization
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                iconName="Download"
                onClick={() => console.log('Export users')}
              >
                Export
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                onClick={() => setShowAddModal(true)}
              >
                Add New User
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <UserStatsCard
              title="Total Users"
              value={userStats?.total}
              change="+12%"
              changeType="increase"
              icon="Users"
              color="primary"
            />
            <UserStatsCard
              title="Active Users"
              value={userStats?.active}
              change="+8%"
              changeType="increase"
              icon="UserCheck"
              color="success"
            />
            <UserStatsCard
              title="Inactive Users"
              value={userStats?.inactive}
              change="-3%"
              changeType="decrease"
              icon="UserX"
              color="warning"
            />
            <UserStatsCard
              title="Pending Users"
              value={userStats?.pending}
              change="+2"
              changeType="increase"
              icon="UserClock"
              color="accent"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Left Column - Table and Filters */}
            <div className="lg:col-span-3 space-y-6">
              <FilterToolbar
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                selectedRole={selectedRole}
                onRoleChange={setSelectedRole}
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                dateRange={dateRange}
                onDateRangeChange={setDateRange}
                totalResults={filteredUsers?.length}
                onClearFilters={clearFilters}
              />

              <UserTable
                users={filteredUsers}
                selectedUsers={selectedUsers}
                onSelectUser={handleSelectUser}
                onSelectAll={handleSelectAll}
                onUserUpdate={handleUserUpdate}
              />
            </div>

            {/* Right Column - Bulk Actions and Charts */}
            <div className="space-y-6">
              <BulkActionsPanel
                selectedUsers={selectedUsers}
                onBulkAction={handleBulkAction}
                totalUsers={filteredUsers?.length}
              />

              <RoleDistributionChart data={roleDistribution} />
            </div>
          </div>
        </div>
      </div>
      {/* Add User Modal */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddUser}
        />
      )}
    </div>
  );
};

export default UserManagementPanel;