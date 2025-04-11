
import { Search, MapPin, Calendar, Filter, ChevronDown, Plane, Clock } from 'lucide-react';

const Flights = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Search Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop" 
            alt="Flights background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Find Your Perfect Flight
            </h1>
            <p className="text-lg text-blue-100">
              Search and compare flights with AI-powered recommendations
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-4 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Plane className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="From" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Plane className="w-5 h-5 text-gray-500 rotate-90" />
                  <input 
                    type="text" 
                    placeholder="To" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Departure — Return" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition">
                Search Flights
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-xl shadow-sm p-8">
            <Plane className="w-16 h-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">Flight Search Coming Soon</h2>
            <p className="text-gray-600 mb-6">
              We're currently working on integrating flight search capabilities. 
              Soon you'll be able to search and book flights with AI-powered recommendations 
              tailored to your preferences.
            </p>
            <button className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-primary/90 transition">
              Get Notified When Live
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flights;
