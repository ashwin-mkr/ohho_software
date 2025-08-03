import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LiveChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineAgents, setOnlineAgents] = useState(3);
  const messagesEndRef = useRef(null);

  const agents = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Technical Consultant',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      specialties: ['Web Development', 'Cloud Solutions']
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Sales Engineer',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      specialties: ['Mobile Apps', 'AI Solutions']
    },
    {
      id: 3,
      name: 'Emily Johnson',
      role: 'Project Manager',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      specialties: ['Project Planning', 'Consulting']
    }
  ];

  const quickReplies = [
    'What services do you offer?',
    'Can I get a quote?',
    'How long does development take?',
    'Do you offer support?'
  ];

  useEffect(() => {
    if (isOpen && messages?.length === 0) {
      // Initialize with welcome message
      const welcomeMessage = {
        id: Date.now(),
        text: `Hi! I'm Sarah from OHHO Software. How can I help you today? 👋`,sender: 'agent',
        timestamp: new Date(),
        agent: agents?.[0]
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputMessage?.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const responses = [
        "Thanks for your message! Let me help you with that. Can you tell me more about your project requirements?",
        "That\'s a great question! Our team specializes in that area. Would you like to schedule a consultation?",
        "I\'d be happy to provide more information. What\'s your timeline for this project?",
        "Perfect! Let me connect you with one of our specialists who can give you detailed information."
      ];

      const agentMessage = {
        id: Date.now() + 1,
        text: responses?.[Math.floor(Math.random() * responses?.length)],
        sender: 'agent',
        timestamp: new Date(),
        agent: agents?.[Math.floor(Math.random() * agents?.length)]
      };

      setMessages(prev => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickReply = (reply) => {
    setInputMessage(reply);
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-full shadow-elevation-3 hover:shadow-elevation-2 transition-all duration-300 animate-pulse"
        >
          <Icon name="MessageCircle" size={24} />
        </button>
        
        {/* Online indicator */}
        <div className="absolute -top-1 -left-1 bg-success text-white text-xs px-2 py-1 rounded-full">
          {onlineAgents} online
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-surface border border-border rounded-lg shadow-elevation-3 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-accent text-white p-4 rounded-t-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Icon name="MessageCircle" size={16} />
            </div>
            <div>
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-xs opacity-90">{onlineAgents} agents online</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message) => (
          <div
            key={message?.id}
            className={`flex ${message?.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-xs ${message?.sender === 'user' ? 'order-2' : 'order-1'}`}>
              {message?.sender === 'agent' && message?.agent && (
                <div className="flex items-center space-x-2 mb-1">
                  <img
                    src={message?.agent?.avatar}
                    alt={message?.agent?.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-xs text-text-secondary">{message?.agent?.name}</span>
                </div>
              )}
              <div
                className={`
                  p-3 rounded-lg text-sm
                  ${message?.sender === 'user' ?'bg-primary text-white' :'bg-muted text-text-primary'
                  }
                `}
              >
                {message?.text}
              </div>
              <p className="text-xs text-text-secondary mt-1">
                {formatTime(message?.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-muted p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 bg-text-secondary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
      {/* Quick Replies */}
      {messages?.length <= 1 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-text-secondary mb-2">Quick questions:</p>
          <div className="flex flex-wrap gap-1">
            {quickReplies?.map((reply, index) => (
              <button
                key={index}
                onClick={() => handleQuickReply(reply)}
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full hover:bg-primary/20 transition-colors"
              >
                {reply}
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e?.target?.value)}
            onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <Button
            variant="default"
            size="sm"
            onClick={handleSendMessage}
            disabled={!inputMessage?.trim()}
            iconName="Send"
            iconSize={16}
          />
        </div>
      </div>
    </div>
  );
};

export default LiveChatWidget;