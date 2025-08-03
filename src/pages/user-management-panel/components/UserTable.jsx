import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import UserDetailsModal from './UserDetailsModal';
import EditUserModal from './EditUserModal';

const UserTable = ({ users, selectedUsers, onSelectUser, onSelectAll, onUserUpdate }) => {
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [detailsModalUser, setDetailsModalUser] = useState(null);
  const [editModalUser, setEditModalUser] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const toggleRowExpansion = (userId) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded?.has(userId)) {
      newExpanded?.delete(userId);
    } else {
      newExpanded?.add(userId);
    }
    setExpandedRows(newExpanded);
  };

  const sortedUsers = [...users]?.sort((a, b) => {
    const aValue = a?.[sortField];
    const bValue = b?.[sortField];
    const direction = sortDirection === 'asc' ? 1 : -1;
    
    if (typeof aValue === 'string') {
      return aValue?.localeCompare(bValue) * direction;
    }
    return (aValue - bValue) * direction;
  });

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

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const SortableHeader = ({ field, children }) => (
    <th 
      className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:bg-muted/50 transition-colors duration-150"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center space-x-1">
        <span>{children}</span>
        <Icon 
          name={sortField === field 
            ? (sortDirection === 'asc' ? 'ChevronUp' : 'ChevronDown')
            : 'ChevronsUpDown'
          } 
          size={14} 
          className={sortField === field ? 'text-primary' : 'text-text-secondary'}
        />
      </div>
    </th>
  );

  return (
    <>
      <div className="bg-surface border border-border rounded-lg overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-muted/30">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.length === users?.length}
                    onChange={onSelectAll}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </th>
                <SortableHeader field="name">Name</SortableHeader>
                <SortableHeader field="email">Email</SortableHeader>
                <SortableHeader field="role">Role</SortableHeader>
                <SortableHeader field="status">Status</SortableHeader>
                <SortableHeader field="registrationDate">Registered</SortableHeader>
                <SortableHeader field="lastLogin">Last Login</SortableHeader>
                <th className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {sortedUsers?.map((user) => (
                <React.Fragment key={user?.id}>
                  <tr className="hover:bg-muted/30 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedUsers?.includes(user?.id)}
                        onChange={() => onSelectUser(user?.id)}
                        className="rounded border-border text-primary focus:ring-primary"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-medium text-primary">
                            {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-text-primary">{user?.name}</div>
                          <div className="text-sm text-text-secondary">{user?.department}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-text-primary">{user?.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user?.role)}`}>
                        {user?.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user?.status)}`}>
                        {user?.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {formatDate(user?.registrationDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-text-secondary">
                      {user?.lastLogin ? formatDate(user?.lastLogin) : 'Never'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Eye"
                          onClick={() => setDetailsModalUser(user)}
                        >
                          View
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName="Edit"
                          onClick={() => setEditModalUser(user)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          iconName={expandedRows?.has(user?.id) ? 'ChevronUp' : 'ChevronDown'}
                          onClick={() => toggleRowExpansion(user?.id)}
                        />
                      </div>
                    </td>
                  </tr>
                  {expandedRows?.has(user?.id) && (
                    <tr>
                      <td colSpan="8" className="px-6 py-4 bg-muted/20">
                        <div className="space-y-4">
                          <h4 className="font-medium text-text-primary">Recent Activity</h4>
                          <div className="space-y-2">
                            {user?.recentActivity?.map((activity, index) => (
                              <div key={index} className="flex items-center space-x-3 text-sm">
                                <Icon name="Clock" size={14} className="text-text-secondary" />
                                <span className="text-text-secondary">{formatDate(activity?.date)}</span>
                                <span className="text-text-primary">{activity?.action}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden space-y-4 p-4">
          {sortedUsers?.map((user) => (
            <div key={user?.id} className="bg-surface border border-border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <input
                  type="checkbox"
                  checked={selectedUsers?.includes(user?.id)}
                  onChange={() => onSelectUser(user?.id)}
                  className="rounded border-border text-primary focus:ring-primary"
                />
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user?.status)}`}>
                    {user?.status}
                  </span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user?.role)}`}>
                    {user?.role}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user?.name?.split(' ')?.map(n => n?.[0])?.join('')}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{user?.name}</div>
                  <div className="text-sm text-text-secondary">{user?.email}</div>
                  <div className="text-xs text-text-secondary">{user?.department}</div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-text-secondary">
                <span>Registered: {formatDate(user?.registrationDate)}</span>
                <span>Last Login: {user?.lastLogin ? formatDate(user?.lastLogin) : 'Never'}</span>
              </div>

              <div className="flex items-center space-x-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => setDetailsModalUser(user)}
                  fullWidth
                >
                  View Details
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  onClick={() => setEditModalUser(user)}
                  fullWidth
                >
                  Edit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Modals */}
      {detailsModalUser && (
        <UserDetailsModal
          user={detailsModalUser}
          onClose={() => setDetailsModalUser(null)}
        />
      )}
      {editModalUser && (
        <EditUserModal
          user={editModalUser}
          onClose={() => setEditModalUser(null)}
          onSave={(updatedUser) => {
            onUserUpdate(updatedUser);
            setEditModalUser(null);
          }}
        />
      )}
    </>
  );
};

export default UserTable;