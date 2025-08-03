import React from 'react';
import { motion } from 'framer-motion';
import { User, Bot, AlertCircle, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';

const ChatMessage = ({ message }) => {
  const isUser = message?.sender === 'user';
  const isBot = message?.sender === 'bot';
  const isSystem = message?.type === 'system';
  const isError = message?.type === 'error';

  const getMessageIcon = () => {
    if (isUser) return <User className="h-4 w-4 text-white" />;
    if (isError) return <AlertCircle className="h-4 w-4 text-white" />;
    if (isSystem) return <CheckCircle className="h-4 w-4 text-white" />;
    return <Bot className="h-4 w-4 text-white" />;
  };

  const getMessageStyles = () => {
    if (isUser) {
      return 'bg-blue-600 text-white ml-auto';
    }
    if (isError) {
      return 'bg-red-500 text-white';
    }
    if (isSystem) {
      return 'bg-green-500 text-white mx-auto';
    }
    return 'bg-slate-100 text-slate-800';
  };

  const getAvatarStyles = () => {
    if (isUser) {
      return 'bg-blue-600 order-2';
    }
    if (isError) {
      return 'bg-red-500';
    }
    if (isSystem) {
      return 'bg-green-500';
    }
    return 'bg-gradient-to-r from-purple-500 to-blue-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`flex items-start space-x-3 ${isUser ? 'flex-row-reverse space-x-reverse' : ''} ${isSystem ? 'justify-center' : ''}`}
    >
      {!isSystem && (
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getAvatarStyles()}`}>
          {getMessageIcon()}
        </div>
      )}
      <div className={`max-w-xs lg:max-w-md xl:max-w-lg ${isSystem ? 'max-w-sm' : ''}`}>
        <div className={`px-4 py-3 rounded-2xl ${getMessageStyles()} ${isSystem ? 'text-center' : ''}`}>
          <p className="text-sm leading-relaxed">{message?.text}</p>
        </div>
        
        {message?.timestamp && (
          <div className={`mt-1 text-xs text-slate-500 ${isUser ? 'text-right' : 'text-left'} ${isSystem ? 'text-center' : ''}`}>
            {format(new Date(message?.timestamp), 'HH:mm')}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ChatMessage;