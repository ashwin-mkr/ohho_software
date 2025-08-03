import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const AddUserModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: 'user',
    status: 'active'
  });
  
  const [permissions, setPermissions] = useState([
    { name: 'Read Access', granted: true, description: 'View system data' },
    { name: 'Write Access', granted: false, description: 'Create and edit data' },
    { name: 'Delete Access', granted: false, description: 'Remove data from system' },
    { name: 'User Management', granted: false, description: 'Manage other users' },
    { name: 'System Settings', granted: false, description: 'Configure system settings' },
    { name: 'Reports Access', granted: false, description: 'Generate and view reports' }
  ]);
  
  const [activeTab, setActiveTab] = useState('personal');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: 'User' },
    { id: 'account', label: 'Account Settings', icon: 'Settings' },
    { id: 'permissions', label: 'Permissions', icon: 'Shield' }
  ];

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const departmentOptions = [
    { value: 'engineering', label: 'Engineering' },
    { value: 'marketing', label: 'Marketing' },
    { value: 'sales', label: 'Sales' },
    { value: 'hr', label: 'Human Resources' },
    { value: 'finance', label: 'Finance' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handlePermissionChange = (permissionIndex, granted) => {
    setPermissions(prev => prev?.map((perm, index) => 
      index === permissionIndex ? { ...perm, granted } : perm
    ));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData?.department) {
      newErrors.department = 'Department is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      const newUser = {
        id: `user_${Date.now()}`,
        ...formData,
        permissions,
        registrationDate: new Date()?.toISOString(),
        lastLogin: null,
        loginCount: 0,
        recentActivity: [
          {
            action: 'Account created',
            date: new Date()?.toISOString()
          }
        ]
      };
      
      await onSave(newUser);
    } catch (error) {
      console.error('Failed to create user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (role) => {
    handleInputChange('role', role);
    
    // Auto-assign permissions based on role
    let updatedPermissions = [...permissions];
    
    switch (role) {
      case 'admin':
        updatedPermissions = updatedPermissions?.map(p => ({ ...p, granted: true }));
        break;
      case 'manager':
        updatedPermissions = updatedPermissions?.map(p => ({
          ...p,
          granted: ['Read Access', 'Write Access', 'Reports Access']?.includes(p?.name)
        }));
        break;
      case 'user':
        updatedPermissions = updatedPermissions?.map(p => ({
          ...p,
          granted: p?.name === 'Read Access'
        }));
        break;
    }
    
    setPermissions(updatedPermissions);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-surface border border-border rounded-lg shadow-elevation-3 w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-text-primary">Add New User</h2>
            <p className="text-text-secondary">Create a new user account with appropriate permissions</p>
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
          {activeTab === 'personal' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Full Name"
                  type="text"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  error={errors?.name}
                  placeholder="Enter full name"
                  required
                />
                
                <Input
                  label="Email Address"
                  type="email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  error={errors?.email}
                  placeholder="user@company.com"
                  required
                />
                
                <Input
                  label="Phone Number"
                  type="tel"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  placeholder="+1 (555) 123-4567"
                />
                
                <Select
                  label="Department"
                  options={departmentOptions}
                  value={formData?.department}
                  onChange={(value) => handleInputChange('department', value)}
                  error={errors?.department}
                  placeholder="Select department"
                  required
                />
              </div>

              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Info" size={20} className="text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-text-primary">Account Setup</h4>
                    <p className="text-sm text-text-secondary mt-1">
                      A temporary password will be generated and sent to the user's email address. 
                      They will be required to change it on first login.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'account' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Role"
                  options={roleOptions}
                  value={formData?.role}
                  onChange={handleRoleChange}
                  description="Determines user access level and default permissions"
                />
                
                <Select
                  label="Status"
                  options={statusOptions}
                  value={formData?.status}
                  onChange={(value) => handleInputChange('status', value)}
                  description="Initial account status"
                />
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <h4 className="font-medium text-text-primary mb-3">Role Descriptions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start space-x-2">
                    <Icon name="User" size={16} className="text-primary mt-0.5" />
                    <div>
                      <span className="font-medium text-text-primary">User:</span>
                      <span className="text-text-secondary ml-1">Basic access with read permissions</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="UserCog" size={16} className="text-warning mt-0.5" />
                    <div>
                      <span className="font-medium text-text-primary">Manager:</span>
                      <span className="text-text-secondary ml-1">Enhanced access with read/write permissions</span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Icon name="Shield" size={16} className="text-error mt-0.5" />
                    <div>
                      <span className="font-medium text-text-primary">Admin:</span>
                      <span className="text-text-secondary ml-1">Full system access with all permissions</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'permissions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-text-primary">System Permissions</h3>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPermissions(prev => prev?.map(p => ({ ...p, granted: true })))}
                  >
                    Grant All
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPermissions(prev => prev?.map(p => ({ ...p, granted: false })))}
                  >
                    Revoke All
                  </Button>
                </div>
              </div>
              
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3 mb-4">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
                  <p className="text-sm text-text-secondary">
                    Permissions are automatically set based on the selected role. 
                    You can customize them as needed.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {permissions?.map((permission, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        checked={permission?.granted}
                        onChange={(e) => handlePermissionChange(index, e?.target?.checked)}
                      />
                      <div>
                        <span className="text-text-primary font-medium">{permission?.name}</span>
                        {permission?.description && (
                          <p className="text-xs text-text-secondary">{permission?.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="text-sm text-text-secondary">
            User will receive an email with login instructions
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              variant="default" 
              iconName="UserPlus"
              onClick={handleSave}
              loading={isLoading}
            >
              Create User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddUserModal;