import { Compass, Search, ArrowRight } from 'lucide-react';

const Explore = () => {
  const popularDestinations = [
    {
      id: 1,
      name: 'Tokyo',
      country: 'Japan',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1887&auto=format&fit=crop',
      description: 'Vibrant city with a blend of ultra-modern and traditional culture'
    },
    {
      id: 2,
      name: 'Paris',
      country: 'France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1973&auto=format&fit=crop',
      description: 'City of lights, romance, and exquisite cuisine'
    },
    {
      id: 3,
      name: 'Santorini',
      country: 'Greece',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1974&auto=format&fit=crop',
      description: 'Stunning island with white-washed buildings and blue domes'
    },
    {
      id: 4,
      name: 'New York',
      country: 'USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1770&auto=format&fit=crop',
      description: 'The city that never sleeps, filled with iconic landmarks'
    },
    {
      id: 5,
      name: 'Bali',
      country: 'Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1738&auto=format&fit=crop',
      description: 'Tropical paradise with beautiful beaches and rich culture'
    },
    {
      id: 6,
      name: 'Barcelona',
      country: 'Spain',
      image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=1770&auto=format&fit=crop',
      description: 'Architectural wonders and vibrant Mediterranean lifestyle'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Explore Amazing Destinations
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover breathtaking locations, unique experiences, and create unforgettable memories with our curated travel guides.
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-3xl mx-auto mb-16 relative">
          <div className="flex items-center bg-white rounded-full shadow-md p-2">
            <div className="pl-4 pr-2">
              <Search className="w-5 h-5 text-gray-500" />
            </div>
            <input 
              type="text" 
              placeholder="Search destinations, experiences, or activities..." 
              className="w-full py-3 px-2 rounded-full focus:outline-none"
            />
            <button className="bg-primary text-white rounded-full py-3 px-6 ml-2 hover:bg-primary/90 transition flex items-center font-medium">
              <span>Explore</span>
              <Compass className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
        
        {/* Popular destinations */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 flex items-center">
            <Compass className="mr-2 text-primary" />
            Popular Destinations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularDestinations.map(destination => (
              <div 
                key={destination.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{destination.name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{destination.country}</p>
                  <p className="text-gray-600 mb-4">{destination.description}</p>
                  <button className="text-primary font-medium flex items-center hover:underline">
                    Explore <ArrowRight className="ml-1 w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Coming soon message */}
        <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-4">More Exploration Features Coming Soon!</h2>
          <p className="text-lg text-gray-600 mb-6">
            We're working on adding personalized recommendations, interactive maps, and travel trend insights.
          </p>
          <button className="bg-primary text-white rounded-full py-3 px-6 hover:bg-primary/90 transition font-medium">
            Get Notified
          </button>
        </div>
      </div>
    </div>
  );
};

export default Explore;