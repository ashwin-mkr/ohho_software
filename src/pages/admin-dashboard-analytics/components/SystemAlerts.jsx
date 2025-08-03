import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemAlerts = ({ loading = false }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'High CPU Usage',
      message: 'Server CPU usage has exceeded 85% for the past 15 minutes',
      timestamp: '2025-08-03T06:45:00Z',
      severity: 'medium',
      resolved: false,
      source: 'Infrastructure'
    },
    {
      id: 2,
      type: 'error',
      title: 'Payment Gateway Timeout',
      message: 'Stripe API response time increased to 3.2s (threshold: 2s)',
      timestamp: '2025-08-03T06:30:00Z',
      severity: 'high',
      resolved: false,
      source: 'Payment System'
    },
    {
      id: 3,
      type: 'info',
      title: 'Scheduled Maintenance',
      message: 'Database maintenance completed successfully at 02:00 AM',
      timestamp: '2025-08-03T02:00:00Z',
      severity: 'low',
      resolved: true,
      source: 'Database'
    },
    {
      id: 4,
      type: 'success',
      title: 'Backup Completed',
      message: 'Daily backup process completed successfully (2.3GB)',
      timestamp: '2025-08-03T01:00:00Z',
      severity: 'low',
      resolved: true,
      source: 'Backup System'
    }
  ]);

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'info': return 'Info';
      case 'success': return 'CheckCircle';
      default: return 'Bell';
    }
  };

  const getAlertColor = (type, resolved) => {
    if (resolved) return 'text-text-secondary bg-muted/50';
    
    switch (type) {
      case 'error': return 'text-error bg-error/10';
      case 'warning': return 'text-warning bg-warning/10';
      case 'info': return 'text-primary bg-primary/10';
      case 'success': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    } else {
      return date?.toLocaleDateString();
    }
  };

  const handleResolve = (id) => {
    setAlerts(prev => prev?.map(alert => 
      alert.id === id ? { ...alert, resolved: true } : alert
    ));
  };

  const handleDismiss = (id) => {
    setAlerts(prev => prev?.filter(alert => alert.id !== id));
  };

  const activeAlerts = alerts?.filter(alert => !alert.resolved);
  const resolvedAlerts = alerts?.filter(alert => alert.resolved);

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                <div className="w-8 h-8 bg-muted rounded-lg"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
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
          <h3 className="text-lg font-semibold text-text-primary">System Alerts</h3>
          <p className="text-sm text-text-secondary">System health and notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          {activeAlerts?.length > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-error/10 text-error">
              {activeAlerts?.length} active
            </span>
          )}
          <Button variant="ghost" size="sm" iconName="Settings">
            Configure
          </Button>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* Active Alerts */}
        {activeAlerts?.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Active Alerts</h4>
            {activeAlerts?.map((alert) => (
              <div key={alert.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-150 ease-smooth">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getAlertColor(alert.type, alert.resolved)}`}>
                    <Icon name={getAlertIcon(alert.type)} size={16} />
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-text-primary">{alert.title}</h5>
                        <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-xs text-text-secondary">
                        <span>{alert.source}</span>
                        <span>{formatTimestamp(alert.timestamp)}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="success"
                          size="xs"
                          iconName="Check"
                          onClick={() => handleResolve(alert.id)}
                        >
                          Resolve
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          iconName="X"
                          onClick={() => handleDismiss(alert.id)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Resolved Alerts */}
        {resolvedAlerts?.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-text-primary">Recently Resolved</h4>
            {resolvedAlerts?.slice(0, 2)?.map((alert) => (
              <div key={alert.id} className="border border-border rounded-lg p-4 opacity-60">
                <div className="flex items-start space-x-3">
                  <div className={`p-2 rounded-lg ${getAlertColor(alert.type, alert.resolved)}`}>
                    <Icon name={getAlertIcon(alert.type)} size={16} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="font-medium text-text-primary">{alert.title}</h5>
                        <p className="text-sm text-text-secondary mt-1">{alert.message}</p>
                      </div>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        Resolved
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-xs text-text-secondary mt-2">
                      <span>{alert.source}</span>
                      <span>{formatTimestamp(alert.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {alerts?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Shield" size={48} className="text-success mx-auto mb-4" />
            <h4 className="text-lg font-medium text-text-primary mb-2">All Systems Operational</h4>
            <p className="text-text-secondary">No alerts or issues detected.</p>
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last check: {new Date()?.toLocaleTimeString()}</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-success">Monitoring Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemAlerts;