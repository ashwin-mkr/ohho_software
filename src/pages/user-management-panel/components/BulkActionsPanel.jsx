import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const BulkActionsPanel = ({ selectedUsers, onBulkAction, totalUsers }) => {
  const [selectedAction, setSelectedAction] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const bulkActionOptions = [
    { value: '', label: 'Select Action' },
    { value: 'activate', label: 'Activate Users' },
    { value: 'deactivate', label: 'Deactivate Users' },
    { value: 'change_role', label: 'Change Role' },
    { value: 'send_email', label: 'Send Email' },
    { value: 'export', label: 'Export Data' },
    { value: 'delete', label: 'Delete Users' }
  ];

  const roleOptions = [
    { value: 'user', label: 'User' },
    { value: 'manager', label: 'Manager' },
    { value: 'admin', label: 'Admin' }
  ];

  const [newRole, setNewRole] = useState('user');
  const [showRoleSelector, setShowRoleSelector] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleActionChange = (action) => {
    setSelectedAction(action);
    setShowRoleSelector(action === 'change_role');
    setShowConfirmation(false);
  };

  const handleExecuteAction = async () => {
    if (!selectedAction || selectedUsers?.length === 0) return;

    if (['delete', 'deactivate']?.includes(selectedAction) && !showConfirmation) {
      setShowConfirmation(true);
      return;
    }

    setIsProcessing(true);
    
    try {
      const actionData = {
        action: selectedAction,
        userIds: selectedUsers,
        ...(selectedAction === 'change_role' && { newRole })
      };
      
      await onBulkAction(actionData);
      
      // Reset state
      setSelectedAction('');
      setShowRoleSelector(false);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getActionIcon = () => {
    switch (selectedAction) {
      case 'activate': return 'CheckCircle';
      case 'deactivate': return 'XCircle';
      case 'change_role': return 'UserCog';
      case 'send_email': return 'Mail';
      case 'export': return 'Download';
      case 'delete': return 'Trash2';
      default: return 'Settings';
    }
  };

  const getActionColor = () => {
    switch (selectedAction) {
      case 'activate': return 'success';
      case 'deactivate': return 'warning';
      case 'delete': return 'destructive';
      default: return 'default';
    }
  };

  if (selectedUsers?.length === 0) {
    return (
      <div className="bg-surface border border-border rounded-lg p-6">
        <div className="text-center space-y-3">
          <Icon name="Users" size={48} className="text-text-secondary mx-auto" />
          <div>
            <h3 className="text-lg font-medium text-text-primary">No Users Selected</h3>
            <p className="text-sm text-text-secondary">
              Select users from the table to perform bulk actions
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-medium text-text-primary">Bulk Actions</h3>
          <p className="text-sm text-text-secondary">
            {selectedUsers?.length} of {totalUsers} users selected
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="X"
          onClick={() => onBulkAction({ action: 'clear_selection' })}
        >
          Clear Selection
        </Button>
      </div>
      <div className="space-y-4">
        <Select
          label="Choose Action"
          options={bulkActionOptions}
          value={selectedAction}
          onChange={handleActionChange}
          placeholder="Select an action to perform"
        />

        {showRoleSelector && (
          <Select
            label="New Role"
            options={roleOptions}
            value={newRole}
            onChange={setNewRole}
            description="All selected users will be assigned this role"
          />
        )}

        {showConfirmation && (
          <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div className="space-y-2">
                <h4 className="font-medium text-text-primary">Confirm Action</h4>
                <p className="text-sm text-text-secondary">
                  Are you sure you want to {selectedAction} {selectedUsers?.length} user{selectedUsers?.length !== 1 ? 's' : ''}? 
                  This action cannot be undone.
                </p>
                <div className="flex items-center space-x-2 pt-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleExecuteAction}
                    loading={isProcessing}
                  >
                    Confirm
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmation(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <Button
          variant={getActionColor()}
          iconName={getActionIcon()}
          onClick={handleExecuteAction}
          disabled={!selectedAction || isProcessing}
          loading={isProcessing}
          fullWidth
        >
          {isProcessing ? 'Processing...' : `Execute Action (${selectedUsers?.length} users)`}
        </Button>
      </div>
      {/* Quick Actions */}
      <div className="border-t border-border pt-4">
        <h4 className="text-sm font-medium text-text-primary mb-3">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            iconName="CheckCircle"
            onClick={() => {
              setSelectedAction('activate');
              handleExecuteAction();
            }}
            disabled={isProcessing}
          >
            Activate All
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            onClick={() => {
              setSelectedAction('send_email');
              handleExecuteAction();
            }}
            disabled={isProcessing}
          >
            Send Email
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            onClick={() => {
              setSelectedAction('export');
              handleExecuteAction();
            }}
            disabled={isProcessing}
          >
            Export Data
          </Button>
          <Button
            variant="outline"
            size="sm"
            iconName="UserCog"
            onClick={() => handleActionChange('change_role')}
            disabled={isProcessing}
          >
            Change Role
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BulkActionsPanel;