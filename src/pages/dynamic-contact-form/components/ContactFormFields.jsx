import React, { useState, useEffect } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContactFormFields = ({ formData, setFormData, errors, onSubmit, isSubmitting }) => {
  const [detectedLocation, setDetectedLocation] = useState(null);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  // Mock location detection
  useEffect(() => {
    const detectLocation = () => {
      const mockLocations = [
        { country: 'United States', code: '+1', timezone: 'EST' },
        { country: 'United Kingdom', code: '+44', timezone: 'GMT' },
        { country: 'Canada', code: '+1', timezone: 'EST' },
        { country: 'Australia', code: '+61', timezone: 'AEST' }
      ];
      const randomLocation = mockLocations?.[Math.floor(Math.random() * mockLocations?.length)];
      setDetectedLocation(randomLocation);
      
      if (!formData?.countryCode) {
        setFormData(prev => ({ ...prev, countryCode: randomLocation?.code }));
      }
    };

    detectLocation();
  }, []);

  // Mock company domain lookup
  useEffect(() => {
    if (formData?.email && formData?.email?.includes('@')) {
      const domain = formData?.email?.split('@')?.[1];
      const mockCompanyData = {
        'google.com': { name: 'Google Inc.', size: 'Enterprise', industry: 'Technology' },
        'microsoft.com': { name: 'Microsoft Corporation', size: 'Enterprise', industry: 'Technology' },
        'startup.com': { name: 'Startup Inc.', size: 'Small', industry: 'Technology' },
        'company.com': { name: 'Company Ltd.', size: 'Medium', industry: 'Business' }
      };
      
      if (mockCompanyData?.[domain]) {
        setCompanyInfo(mockCompanyData?.[domain]);
        if (!formData?.company) {
          setFormData(prev => ({ ...prev, company: mockCompanyData?.[domain]?.name }));
        }
      }
    }
  }, [formData?.email]);

  const serviceOptions = [
    { value: 'web-development', label: 'Web Development', description: 'Custom websites and web applications' },
    { value: 'mobile-development', label: 'Mobile App Development', description: 'iOS and Android applications' },
    { value: 'cloud-integration', label: 'Cloud Integration', description: 'AWS, Azure, Google Cloud services' },
    { value: 'ai-tools', label: 'AI Tools & Solutions', description: 'Machine learning and AI implementation' },
    { value: 'cybersecurity', label: 'Cybersecurity', description: 'Security audits and protection' },
    { value: 'consulting', label: 'Technical Consulting', description: 'Strategy and architecture guidance' }
  ];

  const timelineOptions = [
    { value: 'immediate', label: 'Immediate (Within 1 month)' },
    { value: '1-3-months', label: '1-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: '6-12-months', label: '6-12 months' },
    { value: 'planning', label: 'Still planning' }
  ];

  const budgetRanges = [
    { value: '5k-15k', label: '$5,000 - $15,000', min: 5000, max: 15000 },
    { value: '15k-50k', label: '$15,000 - $50,000', min: 15000, max: 50000 },
    { value: '50k-100k', label: '$50,000 - $100,000', min: 50000, max: 100000 },
    { value: '100k+', label: '$100,000+', min: 100000, max: 500000 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target?.files);
    const newFiles = files?.map(file => ({
      id: Date.now() + Math.random(),
      name: file?.name,
      size: file?.size,
      type: file?.type
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev?.filter(file => file?.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getEstimatedPrice = () => {
    if (!formData?.service || !formData?.budget) return null;
    
    const serviceMultipliers = {
      'web-development': 1.0,
      'mobile-development': 1.3,
      'cloud-integration': 1.1,
      'ai-tools': 1.5,
      'cybersecurity': 1.2,
      'consulting': 0.8
    };

    const selectedBudget = budgetRanges?.find(b => b?.value === formData?.budget);
    if (!selectedBudget) return null;

    const multiplier = serviceMultipliers?.[formData?.service] || 1.0;
    const basePrice = (selectedBudget?.min + selectedBudget?.max) / 2;
    const estimatedPrice = basePrice * multiplier;

    return {
      min: Math.round(selectedBudget?.min * multiplier),
      max: Math.round(selectedBudget?.max * multiplier),
      estimated: Math.round(estimatedPrice)
    };
  };

  const estimatedPrice = getEstimatedPrice();

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="User" size={20} className="text-primary" />
          <span>Personal Information</span>
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.name || ''}
            onChange={(e) => handleInputChange('name', e?.target?.value)}
            error={errors?.name}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            placeholder="your.email@company.com"
            value={formData?.email || ''}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            error={errors?.email}
            description={companyInfo ? `Detected: ${companyInfo?.name}` : ''}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Company Name"
            type="text"
            placeholder="Your company name"
            value={formData?.company || ''}
            onChange={(e) => handleInputChange('company', e?.target?.value)}
            error={errors?.company}
            description={companyInfo ? `${companyInfo?.size} • ${companyInfo?.industry}` : ''}
          />
          
          <div className="space-y-2">
            <Input
              label="Phone Number"
              type="tel"
              placeholder="Your phone number"
              value={formData?.phone || ''}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
            />
            {detectedLocation && (
              <div className="flex items-center space-x-2 text-sm text-text-secondary">
                <Icon name="MapPin" size={14} />
                <span>Detected location: {detectedLocation?.country} ({detectedLocation?.code})</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Project Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="Briefcase" size={20} className="text-primary" />
          <span>Project Details</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Service Interest"
            placeholder="Select a service"
            options={serviceOptions}
            value={formData?.service || ''}
            onChange={(value) => handleInputChange('service', value)}
            error={errors?.service}
            searchable
            required
          />

          <Select
            label="Project Timeline"
            placeholder="When do you need this?"
            options={timelineOptions}
            value={formData?.timeline || ''}
            onChange={(value) => handleInputChange('timeline', value)}
            error={errors?.timeline}
            required
          />
        </div>

        <Select
          label="Budget Range"
          placeholder="Select your budget range"
          options={budgetRanges}
          value={formData?.budget || ''}
          onChange={(value) => handleInputChange('budget', value)}
          error={errors?.budget}
          description="This helps us provide accurate estimates"
          required
        />

        {estimatedPrice && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calculator" size={16} className="text-primary" />
              <span className="font-medium text-text-primary">Estimated Project Cost</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              ${estimatedPrice?.min?.toLocaleString()} - ${estimatedPrice?.max?.toLocaleString()}
            </div>
            <p className="text-sm text-text-secondary mt-1">
              Based on selected service and budget range. Final pricing may vary based on specific requirements.
            </p>
          </div>
        )}
      </div>
      {/* Project Description */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
          <Icon name="FileText" size={20} className="text-primary" />
          <span>Project Description</span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Description *
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
              placeholder="Describe your project requirements, goals, and any specific features you need..."
              value={formData?.description || ''}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
            />
            {errors?.description && (
              <p className="mt-1 text-sm text-error">{errors?.description}</p>
            )}
          </div>

          {/* File Upload */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-text-primary">
              Project Brief / Requirements (Optional)
            </label>
            <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Icon name="Upload" size={32} className="text-text-secondary mx-auto mb-2" />
                <p className="text-text-primary font-medium">Click to upload files</p>
                <p className="text-sm text-text-secondary">PDF, DOC, TXT, Images up to 10MB each</p>
              </label>
            </div>

            {uploadedFiles?.length > 0 && (
              <div className="space-y-2">
                {uploadedFiles?.map((file) => (
                  <div key={file?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="File" size={16} className="text-text-secondary" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{file?.name}</p>
                        <p className="text-xs text-text-secondary">{formatFileSize(file?.size)}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file?.id)}
                      iconName="X"
                      iconSize={14}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Submit Button */}
      <div className="pt-6 border-t border-border">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isSubmitting}
          onClick={onSubmit}
          iconName="Send"
          iconPosition="right"
          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
        >
          {isSubmitting ? 'Sending Message...' : 'Send Message'}
        </Button>
        
        <p className="text-xs text-text-secondary text-center mt-3">
          By submitting this form, you agree to our Terms of Service and Privacy Policy.
          We'll respond within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default ContactFormFields;