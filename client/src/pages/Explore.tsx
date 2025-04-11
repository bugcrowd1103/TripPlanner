import { useState } from 'react';
import { Search, MapPin, Calendar, Filter, ArrowRight, Clock, Star, Heart, Bookmark, ChevronDown } from 'lucide-react';
import { useLocation } from 'wouter';

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState('popular');
  const [, setLocation] = useLocation();
  
  const destinations = [
    {
      id: 1,
      name: 'Santorini, Greece',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1974&auto=format&fit=crop',
      rating: 4.9,
      reviews: 1243,
      featured: true,
      category: 'beach',
      description: 'Stunning white-washed buildings with blue domes overlooking the Aegean Sea.'
    },
    {
      id: 2,
      name: 'Kyoto, Japan',
      image: 'https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1953&auto=format&fit=crop',
      rating: 4.8,
      reviews: 987,
      featured: true,
      category: 'cultural',
      description: 'Ancient temples, traditional tea houses, and spectacular cherry blossoms.'
    },
    {
      id: 3,
      name: 'Machu Picchu, Peru',
      image: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=2070&auto=format&fit=crop',
      rating: 4.9,
      reviews: 1567,
      featured: true,
      category: 'adventure',
      description: 'Mysterious ancient Incan citadel set high in the Andes Mountains.'
    },
    {
      id: 4,
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop',
      rating: 4.7,
      reviews: 2341,
      featured: false,
      category: 'beach',
      description: 'Tropical paradise with lush rice terraces, stunning beaches, and vibrant culture.'
    },
    {
      id: 5,
      name: 'New York City, USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop',
      rating: 4.7,
      reviews: 3245,
      featured: false,
      category: 'urban',
      description: 'Iconic skyline, Broadway shows, and endless cultural attractions.'
    },
    {
      id: 6,
      name: 'Swiss Alps, Switzerland',
      image: 'https://images.unsplash.com/photo-1531498860502-7c67cf02f657?q=80&w=2070&auto=format&fit=crop',
      rating: 4.8,
      reviews: 873,
      featured: false,
      category: 'adventure',
      description: 'Breathtaking mountain scenery with world-class skiing and hiking.'
    }
  ];
  
  const curated = [
    {
      id: 1,
      title: 'Mediterranean Paradise',
      destinations: ['Athens', 'Santorini', 'Mykonos'],
      days: 10,
      image: 'https://images.unsplash.com/photo-1534367543070-9f5b92c75f8f?q=80&w=1740&auto=format&fit=crop',
      price: '$2,499',
      description: 'Experience the beauty of the Greek islands with this perfectly balanced trip mixing history, beaches, and authentic cuisine.'
    },
    {
      id: 2,
      title: 'Japanese Culture Tour',
      destinations: ['Tokyo', 'Kyoto', 'Osaka'],
      days: 12,
      image: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop',
      price: '$3,299',
      description: 'Immerse yourself in Japanese culture, from bustling Tokyo to the serene temples of Kyoto.'
    },
    {
      id: 3,
      title: 'Southeast Asia Adventure',
      destinations: ['Bangkok', 'Chiang Mai', 'Phuket'],
      days: 14,
      image: 'https://images.unsplash.com/photo-1506665531195-3566af2b4dfa?q=80&w=2070&auto=format&fit=crop',
      price: '$1,999',
      description: 'Explore Thailand\'s vibrant cities, ancient temples, and paradise beaches in this comprehensive tour.'
    }
  ];
  
  const experiences = [
    {
      id: 1,
      title: 'Northern Lights Expedition',
      location: 'Tromsø, Norway',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop',
      rating: 4.9,
      reviews: 342,
      type: 'nature',
      price: '$399',
      duration: '4 hours'
    },
    {
      id: 2,
      title: 'Tuscan Countryside Cooking Class',
      location: 'Florence, Italy',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=2032&auto=format&fit=crop',
      rating: 4.8,
      reviews: 521,
      type: 'culinary',
      price: '$129',
      duration: '6 hours'
    },
    {
      id: 3,
      title: 'Serengeti Safari Adventure',
      location: 'Tanzania',
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop',
      rating: 4.9,
      reviews: 286,
      type: 'adventure',
      price: '$899',
      duration: '3 days'
    },
    {
      id: 4,
      title: 'Ancient Mayan Tour',
      location: 'Tulum, Mexico',
      image: 'https://images.unsplash.com/photo-1623159734962-d3aae7f589d5?q=80&w=2070&auto=format&fit=crop',
      rating: 4.7,
      reviews: 412,
      type: 'cultural',
      price: '$89',
      duration: '5 hours'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero/Search Section */}
      <div className="relative bg-gradient-to-r from-blue-900 to-indigo-800 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-blue-900/70 mix-blend-multiply"></div>
          <img 
            src="https://images.unsplash.com/photo-1488085061387-422e29b40080?q=80&w=2031&auto=format&fit=crop" 
            alt="Travel background" 
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Explore the World with Triponic
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Discover amazing destinations, curated itineraries, and unique experiences
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-5 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Search className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="Where do you want to go?" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 border border-gray-300 rounded-lg px-4 py-3 focus-within:border-primary">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <input 
                    type="text" 
                    placeholder="When do you want to travel?" 
                    className="w-full bg-transparent border-none focus:outline-none text-gray-700"
                  />
                </div>
              </div>
              <button className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition whitespace-nowrap">
                Search
              </button>
            </div>
            
            <div className="flex flex-wrap gap-3 mt-4">
              <div className="text-sm text-gray-700 flex items-center">
                <span className="font-medium mr-2">Popular:</span>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                    Paris
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                    Bali
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                    Tokyo
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded-full hover:bg-gray-100 transition">
                    New York
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Featured Destinations */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              Discover Amazing Destinations
            </h2>
            <p className="text-gray-600">
              Explore trending and popular destinations around the world
            </p>
          </div>
          
          <div className="flex gap-2 mt-4 md:mt-0 bg-gray-100 p-1 rounded-lg">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'popular' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
              onClick={() => setActiveFilter('popular')}
            >
              Popular
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'trending' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
              onClick={() => setActiveFilter('trending')}
            >
              Trending
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'new' ? 'bg-white text-primary shadow-sm' : 'text-gray-600'}`}
              onClick={() => setActiveFilter('new')}
            >
              New
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map(destination => (
            <div key={destination.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition group">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={destination.image} 
                  alt={destination.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                {destination.featured && (
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                    Featured
                  </div>
                )}
                <button className="absolute top-4 right-4 w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                  <Heart className="w-4 h-4 text-rose-500" />
                </button>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center text-amber-500">
                    <Star className="w-4 h-4 fill-current mr-1" />
                    <span className="text-sm font-medium">{destination.rating}</span>
                    <span className="text-xs text-gray-500 ml-1">({destination.reviews} reviews)</span>
                  </div>
                  <div className="flex items-center text-gray-500 text-sm">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{destination.description}</p>
                <button 
                  className="text-primary font-medium text-sm flex items-center hover:underline"
                  onClick={() => setLocation('/itinerary/new')}
                >
                  Plan a trip
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-white text-primary font-medium py-3 px-8 rounded-full border border-primary hover:bg-primary/5 transition">
            View All Destinations
          </button>
        </div>
      </div>
      
      {/* Curated Itineraries */}
      <div className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
                Curated Itineraries
              </h2>
              <p className="text-gray-600">
                Pre-planned trips designed by travel experts for seamless experiences
              </p>
            </div>
            
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:text-primary transition">
                <Filter className="w-4 h-4" />
                <span className="text-sm font-medium">Filter</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm text-gray-700 hover:text-primary transition">
                <span className="text-sm font-medium">Sort by: Popular</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {curated.map(itinerary => (
              <div key={itinerary.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={itinerary.image} 
                    alt={itinerary.title} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                    <div className="flex items-center text-white">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{itinerary.days} days</span>
                    </div>
                  </div>
                  <button className="absolute top-4 right-4 w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                    <Bookmark className="w-4 h-4 text-primary" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2">{itinerary.title}</h3>
                  <div className="flex items-center text-gray-500 text-sm mb-3">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{itinerary.destinations.join(' • ')}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4">{itinerary.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="font-bold text-lg">{itinerary.price}</div>
                    <button 
                      className="bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary/90 text-sm transition"
                      onClick={() => setLocation('/itinerary/new')}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <button className="bg-white text-primary font-medium py-3 px-8 rounded-full border border-primary hover:bg-primary/5 transition">
              View All Itineraries
            </button>
          </div>
        </div>
      </div>
      
      {/* Experiences */}
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
              Unforgettable Experiences
            </h2>
            <p className="text-gray-600">
              Discover unique activities and adventures at your destination
            </p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto mt-4 md:mt-0">
            <button className="whitespace-nowrap px-4 py-2 bg-primary text-white rounded-full text-sm font-medium">
              All Experiences
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition">
              Adventure
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition">
              Culinary
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition">
              Cultural
            </button>
            <button className="whitespace-nowrap px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium hover:bg-gray-50 transition">
              Nature
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map(experience => (
            <div key={experience.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition">
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={experience.image} 
                  alt={experience.title} 
                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />
                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {experience.type.charAt(0).toUpperCase() + experience.type.slice(1)}
                </div>
                <button className="absolute top-4 right-4 w-8 h-8 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition">
                  <Heart className="w-4 h-4 text-gray-500 hover:text-rose-500" />
                </button>
              </div>
              <div className="p-4">
                <div className="flex items-center text-amber-500 mb-1">
                  <Star className="w-4 h-4 fill-current mr-1" />
                  <span className="text-sm font-medium">{experience.rating}</span>
                  <span className="text-xs text-gray-500 ml-1">({experience.reviews})</span>
                </div>
                <h3 className="font-bold mb-1 line-clamp-1">{experience.title}</h3>
                <div className="flex items-center text-gray-500 text-xs mb-3">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span>{experience.location}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-700">{experience.duration}</span>
                  </div>
                  <div className="font-bold text-primary">{experience.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-10">
          <button className="bg-white text-primary font-medium py-3 px-8 rounded-full border border-primary hover:bg-primary/5 transition">
            View All Experiences
          </button>
        </div>
      </div>
      
      {/* AI Recommendation CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-4">Let AI Plan Your Perfect Trip</h2>
              <p className="text-lg text-indigo-100 mb-6">
                Our AI assistant will create a personalized itinerary based on your travel preferences, interests, and budget. Just describe your dream trip and let our technology do the rest.
              </p>
              <button 
                className="bg-white text-indigo-700 font-bold py-3 px-8 rounded-full hover:bg-indigo-50 transition shadow-lg"
                onClick={() => setLocation('/')}
              >
                Start Planning Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
                <div className="text-gray-800 mb-6">
                  <h3 className="font-bold text-lg mb-3">Sample AI Generated Itinerary</h3>
                  <div className="space-y-3">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="text-sm font-medium mb-1">Day 1: Tokyo Exploration</div>
                      <div className="text-xs text-gray-600">Shibuya Crossing, Meiji Shrine, Harajuku Shopping</div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="text-sm font-medium mb-1">Day 2: Cultural Immersion</div>
                      <div className="text-xs text-gray-600">Sensoji Temple, Tokyo National Museum, Ueno Park</div>
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="text-sm font-medium mb-1">Day 3: Modern Tokyo</div>
                      <div className="text-xs text-gray-600">Tokyo Skytree, Akihabara District, Tokyo Bay Cruise</div>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-500 italic">
                  This is a sample itinerary generated by our AI travel planner. Your custom itinerary will be tailored to your specific preferences.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;