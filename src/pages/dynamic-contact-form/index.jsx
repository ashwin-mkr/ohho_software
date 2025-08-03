import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicNavigation from '../../components/ui/PublicNavigation';
import ContactFormFields from './components/ContactFormFields';
import OfficeLocations from './components/OfficeLocations';
import LiveChatWidget from './components/LiveChatWidget';
import SubmissionAnimation from './components/SubmissionAnimation';
import Icon from '../../components/AppIcon';

const DynamicContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    countryCode: '',
    service: '',
    timeline: '',
    budget: '',
    description: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [formProgress, setFormProgress] = useState(0);

  // Calculate form completion progress
  useEffect(() => {
    const requiredFields = ['name', 'email', 'service', 'timeline', 'budget', 'description'];
    const completedFields = requiredFields?.filter(field => formData?.[field]?.trim());
    const progress = (completedFields?.length / requiredFields?.length) * 100;
    setFormProgress(progress);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    // Required field validation
    if (!formData?.name?.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData?.service) {
      newErrors.service = 'Please select a service';
    }

    if (!formData?.timeline) {
      newErrors.timeline = 'Please select a timeline';
    }

    if (!formData?.budget) {
      newErrors.budget = 'Please select a budget range';
    }

    if (!formData?.description?.trim()) {
      newErrors.description = 'Project description is required';
    } else if (formData?.description?.trim()?.length < 20) {
      newErrors.description = 'Please provide more details (minimum 20 characters)';
    }

    // Optional field validation
    if (formData?.phone && !/^[\+]?[1-9][\d]{0,15}$/?.test(formData?.phone?.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      // Scroll to first error
      const firstErrorField = Object.keys(errors)?.[0];
      const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
      if (errorElement) {
        errorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement?.focus();
      }
      return;
    }

    setIsSubmitting(true);
    setShowAnimation(true);

    // Simulate form submission
    try {
      // In a real application, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 4000));
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        countryCode: '',
        service: '',
        timeline: '',
        budget: '',
        description: ''
      });
      
    } catch (error) {
      console.error('Form submission error:', error);
      setShowAnimation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnimationClose = () => {
    setShowAnimation(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation />
      {/* Main Content */}
      <main className="pt-16">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b border-border">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-sm">
              <Link 
                to="/3d-animated-landing-page" 
                className="text-text-secondary hover:text-primary transition-colors duration-150"
              >
                Home
              </Link>
              <Icon name="ChevronRight" size={16} className="text-text-secondary" />
              <span className="text-text-primary font-medium">Contact Us</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
                Let's Build Something
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Amazing Together</span>
              </h1>
              <p className="text-xl text-text-secondary">
                Ready to transform your ideas into reality? Our expert team is here to help you create innovative solutions that drive your business forward.
              </p>
              
              {/* Progress Indicator */}
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-between text-sm text-text-secondary mb-2">
                  <span>Form Progress</span>
                  <span>{Math.round(formProgress)}% Complete</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300 ease-smooth"
                    style={{ width: `${formProgress}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left Column - Contact Form */}
              <div className="space-y-8">
                <div className="bg-surface border border-border rounded-lg p-8 shadow-elevation-1">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-text-primary mb-2">
                      Tell Us About Your Project
                    </h2>
                    <p className="text-text-secondary">
                      Fill out the form below and we'll get back to you within 24 hours with a detailed proposal.
                    </p>
                  </div>

                  <ContactFormFields
                    formData={formData}
                    setFormData={setFormData}
                    errors={errors}
                    onSubmit={handleSubmit}
                    isSubmitting={isSubmitting}
                  />
                </div>

                {/* Trust Indicators */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-3 p-4 bg-success/5 border border-success/20 rounded-lg">
                    <Icon name="Shield" size={20} className="text-success" />
                    <div>
                      <p className="font-medium text-text-primary">Secure</p>
                      <p className="text-xs text-text-secondary">SSL Protected</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <Icon name="Clock" size={20} className="text-primary" />
                    <div>
                      <p className="font-medium text-text-primary">Fast Response</p>
                      <p className="text-xs text-text-secondary">Within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 bg-accent/5 border border-accent/20 rounded-lg">
                    <Icon name="Users" size={20} className="text-accent" />
                    <div>
                      <p className="font-medium text-text-primary">Expert Team</p>
                      <p className="text-xs text-text-secondary">10+ Years Experience</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Office Locations */}
              <div className="space-y-8">
                <div className="bg-surface border border-border rounded-lg p-8 shadow-elevation-1">
                  <OfficeLocations />
                </div>

                {/* Additional Contact Methods */}
                <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
                  <h3 className="text-lg font-semibold text-text-primary mb-4">
                    Other Ways to Reach Us
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Phone" size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">Call Us Directly</p>
                        <p className="text-text-secondary">+1 (555) 123-4567</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name="Mail" size={18} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">Email Us</p>
                        <p className="text-text-secondary">hello@ohhosoftware.com</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name="Calendar" size={18} className="text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-text-primary">Schedule a Meeting</p>
                        <p className="text-text-secondary">Book a free consultation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-text-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-text-secondary">
                Quick answers to common questions about our services and process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  question: 'How quickly can you start my project?',
                  answer: 'We typically begin new projects within 1-2 weeks of contract signing, depending on our current workload and project complexity.'
                },
                {
                  question: 'Do you provide ongoing support?',
                  answer: 'Yes, we offer comprehensive support packages including maintenance, updates, and technical assistance for all our projects.'
                },
                {
                  question: 'What technologies do you work with?',
                  answer: 'We specialize in modern web technologies including React, Node.js, Python, cloud platforms, and mobile development frameworks.'
                },
                {
                  question: 'Can you work with our existing team?',
                  answer: 'Absolutely! We frequently collaborate with in-house teams and can integrate seamlessly into your existing development workflow.'
                }
              ]?.map((faq, index) => (
                <div key={index} className="bg-surface border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-text-primary mb-2">{faq?.question}</h3>
                  <p className="text-text-secondary text-sm">{faq?.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      {/* Live Chat Widget */}
      <LiveChatWidget />
      {/* Submission Animation */}
      <SubmissionAnimation
        isVisible={showAnimation}
        onClose={handleAnimationClose}
        formData={formData}
      />
    </div>
  );
};

export default DynamicContactForm;