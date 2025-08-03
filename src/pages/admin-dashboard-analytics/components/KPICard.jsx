import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ title, value, change, changeType, icon, trend, loading = false }) => {
  const getChangeColor = () => {
    if (changeType === 'positive') return 'text-success';
    if (changeType === 'negative') return 'text-error';
    return 'text-text-secondary';
  };

  const getChangeIcon = () => {
    if (changeType === 'positive') return 'TrendingUp';
    if (changeType === 'negative') return 'TrendingDown';
    return 'Minus';
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6 animate-pulse">
        <div className="flex items-center justify-between mb-4">
          <div className="h-4 bg-muted rounded w-24"></div>
          <div className="h-8 w-8 bg-muted rounded-lg"></div>
        </div>
        <div className="h-8 bg-muted rounded w-32 mb-2"></div>
        <div className="h-4 bg-muted rounded w-20"></div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6 hover:shadow-elevation-1 transition-all duration-150 ease-smooth">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-secondary">{title}</h3>
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="text-2xl font-bold text-text-primary">
          {value}
        </div>
        
        {change && (
          <div className={`flex items-center space-x-1 text-sm ${getChangeColor()}`}>
            <Icon name={getChangeIcon()} size={16} />
            <span>{change}</span>
            <span className="text-text-secondary">vs last month</span>
          </div>
        )}
        
        {trend && (
          <div className="mt-3">
            <div className="flex items-center space-x-2 text-xs text-text-secondary mb-1">
              <span>Trend</span>
            </div>
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ease-smooth ${
                  changeType === 'positive' ? 'bg-success' : 
                  changeType === 'negative' ? 'bg-error' : 'bg-primary'
                }`}
                style={{ width: `${Math.abs(trend)}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KPICard;