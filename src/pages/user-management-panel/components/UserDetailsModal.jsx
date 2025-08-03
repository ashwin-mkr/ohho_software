import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const UserDetailsModal = ({ user, onClose }) => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'activity', label: 'Activity', icon: 'Activity' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-success bg-success/10';
      case 'inactive': return 'text-error bg-error/10';
      case 'pending': return 'text-warning bg-warning/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'text-error bg-error/10';
      case 'manager': return 'text-warning bg-warning/10';
      case 'user': return 'text-primary bg-primary/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xl font-bold text-primary">
                {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-text-primary">{user?.name}</h2>
              <p className="text-text-secondary">{user?.email}</p>
              <div className="flex items-center space-x-2 mt-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user?.role)}`}>
                  {user?.role}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user?.status)}`}>
                  {user?.status}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`
                  flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-150
                  ${activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">Personal Information</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Full Name</label>
                      <p className="text-text-primary">{user?.name}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Email</label>
                      <p className="text-text-primary">{user?.email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Phone</label>
                      <p className="text-text-primary">{user?.phone || 'Not provided'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Department</label>
                      <p className="text-text-primary">{user?.department}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-text-primary">Account Details</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-text-secondary">User ID</label>
                      <p className="text-text-primary font-mono">{user?.id}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Registration Date</label>
                      <p className="text-text-primary">{formatDate(user?.registrationDate)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Last Login</label>
                      <p className="text-text-primary">
                        {user?.lastLogin ? formatDate(user?.lastLogin) : 'Never logged in'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-text-secondary">Login Count</label>
                      <p className="text-text-primary">{user?.loginCount || 0} times</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">Recent Activity</h3>
              <div className="space-y-3">
                {user?.recentActivity?.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                    <Icon name="Clock" size={16} className="text-text-secondary mt-1" />
                    <div className="flex-1">
                      <p className="text-text-primary">{activity?.action}</p>
                      <p className="text-sm text-text-secondary">{formatDate(activity?.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-text-primary">System Permissions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user?.permissions?.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon 
                        name={permission?.granted ? 'CheckCircle' : 'XCircle'} 
                        size={16} 
                        className={permission?.granted ? 'text-success' : 'text-error'} 
                      />
                      <span className="text-text-primary">{permission?.name}</span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      permission?.granted ? 'bg-success/10 text-success' : 'bg-error/10 text-error'
                    }`}>
                      {permission?.granted ? 'Granted' : 'Denied'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="default" iconName="Edit">
            Edit User
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;