import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const LogFilters = ({ 
  filters, 
  onFiltersChange, 
  autoRefresh, 
  onAutoRefreshToggle,
  onExport,
  onClearFilters 
}) => {
  const logLevels = [
    { value: 'all', label: 'All Levels' },
    { value: 'error', label: 'Error' },
    { value: 'warning', label: 'Warning' },
    { value: 'info', label: 'Info' },
    { value: 'debug', label: 'Debug' }
  ];

  const timeRanges = [
    { value: 'last-hour', label: 'Last Hour' },
    { value: 'last-4-hours', label: 'Last 4 Hours' },
    { value: 'last-24-hours', label: 'Last 24 Hours' },
    { value: 'last-7-days', label: 'Last 7 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const sources = [
    { value: 'all', label: 'All Sources' },
    { value: 'api', label: 'API Server' },
    { value: 'database', label: 'Database' },
    { value: 'auth', label: 'Authentication' },
    { value: 'payment', label: 'Payment Gateway' },
    { value: 'email', label: 'Email Service' }
  ];

  return (
    <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Log Filters</span>
        </h2>
        
        <div className="flex items-center space-x-3">
          <Button
            variant={autoRefresh ? "default" : "outline"}
            size="sm"
            iconName={autoRefresh ? "Pause" : "Play"}
            iconPosition="left"
            onClick={onAutoRefreshToggle}
          >
            {autoRefresh ? "Pause" : "Auto Refresh"}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Download"
            iconPosition="left"
            onClick={onExport}
          >
            Export
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearFilters}
          >
            Clear
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Log Level"
          options={logLevels}
          value={filters?.level}
          onChange={(value) => onFiltersChange({ ...filters, level: value })}
        />

        <Select
          label="Time Range"
          options={timeRanges}
          value={filters?.timeRange}
          onChange={(value) => onFiltersChange({ ...filters, timeRange: value })}
        />

        <Select
          label="Source"
          options={sources}
          value={filters?.source}
          onChange={(value) => onFiltersChange({ ...filters, source: value })}
        />

        <Input
          label="User ID"
          type="text"
          placeholder="Filter by user ID"
          value={filters?.userId}
          onChange={(e) => onFiltersChange({ ...filters, userId: e?.target?.value })}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            label="Search Messages"
            type="search"
            placeholder="Search log messages, errors, or stack traces..."
            value={filters?.search}
            onChange={(e) => onFiltersChange({ ...filters, search: e?.target?.value })}
          />
        </div>
        
        <div className="flex items-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            iconName="Search"
            onClick={() => {/* Search functionality */}}
          >
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LogFilters;