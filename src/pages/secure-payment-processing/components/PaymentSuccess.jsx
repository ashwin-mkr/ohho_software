import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentSuccess = ({ transactionData, onClose }) => {
  const [rocketAnimation, setRocketAnimation] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger rocket animation
    const timer1 = setTimeout(() => setRocketAnimation(true), 500);
    const timer2 = setTimeout(() => setShowConfetti(true), 1000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const {
    transactionId = 'TXN-' + Date.now(),
    amount = 0,
    currency = 'USD',
    paymentMethod = 'Credit Card',
    timestamp = new Date()?.toISOString(),
    customerEmail = 'customer@example.com'
  } = transactionData || {};

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface rounded-xl border border-border max-w-md w-full p-8 text-center relative overflow-hidden">
        {/* Confetti Animation */}
        {showConfetti && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)]?.map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1 + Math.random()}s`
                }}
              />
            ))}
          </div>
        )}

        {/* Rocket Animation */}
        <div className="relative mb-6">
          <div className={`
            transition-all duration-1000 ease-out
            ${rocketAnimation ? 'transform -translate-y-8 scale-110' : 'transform translate-y-0 scale-100'}
          `}>
            <div className="w-20 h-20 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Rocket" size={32} className="text-white" />
            </div>
          </div>
          
          {/* Rocket Trail */}
          {rocketAnimation && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-8 bg-gradient-to-b from-accent to-transparent animate-pulse" />
            </div>
          )}
        </div>

        {/* Success Message */}
        <div className="space-y-4 mb-6">
          <h1 className="text-2xl font-bold text-success">Payment Successful!</h1>
          <p className="text-text-secondary">
            Your payment has been processed successfully. A confirmation email has been sent to your inbox.
          </p>
        </div>

        {/* Transaction Details */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-3 mb-6 text-left">
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Transaction ID</span>
            <span className="text-sm font-mono text-text-primary">{transactionId}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Amount</span>
            <span className="text-lg font-bold text-success">{formatCurrency(amount)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Payment Method</span>
            <span className="text-sm text-text-primary">{paymentMethod}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Date & Time</span>
            <span className="text-sm text-text-primary">{formatDate(timestamp)}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-text-secondary">Receipt Email</span>
            <span className="text-sm text-text-primary">{customerEmail}</span>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-primary/5 rounded-lg p-4 mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="CheckCircle" size={16} className="text-success mt-0.5" />
            <div className="text-left">
              <h3 className="font-medium text-text-primary text-sm">What's Next?</h3>
              <ul className="text-xs text-text-secondary mt-2 space-y-1">
                <li>• Check your email for the receipt and service details</li>
                <li>• Access your services through the customer portal</li>
                <li>• Our team will contact you within 24 hours</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            iconName="Download"
            iconPosition="left"
            onClick={() => window.print()}
          >
            Download Receipt
          </Button>
          
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={() => window.location.href = '/3d-animated-landing-page'}
            >
              Go Home
            </Button>
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-text-secondary">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@ohho.com" className="text-primary hover:underline">
              support@ohho.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;