import React from 'react';
import { User, Mail, Phone, MapPin, Clock, Shield, Settings, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const UserInfo = () => {
  const userInfo = {
    name: 'John Doe',
    email: 'john.doe@company.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    joinDate: new Date('2023-01-15'),
    lastActive: new Date(),
    accountType: 'Premium',
    sessionId: 'CH-2025-001',
    priority: 'High'
  };

  const sessionStats = [
    { label: 'Session Duration', value: '12m 45s', icon: Clock },
    { label: 'Messages Sent', value: '8', icon: Mail },
    { label: 'Response Time', value: '< 1min', icon: Shield }
  ];

  const exportConversation = () => {
    // Implement conversation export logic
    console.log('Exporting conversation...');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
      {/* User Profile Header */}
      <div className="p-4 border-b border-slate-200">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-slate-800 truncate">{userInfo?.name}</h3>
            <p className="text-sm text-slate-600">{userInfo?.accountType} User</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-2">
          <button 
            onClick={exportConversation}
            className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1"
          >
            <Download className="h-4 w-4" />
            <span>Export</span>
          </button>
          <button className="flex-1 bg-slate-50 hover:bg-slate-100 text-slate-700 px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center space-x-1">
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </button>
        </div>
      </div>
      {/* User Details */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Contact Information */}
        <div>
          <h4 className="font-medium text-slate-800 mb-3">Contact Information</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <Mail className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Email</p>
                <p className="text-sm font-medium text-slate-800">{userInfo?.email}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Phone</p>
                <p className="text-sm font-medium text-slate-800">{userInfo?.phone}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="h-4 w-4 text-slate-500" />
              <div>
                <p className="text-sm text-slate-600">Location</p>
                <p className="text-sm font-medium text-slate-800">{userInfo?.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Session Information */}
        <div className="border-t border-slate-200 pt-4">
          <h4 className="font-medium text-slate-800 mb-3">Session Information</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Session ID</span>
              <span className="text-sm font-medium text-slate-800">{userInfo?.sessionId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Priority</span>
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                userInfo?.priority === 'High' ?'bg-red-100 text-red-700' :'bg-green-100 text-green-700'
              }`}>
                {userInfo?.priority}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Last Active</span>
              <span className="text-sm font-medium text-slate-800">
                {format(userInfo?.lastActive, 'HH:mm')}
              </span>
            </div>
          </div>
        </div>

        {/* Session Statistics */}
        <div className="border-t border-slate-200 pt-4">
          <h4 className="font-medium text-slate-800 mb-3">Session Stats</h4>
          <div className="space-y-3">
            {sessionStats?.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <stat.icon className="h-4 w-4 text-slate-500" />
                  <span className="text-sm text-slate-600">{stat?.label}</span>
                </div>
                <span className="text-sm font-medium text-slate-800">{stat?.value}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Account Information */}
        <div className="border-t border-slate-200 pt-4">
          <h4 className="font-medium text-slate-800 mb-3">Account Details</h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Member Since</span>
              <span className="text-sm font-medium text-slate-800">
                {format(userInfo?.joinDate, 'MMM yyyy')}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-slate-600">Account Type</span>
              <span className="text-sm font-medium text-blue-600">{userInfo?.accountType}</span>
            </div>
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center">
          Session started at {format(new Date(), 'HH:mm')}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;