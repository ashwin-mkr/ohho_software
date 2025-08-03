import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStatsCard = ({ title, value, change, changeType, icon, color = 'primary' }) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success': return 'text-success bg-success/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'error': return 'text-error bg-error/10';
      case 'accent': return 'text-accent bg-accent/10';
      default: return 'text-primary bg-primary/10';
    }
  };

  const getChangeColor = () => {
    return changeType === 'increase' ? 'text-success' : 'text-error';
  };

  return (
    <div className="bg-surface border border-border rounded-lg p-6 hover:shadow-elevation-1 transition-all duration-150 ease-smooth">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-text-secondary">{title}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
          {change && (
            <div className={`flex items-center space-x-1 ${getChangeColor()}`}>
              <Icon 
                name={changeType === 'increase' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span className="text-sm font-medium">{change}</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${getColorClasses()}`}>
          <Icon name={icon} size={24} />
        </div>
      </div>
    </div>
  );
};

export default UserStatsCard;