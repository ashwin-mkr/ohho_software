import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNavigation from '../../components/ui/PublicNavigation';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import SecurityAssurance from './components/SecurityAssurance';
import PaymentSuccess from './components/PaymentSuccess';
import LoadingIndicators from '../../components/ui/LoadingIndicators';
import Icon from '../../components/AppIcon';

const SecurePaymentProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [transactionData, setTransactionData] = useState(null);
  const [orderData, setOrderData] = useState({
    items: [
      {
        name: 'Web Development Package',
        description: 'Custom responsive website with modern design and CMS integration',
        price: 2999.00,
        originalPrice: 3499.00,
        duration: '4-6 weeks delivery'
      },
      {
        name: 'Cloud Integration Service',
        description: 'AWS/Azure cloud setup with automated deployment and monitoring',
        price: 1499.00,
        duration: '2-3 weeks setup'
      },
      {
        name: 'AI Tools Integration',
        description: 'Custom AI chatbot and automation tools for business processes',
        price: 1999.00,
        duration: '3-4 weeks implementation'
      }
    ],
    subtotal: 6497.00,
    discount: 0,
    tax: 552.25,
    total: 7049.25,
    currency: 'USD'
  });

  // Mock credentials for testing
  const mockCredentials = {
    testCard: '4242 4242 4242 4242',
    expiryDate: '12/28',
    cvv: '123',
    email: 'test@ohho.com',
    discountCode: 'SAVE20'
  };

  useEffect(() => {
    // Calculate totals when discount changes
    const subtotal = orderData?.items?.reduce((sum, item) => sum + item?.price, 0);
    const discount = orderData?.discount;
    const discountedSubtotal = subtotal - discount;
    const tax = discountedSubtotal * 0.085; // 8.5% tax
    const total = discountedSubtotal + tax;

    setOrderData(prev => ({
      ...prev,
      subtotal,
      tax: parseFloat(tax?.toFixed(2)),
      total: parseFloat(total?.toFixed(2))
    }));
  }, [orderData?.discount]);

  const handleApplyDiscount = () => {
    if (discountCode?.toUpperCase() === 'SAVE20') {
      const discountAmount = orderData?.subtotal * 0.20; // 20% discount
      setOrderData(prev => ({
        ...prev,
        discount: parseFloat(discountAmount?.toFixed(2))
      }));
      setDiscountCode('');
    } else if (discountCode?.toUpperCase() === 'WELCOME10') {
      const discountAmount = orderData?.subtotal * 0.10; // 10% discount
      setOrderData(prev => ({
        ...prev,
        discount: parseFloat(discountAmount?.toFixed(2))
      }));
      setDiscountCode('');
    } else {
      alert('Invalid discount code. Try "SAVE20" or "WELCOME10"');
    }
  };

  const handlePaymentSubmit = async (paymentData) => {
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Mock transaction data
      const transaction = {
        transactionId: 'TXN-' + Date.now(),
        amount: orderData?.total,
        currency: orderData?.currency,
        paymentMethod: paymentData?.paymentMethod === 'card' ? 
          `**** **** **** ${paymentData?.cardNumber?.slice(-4)}` : 
          paymentData?.paymentMethod,
        timestamp: new Date()?.toISOString(),
        customerEmail: paymentData?.email,
        status: 'completed'
      };

      setTransactionData(transaction);
      setShowSuccess(true);
    } catch (error) {
      console.error('Payment failed:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setTransactionData(null);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background">
        <PublicNavigation />
        <div className="pt-16 min-h-screen flex items-center justify-center">
          <LoadingIndicators 
            variant="payment" 
            message="Processing your payment securely..."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      {/* Main Content */}
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/3d-animated-landing-page" className="text-text-secondary hover:text-text-primary transition-colors">
                Home
              </Link>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
              <Link to="/3d-animated-landing-page" className="text-text-secondary hover:text-text-primary transition-colors">
                Services
              </Link>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
              <span className="text-text-primary font-medium">Secure Checkout</span>
            </nav>
          </div>
        </div>

        {/* Page Header */}
        <div className="bg-gradient-to-r from-primary/5 to-accent/5 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl lg:text-4xl font-bold text-text-primary">
                Secure Payment Processing
              </h1>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Complete your purchase with confidence using our bank-grade security and encrypted payment processing.
              </p>
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2 text-success">
                  <Icon name="Shield" size={16} />
                  <span>SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2 text-primary">
                  <Icon name="Lock" size={16} />
                  <span>PCI Compliant</span>
                </div>
                <div className="flex items-center space-x-2 text-accent">
                  <Icon name="CheckCircle" size={16} />
                  <span>Verified Secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Content */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Order Summary - Left Panel */}
            <div className="lg:col-span-4">
              <OrderSummary
                orderData={orderData}
                onApplyDiscount={handleApplyDiscount}
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
              />
            </div>

            {/* Payment Form - Center Section */}
            <div className="lg:col-span-5">
              <PaymentForm
                onPaymentSubmit={handlePaymentSubmit}
                isProcessing={isProcessing}
              />
            </div>

            {/* Security Assurance - Right Panel */}
            <div className="lg:col-span-3">
              <SecurityAssurance />
            </div>
          </div>
        </div>

        {/* Test Credentials Info */}
        <div className="bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
            <div className="bg-primary/5 rounded-lg border border-primary/20 p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={16} className="text-primary mt-0.5" />
                <div className="space-y-2">
                  <h3 className="font-medium text-primary">Test Payment Credentials</h3>
                  <div className="text-sm text-text-secondary space-y-1">
                    <p><strong>Card Number:</strong> {mockCredentials?.testCard}</p>
                    <p><strong>Expiry:</strong> {mockCredentials?.expiryDate} | <strong>CVV:</strong> {mockCredentials?.cvv}</p>
                    <p><strong>Email:</strong> {mockCredentials?.email}</p>
                    <p><strong>Discount Code:</strong> {mockCredentials?.discountCode} (20% off)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-surface border-t border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">O</span>
                </div>
                <span className="text-xl font-bold text-primary">OHHO Software</span>
              </div>
              <p className="text-text-secondary">
                Your Digital Future Starts Here
              </p>
              <p className="text-sm text-text-secondary">
                © {new Date()?.getFullYear()} OHHO Software. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
      {/* Payment Success Modal */}
      {showSuccess && (
        <PaymentSuccess
          transactionData={transactionData}
          onClose={handleCloseSuccess}
        />
      )}
    </div>
  );
};

export default SecurePaymentProcessing;