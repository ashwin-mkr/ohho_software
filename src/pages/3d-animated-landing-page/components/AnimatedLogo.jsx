import React, { useState, useEffect } from 'react';

const AnimatedLogo = ({ isVisible = true }) => {
  const [particles, setParticles] = useState([]);
  const [logoVisible, setLogoVisible] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Generate particles for logo animation
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles?.push({
          id: i,
          x: Math.random() * 400,
          y: Math.random() * 200,
          size: Math.random() * 4 + 1,
          opacity: Math.random(),
          speed: Math.random() * 2 + 0.5,
          direction: Math.random() * Math.PI * 2
        });
      }
      setParticles(newParticles);
    };

    const timer = setTimeout(() => {
      generateParticles();
      setLogoVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || particles?.length === 0) return;

    const animateParticles = () => {
      setParticles(prevParticles => 
        prevParticles?.map(particle => ({
          ...particle,
          x: particle?.x + Math.cos(particle?.direction) * particle?.speed,
          y: particle?.y + Math.sin(particle?.direction) * particle?.speed,
          opacity: 0.3 + Math.sin(Date.now() * 0.001 + particle?.id) * 0.3,
          // Reset position if out of bounds
          ...(particle?.x > 400 && { x: -10 }),
          ...(particle?.x < -10 && { x: 400 }),
          ...(particle?.y > 200 && { y: -10 }),
          ...(particle?.y < -10 && { y: 200 })
        }))
      );
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, [isVisible, particles?.length]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[300px]">
      {/* Particle System Background */}
      <div className="absolute inset-0 overflow-hidden">
        {particles?.map(particle => (
          <div
            key={particle?.id}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${particle?.x}px`,
              top: `${particle?.y}px`,
              opacity: particle?.opacity,
              transform: `scale(${particle?.size})`,
              boxShadow: `0 0 ${particle?.size * 4}px rgba(59, 130, 246, 0.5)`
            }}
          />
        ))}
      </div>
      {/* Animated OHHO Logo */}
      <div 
        className={`relative z-10 transition-all duration-2000 ease-out ${
          logoVisible 
            ? 'opacity-100 transform translate-y-0 scale-100' 
            : 'opacity-0 transform translate-y-8 scale-95'
        }`}
      >
        <div className="text-center space-y-4">
          {/* Main Logo */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl font-bold text-white tracking-wider">
              <span className="inline-block animate-pulse">O</span>
              <span className="inline-block animate-pulse" style={{ animationDelay: '0.2s' }}>H</span>
              <span className="inline-block animate-pulse" style={{ animationDelay: '0.4s' }}>H</span>
              <span className="inline-block animate-pulse" style={{ animationDelay: '0.6s' }}>O</span>
            </h1>
            
            {/* Glow Effect */}
            <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-blue-400 tracking-wider blur-sm opacity-50">
              OHHO
            </div>
            
            {/* Scanning Line Effect */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" 
                   style={{ 
                     animation: 'scan 3s linear infinite',
                     animationDelay: '1s'
                   }} />
            </div>
          </div>

          {/* Software Text */}
          <div className={`transition-all duration-1000 delay-1000 ${
            logoVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
          }`}>
            <p className="text-xl md:text-2xl text-blue-300 font-light tracking-widest">
              SOFTWARE
            </p>
          </div>

          {/* Orbiting Elements */}
          <div className="absolute inset-0 pointer-events-none">
            {[0, 1, 2]?.map(index => (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-2 h-2 bg-cyan-400 rounded-full"
                style={{
                  animation: `orbit 4s linear infinite`,
                  animationDelay: `${index * 1.33}s`,
                  transformOrigin: '0 0'
                }}
              />
            ))}
          </div>
        </div>
      </div>
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(100px); opacity: 0; }
        }
        
        @keyframes orbit {
          from {
            transform: translate(-50%, -50%) rotate(0deg) translateX(120px) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg) translateX(120px) rotate(-360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedLogo;