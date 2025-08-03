import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DateRangeSelector = ({ onDateRangeChange, loading = false }) => {
  const [selectedRange, setSelectedRange] = useState('7d');
  const [customRange, setCustomRange] = useState({
    startDate: '',
    endDate: ''
  });
  const [showCustom, setShowCustom] = useState(false);

  const predefinedRanges = [
    { value: '1d', label: 'Last 24 Hours', days: 1 },
    { value: '7d', label: 'Last 7 Days', days: 7 },
    { value: '30d', label: 'Last 30 Days', days: 30 },
    { value: '90d', label: 'Last 3 Months', days: 90 },
    { value: '1y', label: 'Last Year', days: 365 },
    { value: 'custom', label: 'Custom Range', days: null }
  ];

  const handleRangeSelect = (range) => {
    setSelectedRange(range?.value);
    setShowCustom(range?.value === 'custom');
    
    if (range?.value !== 'custom') {
      const endDate = new Date();
      const startDate = new Date();
      startDate?.setDate(endDate?.getDate() - range?.days);
      
      onDateRangeChange?.({
        startDate: startDate?.toISOString()?.split('T')?.[0],
        endDate: endDate?.toISOString()?.split('T')?.[0],
        range: range?.value
      });
    }
  };

  const handleCustomRangeApply = () => {
    if (customRange?.startDate && customRange?.endDate) {
      onDateRangeChange?.({
        startDate: customRange?.startDate,
        endDate: customRange?.endDate,
        range: 'custom'
      });
      setShowCustom(false);
    }
  };

  const getDateRangeText = () => {
    const selectedRangeObj = predefinedRanges?.find(r => r?.value === selectedRange);
    if (selectedRange === 'custom' && customRange?.startDate && customRange?.endDate) {
      return `${new Date(customRange.startDate)?.toLocaleDateString()} - ${new Date(customRange.endDate)?.toLocaleDateString()}`;
    }
    return selectedRangeObj?.label || 'Select Range';
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-4">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-32 mb-3"></div>
          <div className="grid grid-cols-2 gap-2">
            {[1, 2, 3, 4]?.map((i) => (
              <div key={i} className="h-8 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-primary">Date Range</h3>
        <Icon name="Calendar" size={16} className="text-text-secondary" />
      </div>
      <div className="space-y-3">
        {/* Current Selection Display */}
        <div className="p-3 bg-muted/50 rounded-lg border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-text-primary">
              {getDateRangeText()}
            </span>
            <Icon name="ChevronDown" size={16} className="text-text-secondary" />
          </div>
        </div>
        
        {/* Predefined Ranges */}
        <div className="grid grid-cols-2 gap-2">
          {predefinedRanges?.map((range) => (
            <button
              key={range?.value}
              onClick={() => handleRangeSelect(range)}
              className={`
                p-2 text-sm rounded-lg border transition-all duration-150 ease-smooth
                ${selectedRange === range?.value
                  ? 'bg-primary text-white border-primary' :'bg-surface text-text-secondary border-border hover:bg-muted hover:text-text-primary'
                }
              `}
            >
              {range?.label}
            </button>
          ))}
        </div>
        
        {/* Custom Date Range */}
        {showCustom && (
          <div className="space-y-3 p-3 bg-muted/30 rounded-lg border border-border">
            <h4 className="text-sm font-medium text-text-primary">Custom Date Range</h4>
            
            <div className="space-y-2">
              <div>
                <label className="block text-xs text-text-secondary mb-1">Start Date</label>
                <input
                  type="date"
                  value={customRange?.startDate}
                  onChange={(e) => setCustomRange(prev => ({ ...prev, startDate: e?.target?.value }))}
                  className="w-full p-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-xs text-text-secondary mb-1">End Date</label>
                <input
                  type="date"
                  value={customRange?.endDate}
                  onChange={(e) => setCustomRange(prev => ({ ...prev, endDate: e?.target?.value }))}
                  className="w-full p-2 text-sm border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="default"
                size="sm"
                onClick={handleCustomRangeApply}
                disabled={!customRange?.startDate || !customRange?.endDate}
              >
                Apply
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCustom(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        )}
        
        {/* Quick Actions */}
        <div className="pt-3 border-t border-border">
          <h4 className="text-xs font-medium text-text-secondary mb-2">Quick Actions</h4>
          <div className="flex space-x-2">
            <Button
              variant="ghost"
              size="xs"
              iconName="RotateCcw"
              onClick={() => handleRangeSelect(predefinedRanges?.find(r => r?.value === '7d'))}
            >
              Reset
            </Button>
            <Button
              variant="ghost"
              size="xs"
              iconName="Download"
            >
              Export
            </Button>
          </div>
        </div>
        
        {/* Data Freshness Indicator */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs">
            <span className="text-text-secondary">Last updated</span>
            <div className="flex items-center space-x-1">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
              <span className="text-success">Live</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateRangeSelector;