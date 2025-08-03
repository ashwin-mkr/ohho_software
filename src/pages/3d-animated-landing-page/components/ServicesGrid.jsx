import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServicesGrid = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const gridRef = useRef(null);

  const services = [
    {
      id: 1,
      title: "Web & App Development",
      icon: "Code",
      shortDesc: "Custom digital solutions",
      fullDesc: "Full-stack web applications and mobile apps built with cutting-edge technologies. From concept to deployment, we create scalable solutions that drive business growth.",
      features: ["React & Node.js", "Mobile-First Design", "Cloud Integration", "Performance Optimization"],
      color: "from-blue-500 to-cyan-400",
      glowColor: "shadow-blue-500/20"
    },
    {
      id: 2,
      title: "Cloud Integration",
      icon: "Cloud",
      shortDesc: "Seamless cloud solutions",
      fullDesc: "Migrate and optimize your infrastructure with our comprehensive cloud services. We ensure scalability, security, and cost-effectiveness across all major platforms.",
      features: ["AWS & Azure", "DevOps Automation", "Microservices", "24/7 Monitoring"],
      color: "from-purple-500 to-blue-400",
      glowColor: "shadow-purple-500/20"
    },
    {
      id: 3,
      title: "AI Tools",
      icon: "Brain",
      shortDesc: "Intelligent automation",
      fullDesc: "Harness the power of artificial intelligence to automate processes, gain insights, and enhance user experiences with our custom AI solutions.",
      features: ["Machine Learning", "Natural Language Processing", "Computer Vision", "Predictive Analytics"],
      color: "from-green-500 to-teal-400",
      glowColor: "shadow-green-500/20"
    },
    {
      id: 4,
      title: "Cybersecurity",
      icon: "Shield",
      shortDesc: "Advanced protection",
      fullDesc: "Comprehensive security solutions to protect your digital assets. From vulnerability assessments to incident response, we keep your business secure.",
      features: ["Threat Detection", "Security Audits", "Compliance Management", "Incident Response"],
      color: "from-red-500 to-orange-400",
      glowColor: "shadow-red-500/20"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardId = parseInt(entry.target.dataset.cardId);
            setVisibleCards(prev => [...new Set([...prev, cardId])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = gridRef?.current?.querySelectorAll('[data-card-id]');
    cards?.forEach(card => observer?.observe(card));

    return () => observer?.disconnect();
  }, []);

  return (
    <section className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Services</span>
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
            Comprehensive technology solutions designed to accelerate your digital transformation journey
          </p>
        </div>

        {/* Services Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services?.map((service, index) => (
            <div
              key={service?.id}
              data-card-id={service?.id}
              className={`group relative transition-all duration-700 ease-out ${
                visibleCards?.includes(service?.id)
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredCard(service?.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Card Container */}
              <div className={`
                relative h-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6
                transition-all duration-500 ease-out hover:scale-105 hover:bg-white/10
                ${hoveredCard === service?.id ? `shadow-2xl ${service?.glowColor}` : 'shadow-lg'}
              `}>
                {/* Background Gradient */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 
                  transition-opacity duration-500 bg-gradient-to-br ${service?.color}
                `} />

                {/* Icon */}
                <div className={`
                  relative z-10 w-16 h-16 rounded-xl mb-6 flex items-center justify-center
                  bg-gradient-to-br ${service?.color} shadow-lg
                  transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6
                `}>
                  <Icon name={service?.icon} size={28} className="text-white" />
                </div>

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                    {service?.title}
                  </h3>
                  
                  <p className="text-blue-200/70 text-sm leading-relaxed">
                    {hoveredCard === service?.id ? service?.fullDesc : service?.shortDesc}
                  </p>

                  {/* Features List - Shows on Hover */}
                  <div className={`
                    transition-all duration-500 overflow-hidden
                    ${hoveredCard === service?.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}
                  `}>
                    <ul className="space-y-2 mt-4">
                      {service?.features?.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-blue-300/80">
                          <Icon name="CheckCircle" size={14} className="mr-2 text-cyan-400" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button - Shows on Hover */}
                  <div className={`
                    transition-all duration-500 pt-4
                    ${hoveredCard === service?.id ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}
                  `}>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`
                  absolute inset-0 rounded-2xl transition-opacity duration-500
                  ${hoveredCard === service?.id ? 'opacity-100' : 'opacity-0'}
                  bg-gradient-to-br ${service?.color} blur-xl -z-10 scale-110
                `} style={{ opacity: hoveredCard === service?.id ? 0.1 : 0 }} />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="space-y-6">
            <p className="text-lg text-blue-200/80">
              Ready to transform your business with cutting-edge technology?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dynamic-contact-form">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                  iconName="Rocket"
                  iconPosition="left"
                >
                  Get Started
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                iconName="Play"
                iconPosition="left"
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGrid;