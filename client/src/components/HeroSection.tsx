import { Link } from "wouter";
import { MoveRight, Globe, MapPin, Compass, Sparkles, Cloud, Plane } from 'lucide-react';

interface HeroSectionProps {
  onStartPlanning: () => void;
}

const HeroSection = ({ onStartPlanning }: HeroSectionProps) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-800 min-h-[85vh] flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-20 -left-20 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-40 left-20 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
        <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-6000"></div>
      </div>
      
      {/* Content Container */}
      <div className="container mx-auto px-4 relative z-10 pt-10 pb-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium mb-6">
              <span className="mr-2">✨</span>
              <span>AI-Powered Travel Made Simple</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200 mb-6 leading-tight">
              Your Dream Vacation, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-purple-300">
                Designed by AI
              </span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl">
              Our advanced AI creates personalized travel experiences that adapt to your preferences, emotions, and travel style.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-medium py-4 px-8 rounded-full hover:shadow-lg hover:from-pink-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center"
                onClick={onStartPlanning}
              >
                <span>Start Your Adventure</span>
                <MoveRight className="ml-2 h-5 w-5" />
              </button>
              <button className="bg-white/10 backdrop-blur-sm text-white text-lg font-medium py-4 px-8 rounded-full hover:bg-white/20 transition-all duration-300">
                Explore Features
              </button>
            </div>
            
            {/* Features badges */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mt-8">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center">
                <Sparkles className="w-4 h-4 mr-1" />
                Emotion-based recommendations
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center">
                <Globe className="w-4 h-4 mr-1" />
                1000+ destinations
              </span>
              <span className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white flex items-center">
                <Compass className="w-4 h-4 mr-1" />
                Smart itineraries
              </span>
            </div>
          </div>
          
          {/* 3D or Animated Graphic */}
          <div className="flex-1 relative">
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl rotate-12 shadow-xl"></div>
              <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl -rotate-12 shadow-xl"></div>
              
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-1 shadow-2xl border border-white/20 overflow-hidden">
                <div className="rounded-2xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
                    alt="Travel destinations" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                
                {/* Floating UI elements */}
                <div className="absolute -left-4 top-1/4 bg-white rounded-xl shadow-xl p-3 w-24 flex items-center animate-float">
                  <MapPin className="text-red-500 w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Paris</span>
                </div>
                
                <div className="absolute -right-4 top-2/3 bg-white rounded-xl shadow-xl p-3 w-28 flex items-center animate-float animation-delay-1000">
                  <Cloud className="text-blue-500 w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">23° Sunny</span>
                </div>
                
                <div className="absolute top-10 left-1/3 bg-white rounded-xl shadow-xl p-3 w-32 flex items-center animate-float animation-delay-2000">
                  <Plane className="text-purple-500 w-5 h-5 mr-2" />
                  <span className="text-sm font-medium">Flight Ready</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
