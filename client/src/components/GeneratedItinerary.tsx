import { useState } from 'react';
import { Link } from 'wouter';
import { GeneratedItinerary as ItineraryType } from '@/lib/openai';
import { Heart, Check, ChevronDown, ChevronRight } from 'lucide-react';

interface GeneratedItineraryProps {
  itinerary: ItineraryType;
}

const GeneratedItinerary = ({ itinerary }: GeneratedItineraryProps) => {
  const [expandedDays, setExpandedDays] = useState<number[]>([1, 2]);
  const [showAllDays, setShowAllDays] = useState(false);

  const toggleDay = (dayNumber: number) => {
    if (expandedDays.includes(dayNumber)) {
      setExpandedDays(expandedDays.filter(day => day !== dayNumber));
    } else {
      setExpandedDays([...expandedDays, dayNumber]);
    }
  };

  const toggleAllDays = () => {
    setShowAllDays(!showAllDays);
    
    if (!showAllDays) {
      // Expand all days
      setExpandedDays(itinerary.days.map(day => day.dayNumber));
    } else {
      // Collapse to just first two days
      setExpandedDays([1, 2]);
    }
  };

  const formatDates = () => {
    if (itinerary.dates) {
      return itinerary.dates;
    }
    return itinerary.duration;
  };

  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block bg-green-100 text-success px-4 py-2 rounded-full text-sm font-medium mb-4">
            Your personalized travel plan is ready!
          </div>
          <h2 className="text-3xl font-bold font-poppins mb-2">{itinerary.title}</h2>
          <p className="text-medium">{itinerary.destination} | {itinerary.duration} | {formatDates()}</p>
        </div>
        
        <div className="max-w-5xl mx-auto">
          {/* Trip Overview */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
            <h3 className="text-xl font-bold font-poppins mb-4">Trip Overview</h3>
            <p className="text-medium mb-6">{itinerary.summary}</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="border border-gray-200 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <h4 className="font-medium mb-1">Budget</h4>
                <p className="text-medium">{itinerary.tripOverview.budget}</p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M19 15l-2 8-2-8" />
                    <path d="M5 15l-2 8-2-8" />
                    <path d="M12 4l-3 16" />
                    <path d="M16 7h-5a2 2 0 0 0-2 2v0a2 2 0 0 0 2 2h2a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2h-5" />
                  </svg>
                </div>
                <h4 className="font-medium mb-1">Pace</h4>
                <p className="text-medium">{itinerary.tripOverview.pace}</p>
              </div>
              
              <div className="border border-gray-200 rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <h4 className="font-medium mb-1">Travel Style</h4>
                <p className="text-medium">{itinerary.tripOverview.travelStyle}</p>
              </div>
            </div>
          </div>
          
          {/* Daily Itinerary */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
            <h3 className="text-xl font-bold font-poppins mb-6">Daily Itinerary</h3>
            
            {itinerary.days.map((day, index) => (
              // Only show first 2 days by default, or all if showAllDays is true
              ((showAllDays || index < 2) && (
                <div key={day.dayNumber} className="mb-8 border-b border-gray-100 pb-8">
                  <div className="flex items-center mb-4 cursor-pointer" onClick={() => toggleDay(day.dayNumber)}>
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center font-bold mr-3">
                      {day.dayNumber}
                    </div>
                    <h4 className="text-lg font-bold">{day.title}</h4>
                    <div className="ml-auto">
                      {expandedDays.includes(day.dayNumber) ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                    </div>
                  </div>
                  
                  {expandedDays.includes(day.dayNumber) && (
                    <div className="pl-14">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                        <div className="col-span-2">
                          <div className="mb-4">
                            <h5 className="font-medium mb-2">Morning</h5>
                            <div className="flex">
                              <div className="w-1 bg-primary rounded-full mr-3"></div>
                              <div>
                                <p className="mb-1">{day.morning.activity}</p>
                                <p className="text-sm text-medium mb-2">{day.morning.description}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mb-4">
                            <h5 className="font-medium mb-2">Afternoon</h5>
                            <div className="flex">
                              <div className="w-1 bg-primary rounded-full mr-3"></div>
                              <div>
                                <p className="mb-1">{day.afternoon.activity}</p>
                                <p className="text-sm text-medium mb-2">{day.afternoon.description}</p>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium mb-2">Evening</h5>
                            <div className="flex">
                              <div className="w-1 bg-primary rounded-full mr-3"></div>
                              <div>
                                <p className="mb-1">{day.evening.activity}</p>
                                <p className="text-sm text-medium">{day.evening.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          {day.image && (
                            <>
                              <img 
                                src={day.image} 
                                alt={day.title} 
                                className="rounded-xl w-full h-48 object-cover mb-2"
                              />
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-medium">{day.title}</span>
                                <button className="text-primary">
                                  <Heart size={18} />
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      
                      {day.travelTips && day.travelTips.length > 0 && (
                        <div className="bg-light rounded-xl p-4 mt-4">
                          <h5 className="font-medium mb-2">Travel Tips</h5>
                          <ul className="text-sm text-medium space-y-2">
                            {day.travelTips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="flex items-start">
                                <Check className="text-success mt-1 mr-2" size={16} />
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ))}
            
            {itinerary.days.length > 2 && (
              <button 
                className="text-primary font-medium flex items-center mx-auto hover:underline"
                onClick={toggleAllDays}
              >
                {showAllDays ? 'Show less' : `See full ${itinerary.days.length}-day itinerary`} 
                <ChevronDown className="ml-2" />
              </button>
            )}
          </div>
          
          {/* Accommodation Suggestions */}
          <div className="bg-white rounded-2xl shadow-sm p-6 mb-10">
            <h3 className="text-xl font-bold font-poppins mb-6">Recommended Accommodations</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {itinerary.accommodations.map((accommodation, index) => (
                <div key={index} className="border border-gray-200 rounded-xl overflow-hidden">
                  {accommodation.image && (
                    <div className="relative">
                      <img 
                        src={accommodation.image}
                        alt={accommodation.name} 
                        className="w-full h-48 object-cover"
                      />
                      {index === 1 && (
                        <div className="absolute top-2 left-2 bg-[#FFB400] text-white text-xs font-bold px-2 py-1 rounded">
                          Best Value
                        </div>
                      )}
                    </div>
                  )}
                  <div className="p-4">
                    <h4 className="font-bold mb-1">{accommodation.name}</h4>
                    <div className="flex items-center mb-2">
                      <div className="flex text-[#FFB400]">
                        {[...Array(Math.floor(accommodation.rating))].map((_, i) => (
                          <svg key={i} xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                        ))}
                        {accommodation.rating % 1 > 0 && (
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fillOpacity="0.5" />
                            <path d="M12 2L15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 12 2" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs text-medium ml-1">{accommodation.type}</span>
                    </div>
                    <p className="text-sm text-medium mb-3">{accommodation.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{accommodation.priceRange}</span>
                      <button className="text-primary text-sm font-medium hover:underline">View Deal</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-10">
            <button className="bg-primary text-white py-3 px-8 rounded-full font-medium hover:bg-opacity-90 transition">
              Save Itinerary
            </button>
            <button className="bg-white text-primary border border-primary py-3 px-8 rounded-full font-medium hover:bg-light transition">
              Modify Trip
            </button>
            <button className="bg-[#00A699] text-white py-3 px-8 rounded-full font-medium hover:bg-opacity-90 transition">
              Get Booking Assistance
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneratedItinerary;
