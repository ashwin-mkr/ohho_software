import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const UserEngagementChart = ({ loading = false }) => {
  const engagementData = [
    { day: 'Mon', sessions: 1200, pageViews: 3400, bounceRate: 35 },
    { day: 'Tue', sessions: 1100, pageViews: 3100, bounceRate: 42 },
    { day: 'Wed', sessions: 1300, pageViews: 3800, bounceRate: 28 },
    { day: 'Thu', sessions: 1450, pageViews: 4200, bounceRate: 31 },
    { day: 'Fri', sessions: 1600, pageViews: 4800, bounceRate: 25 },
    { day: 'Sat', sessions: 900, pageViews: 2200, bounceRate: 48 },
    { day: 'Sun', sessions: 800, pageViews: 1900, bounceRate: 52 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-elevation-2">
          <p className="text-sm font-medium text-text-primary mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center justify-between space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: entry?.color }}
                />
                <span className="text-text-secondary capitalize">{entry?.dataKey}:</span>
              </div>
              <span className="font-medium text-text-primary">
                {entry?.dataKey === 'bounceRate' ? `${entry?.value}%` : entry?.value?.toLocaleString()}
              </span>
            </div>
          ))}
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
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">User Engagement</h3>
          <p className="text-sm text-text-secondary">Weekly user activity metrics</p>
        </div>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-text-secondary">Sessions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-accent rounded-full"></div>
            <span className="text-text-secondary">Page Views</span>
          </div>
        </div>
      </div>
      
      <div className="h-64" aria-label="User Engagement Bar Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={engagementData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="day" 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-text-secondary)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="sessions" 
              fill="var(--color-primary)" 
              radius={[4, 4, 0, 0]}
              opacity={0.8}
            />
            <Bar 
              dataKey="pageViews" 
              fill="var(--color-accent)" 
              radius={[4, 4, 0, 0]}
              opacity={0.6}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">8.4k</div>
          <div className="text-sm text-text-secondary">Total Sessions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">23.4k</div>
          <div className="text-sm text-text-secondary">Total Views</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">37%</div>
          <div className="text-sm text-text-secondary">Avg Bounce Rate</div>
        </div>
      </div>
    </div>
  );
};

export default UserEngagementChart;