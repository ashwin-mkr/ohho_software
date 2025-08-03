import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const FilterToolbar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedRole, 
  onRoleChange, 
  selectedStatus, 
  onStatusChange,
  dateRange,
  onDateRangeChange,
  totalResults,
  onClearFilters 
}) => {
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'admin', label: 'Admin' },
    { value: 'manager', label: 'Manager' },
    { value: 'user', label: 'User' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
    { value: 'pending', label: 'Pending' }
  ];

  const hasActiveFilters = searchTerm || selectedRole !== 'all' || selectedStatus !== 'all' || 
    (dateRange?.start || dateRange?.end);

  return (
    <div className="bg-surface border border-border rounded-lg p-4 space-y-4">
      {/* Primary Filters */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
            />
            <Input
              type="text"
              placeholder="Search users by name, email, or department..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
          <Select
            options={roleOptions}
            value={selectedRole}
            onChange={onRoleChange}
            className="min-w-32"
          />
          
          <Select
            options={statusOptions}
            value={selectedStatus}
            onChange={onStatusChange}
            className="min-w-32"
          />

          <Button
            variant="outline"
            iconName="Filter"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className={showAdvancedFilters ? 'bg-primary/10 text-primary' : ''}
          >
            Filters
          </Button>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              iconName="X"
              onClick={onClearFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <Input
                type="date"
                label="Registration From"
                value={dateRange?.start}
                onChange={(e) => onDateRangeChange({ ...dateRange, start: e?.target?.value })}
              />
            </div>
            <div>
              <Input
                type="date"
                label="Registration To"
                value={dateRange?.end}
                onChange={(e) => onDateRangeChange({ ...dateRange, end: e?.target?.value })}
              />
            </div>
            <div className="flex items-end">
              <Button
                variant="outline"
                iconName="Download"
                fullWidth
              >
                Export Results
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Results Summary */}
      <div className="flex items-center justify-between text-sm text-text-secondary border-t border-border pt-4">
        <div className="flex items-center space-x-2">
          <Icon name="Users" size={16} />
          <span>
            Showing {totalResults} user{totalResults !== 1 ? 's' : ''}
            {hasActiveFilters && ' (filtered)'}
          </span>
        </div>
        
        <div className="flex items-center space-x-4">
          <span>Last updated: {new Date()?.toLocaleTimeString()}</span>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            onClick={() => window.location?.reload()}
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;