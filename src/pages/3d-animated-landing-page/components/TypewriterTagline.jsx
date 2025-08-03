import React, { useState, useEffect } from 'react';

const TypewriterTagline = ({ delay = 2000 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  const fullText = "Your Digital Future Starts Here";

  useEffect(() => {
    const startTyping = setTimeout(() => {
      setIsTyping(true);
    }, delay);

    return () => clearTimeout(startTyping);
  }, [delay]);

  useEffect(() => {
    if (!isTyping) return;

    if (currentIndex < fullText?.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + fullText?.[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Typing complete, start cursor blinking
      const cursorTimer = setInterval(() => {
        setShowCursor(prev => !prev);
      }, 500);

      return () => clearInterval(cursorTimer);
    }
  }, [currentIndex, isTyping, fullText]);

  return (
    <div className="text-center py-8">
      <div className="relative inline-block">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-light text-white/90 tracking-wide">
          {displayText}
          <span 
            className={`inline-block w-1 h-8 md:h-12 bg-cyan-400 ml-2 transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </h2>
        
        {/* Glow effect for text */}
        <div className="absolute inset-0 text-2xl md:text-4xl lg:text-5xl font-light text-cyan-400/30 tracking-wide blur-sm">
          {displayText}
        </div>
      </div>
      {/* Subtitle that appears after typing is complete */}
      <div className={`mt-6 transition-all duration-1000 ${
        currentIndex >= fullText?.length 
          ? 'opacity-100 transform translate-y-0' 
          : 'opacity-0 transform translate-y-4'
      }`}>
        <p className="text-lg md:text-xl text-blue-200/80 font-light">
          Innovative solutions for tomorrow's challenges
        </p>
      </div>
      {/* Animated underline */}
      <div className={`mt-4 mx-auto transition-all duration-1000 delay-500 ${
        currentIndex >= fullText?.length 
          ? 'w-32 opacity-100' :'w-0 opacity-0'
      } h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400`} />
    </div>
  );
};

export default TypewriterTagline;