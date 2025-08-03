import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingApprovals = ({ loading = false }) => {
  const [approvals, setApprovals] = useState([
    {
      id: 1,
      type: 'project_proposal',
      title: 'E-commerce Platform Development',
      client: 'TechStart Inc.',
      amount: '$15,000',
      priority: 'high',
      submittedDate: '2025-08-01',
      description: 'Full-stack e-commerce solution with payment integration'
    },
    {
      id: 2,
      type: 'budget_request',
      title: 'Cloud Infrastructure Upgrade',
      client: 'DataFlow Systems',
      amount: '$8,500',
      priority: 'medium',
      submittedDate: '2025-08-02',
      description: 'AWS infrastructure scaling and optimization'
    },
    {
      id: 3,
      type: 'service_modification',
      title: 'AI Model Training Extension',
      client: 'InnovateLab',
      amount: '$3,200',
      priority: 'low',
      submittedDate: '2025-08-03',
      description: 'Additional training cycles for machine learning model'
    },
    {
      id: 4,
      type: 'refund_request',
      title: 'Cybersecurity Audit Refund',
      client: 'SecureNet Corp',
      amount: '$2,800',
      priority: 'high',
      submittedDate: '2025-08-01',
      description: 'Partial refund due to scope reduction'
    }
  ]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10';
      case 'medium': return 'text-warning bg-warning/10';
      case 'low': return 'text-success bg-success/10';
      default: return 'text-text-secondary bg-muted';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'project_proposal': return 'FileText';
      case 'budget_request': return 'DollarSign';
      case 'service_modification': return 'Settings';
      case 'refund_request': return 'RefreshCw';
      default: return 'AlertCircle';
    }
  };

  const handleApprove = (id) => {
    setApprovals(prev => prev?.filter(approval => approval?.id !== id));
    // In real app, make API call to approve
  };

  const handleReject = (id) => {
    setApprovals(prev => prev?.filter(approval => approval?.id !== id));
    // In real app, make API call to reject
  };

  if (loading) {
    return (
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-48 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3]?.map((i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted rounded w-1/2"></div>
                  </div>
                  <div className="h-6 bg-muted rounded w-16"></div>
                </div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-muted rounded w-20"></div>
                  <div className="h-8 bg-muted rounded w-20"></div>
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
          <h3 className="text-lg font-semibold text-text-primary">Pending Approvals</h3>
          <p className="text-sm text-text-secondary">Items requiring your attention</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
            {approvals?.length} pending
          </span>
        </div>
      </div>
      {approvals?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h4 className="text-lg font-medium text-text-primary mb-2">All caught up!</h4>
          <p className="text-text-secondary">No pending approvals at the moment.</p>
        </div>
      ) : (
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {approvals?.map((approval) => (
            <div key={approval?.id} className="border border-border rounded-lg p-4 hover:shadow-elevation-1 transition-all duration-150 ease-smooth">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Icon name={getTypeIcon(approval?.type)} size={16} className="text-primary" />
                  </div>
                  
                  <div className="space-y-1 flex-1">
                    <h4 className="font-medium text-text-primary">{approval?.title}</h4>
                    <p className="text-sm text-text-secondary">{approval?.client}</p>
                    <p className="text-xs text-text-secondary">{approval?.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-text-secondary">
                      <span>Submitted: {new Date(approval.submittedDate)?.toLocaleDateString()}</span>
                      <span>Amount: {approval?.amount}</span>
                    </div>
                  </div>
                </div>
                
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(approval?.priority)}`}>
                  {approval?.priority} priority
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  iconName="Check"
                  iconPosition="left"
                  onClick={() => handleApprove(approval?.id)}
                >
                  Approve
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="X"
                  iconPosition="left"
                  onClick={() => handleReject(approval?.id)}
                >
                  Reject
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                  iconPosition="left"
                >
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
      {approvals?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-text-secondary">
              {approvals?.filter(a => a?.priority === 'high')?.length} high priority items
            </div>
            <Button variant="outline" size="sm">
              View All Approvals
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingApprovals;