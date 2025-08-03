import React from 'react';
import Icon from '../../../components/AppIcon';
import SecurityBadges from '../../../components/ui/SecurityBadges';

const SecurityAssurance = () => {
  const trustIndicators = [
    {
      icon: 'Shield',
      title: 'Bank-Level Security',
      description: '256-bit SSL encryption protects all transactions',
      color: 'text-success'
    },
    {
      icon: 'Lock',
      title: 'PCI DSS Compliant',
      description: 'Level 1 certified payment processing',
      color: 'text-primary'
    },
    {
      icon: 'Eye',
      title: 'Fraud Protection',
      description: 'Advanced monitoring prevents unauthorized access',
      color: 'text-accent'
    }
  ];

  const supportOptions = [
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Available 24/7',
      action: 'Start Chat'
    },
    {
      icon: 'Phone',
      title: 'Phone Support',
      description: '+1 (555) 123-4567',
      action: 'Call Now'
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      description: 'support@ohho.com',
      action: 'Send Email'
    }
  ];

  const policies = [
    {
      icon: 'RotateCcw',
      title: '30-Day Refund',
      description: 'Full refund within 30 days of purchase'
    },
    {
      icon: 'Clock',
      title: 'Instant Processing',
      description: 'Most payments process within minutes'
    },
    {
      icon: 'CreditCard',
      title: 'Secure Storage',
      description: 'Payment details are never stored on our servers'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="ShieldCheck" size={20} className="text-success" />
          <h2 className="text-lg font-semibold text-text-primary">Security Assurance</h2>
        </div>
        
        <div className="space-y-4">
          {trustIndicators?.map((indicator, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-muted ${indicator?.color}`}>
                <Icon name={indicator?.icon} size={16} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-text-primary text-sm">{indicator?.title}</h3>
                <p className="text-xs text-text-secondary mt-1">{indicator?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Methods */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Accepted Payment Methods</h2>
        <SecurityBadges variant="compact" showAll={false} />
        
        <div className="grid grid-cols-2 gap-3 mt-4">
          {['Visa', 'Mastercard', 'PayPal', 'Apple Pay']?.map((method, index) => (
            <div key={index} className="flex items-center space-x-2 p-2 bg-muted/50 rounded-md">
              <Icon name="CreditCard" size={14} className="text-text-secondary" />
              <span className="text-xs font-medium text-text-primary">{method}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Policies */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Our Guarantee</h2>
        
        <div className="space-y-4">
          {policies?.map((policy, index) => (
            <div key={index} className="flex items-start space-x-3">
              <Icon name={policy?.icon} size={16} className="text-primary mt-0.5" />
              <div>
                <h3 className="font-medium text-text-primary text-sm">{policy?.title}</h3>
                <p className="text-xs text-text-secondary mt-1">{policy?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Customer Support */}
      <div className="bg-surface rounded-lg border border-border p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-4">Need Help?</h2>
        
        <div className="space-y-3">
          {supportOptions?.map((option, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-150">
              <div className="flex items-center space-x-3">
                <Icon name={option?.icon} size={16} className="text-primary" />
                <div>
                  <h3 className="font-medium text-text-primary text-sm">{option?.title}</h3>
                  <p className="text-xs text-text-secondary">{option?.description}</p>
                </div>
              </div>
              <button className="text-xs text-primary hover:text-primary/80 font-medium">
                {option?.action}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Seal */}
      <div className="bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg border border-primary/20 p-4">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Award" size={20} className="text-primary" />
            <span className="font-semibold text-primary">Trusted by 10,000+ businesses</span>
          </div>
          <p className="text-xs text-text-secondary">
            Join thousands of satisfied customers who trust OHHO Software for their digital transformation needs.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityAssurance;