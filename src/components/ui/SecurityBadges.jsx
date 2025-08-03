import React from 'react';
import Icon from '../AppIcon';

const SecurityBadges = ({ variant = 'default', showAll = true }) => {
  const securityFeatures = [
    {
      icon: 'Shield',
      label: 'SSL Secured',
      description: '256-bit encryption',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Lock',
      label: 'PCI Compliant',
      description: 'Level 1 certified',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'CheckCircle',
      label: 'Verified Secure',
      description: 'Bank-grade security',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    }
  ];

  const paymentMethods = [
    { name: 'Visa', icon: 'CreditCard' },
    { name: 'Mastercard', icon: 'CreditCard' },
    { name: 'PayPal', icon: 'Wallet' },
    { name: 'Apple Pay', icon: 'Smartphone' },
    { name: 'Google Pay', icon: 'Smartphone' }
  ];

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Shield" size={16} className="text-success" />
          <span className="text-sm text-text-secondary">Secured</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Lock" size={16} className="text-primary" />
          <span className="text-sm text-text-secondary">PCI Compliant</span>
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="flex items-center space-x-2 text-success">
        <Icon name="Shield" size={16} />
        <span className="text-sm font-medium">Secure Payment</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Security Features */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary">Security & Compliance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div
              key={index}
              className={`
                flex items-center space-x-3 p-4 rounded-lg border border-border
                ${feature?.bgColor} hover:shadow-elevation-1 transition-all duration-150 ease-smooth
              `}
            >
              <div className={`p-2 rounded-full bg-surface ${feature?.color}`}>
                <Icon name={feature?.icon} size={20} />
              </div>
              <div>
                <div className="font-medium text-text-primary">{feature?.label}</div>
                <div className="text-sm text-text-secondary">{feature?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Methods */}
      {showAll && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-text-primary">Accepted Payment Methods</h3>
          <div className="flex flex-wrap items-center gap-4">
            {paymentMethods?.map((method, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 px-4 py-2 bg-surface border border-border rounded-lg hover:shadow-elevation-1 transition-all duration-150 ease-smooth"
                title={method?.name}
              >
                <Icon name={method?.icon} size={18} className="text-text-secondary" />
                <span className="text-sm font-medium text-text-primary">{method?.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Trust Indicators */}
      <div className="bg-muted/50 rounded-lg p-4 border border-border">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-0.5" />
          <div className="space-y-2">
            <h4 className="font-medium text-text-primary">Your payment information is secure</h4>
            <p className="text-sm text-text-secondary">
              We use industry-standard encryption to protect your data. Your payment details are never stored on our servers and are processed through certified payment gateways.
            </p>
            <div className="flex items-center space-x-4 text-xs text-text-secondary">
              <span>• 256-bit SSL encryption</span>
              <span>• PCI DSS Level 1 compliant</span>
              <span>• SOC 2 Type II certified</span>
            </div>
          </div>
        </div>
      </div>
      {/* Money Back Guarantee */}
      <div className="flex items-center justify-center space-x-2 text-success">
        <Icon name="ShieldCheck" size={20} />
        <span className="font-medium">30-day money-back guarantee</span>
      </div>
    </div>
  );
};

export default SecurityBadges;