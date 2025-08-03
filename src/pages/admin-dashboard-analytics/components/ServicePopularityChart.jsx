import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const ServicePopularityChart = ({ loading = false }) => {
  const serviceData = [
    { name: 'Web Development', value: 35, color: '#007bff', requests: 142 },
    { name: 'App Development', value: 28, color: '#00d4ff', requests: 118 },
    { name: 'Cloud Integration', value: 20, color: '#38a169', requests: 84 },
    { name: 'AI Tools', value: 12, color: '#ed8936', requests: 52 },
    { name: 'Cybersecurity', value: 5, color: '#e53e3e', requests: 21 }
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="500"
      >
        {`${(percent * 100)?.toFixed(0)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <div className="flex items-center space-x-2 mb-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: data?.color }}
            />
            <span className="font-medium text-text-primary">{data?.name}</span>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-text-secondary">Percentage:</span>
              <span className="font-medium text-text-primary">{data?.value}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Requests:</span>
              <span className="font-medium text-text-primary">{data?.requests}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="h-64 bg-muted rounded-full mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Service Popularity</h3>
          <p className="text-sm text-text-secondary">Distribution of service requests</p>
        </div>
        <div className="text-sm text-text-secondary">
          Total: {serviceData?.reduce((sum, item) => sum + item?.requests, 0)} requests
        </div>
      </div>
      <div className="h-64" aria-label="Service Popularity Pie Chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={serviceData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {serviceData?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry?.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 space-y-3">
        {serviceData?.map((service, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: service?.color }}
              />
              <span className="text-sm font-medium text-text-primary">{service?.name}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <span className="text-text-secondary">{service?.requests} requests</span>
              <span className="font-medium text-text-primary">{service?.value}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePopularityChart;