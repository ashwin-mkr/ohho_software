import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SystemHealth = ({ healthMetrics, activeSessions, alerts, onAlertConfig }) => {
  const [showAllSessions, setShowAllSessions] = useState(false);

  const getHealthStatus = (value, thresholds) => {
    if (value >= thresholds?.critical) return { status: 'critical', color: 'text-error', bgColor: 'bg-error/10' };
    if (value >= thresholds?.warning) return { status: 'warning', color: 'text-warning', bgColor: 'bg-warning/10' };
    return { status: 'healthy', color: 'text-success', bgColor: 'bg-success/10' };
  };

  const getHealthIcon = (status) => {
    switch (status) {
      case 'critical': return 'AlertCircle';
      case 'warning': return 'AlertTriangle';
      case 'healthy': return 'CheckCircle';
      default: return 'Circle';
    }
  };

  const displayedSessions = showAllSessions ? activeSessions : activeSessions?.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* System Health Overview */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="Heart" size={20} />
          <span>System Health</span>
        </h3>
        
        <div className="space-y-4">
          {healthMetrics?.map((metric, index) => {
            const health = getHealthStatus(metric?.value, metric?.thresholds);
            return (
              <div key={index} className={`p-3 rounded-lg border border-border ${health?.bgColor}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Icon name={getHealthIcon(health?.status)} size={16} className={health?.color} />
                    <span className="font-medium text-text-primary">{metric?.name}</span>
                  </div>
                  <span className={`font-bold ${health?.color}`}>
                    {metric?.value}{metric?.unit}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      health?.status === 'critical' ? 'bg-error' :
                      health?.status === 'warning' ? 'bg-warning' : 'bg-success'
                    }`}
                    style={{ width: `${Math.min((metric?.value / metric?.thresholds?.critical) * 100, 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-text-secondary mt-1">
                  <span>0{metric?.unit}</span>
                  <span>{metric?.thresholds?.critical}{metric?.unit}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Active User Sessions */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Users" size={20} />
            <span>Active Sessions</span>
            <span className="text-sm font-normal text-text-secondary">({activeSessions?.length})</span>
          </h3>
          
          {activeSessions?.length > 5 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllSessions(!showAllSessions)}
            >
              {showAllSessions ? 'Show Less' : 'Show All'}
            </Button>
          )}
        </div>
        
        <div className="space-y-3">
          {displayedSessions?.map((session) => (
            <div key={session?.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-primary" />
                </div>
                <div>
                  <div className="font-medium text-text-primary">{session?.username}</div>
                  <div className="text-sm text-text-secondary">{session?.ipAddress}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-text-primary">{session?.duration}</div>
                <div className="text-xs text-text-secondary">{session?.lastActivity}</div>
              </div>
            </div>
          ))}
        </div>
        
        {activeSessions?.length === 0 && (
          <div className="text-center py-8">
            <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-text-secondary">No active sessions</p>
          </div>
        )}
      </div>
      {/* Alert Configuration */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="Bell" size={20} />
            <span>Alert Settings</span>
          </h3>
          
          <Button
            variant="outline"
            size="sm"
            iconName="Settings"
            onClick={onAlertConfig}
          >
            Configure
          </Button>
        </div>
        
        <div className="space-y-3">
          {alerts?.map((alert, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${alert.enabled ? 'bg-success' : 'bg-muted-foreground'}`} />
                <div>
                  <div className="font-medium text-text-primary">{alert.name}</div>
                  <div className="text-sm text-text-secondary">{alert.condition}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`text-sm ${alert.enabled ? 'text-success' : 'text-text-secondary'}`}>
                  {alert.enabled ? 'Active' : 'Disabled'}
                </span>
                <Icon 
                  name={alert.enabled ? 'CheckCircle' : 'Circle'} 
                  size={16} 
                  className={alert.enabled ? 'text-success' : 'text-text-secondary'} 
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Incidents */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center space-x-2">
          <Icon name="AlertTriangle" size={20} />
          <span>Recent Incidents</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-error/5 border border-error/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="AlertCircle" size={16} className="text-error" />
              <div>
                <div className="font-medium text-text-primary">Database Connection Timeout</div>
                <div className="text-sm text-text-secondary">2 minutes ago</div>
              </div>
            </div>
            <span className="text-xs bg-error/10 text-error px-2 py-1 rounded-full">CRITICAL</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <div>
                <div className="font-medium text-text-primary">High Memory Usage</div>
                <div className="text-sm text-text-secondary">15 minutes ago</div>
              </div>
            </div>
            <span className="text-xs bg-warning/10 text-warning px-2 py-1 rounded-full">WARNING</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-success/5 border border-success/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <div>
                <div className="font-medium text-text-primary">API Response Time Normalized</div>
                <div className="text-sm text-text-secondary">1 hour ago</div>
              </div>
            </div>
            <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">RESOLVED</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;