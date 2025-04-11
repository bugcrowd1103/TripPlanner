import { Link } from "wouter";

interface HeroSectionProps {
  onStartPlanning: () => void;
}

const HeroSection = ({ onStartPlanning }: HeroSectionProps) => {
  return (
    <section className="relative bg-cover bg-center h-[60vh] flex items-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')"}}>
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins mb-6">Discover Your Perfect Journey</h1>
        <p className="text-xl text-white mb-8 max-w-2xl mx-auto">Let our AI create a personalized travel plan tailored to your preferences, interests, and travel style.</p>
        <button 
          className="bg-primary text-white text-lg font-medium py-3 px-8 rounded-full hover:bg-opacity-90 transition shadow-lg"
          onClick={onStartPlanning}
        >
          Start Planning
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
