import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bot, Phone, Video, MoreVertical } from 'lucide-react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import ChatSidebar from './components/ChatSidebar';
import UserInfo from './components/UserInfo';
import TypingIndicator from './components/TypingIndicator';
import axios from 'axios';

const RealTimeChatInterface = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I\'m your OHHO Software support assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedChat, setSelectedChat] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [backendAvailable, setBackendAvailable] = useState(true);
  const messagesEndRef = useRef(null);

  const flaskBackendUrl = import.meta.env?.VITE_FLASK_BACKEND_URL || 'http://localhost:5000';

  // Fallback responses for when backend is unavailable
  const fallbackResponses = [
    "Thank you for your message! I'm currently in offline mode, but I'm here to help with basic questions about OHHO Software.",
    "I understand you need assistance. While our backend service is temporarily unavailable, I can provide general information about our services.",
    "That's a great question! Although I'm running in local mode right now, I'd be happy to help with general inquiries about OHHO Software.",
    "I appreciate your patience. Our chat service is currently in offline mode, but I can still assist with basic support questions.",
    "Thanks for reaching out! While our main chat service is temporarily unavailable, I'm here to provide general assistance."
  ];

  const getRandomFallbackResponse = () => {
    return fallbackResponses?.[Math.floor(Math.random() * fallbackResponses?.length)];
  };

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (message) => {
    if (!message?.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      // First attempt to connect to backend
      const response = await axios?.post(`${flaskBackendUrl}/chat`, {
        message: message
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000 // Reduced timeout for faster fallback
      });

      // If successful, mark backend as available
      setBackendAvailable(true);

      const botMessage = {
        id: Date.now() + 1,
        text: response?.data?.response || 'Sorry, I encountered an error processing your request.',
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, botMessage]);
      }, 1000);

    } catch (error) {
      console.warn('Backend unavailable, using fallback response:', error?.message);
      
      // Mark backend as unavailable
      setBackendAvailable(false);
      
      // Use fallback response instead of error message
      const fallbackMessage = {
        id: Date.now() + 1,
        text: getRandomFallbackResponse(),
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      };

      setTimeout(() => {
        setIsTyping(false);
        setMessages(prev => [...prev, fallbackMessage]);
      }, 1000);
    } finally {
      setIsLoading(false);
    }
  };

  const startNewChat = () => {
    setMessages([
      {
        id: Date.now(),
        text: "Hello! I'm your OHHO Software support assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date(),
        type: 'text'
      }
    ]);
    setSelectedChat(Date.now());
  };

  const transferToHuman = () => {
    const transferMessage = {
      id: Date.now(),
      text: "I'm connecting you with a human agent. Please hold on while I transfer your conversation...",
      sender: 'bot',
      timestamp: new Date(),
      type: 'system'
    };
    setMessages(prev => [...prev, transferMessage]);
  };

  const endSession = () => {
    const endMessage = {
      id: Date.now(),
      text: "Thank you for contacting OHHO Software support. Your session has been archived. Have a great day!",
      sender: 'bot',
      timestamp: new Date(),
      type: 'system'
    };
    setMessages(prev => [...prev, endMessage]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-slate-200 mb-6 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Bot className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Real-time Chat Interface</h1>
                <p className="text-slate-600">Professional business communications with OHHO Software</p>
                {!backendAvailable && (
                  <p className="text-amber-600 text-sm flex items-center mt-1">
                    <span className="w-2 h-2 bg-amber-500 rounded-full mr-2"></span>
                    Running in offline mode
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={startNewChat}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Start New Chat
              </button>
              <button
                onClick={transferToHuman}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Transfer to Human Agent
              </button>
              <button
                onClick={endSession}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                End Session
              </button>
            </div>
          </div>
        </motion.div>

        {/* Main Chat Interface */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-3"
          >
            <ChatSidebar 
              selectedChat={selectedChat}
              setSelectedChat={setSelectedChat}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </motion.div>

          {/* Main Chat Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-6"
          >
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 h-full flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      backendAvailable ? 'bg-green-500' : 'bg-amber-500'
                    }`}></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">Support Assistant</h3>
                    <p className={`text-sm ${backendAvailable ? 'text-green-600' : 'text-amber-600'}`}>
                      {backendAvailable ? 'Online' : 'Offline Mode'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Phone className="h-5 w-5 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <Video className="h-5 w-5 text-slate-600" />
                  </button>
                  <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5 text-slate-600" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                <AnimatePresence>
                  {messages?.map((message) => (
                    <ChatMessage key={message?.id} message={message} />
                  ))}
                </AnimatePresence>
                {isTyping && <TypingIndicator />}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-slate-200">
                <ChatInput 
                  value={inputValue}
                  onChange={setInputValue}
                  onSend={sendMessage}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </motion.div>

          {/* User Info Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="col-span-3"
          >
            <UserInfo />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChatInterface;