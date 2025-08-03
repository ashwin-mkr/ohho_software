import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const MetricFilters = ({ onFiltersChange, loading = false }) => {
  const [activeFilters, setActiveFilters] = useState({
    services: ['web_development', 'app_development'],
    regions: ['us', 'uk'],
    clientTypes: ['enterprise', 'startup'],
    paymentStatus: ['completed', 'pending']
  });

  const [expandedSections, setExpandedSections] = useState({
    services: true,
    regions: false,
    clientTypes: false,
    paymentStatus: false
  });

  const filterOptions = {
    services: [
      { value: 'web_development', label: 'Web Development', count: 142 },
      { value: 'app_development', label: 'App Development', count: 118 },
      { value: 'cloud_integration', label: 'Cloud Integration', count: 84 },
      { value: 'ai_tools', label: 'AI Tools', count: 52 },
      { value: 'cybersecurity', label: 'Cybersecurity', count: 21 }
    ],
    regions: [
      { value: 'us', label: 'United States', count: 145 },
      { value: 'uk', label: 'United Kingdom', count: 89 },
      { value: 'ca', label: 'Canada', count: 52 },
      { value: 'au', label: 'Australia', count: 34 },
      { value: 'de', label: 'Germany', count: 24 }
    ],
    clientTypes: [
      { value: 'enterprise', label: 'Enterprise', count: 89 },
      { value: 'startup', label: 'Startup', count: 156 },
      { value: 'sme', label: 'Small & Medium', count: 98 },
      { value: 'individual', label: 'Individual', count: 34 }
    ],
    paymentStatus: [
      { value: 'completed', label: 'Completed', count: 298 },
      { value: 'pending', label: 'Pending', count: 45 },
      { value: 'failed', label: 'Failed', count: 12 },
      { value: 'refunded', label: 'Refunded', count: 8 }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleFilterChange = (category, value, checked) => {
    const newFilters = { ...activeFilters };
    
    if (checked) {
      newFilters[category] = [...newFilters?.[category], value];
    } else {
      newFilters[category] = newFilters?.[category]?.filter(item => item !== value);
    }
    
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      services: [],
      regions: [],
      clientTypes: [],
      paymentStatus: []
    };
    setActiveFilters(clearedFilters);
    onFiltersChange?.(clearedFilters);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.reduce((total, filters) => total + filters?.length, 0);
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-24 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i}>
                <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                <div className="space-y-2 ml-4">
                  {[1, 2, 3]?.map((j) => (
                    <div key={j} className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-muted rounded"></div>
                      <div className="h-3 bg-muted rounded w-20"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium text-text-primary">Filters</h3>
          {getActiveFilterCount() > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {getActiveFilterCount()}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-text-secondary" />
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="xs"
              iconName="X"
              onClick={clearAllFilters}
            >
              Clear
            </Button>
          )}
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(filterOptions)?.map(([category, options]) => (
          <div key={category} className="space-y-2">
            <button
              onClick={() => toggleSection(category)}
              className="flex items-center justify-between w-full p-2 text-sm font-medium text-text-primary hover:bg-muted/30 rounded-lg transition-colors duration-150 ease-smooth"
            >
              <span className="capitalize">{category?.replace(/([A-Z])/g, ' $1')?.trim()}</span>
              <div className="flex items-center space-x-2">
                {activeFilters?.[category]?.length > 0 && (
                  <span className="text-xs text-primary">
                    {activeFilters?.[category]?.length}
                  </span>
                )}
                <Icon 
                  name={expandedSections?.[category] ? 'ChevronUp' : 'ChevronDown'} 
                  size={16} 
                  className="text-text-secondary" 
                />
              </div>
            </button>
            
            {expandedSections?.[category] && (
              <div className="space-y-2 ml-4">
                {options?.map((option) => (
                  <div key={option?.value} className="flex items-center justify-between">
                    <Checkbox
                      label={option?.label}
                      checked={activeFilters?.[category]?.includes(option?.value)}
                      onChange={(e) => handleFilterChange(category, option?.value, e?.target?.checked)}
                      size="sm"
                    />
                    <span className="text-xs text-text-secondary">
                      {option?.count}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Filter Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <h4 className="text-xs font-medium text-text-secondary mb-2">Active Filters</h4>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([category, filters]) =>
              filters?.map((filter) => {
                const option = filterOptions?.[category]?.find(opt => opt?.value === filter);
                return (
                  <span
                    key={`${category}-${filter}`}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                  >
                    {option?.label}
                    <button
                      onClick={() => handleFilterChange(category, filter, false)}
                      className="ml-1 hover:text-primary/80"
                    >
                      <Icon name="X" size={12} />
                    </button>
                  </span>
                );
              })
            )}
          </div>
        </div>
      )}
      {/* Quick Presets */}
      <div className="mt-4 pt-4 border-t border-border">
        <h4 className="text-xs font-medium text-text-secondary mb-2">Quick Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              const preset = {
                services: ['web_development', 'app_development'],
                regions: ['us', 'uk'],
                clientTypes: ['enterprise'],
                paymentStatus: ['completed']
              };
              setActiveFilters(preset);
              onFiltersChange?.(preset);
            }}
          >
            High Value
          </Button>
          <Button
            variant="ghost"
            size="xs"
            onClick={() => {
              const preset = {
                services: [],
                regions: [],
                clientTypes: ['startup'],
                paymentStatus: ['completed', 'pending']
              };
              setActiveFilters(preset);
              onFiltersChange?.(preset);
            }}
          >
            Startups
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MetricFilters;