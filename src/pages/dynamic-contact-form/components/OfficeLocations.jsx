import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const OfficeLocations = () => {
  const [selectedOffice, setSelectedOffice] = useState(0);

  const offices = [
    {
      id: 1,
      name: 'San Francisco HQ',
      address: '123 Tech Street, San Francisco, CA 94105',
      phone: '+1 (555) 123-4567',
      email: 'sf@ohhosoftware.com',
      timezone: 'PST',
      hours: '9:00 AM - 6:00 PM',
      coordinates: { lat: 37.7749, lng: -122.4194 },
      isHeadquarters: true,
      specialties: ['AI Development', 'Cloud Solutions', 'Enterprise Software']
    },
    {
      id: 2,
      name: 'New York Office',
      address: '456 Business Ave, New York, NY 10001',
      phone: '+1 (555) 987-6543',
      email: 'ny@ohhosoftware.com',
      timezone: 'EST',
      hours: '8:00 AM - 5:00 PM',
      coordinates: { lat: 40.7128, lng: -74.0060 },
      isHeadquarters: false,
      specialties: ['Financial Tech', 'Mobile Apps', 'Cybersecurity']
    },
    {
      id: 3,
      name: 'London Office',
      address: '789 Innovation Lane, London, UK EC1A 1BB',
      phone: '+44 20 7123 4567',
      email: 'london@ohhosoftware.com',
      timezone: 'GMT',
      hours: '9:00 AM - 5:30 PM',
      coordinates: { lat: 51.5074, lng: -0.1278 },
      isHeadquarters: false,
      specialties: ['Web Development', 'E-commerce', 'Digital Marketing']
    }
  ];

  const getCurrentTime = (timezone) => {
    const now = new Date();
    const options = {
      timeZone: timezone === 'PST' ? 'America/Los_Angeles' : 
                timezone === 'EST'? 'America/New_York' : 'Europe/London',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    };
    return now?.toLocaleTimeString('en-US', options);
  };

  const isOfficeOpen = (timezone, hours) => {
    const now = new Date();
    const currentHour = timezone === 'PST' ? now?.getUTCHours() - 8 :
                       timezone === 'EST' ? now?.getUTCHours() - 5 :
                       now?.getUTCHours();
    return currentHour >= 9 && currentHour < 17;
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-text-primary">Our Global Offices</h2>
        <p className="text-text-secondary">
          Connect with our teams worldwide for personalized support
        </p>
      </div>
      {/* Office Selector */}
      <div className="flex flex-wrap gap-2 justify-center">
        {offices?.map((office, index) => (
          <button
            key={office?.id}
            onClick={() => setSelectedOffice(index)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
              ${selectedOffice === index
                ? 'bg-primary text-white shadow-lg'
                : 'bg-muted text-text-secondary hover:bg-primary/10 hover:text-primary'
              }
            `}
          >
            {office?.name}
            {office?.isHeadquarters && (
              <Icon name="Star" size={12} className="ml-1 inline" />
            )}
          </button>
        ))}
      </div>
      {/* Selected Office Details */}
      <div className="bg-surface border border-border rounded-lg p-6 shadow-elevation-1">
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-text-primary flex items-center space-x-2">
                <span>{offices?.[selectedOffice]?.name}</span>
                {offices?.[selectedOffice]?.isHeadquarters && (
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    HQ
                  </span>
                )}
              </h3>
              <p className="text-text-secondary mt-1">
                {offices?.[selectedOffice]?.address}
              </p>
            </div>
            <div className={`
              flex items-center space-x-2 px-3 py-1 rounded-full text-sm
              ${isOfficeOpen(offices?.[selectedOffice]?.timezone, offices?.[selectedOffice]?.hours)
                ? 'bg-success/10 text-success' :'bg-warning/10 text-warning'
              }
            `}>
              <div className={`w-2 h-2 rounded-full ${
                isOfficeOpen(offices?.[selectedOffice]?.timezone, offices?.[selectedOffice]?.hours)
                  ? 'bg-success' :'bg-warning'
              }`} />
              <span>
                {isOfficeOpen(offices?.[selectedOffice]?.timezone, offices?.[selectedOffice]?.hours)
                  ? 'Open Now' :'Closed'
                }
              </span>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Phone" size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">Phone</p>
                  <p className="text-text-secondary">{offices?.[selectedOffice]?.phone}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Mail" size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">Email</p>
                  <p className="text-text-secondary">{offices?.[selectedOffice]?.email}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Icon name="Clock" size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">Business Hours</p>
                  <p className="text-text-secondary">{offices?.[selectedOffice]?.hours}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Icon name="Globe" size={18} className="text-primary" />
                <div>
                  <p className="font-medium text-text-primary">Current Time</p>
                  <p className="text-text-secondary">
                    {getCurrentTime(offices?.[selectedOffice]?.timezone)} ({offices?.[selectedOffice]?.timezone})
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div className="space-y-2">
            <p className="font-medium text-text-primary">Specialties</p>
            <div className="flex flex-wrap gap-2">
              {offices?.[selectedOffice]?.specialties?.map((specialty, index) => (
                <span
                  key={index}
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Interactive Map */}
      <div className="bg-surface border border-border rounded-lg overflow-hidden shadow-elevation-1">
        <div className="p-4 border-b border-border">
          <h3 className="font-semibold text-text-primary flex items-center space-x-2">
            <Icon name="MapPin" size={18} className="text-primary" />
            <span>Office Location</span>
          </h3>
        </div>
        <div className="h-64 relative">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title={offices?.[selectedOffice]?.name}
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${offices?.[selectedOffice]?.coordinates?.lat},${offices?.[selectedOffice]?.coordinates?.lng}&z=14&output=embed`}
            className="border-0"
          />
        </div>
      </div>
      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="flex items-center justify-center space-x-2 p-4 bg-primary/5 border border-primary/20 rounded-lg hover:bg-primary/10 transition-colors duration-200">
          <Icon name="Phone" size={18} className="text-primary" />
          <span className="font-medium text-primary">Call Now</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 p-4 bg-accent/5 border border-accent/20 rounded-lg hover:bg-accent/10 transition-colors duration-200">
          <Icon name="Mail" size={18} className="text-accent" />
          <span className="font-medium text-accent">Send Email</span>
        </button>
        
        <button className="flex items-center justify-center space-x-2 p-4 bg-success/5 border border-success/20 rounded-lg hover:bg-success/10 transition-colors duration-200">
          <Icon name="Calendar" size={18} className="text-success" />
          <span className="font-medium text-success">Schedule Meeting</span>
        </button>
      </div>
    </div>
  );
};

export default OfficeLocations;