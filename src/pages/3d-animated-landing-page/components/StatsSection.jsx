import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';

const StatsSection = () => {
  const [visibleStats, setVisibleStats] = useState([]);
  const [animatedValues, setAnimatedValues] = useState({});
  const sectionRef = useRef(null);

  const stats = [
    {
      id: 1,
      icon: "Users",
      value: 500,
      suffix: "+",
      label: "Happy Clients",
      description: "Businesses transformed",
      color: "text-blue-400"
    },
    {
      id: 2,
      icon: "Code",
      value: 1200,
      suffix: "+",
      label: "Projects Delivered",
      description: "Successful implementations",
      color: "text-cyan-400"
    },
    {
      id: 3,
      icon: "Award",
      value: 98,
      suffix: "%",
      label: "Success Rate",
      description: "Client satisfaction",
      color: "text-green-400"
    },
    {
      id: 4,
      icon: "Clock",
      value: 24,
      suffix: "/7",
      label: "Support Available",
      description: "Round-the-clock assistance",
      color: "text-purple-400"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animations for all stats
            stats.forEach((stat, index) => {
              setTimeout(() => {
                setVisibleStats(prev => [...new Set([...prev, stat.id])]);
                animateValue(stat.id, 0, stat.value, 2000);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.3 }
    );

    if (sectionRef?.current) {
      observer?.observe(sectionRef?.current);
    }

    return () => observer?.disconnect();
  }, []);

  const animateValue = (id, start, end, duration) => {
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(start + (end - start) * easeOutQuart);
      
      setAnimatedValues(prev => ({
        ...prev,
        [id]: currentValue
      }));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    animate();
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Proven <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Results</span>
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
            Numbers that speak to our commitment to excellence and client success
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {stats?.map((stat, index) => (
            <div
              key={stat?.id}
              className={`
                group text-center transition-all duration-700 ease-out
                ${visibleStats?.includes(stat?.id)
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-8'
                }
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              {/* Card Container */}
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Icon */}
                <div className={`
                  w-16 h-16 mx-auto mb-6 rounded-xl bg-gradient-to-br from-white/10 to-white/5 
                  flex items-center justify-center transition-transform duration-500 
                  group-hover:scale-110 group-hover:rotate-6
                `}>
                  <Icon name={stat?.icon} size={28} className={stat?.color} />
                </div>

                {/* Animated Value */}
                <div className="mb-4">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    <span className="tabular-nums">
                      {animatedValues?.[stat?.id] || 0}
                    </span>
                    <span className={stat?.color}>{stat?.suffix}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {stat?.label}
                  </h3>
                  <p className="text-blue-200/70 text-sm">
                    {stat?.description}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-1 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${stat?.color?.includes('blue') ? 'from-blue-500 to-cyan-400' : 
                      stat?.color?.includes('cyan') ? 'from-cyan-500 to-blue-400' :
                      stat?.color?.includes('green') ? 'from-green-500 to-teal-400' :
                      'from-purple-500 to-pink-400'
                    } transition-all duration-2000 ease-out`}
                    style={{
                      width: visibleStats?.includes(stat?.id) ? '100%' : '0%',
                      transitionDelay: `${index * 200 + 500}ms`
                    }}
                  />
                </div>

                {/* Glow Effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 
                  transition-opacity duration-500 bg-gradient-to-br ${
                    stat?.color?.includes('blue') ? 'from-blue-500 to-cyan-400' : 
                    stat?.color?.includes('cyan') ? 'from-cyan-500 to-blue-400' :
                    stat?.color?.includes('green') ? 'from-green-500 to-teal-400' :
                    'from-purple-500 to-pink-400'
                  } blur-xl -z-10 scale-110
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Text */}
        <div className="text-center mt-16 relative z-10">
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who have transformed their businesses with our innovative solutions
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;