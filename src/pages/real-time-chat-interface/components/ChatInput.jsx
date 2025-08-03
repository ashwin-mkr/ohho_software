import React, { useState, useRef } from 'react';
import { Send, Paperclip, Smile, Mic } from 'lucide-react';
import { motion } from 'framer-motion';

const ChatInput = ({ value, onChange, onSend, isLoading }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef(null);
  const textareaRef = useRef(null);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (value?.trim() && !isLoading) {
      onSend(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileUpload = () => {
    fileInputRef?.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file?.name);
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Implement voice recording logic here
  };

  const quickReplies = [
    'Hello!',
    'Thank you',
    'Can you help me with...',
    'I need support',
    'Schedule a call'
  ];

  const commonEmojis = ['👍', '👎', '😀', '😊', '❤️', '👏', '🎉', '🤔'];

  return (
    <div className="space-y-3">
      {/* Quick Reply Suggestions */}
      <div className="flex flex-wrap gap-2">
        {quickReplies?.map((reply, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onChange(reply)}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded-full transition-colors"
          >
            {reply}
          </motion.button>
        ))}
      </div>
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-lg p-3 shadow-lg"
        >
          <div className="flex flex-wrap gap-2">
            {commonEmojis?.map((emoji, index) => (
              <button
                key={index}
                onClick={() => {
                  onChange(value + emoji);
                  setShowEmojiPicker(false);
                }}
                className="hover:bg-slate-100 p-2 rounded transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </motion.div>
      )}
      {/* Main Input Area */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-end space-x-2">
          {/* Attachment Button */}
          <button
            type="button"
            onClick={handleFileUpload}
            className="p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </button>

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => onChange(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              rows={1}
              className="w-full px-4 py-3 pr-12 border border-slate-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
              style={{
                minHeight: '48px',
                height: 'auto'
              }}
              disabled={isLoading}
            />
            
            {/* Emoji Button */}
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>

          {/* Voice Recording Button */}
          <button
            type="button"
            onClick={toggleRecording}
            className={`p-2 rounded-lg transition-colors ${
              isRecording 
                ? 'bg-red-500 text-white' :'text-slate-500 hover:text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Mic className="h-5 w-5" />
          </button>

          {/* Send Button */}
          <motion.button
            type="submit"
            disabled={!value?.trim() || isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg transition-colors ${
              value?.trim() && !isLoading
                ? 'bg-blue-600 text-white hover:bg-blue-700' :'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-current border-t-transparent" />
            ) : (
              <Send className="h-5 w-5" />
            )}
          </motion.button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          className="hidden"
          accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
        />
      </form>
      {/* Character Count */}
      <div className="text-xs text-slate-500 text-right">
        {value?.length || 0}/1000
      </div>
    </div>
  );
};

export default ChatInput;