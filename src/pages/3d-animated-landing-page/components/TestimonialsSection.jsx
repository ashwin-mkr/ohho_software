import React, { useState, useEffect, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "CTO, TechStart Inc.",
      company: "TechStart Inc.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `OHHO Software transformed our entire digital infrastructure. Their 3D visualization tools and AI integration helped us increase productivity by 300%. The team's expertise in cloud solutions is unmatched.`,
      rating: 5,
      project: "Cloud Migration & AI Tools"
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Founder & CEO",
      company: "InnovateLab",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Working with OHHO was a game-changer. Their cybersecurity solutions protected us from multiple threats, and their web development team delivered a stunning platform that exceeded all expectations.`,
      rating: 5,
      project: "Web Development & Security"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "VP of Technology",
      company: "DataFlow Systems",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `The level of innovation and technical expertise at OHHO is remarkable. They delivered our mobile app ahead of schedule with features we didn't even know were possible. Truly exceptional work.`,
      rating: 5,
      project: "Mobile App Development"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
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

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isVisible, testimonials?.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-yellow-400 fill-current" : "text-gray-400"}
      />
    ));
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/6 w-96 h-96 bg-blue-500/3 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-cyan-500/3 rounded-full blur-3xl" />
        </div>

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Success Stories</span>
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
            Hear from industry leaders who have transformed their businesses with our solutions
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-6xl text-blue-400">"</div>
              <div className="absolute bottom-4 right-4 text-6xl text-cyan-400 rotate-180">"</div>
            </div>

            {/* Testimonial Content */}
            <div className="relative z-10">
              {testimonials?.map((testimonial, index) => (
                <div
                  key={testimonial?.id}
                  className={`transition-all duration-700 ease-in-out ${
                    index === currentTestimonial
                      ? 'opacity-100 transform translate-x-0'
                      : index < currentTestimonial
                      ? 'opacity-0 transform -translate-x-full absolute inset-0'
                      : 'opacity-0 transform translate-x-full absolute inset-0'
                  }`}
                >
                  <div className="text-center space-y-8">
                    {/* Quote */}
                    <blockquote className="text-lg md:text-xl text-white/90 leading-relaxed italic max-w-3xl mx-auto">
                      "{testimonial?.content}"
                    </blockquote>

                    {/* Rating */}
                    <div className="flex justify-center space-x-1">
                      {renderStars(testimonial?.rating)}
                    </div>

                    {/* Author Info */}
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
                      <div className="relative">
                        <Image
                          src={testimonial?.image}
                          alt={testimonial?.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-cyan-400/50"
                        />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20" />
                      </div>
                      
                      <div className="text-center md:text-left">
                        <h4 className="text-xl font-semibold text-white">
                          {testimonial?.name}
                        </h4>
                        <p className="text-blue-300/80">
                          {testimonial?.position}
                        </p>
                        <p className="text-cyan-400/70 text-sm">
                          {testimonial?.company}
                        </p>
                      </div>

                      <div className="hidden md:block w-px h-16 bg-white/20" />

                      <div className="text-center md:text-left">
                        <p className="text-sm text-blue-200/60 uppercase tracking-wider">
                          Project
                        </p>
                        <p className="text-cyan-300 font-medium">
                          {testimonial?.project}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <Icon name="ChevronLeft" size={20} className="text-white" />
            </button>

            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <Icon name="ChevronRight" size={20} className="text-white" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials?.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-cyan-400 scale-125' :'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ${
          isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-8'
        }`}>
          <p className="text-blue-200/60 text-sm uppercase tracking-wider mb-4">
            Trusted by industry leaders
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {['TechStart Inc.', 'InnovateLab', 'DataFlow Systems', 'CloudTech', 'AI Dynamics']?.map((company, index) => (
              <div key={index} className="text-white/40 font-medium text-lg">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;