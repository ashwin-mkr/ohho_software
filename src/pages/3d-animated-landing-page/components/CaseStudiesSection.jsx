import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CaseStudiesSection = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const sectionRef = useRef(null);

  const caseStudies = [
    {
      id: 1,
      title: "E-Commerce Platform Revolution",
      client: "RetailMax Corp",
      industry: "E-Commerce",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
      challenge: "Legacy system couldn't handle 10M+ daily transactions",
      solution: "Built scalable microservices architecture with AI-powered recommendations",
      results: [
        "300% increase in transaction capacity",
        "45% boost in conversion rates",
        "99.9% uptime achieved",
        "$2M annual cost savings"
      ],
      technologies: ["React", "Node.js", "AWS", "AI/ML", "Docker"],
      timeline: "6 months",
      color: "from-blue-500 to-cyan-400"
    },
    {
      id: 2,
      title: "Healthcare Data Analytics",
      client: "MedTech Solutions",
      industry: "Healthcare",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      challenge: "Fragmented patient data across multiple systems",
      solution: "Unified data platform with real-time analytics and predictive modeling",
      results: [
        "50% faster diagnosis times",
        "90% reduction in data errors",
        "HIPAA compliant security",
        "25% cost reduction"
      ],
      technologies: ["Python", "TensorFlow", "Azure", "React", "PostgreSQL"],
      timeline: "8 months",
      color: "from-green-500 to-teal-400"
    },
    {
      id: 3,
      title: "Smart City Infrastructure",
      client: "Urban Planning Dept",
      industry: "Government",
      image: "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=600&h=400&fit=crop",
      challenge: "Inefficient traffic management and resource allocation",
      solution: "IoT-enabled smart city platform with real-time monitoring",
      results: [
        "40% reduction in traffic congestion",
        "30% energy savings",
        "Real-time city monitoring",
        "Improved citizen satisfaction"
      ],
      technologies: ["IoT", "React", "Node.js", "MongoDB", "AWS IoT"],
      timeline: "12 months",
      color: "from-purple-500 to-pink-400"
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

    const cards = sectionRef?.current?.querySelectorAll('[data-card-id]');
    cards?.forEach(card => observer?.observe(card));

    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Case Studies</span>
          </h2>
          <p className="text-xl text-blue-200/80 max-w-3xl mx-auto">
            Real-world solutions that delivered measurable impact for our clients
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {caseStudies?.map((study, index) => (
            <div
              key={study?.id}
              data-card-id={study?.id}
              className={`
                group cursor-pointer transition-all duration-700 ease-out
                ${visibleCards?.includes(study?.id)
                  ? 'opacity-100 transform translate-y-0'
                  : 'opacity-0 transform translate-y-8'
                }
              `}
              style={{ transitionDelay: `${index * 200}ms` }}
              onClick={() => setSelectedStudy(study)}
            >
              <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={study?.image}
                    alt={study?.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${study?.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  {/* Industry Badge */}
                  <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-white text-sm font-medium">{study?.industry}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                      {study?.title}
                    </h3>
                    <p className="text-blue-300/80 text-sm font-medium">
                      {study?.client}
                    </p>
                  </div>

                  <p className="text-blue-200/70 text-sm leading-relaxed">
                    {study?.challenge}
                  </p>

                  {/* Key Results Preview */}
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-cyan-300">Key Results:</h4>
                    <ul className="space-y-1">
                      {study?.results?.slice(0, 2)?.map((result, idx) => (
                        <li key={idx} className="flex items-center text-sm text-blue-200/80">
                          <Icon name="TrendingUp" size={12} className="mr-2 text-green-400" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2">
                    {study?.technologies?.slice(0, 3)?.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-white/10 rounded-md text-xs text-blue-200/80"
                      >
                        {tech}
                      </span>
                    ))}
                    {study?.technologies?.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 rounded-md text-xs text-blue-200/80">
                        +{study?.technologies?.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div className="flex items-center text-sm text-blue-200/70">
                      <Icon name="Clock" size={14} className="mr-2" />
                      {study?.timeline}
                    </div>
                    <div className="flex items-center text-sm text-cyan-300 group-hover:text-cyan-200">
                      <span className="mr-2">View Details</span>
                      <Icon name="ArrowRight" size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 
                  transition-opacity duration-500 bg-gradient-to-br ${study?.color} blur-xl -z-10 scale-110
                `} />
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Create Your Success Story?
            </h3>
            <p className="text-blue-200/80 mb-6">
              Let's discuss how we can transform your business with innovative technology solutions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="default"
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500"
                iconName="MessageSquare"
                iconPosition="left"
              >
                Start Your Project
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white hover:bg-white/10"
                iconName="FileText"
                iconPosition="left"
              >
                Download Portfolio
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Modal for detailed case study view */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{selectedStudy?.title}</h3>
                <button
                  onClick={() => setSelectedStudy(null)}
                  className="w-8 h-8 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-200"
                >
                  <Icon name="X" size={16} className="text-white" />
                </button>
              </div>

              {/* Detailed content would go here */}
              <div className="space-y-6">
                <Image
                  src={selectedStudy?.image}
                  alt={selectedStudy?.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Challenge</h4>
                    <p className="text-blue-200/80">{selectedStudy?.challenge}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-3">Solution</h4>
                    <p className="text-blue-200/80">{selectedStudy?.solution}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-white mb-3">Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedStudy?.results?.map((result, idx) => (
                      <div key={idx} className="flex items-center text-blue-200/80">
                        <Icon name="CheckCircle" size={16} className="mr-3 text-green-400" />
                        {result}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudiesSection;