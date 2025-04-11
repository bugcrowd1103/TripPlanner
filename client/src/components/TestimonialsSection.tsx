import { 
  Star, Quote, Heart, ArrowRight, Globe, Camera, MapPin, 
  Plane, Calendar, Shield, Briefcase, Luggage 
} from 'lucide-react';
import { useState } from 'react';

type TestimonialType = {
  id: number;
  rating: number;
  text: string;
  name: string;
  location: string;
  image: string;
  tags: string[];
  emotion: string;
  spotlightFeature: string;
};

const testimonials: TestimonialType[] = [
  {
    id: 1,
    rating: 5,
    text: "TravelPal AI created the perfect Japan itinerary for our family. It balanced kid-friendly activities with cultural experiences that kept everyone engaged. The local food recommendations were outstanding!",
    name: "Sarah J.",
    location: "Family trip to Japan",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
    tags: ["Family-friendly", "Cultural", "Food"],
    emotion: "Happy",
    spotlightFeature: "Emotion-based recommendations"
  },
  {
    id: 2,
    rating: 5,
    text: "As a solo traveler, safety was my main concern. TravelPal AI understood this and planned a wonderful European adventure with safe accommodations and neighborhoods while still finding authentic local experiences.",
    name: "Marcus T.",
    location: "Solo trip across Europe",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    tags: ["Solo travel", "Safety", "Multi-city"],
    emotion: "Secure",
    spotlightFeature: "Solo traveler safety"
  },
  {
    id: 3,
    rating: 4.5,
    text: "We told the AI we wanted adventure and cultural immersion in Thailand, and it delivered beyond our expectations. The off-the-beaten-path suggestions gave us experiences we'd never have found on our own.",
    name: "Aisha & David",
    location: "Couple's adventure in Thailand",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    tags: ["Adventure", "Hidden gems", "Cultural"],
    emotion: "Excited",
    spotlightFeature: "Hidden gems recommendations"
  },
  {
    id: 4,
    rating: 5,
    text: "I used the digital nomad features to plan my workation in Bali. The co-working space recommendations and timezone planner helped me stay productive while enjoying paradise.",
    name: "Jordan K.",
    location: "Digital nomad in Bali",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    tags: ["Digital nomad", "Workation", "Productivity"],
    emotion: "Balanced",
    spotlightFeature: "Digital nomad tools"
  },
  {
    id: 5,
    rating: 5,
    text: "The AI packing assistant saved me from overpacking! It knew exactly what I needed for Morocco's varied climate, and the visa requirements checker made preparation stress-free.",
    name: "Priya S.",
    location: "Morocco adventure",
    image: "https://randomuser.me/api/portraits/women/41.jpg",
    tags: ["Packing", "Preparation", "Visa"],
    emotion: "Relieved",
    spotlightFeature: "AI packing assistant"
  }
];

const milestones = [
  { number: "100K+", label: "Happy Travelers" },
  { number: "150+", label: "Countries Covered" },
  { number: "4.9/5", label: "Average Rating" },
  { number: "35M+", label: "AI-Generated Plans" },
];

type FeatureIcon = {
  [key: string]: React.ReactNode;
};

const featureIcons: FeatureIcon = {
  "Emotion-based recommendations": <Heart className="text-pink-500" />,
  "Solo traveler safety": <Shield className="text-blue-500" />,
  "Hidden gems recommendations": <MapPin className="text-purple-500" />,
  "Digital nomad tools": <Briefcase className="text-indigo-500" />,
  "AI packing assistant": <Luggage className="text-orange-500" />
};

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  const activeTestimonial = testimonials[activeIndex];
  
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-blue-50 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-40 left-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
      <div className="absolute bottom-40 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-20"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-6">
            <Quote className="w-4 h-4 mr-2" />
            <span>Real Traveler Stories</span>
          </div>
          <h2 className="text-4xl font-extrabold mb-4">
            Creating <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Unforgettable</span> Travel Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how our AI-powered platform has helped thousands of travelers discover their perfect journey.
          </p>
        </div>
        
        {/* Metrics section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {milestones.map((milestone, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                {milestone.number}
              </h3>
              <p className="text-gray-700">{milestone.label}</p>
            </div>
          ))}
        </div>
        
        {/* Featured testimonial */}
        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Left image column */}
            <div className="lg:w-2/5 relative overflow-hidden">
              {/* Spotlight feature badge */}
              <div className="absolute top-5 left-5 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center">
                {featureIcons[activeTestimonial.spotlightFeature] || <Star className="text-yellow-500" />}
                <span className="ml-2 text-sm font-medium">{activeTestimonial.spotlightFeature}</span>
              </div>
              
              {/* Destination illustration background */}
              <div className="relative h-64 lg:h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-90"></div>
                <div className="absolute inset-0 opacity-20 bg-pattern"></div>
                
                {/* Travel elements */}
                <div className="absolute top-1/4 left-1/4 bg-white rounded-lg p-2 shadow-lg animate-float">
                  <Plane className="text-blue-500 w-6 h-6" />
                </div>
                <div className="absolute bottom-1/4 right-1/4 bg-white rounded-lg p-2 shadow-lg animate-float animation-delay-2000">
                  <Camera className="text-purple-500 w-6 h-6" />
                </div>
                <div className="absolute top-1/2 right-1/3 bg-white rounded-lg p-2 shadow-lg animate-float animation-delay-4000">
                  <Globe className="text-indigo-500 w-6 h-6" />
                </div>
                
                {/* Emotion tag */}
                <div className="absolute bottom-6 left-6 px-4 py-2 rounded-full bg-white text-sm font-medium flex items-center">
                  <Heart className="w-4 h-4 mr-2 text-pink-500" />
                  <span>Feeling: <strong>{activeTestimonial.emotion}</strong></span>
                </div>
              </div>
            </div>
            
            {/* Right content column */}
            <div className="lg:w-3/5 p-8 lg:p-12 flex flex-col justify-between">
              <div>
                {/* Quote and rating */}
                <div className="flex justify-between items-start mb-6">
                  <Quote className="text-gray-300 w-12 h-12" />
                  
                  <div className="flex text-yellow-400">
                    {[...Array(Math.floor(activeTestimonial.rating))].map((_, i) => (
                      <Star key={i} fill="currentColor" size={20} />
                    ))}
                    {activeTestimonial.rating % 1 > 0 && (
                      <div className="relative">
                        <Star fill="currentColor" fillOpacity={0.5} size={20} />
                        <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                          <Star fill="currentColor" size={20} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Testimonial text */}
                <p className="text-xl mb-8 leading-relaxed">"{activeTestimonial.text}"</p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {activeTestimonial.tags.map((tag, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-between">
                {/* User info */}
                <div className="flex items-center mb-4 sm:mb-0">
                  <img 
                    src={activeTestimonial.image} 
                    alt={activeTestimonial.name} 
                    className="w-12 h-12 rounded-full mr-4 border-2 border-purple-100"
                  />
                  <div>
                    <h4 className="font-bold text-lg">{activeTestimonial.name}</h4>
                    <div className="flex items-center text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <p className="text-sm">{activeTestimonial.location}</p>
                    </div>
                  </div>
                </div>
                
                {/* Navigation */}
                <div className="flex space-x-2">
                  <button 
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    <ArrowRight className="w-5 h-5 transform rotate-180" />
                  </button>
                  <button 
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full ${
                  index === activeIndex 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
