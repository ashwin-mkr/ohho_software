import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ loading = false }) => {
  const activities = [
    {
      id: 1,
      type: 'user_registration',
      user: 'Sarah Johnson',
      action: 'registered for Web Development service',
      timestamp: '2 minutes ago',
      icon: 'UserPlus',
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    },
    {
      id: 2,
      type: 'payment_received',
      user: 'Michael Chen',
      action: 'completed payment of $2,500 for Cloud Integration',
      timestamp: '15 minutes ago',
      icon: 'CreditCard',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10'
    },
    {
      id: 3,
      type: 'project_completed',
      user: 'Emma Wilson',
      action: 'marked AI Tools project as completed',
      timestamp: '1 hour ago',
      icon: 'CheckCircle',
      iconColor: 'text-success',
      iconBg: 'bg-success/10'
    },
    {
      id: 4,
      type: 'support_ticket',
      user: 'David Rodriguez',
      action: 'submitted a support ticket for Cybersecurity service',
      timestamp: '2 hours ago',
      icon: 'MessageSquare',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10'
    },
    {
      id: 5,
      type: 'system_alert',
      user: 'System',
      action: 'Server maintenance completed successfully',
      timestamp: '3 hours ago',
      icon: 'Server',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10'
    },
    {
      id: 6,
      type: 'user_login',
      user: 'Lisa Anderson',
      action: 'logged in from new device (Chrome, Windows)',
      timestamp: '4 hours ago',
      icon: 'LogIn',
      iconColor: 'text-text-secondary',
      iconBg: 'bg-muted'
    }
  ];

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5]?.map((i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
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
          <h3 className="text-lg font-semibold text-text-primary">Recent Activity</h3>
          <p className="text-sm text-text-secondary">Latest system and user activities</p>
        </div>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-150 ease-smooth">
          View All
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-150 ease-smooth">
            <div className={`p-2 rounded-lg ${activity?.iconBg}`}>
              <Icon name={activity?.icon} size={16} className={activity?.iconColor} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-sm text-text-primary">
                    <span className="font-medium">{activity?.user}</span>
                    {' '}
                    <span>{activity?.action}</span>
                  </p>
                  <p className="text-xs text-text-secondary">{activity?.timestamp}</p>
                </div>
                
                {activity?.type === 'support_ticket' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                    Pending
                  </span>
                )}
                
                {activity?.type === 'payment_received' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    Completed
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">Last updated: {new Date()?.toLocaleTimeString()}</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-success">Live</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;