import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  const dotVariants = {
    start: { y: 0 },
    end: { y: -10 }
  };

  const containerVariants = {
    start: { transition: { staggerChildren: 0.2 } },
    end: { transition: { staggerChildren: 0.2 } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start space-x-3"
    >
      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
        <Bot className="h-4 w-4 text-white" />
      </div>
      <div className="bg-slate-100 px-4 py-3 rounded-2xl">
        <div className="flex items-center space-x-1">
          <span className="text-sm text-slate-600 mr-2">Assistant is typing</span>
          <motion.div
            variants={containerVariants}
            initial="start"
            animate="end"
            className="flex space-x-1"
          >
            {[0, 1, 2]?.map((index) => (
              <motion.div
                key={index}
                variants={dotVariants}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
                className="w-2 h-2 bg-slate-400 rounded-full"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;