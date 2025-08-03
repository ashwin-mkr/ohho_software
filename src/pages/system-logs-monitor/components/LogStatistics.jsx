import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const LogStatistics = ({ statistics, errorFrequency }) => {
  const levelColors = {
    error: '#e53e3e',
    warning: '#ed8936',
    info: '#007bff',
    debug: '#718096'
  };

  const quickFilters = [
    { 
      label: 'Critical Errors', 
      count: statistics?.criticalErrors, 
      icon: 'AlertCircle', 
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    { 
      label: 'Auth Failures', 
      count: statistics?.authFailures, 
      icon: 'Shield', 
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    { 
      label: 'API Errors', 
      count: statistics?.apiErrors, 
      icon: 'Server', 
      color: 'text-error',
      bgColor: 'bg-error/10'
    },
    { 
      label: 'DB Timeouts', 
      count: statistics?.dbTimeouts, 
      icon: 'Database', 
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const pieData = [
    { name: 'Error', value: statistics?.errorCount, color: levelColors?.error },
    { name: 'Warning', value: statistics?.warningCount, color: levelColors?.warning },
    { name: 'Info', value: statistics?.infoCount, color: levelColors?.info },
    { name: 'Debug', value: statistics?.debugCount, color: levelColors?.debug }
  ];

  return (
    <div className="space-y-6">
      {/* Log Level Distribution */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="PieChart" size={20} />
          <span>Log Level Distribution</span>
        </h3>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value, name) => [value, name]}
                labelStyle={{ color: 'var(--color-text-primary)' }}
                contentStyle={{ 
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-4">
          {pieData?.map((item) => (
            <div key={item?.name} className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item?.color }}
              />
              <span className="text-sm text-text-secondary">{item?.name}: {item?.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Error Frequency Chart */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="TrendingUp" size={20} />
          <span>Error Frequency (24h)</span>
        </h3>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={errorFrequency}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="hour" 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-text-secondary)"
                fontSize={12}
              />
              <Tooltip 
                formatter={(value) => [value, 'Errors']}
                labelFormatter={(label) => `Hour: ${label}:00`}
                contentStyle={{ 
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="errors" fill="var(--color-error)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Quick Filter Presets */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Filter" size={20} />
          <span>Quick Filters</span>
        </h3>
        
        <div className="space-y-3">
          {quickFilters?.map((filter, index) => (
            <button
              key={index}
              className={`w-full flex items-center justify-between p-3 rounded-lg border border-border hover:shadow-elevation-1 transition-all duration-150 ${filter?.bgColor}`}
            >
              <div className="flex items-center space-x-3">
                <Icon name={filter?.icon} size={18} className={filter?.color} />
                <span className="font-medium text-text-primary">{filter?.label}</span>
              </div>
              <span className={`font-bold ${filter?.color}`}>{filter?.count}</span>
            </button>
          ))}
        </div>
      </div>
      {/* System Performance Metrics */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Activity" size={20} />
          <span>Performance Metrics</span>
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Avg Response Time</span>
            <span className="font-semibold text-text-primary">{statistics?.avgResponseTime}ms</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Success Rate</span>
            <span className="font-semibold text-success">{statistics?.successRate}%</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Active Sessions</span>
            <span className="font-semibold text-text-primary">{statistics?.activeSessions}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">Memory Usage</span>
            <span className="font-semibold text-warning">{statistics?.memoryUsage}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogStatistics;