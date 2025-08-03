import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const PaymentForm = ({ onPaymentSubmit, isProcessing }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    billingAddress: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'US'
    }
  });
  const [errors, setErrors] = useState({});
  const [cardType, setCardType] = useState('');

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: 'CreditCard' },
    { id: 'bank', name: 'Bank Transfer', icon: 'Building' },
    { id: 'paypal', name: 'PayPal', icon: 'Wallet' },
    { id: 'apple', name: 'Apple Pay', icon: 'Smartphone' }
  ];

  const detectCardType = (number) => {
    const cleaned = number?.replace(/\s/g, '');
    if (cleaned?.match(/^4/)) return 'visa';
    if (cleaned?.match(/^5[1-5]/)) return 'mastercard';
    if (cleaned?.match(/^3[47]/)) return 'amex';
    if (cleaned?.match(/^6/)) return 'discover';
    return '';
  };

  const formatCardNumber = (value) => {
    const cleaned = value?.replace(/\s/g, '');
    const match = cleaned?.match(/\d{1,4}/g);
    return match ? match?.join(' ') : '';
  };

  const formatExpiryDate = (value) => {
    const cleaned = value?.replace(/\D/g, '');
    if (cleaned?.length >= 2) {
      return cleaned?.substring(0, 2) + '/' + cleaned?.substring(2, 4);
    }
    return cleaned;
  };

  const handleInputChange = (field, value) => {
    if (field === 'cardNumber') {
      const formatted = formatCardNumber(value);
      setCardType(detectCardType(formatted));
      setFormData(prev => ({ ...prev, [field]: formatted }));
    } else if (field === 'expiryDate') {
      setFormData(prev => ({ ...prev, [field]: formatExpiryDate(value) }));
    } else if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: { ...prev?.[parent], [child]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (paymentMethod === 'card') {
      if (!formData?.cardNumber || formData?.cardNumber?.replace(/\s/g, '')?.length < 13) {
        newErrors.cardNumber = 'Please enter a valid card number';
      }
      if (!formData?.expiryDate || !/^\d{2}\/\d{2}$/?.test(formData?.expiryDate)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!formData?.cvv || formData?.cvv?.length < 3) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
      if (!formData?.cardholderName?.trim()) {
        newErrors.cardholderName = 'Please enter the cardholder name';
      }
    }
    
    if (!formData?.email || !/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.billingAddress?.street?.trim()) {
      newErrors['billingAddress.street'] = 'Please enter your street address';
    }
    if (!formData?.billingAddress?.city?.trim()) {
      newErrors['billingAddress.city'] = 'Please enter your city';
    }
    if (!formData?.billingAddress?.zipCode?.trim()) {
      newErrors['billingAddress.zipCode'] = 'Please enter your ZIP code';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onPaymentSubmit({ ...formData, paymentMethod });
    }
  };

  return (
    <div className="bg-surface rounded-lg border border-border p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">Payment Details</h2>
        <div className="flex items-center space-x-2 text-success">
          <Icon name="Shield" size={16} />
          <span className="text-sm font-medium">Secure</span>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Selection */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-text-primary">Payment Method</label>
          <div className="grid grid-cols-2 gap-3">
            {paymentMethods?.map((method) => (
              <button
                key={method?.id}
                type="button"
                onClick={() => setPaymentMethod(method?.id)}
                className={`
                  flex items-center space-x-3 p-3 rounded-lg border transition-all duration-150
                  ${paymentMethod === method?.id
                    ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-text-secondary hover:text-text-primary'
                  }
                `}
              >
                <Icon name={method?.icon} size={18} />
                <span className="text-sm font-medium">{method?.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Card Payment Form */}
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <div className="relative">
              <Input
                label="Card Number"
                type="text"
                placeholder="1234 5678 9012 3456"
                value={formData?.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e?.target?.value)}
                error={errors?.cardNumber}
                maxLength={19}
                required
              />
              {cardType && (
                <div className="absolute right-3 top-8">
                  <div className={`w-8 h-5 rounded text-xs flex items-center justify-center font-bold text-white ${
                    cardType === 'visa' ? 'bg-blue-600' :
                    cardType === 'mastercard' ? 'bg-red-600' :
                    cardType === 'amex'? 'bg-green-600' : 'bg-gray-600'
                  }`}>
                    {cardType?.toUpperCase()?.slice(0, 4)}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                value={formData?.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e?.target?.value)}
                error={errors?.expiryDate}
                maxLength={5}
                required
              />
              <Input
                label="CVV"
                type="text"
                placeholder="123"
                value={formData?.cvv}
                onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, ''))}
                error={errors?.cvv}
                maxLength={4}
                required
              />
            </div>

            <Input
              label="Cardholder Name"
              type="text"
              placeholder="John Doe"
              value={formData?.cardholderName}
              onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
              error={errors?.cardholderName}
              required
            />
          </div>
        )}

        {/* Email */}
        <Input
          label="Email Address"
          type="email"
          placeholder="john@example.com"
          value={formData?.email}
          onChange={(e) => handleInputChange('email', e?.target?.value)}
          error={errors?.email}
          description="Receipt will be sent to this email"
          required
        />

        {/* Billing Address */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-text-primary">Billing Address</h3>
          
          <Input
            label="Street Address"
            type="text"
            placeholder="123 Main Street"
            value={formData?.billingAddress?.street}
            onChange={(e) => handleInputChange('billingAddress.street', e?.target?.value)}
            error={errors?.['billingAddress.street']}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              type="text"
              placeholder="New York"
              value={formData?.billingAddress?.city}
              onChange={(e) => handleInputChange('billingAddress.city', e?.target?.value)}
              error={errors?.['billingAddress.city']}
              required
            />
            <Input
              label="State"
              type="text"
              placeholder="NY"
              value={formData?.billingAddress?.state}
              onChange={(e) => handleInputChange('billingAddress.state', e?.target?.value)}
              error={errors?.['billingAddress.state']}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="ZIP Code"
              type="text"
              placeholder="10001"
              value={formData?.billingAddress?.zipCode}
              onChange={(e) => handleInputChange('billingAddress.zipCode', e?.target?.value)}
              error={errors?.['billingAddress.zipCode']}
              required
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">Country</label>
              <select
                value={formData?.billingAddress?.country}
                onChange={(e) => handleInputChange('billingAddress.country', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="AU">Australia</option>
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          size="lg"
          fullWidth
          loading={isProcessing}
          iconName="Lock"
          iconPosition="left"
        >
          {isProcessing ? 'Processing Payment...' : 'Complete Payment'}
        </Button>
      </form>
      {/* Security Notice */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="ShieldCheck" size={16} className="text-success mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium text-text-primary">Your payment is secure</p>
            <p className="text-xs text-text-secondary">
              All transactions are encrypted with 256-bit SSL and processed through PCI-compliant payment gateways.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;