import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AdminNavigation from '../../components/ui/AdminNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import LogFilters from './components/LogFilters';
import LogTable from './components/LogTable';
import LogStatistics from './components/LogStatistics';
import SystemHealth from './components/SystemHealth';
import LogDetailModal from './components/LogDetailModal';

const SystemLogsMonitor = () => {
  const [filters, setFilters] = useState({
    level: 'all',
    timeRange: 'last-24-hours',
    source: 'all',
    userId: '',
    search: ''
  });

  const [autoRefresh, setAutoRefresh] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Mock data for system logs
  const mockLogs = [
    {
      id: 'log_001',
      timestamp: new Date(Date.now() - 300000),
      level: 'error',
      source: 'API Server',
      userId: 'user_12345',
      message: 'Database connection timeout occurred during user authentication process',
      requestId: 'req_abc123def456',
      ipAddress: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      responseTime: 5000,
      stackTrace: `Error: Connection timeout\n    at Database.connect (/app/db/connection.js:45:12)\n    at AuthService.authenticate (/app/auth/service.js:23:8)\n    at UserController.login (/app/controllers/user.js:67:15)\n    at Router.handle (/app/routes/auth.js:12:3)`,
      context: {
        database: 'primary',
        connectionPool: 'exhausted',
        retryAttempts: 3
      },
      relatedLogs: [
        {
          id: 'log_002',
          timestamp: new Date(Date.now() - 280000),
          level: 'warning',
          message: 'Database connection pool nearing capacity'
        }
      ]
    },
    {
      id: 'log_003',
      timestamp: new Date(Date.now() - 600000),
      level: 'warning',
      source: 'Payment Gateway',
      userId: 'user_67890',
      message: 'Payment processing took longer than expected threshold',
      requestId: 'req_xyz789ghi012',
      ipAddress: '10.0.0.50',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      responseTime: 3500,
      context: {
        paymentMethod: 'credit_card',
        amount: 99.99,
        currency: 'USD'
      }
    },
    {
      id: 'log_004',
      timestamp: new Date(Date.now() - 900000),
      level: 'info',
      source: 'Auth Service',
      userId: 'user_11111',
      message: 'User successfully logged in with two-factor authentication',
      requestId: 'req_mno345pqr678',
      ipAddress: '172.16.0.25',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15',
      responseTime: 250,
      context: {
        authMethod: '2fa',
        deviceTrusted: true
      }
    },
    {
      id: 'log_005',
      timestamp: new Date(Date.now() - 1200000),
      level: 'debug',
      source: 'Email Service',
      userId: null,
      message: 'Email queue processing completed successfully',
      requestId: 'req_stu901vwx234',
      ipAddress: '127.0.0.1',
      userAgent: 'Internal Service',
      responseTime: 150,
      context: {
        emailsSent: 45,
        queueSize: 0,
        processingTime: '2.3s'
      }
    },
    {
      id: 'log_006',
      timestamp: new Date(Date.now() - 1500000),
      level: 'error',
      source: 'Database',
      userId: 'user_22222',
      message: 'Query execution failed due to syntax error in user-generated report',
      requestId: 'req_yza567bcd890',
      ipAddress: '192.168.1.200',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      responseTime: 1000,
      stackTrace: `SQLException: Syntax error near 'SELCT'\n    at QueryExecutor.execute (/app/db/executor.js:78:9)\n    at ReportService.generateReport (/app/reports/service.js:34:12)\n    at ReportController.create (/app/controllers/report.js:45:8)`,
      context: {
        query: 'SELCT * FROM users WHERE active = 1',
        table: 'users',
        userId: 'user_22222'
      }
    }
  ];

  // Mock statistics data
  const mockStatistics = {
    errorCount: 156,
    warningCount: 89,
    infoCount: 1247,
    debugCount: 2891,
    criticalErrors: 12,
    authFailures: 23,
    apiErrors: 45,
    dbTimeouts: 8,
    avgResponseTime: 245,
    successRate: 98.7,
    activeSessions: 1247,
    memoryUsage: 67
  };

  // Mock error frequency data for charts
  const mockErrorFrequency = [
    { hour: '00', errors: 5 },
    { hour: '01', errors: 3 },
    { hour: '02', errors: 2 },
    { hour: '03', errors: 1 },
    { hour: '04', errors: 4 },
    { hour: '05', errors: 7 },
    { hour: '06', errors: 12 },
    { hour: '07', errors: 18 },
    { hour: '08', errors: 25 },
    { hour: '09', errors: 31 },
    { hour: '10', errors: 28 },
    { hour: '11', errors: 22 },
    { hour: '12', errors: 19 },
    { hour: '13', errors: 24 },
    { hour: '14', errors: 27 },
    { hour: '15', errors: 33 },
    { hour: '16', errors: 29 },
    { hour: '17', errors: 21 },
    { hour: '18', errors: 15 },
    { hour: '19', errors: 11 },
    { hour: '20', errors: 8 },
    { hour: '21', errors: 6 },
    { hour: '22', errors: 4 },
    { hour: '23', errors: 3 }
  ];

  // Mock health metrics
  const mockHealthMetrics = [
    {
      name: 'CPU Usage',
      value: 45,
      unit: '%',
      thresholds: { warning: 70, critical: 90 }
    },
    {
      name: 'Memory Usage',
      value: 67,
      unit: '%',
      thresholds: { warning: 80, critical: 95 }
    },
    {
      name: 'Disk Usage',
      value: 34,
      unit: '%',
      thresholds: { warning: 85, critical: 95 }
    },
    {
      name: 'Network I/O',
      value: 23,
      unit: 'MB/s',
      thresholds: { warning: 100, critical: 150 }
    }
  ];

  // Mock active sessions
  const mockActiveSessions = [
    {
      id: 'session_001',
      username: 'admin@ohho.com',
      ipAddress: '192.168.1.100',
      duration: '2h 15m',
      lastActivity: '2 min ago'
    },
    {
      id: 'session_002',
      username: 'john.doe@company.com',
      ipAddress: '10.0.0.50',
      duration: '45m',
      lastActivity: '5 min ago'
    },
    {
      id: 'session_003',
      username: 'sarah.wilson@startup.io',
      ipAddress: '172.16.0.25',
      duration: '1h 30m',
      lastActivity: '1 min ago'
    },
    {
      id: 'session_004',
      username: 'mike.chen@tech.com',
      ipAddress: '192.168.1.200',
      duration: '3h 22m',
      lastActivity: '8 min ago'
    },
    {
      id: 'session_005',
      username: 'lisa.garcia@agency.net',
      ipAddress: '10.0.1.75',
      duration: '25m',
      lastActivity: 'Just now'
    },
    {
      id: 'session_006',
      username: 'david.brown@corp.com',
      ipAddress: '172.16.1.100',
      duration: '1h 5m',
      lastActivity: '12 min ago'
    }
  ];

  // Mock alert settings
  const mockAlerts = [
    {
      name: 'Critical Error Rate',
      condition: 'Error rate > 5% in 5 minutes',
      enabled: true
    },
    {
      name: 'High Response Time',
      condition: 'Avg response time > 2s in 10 minutes',
      enabled: true
    },
    {
      name: 'Database Connection Issues',
      condition: 'DB connection failures > 3 in 1 minute',
      enabled: true
    },
    {
      name: 'Memory Usage Alert',
      condition: 'Memory usage > 90% for 5 minutes',
      enabled: false
    },
    {
      name: 'Authentication Failures',
      condition: 'Failed login attempts > 10 in 1 minute',
      enabled: true
    }
  ];

  // Filter logs based on current filters
  const filteredLogs = mockLogs?.filter(log => {
    if (filters?.level !== 'all' && log?.level !== filters?.level) return false;
    if (filters?.source !== 'all' && log?.source !== filters?.source) return false;
    if (filters?.userId && !log?.userId?.includes(filters?.userId)) return false;
    if (filters?.search && !log?.message?.toLowerCase()?.includes(filters?.search?.toLowerCase())) return false;
    return true;
  });

  // Auto-refresh functionality
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval);
  }, [autoRefresh]);

  // Sound notification for critical errors
  useEffect(() => {
    if (soundEnabled) {
      const criticalErrors = filteredLogs?.filter(log => log?.level === 'error');
      if (criticalErrors?.length > 0) {
        // In a real app, you would play a sound here
        console.log('Critical error detected - sound notification');
      }
    }
  }, [filteredLogs, soundEnabled]);

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleAutoRefreshToggle = () => {
    setAutoRefresh(!autoRefresh);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredLogs, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `system-logs-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    
    const linkElement = document.createElement('a');
    linkElement?.setAttribute('href', dataUri);
    linkElement?.setAttribute('download', exportFileDefaultName);
    linkElement?.click();
  };

  const handleClearFilters = () => {
    setFilters({
      level: 'all',
      timeRange: 'last-24-hours',
      source: 'all',
      userId: '',
      search: ''
    });
  };

  const handleLogSelect = (log) => {
    setSelectedLog(log);
    setShowDetailModal(true);
  };

  const handleAlertConfig = () => {
    console.log('Opening alert configuration modal');
  };

  return (
    <>
      <Helmet>
        <title>System Logs Monitor - OHHO Software Admin</title>
        <meta name="description" content="Real-time system activity tracking and troubleshooting capabilities for administrators to maintain application health and security oversight." />
      </Helmet>
      <AdminNavigation userRole="admin" notifications={3} />
      <div className="min-h-screen bg-background pt-16 md:pt-16 pb-20 md:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-text-secondary mb-6">
            <span>Dashboard</span>
            <Icon name="ChevronRight" size={16} />
            <span>System</span>
            <Icon name="ChevronRight" size={16} />
            <span className="text-text-primary font-medium">Logs</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary mb-2">System Logs Monitor</h1>
              <p className="text-text-secondary">
                Real-time system activity tracking and troubleshooting capabilities
              </p>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-text-secondary">Live monitoring active</span>
              </div>
              
              <Button
                variant={soundEnabled ? "default" : "outline"}
                size="sm"
                iconName={soundEnabled ? "Volume2" : "VolumeX"}
                onClick={() => setSoundEnabled(!soundEnabled)}
              >
                {soundEnabled ? "Sound On" : "Sound Off"}
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Sidebar - Statistics */}
            <div className="lg:col-span-1">
              <LogStatistics 
                statistics={mockStatistics}
                errorFrequency={mockErrorFrequency}
              />
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <LogFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                autoRefresh={autoRefresh}
                onAutoRefreshToggle={handleAutoRefreshToggle}
                onExport={handleExport}
                onClearFilters={handleClearFilters}
              />

              {/* Log Table */}
              <LogTable
                logs={filteredLogs}
                onLogSelect={handleLogSelect}
                selectedLog={selectedLog}
                isLoading={isLoading}
              />

              {/* Results Summary */}
              <div className="bg-surface border border-border rounded-lg p-4 shadow-elevation-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    Showing {filteredLogs?.length} of {mockLogs?.length} log entries
                  </span>
                  <div className="flex items-center space-x-4">
                    <span className="text-text-secondary">
                      Last updated: {new Date()?.toLocaleTimeString()}
                    </span>
                    {autoRefresh && (
                      <div className="flex items-center space-x-1 text-success">
                        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                        <span>Auto-refreshing</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Sidebar - System Health */}
            <div className="lg:col-span-1">
              <SystemHealth
                healthMetrics={mockHealthMetrics}
                activeSessions={mockActiveSessions}
                alerts={mockAlerts}
                onAlertConfig={handleAlertConfig}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Log Detail Modal */}
      <LogDetailModal
        log={selectedLog}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedLog(null);
        }}
      />
    </>
  );
};

export default SystemLogsMonitor;