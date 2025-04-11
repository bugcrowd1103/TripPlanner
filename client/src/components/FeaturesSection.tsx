import { Brain, Route, Clock } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins mb-4">Why Plan with TravelPal AI?</h2>
          <p className="text-medium max-w-2xl mx-auto">Our AI-powered platform creates truly personalized travel experiences based on your unique preferences.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Brain className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">AI-Powered Personalization</h3>
            <p className="text-medium">Our advanced AI understands your preferences to create truly tailored travel plans.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Route className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">Complete Itineraries</h3>
            <p className="text-medium">Get day-by-day plans with accommodations, activities, and insider recommendations.</p>
          </div>
          
          <div className="text-center">
            <div className="bg-light w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="text-2xl text-primary" />
            </div>
            <h3 className="text-xl font-bold font-poppins mb-2">Save Time & Effort</h3>
            <p className="text-medium">Skip hours of research and planning. Get your perfect itinerary in minutes.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
