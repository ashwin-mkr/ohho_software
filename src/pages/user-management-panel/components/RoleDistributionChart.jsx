import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const RoleDistributionChart = ({ data }) => {
  const COLORS = {
    admin: '#e53e3e',
    manager: '#ed8936', 
    user: '#007bff'
  };

  const chartData = [
    { name: 'Admin', value: data?.admin, color: COLORS?.admin },
    { name: 'Manager', value: data?.manager, color: COLORS?.manager },
    { name: 'User', value: data?.user, color: COLORS?.user }
  ];

  const total = data?.admin + data?.manager + data?.user;

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0];
      const percentage = ((data?.value / total) * 100)?.toFixed(1);
      return (
        <div className="bg-surface border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="font-medium text-text-primary">{data?.name}</p>
          <p className="text-sm text-text-secondary">
            {data?.value} users ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => (
    <div className="flex flex-col space-y-2 mt-4">
      {payload?.map((entry, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry?.color }}
            />
            <span className="text-sm text-text-primary">{entry?.value}</span>
          </div>
          <span className="text-sm font-medium text-text-secondary">
            {chartData?.find(d => d?.name === entry?.value)?.value || 0}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-text-primary">Role Distribution</h3>
        <Icon name="PieChart" size={20} className="text-text-secondary" />
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {chartData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="border-t border-border pt-4 mt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-error">{data?.admin}</div>
            <div className="text-xs text-text-secondary">Admins</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">{data?.manager}</div>
            <div className="text-xs text-text-secondary">Managers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-primary">{data?.user}</div>
            <div className="text-xs text-text-secondary">Users</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleDistributionChart;