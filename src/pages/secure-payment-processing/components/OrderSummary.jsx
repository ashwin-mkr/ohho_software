import React from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ orderData, onApplyDiscount, discountCode, setDiscountCode }) => {
  const {
    items = [],
    subtotal = 0,
    tax = 0,
    discount = 0,
    total = 0,
    currency = 'USD'
  } = orderData;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    })?.format(amount);
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Order Summary</h2>
        <Icon name="Receipt" size={20} className="text-text-secondary" />
      </div>
      {/* Order Items */}
      <div className="space-y-4">
        {items?.map((item, index) => (
          <div key={index} className="flex items-start justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex-1">
              <h3 className="font-medium text-text-primary">{item?.name}</h3>
              <p className="text-sm text-text-secondary mt-1">{item?.description}</p>
              {item?.duration && (
                <div className="flex items-center space-x-2 mt-2">
                  <Icon name="Clock" size={14} className="text-text-secondary" />
                  <span className="text-xs text-text-secondary">{item?.duration}</span>
                </div>
              )}
            </div>
            <div className="text-right ml-4">
              <div className="font-semibold text-text-primary">{formatCurrency(item?.price)}</div>
              {item?.originalPrice && item?.originalPrice > item?.price && (
                <div className="text-sm text-text-secondary line-through">
                  {formatCurrency(item?.originalPrice)}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Discount Code */}
      <div className="space-y-3">
        <div className="flex space-x-2">
          <input
            type="text"
            placeholder="Enter discount code"
            value={discountCode}
            onChange={(e) => setDiscountCode(e?.target?.value)}
            className="flex-1 px-3 py-2 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <button
            onClick={onApplyDiscount}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-150"
          >
            Apply
          </button>
        </div>
      </div>
      {/* Price Breakdown */}
      <div className="space-y-3 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Subtotal</span>
          <span className="font-medium text-text-primary">{formatCurrency(subtotal)}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex items-center justify-between text-success">
            <span className="flex items-center space-x-1">
              <Icon name="Tag" size={14} />
              <span>Discount</span>
            </span>
            <span className="font-medium">-{formatCurrency(discount)}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="text-text-secondary">Tax (8.5%)</span>
          <span className="font-medium text-text-primary">{formatCurrency(tax)}</span>
        </div>
        
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-lg font-semibold text-text-primary">Total</span>
          <span className="text-xl font-bold text-primary">{formatCurrency(total)}</span>
        </div>
      </div>
      {/* Billing Cycle Info */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-primary">Billing Information</p>
            <p className="text-xs text-text-secondary">
              Your subscription will auto-renew monthly. You can cancel anytime from your account settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;