import React from 'react';
import { Search, MessageCircle, Clock, Star, Archive } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const ChatSidebar = ({ selectedChat, setSelectedChat, searchQuery, setSearchQuery }) => {
  const chatSessions = [
    {
      id: 1,
      title: 'Current Session',
      lastMessage: 'Hello! How can I help you today?',
      timestamp: new Date(),
      unreadCount: 0,
      status: 'active',
      type: 'support'
    },
    {
      id: 2,
      title: 'Payment Issue',
      lastMessage: 'Thank you for resolving the payment issue',
      timestamp: new Date(Date.now() - 3600000),
      unreadCount: 0,
      status: 'resolved',
      type: 'support'
    },
    {
      id: 3,
      title: 'Feature Request',
      lastMessage: 'We will consider this for our next update',
      timestamp: new Date(Date.now() - 7200000),
      unreadCount: 2,
      status: 'pending',
      type: 'feedback'
    },
    {
      id: 4,
      title: 'Technical Support',
      lastMessage: 'The issue has been escalated to our dev team',
      timestamp: new Date(Date.now() - 86400000),
      unreadCount: 0,
      status: 'escalated',
      type: 'technical'
    }
  ];

  const filteredSessions = chatSessions?.filter(session =>
    session?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    session?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'resolved': return 'bg-blue-500';
      case 'pending': return 'bg-yellow-500';
      case 'escalated': return 'bg-red-500';
      default: return 'bg-slate-400';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'support': return <MessageCircle className="h-4 w-4" />;
      case 'feedback': return <Star className="h-4 w-4" />;
      case 'technical': return <Archive className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800 mb-3">Chat Sessions</h2>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {filteredSessions?.map((session) => (
            <motion.div
              key={session?.id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedChat(session?.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                selectedChat === session?.id
                  ? 'bg-blue-50 border-2 border-blue-200' :'hover:bg-slate-50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center space-x-2 flex-1 min-w-0">
                  <div className="text-slate-600">
                    {getTypeIcon(session?.type)}
                  </div>
                  <h3 className="font-medium text-slate-800 truncate">
                    {session?.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-1 flex-shrink-0">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(session?.status)}`}></div>
                  {session?.unreadCount > 0 && (
                    <div className="bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {session?.unreadCount}
                    </div>
                  )}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 mb-2 line-clamp-2">
                {session?.lastMessage}
              </p>
              
              <div className="flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>{format(session?.timestamp, 'HH:mm')}</span>
                </div>
                <span className="capitalize text-xs bg-slate-100 px-2 py-1 rounded">
                  {session?.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Sidebar Footer */}
      <div className="p-4 border-t border-slate-200">
        <div className="text-xs text-slate-500 text-center">
          {filteredSessions?.length} conversation{filteredSessions?.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;