import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubmissionAnimation = ({ isVisible, onClose, formData }) => {
  const [animationStage, setAnimationStage] = useState('preparing'); // preparing, launching, success
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const stages = [
      { stage: 'preparing', duration: 1000, progress: 30 },
      { stage: 'launching', duration: 2000, progress: 80 },
      { stage: 'success', duration: 1000, progress: 100 }
    ];

    let currentStageIndex = 0;
    let progressInterval;

    const runStage = () => {
      if (currentStageIndex >= stages?.length) return;

      const currentStage = stages?.[currentStageIndex];
      setAnimationStage(currentStage?.stage);

      // Animate progress
      progressInterval = setInterval(() => {
        setProgress(prev => {
          const increment = (currentStage?.progress - (currentStageIndex > 0 ? stages?.[currentStageIndex - 1]?.progress : 0)) / (currentStage?.duration / 50);
          const newProgress = prev + increment;
          
          if (newProgress >= currentStage?.progress) {
            clearInterval(progressInterval);
            currentStageIndex++;
            setTimeout(runStage, 500);
            return currentStage?.progress;
          }
          
          return newProgress;
        });
      }, 50);
    };

    runStage();

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  const getStageContent = () => {
    switch (animationStage) {
      case 'preparing':
        return {
          title: 'Preparing Your Message',
          description: 'Validating information and preparing for transmission...',
          icon: 'Settings',
          color: 'text-warning'
        };
      case 'launching':
        return {
          title: 'Launching Message',
          description: 'Sending your message to our team...',
          icon: 'Rocket',
          color: 'text-primary'
        };
      case 'success':
        return {
          title: 'Message Sent Successfully!',
          description: 'Your message has been delivered to our team.',
          icon: 'CheckCircle',
          color: 'text-success'
        };
      default:
        return {
          title: 'Processing',
          description: 'Please wait...',
          icon: 'Loader2',
          color: 'text-text-secondary'
        };
    }
  };

  const stageContent = getStageContent();

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface rounded-lg shadow-elevation-3 p-8 max-w-md w-full text-center space-y-6">
        {/* Rocket Animation */}
        <div className="relative h-32 flex items-center justify-center">
          {animationStage === 'launching' && (
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Rocket Trail */}
              <div className="absolute w-1 h-16 bg-gradient-to-t from-orange-500 to-transparent opacity-80 animate-pulse" />
              {/* Particles */}
              {[...Array(6)]?.map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-orange-400 rounded-full animate-ping"
                  style={{
                    left: `${45 + Math.random() * 10}%`,
                    top: `${60 + Math.random() * 20}%`,
                    animationDelay: `${i * 0.2}s`
                  }}
                />
              ))}
            </div>
          )}
          
          <div className={`
            relative z-10 p-4 rounded-full bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20
            ${animationStage === 'launching' ? 'animate-bounce' : ''}
            ${animationStage === 'success' ? 'animate-pulse' : ''}
          `}>
            <Icon 
              name={stageContent?.icon} 
              size={48} 
              className={`${stageContent?.color} ${animationStage === 'preparing' ? 'animate-spin' : ''}`} 
            />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-text-secondary">{Math.round(progress)}% Complete</p>
        </div>

        {/* Stage Content */}
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-text-primary">{stageContent?.title}</h3>
          <p className="text-text-secondary">{stageContent?.description}</p>
        </div>

        {/* Success Details */}
        {animationStage === 'success' && (
          <div className="space-y-4">
            <div className="bg-success/5 border border-success/20 rounded-lg p-4 space-y-2">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="font-medium">Message Details</span>
              </div>
              <div className="text-sm text-text-secondary space-y-1">
                <p><strong>Name:</strong> {formData?.name || 'N/A'}</p>
                <p><strong>Email:</strong> {formData?.email || 'N/A'}</p>
                <p><strong>Service:</strong> {formData?.service || 'N/A'}</p>
                <p><strong>Reference ID:</strong> #MSG-{Date.now()?.toString()?.slice(-6)}</p>
              </div>
            </div>

            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={18} className="text-primary mt-0.5" />
                <div className="text-sm text-text-secondary">
                  <p className="font-medium text-text-primary mb-1">What happens next?</p>
                  <ul className="space-y-1">
                    <li>• Our team will review your message within 2 hours</li>
                    <li>• You'll receive a detailed response within 24 hours</li>
                    <li>• We'll schedule a consultation call if needed</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={onClose}
                iconName="ArrowLeft"
                iconPosition="left"
                className="flex-1"
              >
                Send Another
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={onClose}
                iconName="Home"
                iconPosition="left"
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
          </div>
        )}

        {/* Loading State Actions */}
        {animationStage !== 'success' && (
          <div className="flex items-center justify-center space-x-2 text-text-secondary">
            <Icon name="Clock" size={16} />
            <span className="text-sm">Please don't close this window</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmissionAnimation;