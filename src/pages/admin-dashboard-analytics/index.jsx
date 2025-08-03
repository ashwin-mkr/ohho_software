import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavigation from '../../components/ui/AdminNavigation';
import LoadingIndicators from '../../components/ui/LoadingIndicators';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import KPICard from './components/KPICard';
import RevenueChart from './components/RevenueChart';
import UserEngagementChart from './components/UserEngagementChart';
import ServicePopularityChart from './components/ServicePopularityChart';
import GeographicDistribution from './components/GeographicDistribution';
import RecentActivity from './components/RecentActivity';
import PendingApprovals from './components/PendingApprovals';
import SystemAlerts from './components/SystemAlerts';
import DateRangeSelector from './components/DateRangeSelector';
import MetricFilters from './components/MetricFilters';

const AdminDashboardAnalytics = () => {
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: '2025-07-27',
    endDate: '2025-08-03',
    range: '7d'
  });
  const [filters, setFilters] = useState({
    services: ['web_development', 'app_development'],
    regions: ['us', 'uk'],
    clientTypes: ['enterprise', 'startup'],
    paymentStatus: ['completed', 'pending']
  });
  const [refreshing, setRefreshing] = useState(false);

  // Mock KPI data
  const kpiData = [
    {
      title: 'Total Revenue',
      value: '$284,500',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'DollarSign',
      trend: 75
    },
    {
      title: 'Active Users',
      value: '2,847',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Users',
      trend: 68
    },
    {
      title: 'Conversion Rate',
      value: '3.24%',
      change: '-2.1%',
      changeType: 'negative',
      icon: 'TrendingUp',
      trend: 45
    },
    {
      title: 'System Health',
      value: '99.8%',
      change: '+0.3%',
      changeType: 'positive',
      icon: 'Activity',
      trend: 98
    }
  ];

  useEffect(() => {
    // Simulate initial data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleDateRangeChange = (newRange) => {
    setDateRange(newRange);
    // In real app, trigger data refresh with new date range
    console.log('Date range changed:', newRange);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    // In real app, trigger data refresh with new filters
    console.log('Filters changed:', newFilters);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleExportReport = () => {
    // In real app, generate and download report
    console.log('Exporting report with filters:', filters, 'and date range:', dateRange);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <AdminNavigation />
        <div className="pt-16 md:pt-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <LoadingIndicators variant="admin" message="Loading dashboard analytics..." />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Admin Dashboard Analytics - OHHO Software</title>
        <meta name="description" content="Comprehensive business intelligence and operational oversight dashboard for OHHO Software administrators." />
      </Helmet>
      <AdminNavigation notifications={3} />
      <div className="pt-16 md:pt-16 pb-16 md:pb-4">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">Dashboard Analytics</h1>
              <p className="text-text-secondary">
                Comprehensive business intelligence and operational oversight
              </p>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <Button
                variant="ghost"
                iconName="RefreshCw"
                iconPosition="left"
                loading={refreshing}
                onClick={handleRefresh}
              >
                Refresh
              </Button>
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportReport}
              >
                Export Report
              </Button>
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar - Filters and Controls */}
            <div className="lg:col-span-3 space-y-6">
              <DateRangeSelector 
                onDateRangeChange={handleDateRangeChange}
                loading={false}
              />
              <MetricFilters 
                onFiltersChange={handleFiltersChange}
                loading={false}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-9 space-y-6">
              {/* KPI Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {kpiData?.map((kpi, index) => (
                  <KPICard
                    key={index}
                    title={kpi?.title}
                    value={kpi?.value}
                    change={kpi?.change}
                    changeType={kpi?.changeType}
                    icon={kpi?.icon}
                    trend={kpi?.trend}
                    loading={false}
                  />
                ))}
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <RevenueChart loading={false} />
                <UserEngagementChart loading={false} />
              </div>

              {/* Secondary Charts Row */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <ServicePopularityChart loading={false} />
                <GeographicDistribution loading={false} />
              </div>

              {/* Activity and Management Row */}
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <RecentActivity loading={false} />
                <PendingApprovals loading={false} />
                <SystemAlerts loading={false} />
              </div>

              {/* Real-time Status Bar */}
              <div className="bg-card rounded-lg border border-border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-text-primary">Live Data</span>
                    </div>
                    <div className="text-sm text-text-secondary">
                      Last updated: {new Date()?.toLocaleTimeString()}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Icon name="Users" size={16} className="text-primary" />
                      <span className="text-text-secondary">
                        <span className="font-medium text-text-primary">47</span> active users
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Activity" size={16} className="text-success" />
                      <span className="text-text-secondary">
                        <span className="font-medium text-success">99.8%</span> uptime
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Icon name="Server" size={16} className="text-accent" />
                      <span className="text-text-secondary">
                        <span className="font-medium text-text-primary">12ms</span> response
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardAnalytics;