import React from 'react';
import Icon from '../../../components/AppIcon';

const GeographicDistribution = ({ loading = false }) => {
  const geographicData = [
    { country: 'United States', clients: 145, percentage: 42, flag: '🇺🇸', revenue: '$284,500' },
    { country: 'United Kingdom', clients: 89, percentage: 26, flag: '🇬🇧', revenue: '$178,200' },
    { country: 'Canada', clients: 52, percentage: 15, flag: '🇨🇦', revenue: '$104,800' },
    { country: 'Australia', clients: 34, percentage: 10, flag: '🇦🇺', revenue: '$68,400' },
    { country: 'Germany', clients: 24, percentage: 7, flag: '🇩🇪', revenue: '$48,200' }
  ];

  const totalClients = geographicData?.reduce((sum, item) => sum + item?.clients, 0);

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5]?.map((i) => (
              <div key={i} className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-2 bg-muted rounded"></div>
                </div>
                <div className="h-4 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Geographic Distribution</h3>
          <p className="text-sm text-text-secondary">Client distribution by country</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Globe" size={16} />
          <span>Total: {totalClients} clients</span>
        </div>
      </div>
      <div className="space-y-4">
        {geographicData?.map((country, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{country?.flag}</span>
                <div>
                  <div className="font-medium text-text-primary">{country?.country}</div>
                  <div className="text-sm text-text-secondary">{country?.clients} clients</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-text-primary">{country?.percentage}%</div>
                <div className="text-sm text-text-secondary">{country?.revenue}</div>
              </div>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-500 ease-smooth"
                style={{ width: `${country?.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">5</div>
            <div className="text-sm text-text-secondary">Countries</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold text-text-primary">$684.1k</div>
            <div className="text-sm text-text-secondary">Total Revenue</div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="TrendingUp" size={16} className="text-success" />
          <span className="text-text-secondary">
            <span className="font-medium text-success">+12%</span> growth in international clients this quarter
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeographicDistribution;