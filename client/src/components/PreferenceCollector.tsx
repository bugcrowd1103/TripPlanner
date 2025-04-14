import { useState, useEffect } from 'react';
import { TravelPreference, preferenceTypes } from '@shared/schema';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface PreferenceCollectorProps {
  onComplete: (preferences: TravelPreference) => void;
}

const PreferenceCollector = ({ onComplete }: PreferenceCollectorProps) => {
  const [step, setStep] = useState(0);
  const [preferences, setPreferences] = useState<Partial<TravelPreference>>({
    customDestination: '',
    startDate: '',
    endDate: '',
    interests: '',
    budget: 'midrange',
    pace: 'moderate',
    companions: 'couple',
  });
  const [destinationImage, setDestinationImage] = useState('');

  // Update destination image when destination changes
  useEffect(() => {
    if (preferences.customDestination) {
      // This would ideally be replaced with a real image API
      const destinations: Record<string, string> = {
        'paris': 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
        'tokyo': 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
        'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9',
        'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5',
        'bali': 'https://images.unsplash.com/photo-1537996194471-e657df975ab4',
        'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad',
        'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9',
      };

      const destination = preferences.customDestination.toLowerCase();
      const foundDestination = Object.keys(destinations).find(key => destination.includes(key));

      if (foundDestination) {
        setDestinationImage(destinations[foundDestination]);
      } else {
        setDestinationImage('https://images.unsplash.com/photo-1488646953014-85cb44e25828');
      }
    }
  }, [preferences.customDestination]);

  const updatePreference = (key: keyof TravelPreference, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    if (preferences.customDestination && preferences.startDate && preferences.endDate) {
      try {
        // Save the preference to the backend first
        const response = await fetch('/api/preferences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...preferences,
            userId: 1, // Default user ID
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to save preferences');
        }

        // Get the saved preference with the ID assigned by the backend
        const savedPreference = await response.json();
        onComplete(savedPreference as TravelPreference);
      } catch (error) {
        console.error('Error saving preferences:', error);
        // You could add error handling UI here
      }
    }
  };

  const formSteps = [
    // Step 1: Destination
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Where to?</h3>
        <p className="text-gray-600">Let's start with your dream destination</p>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Destination</label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g., Paris, Tokyo, Bali"
            className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={preferences.customDestination || ""}
            onChange={(e) => updatePreference("customDestination", e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
      </div>

      {destinationImage && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-lg overflow-hidden shadow-lg mb-5 h-48"
        >
          <img
            src={destinationImage}
            alt={preferences.customDestination || "Destination"}
            className="w-full h-full object-cover"
          />
        </motion.div>
      )}

      <div className="grid grid-cols-3 gap-3 mb-5">
        {preferenceTypes.destinationType.slice(0, 6).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => updatePreference("destinationType", type)}
            className={cn(
              "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
              preferences.destinationType === type
                ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500"
                : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>
    </motion.div>,

    // Step 2: Dates and Budget
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">When & How?</h3>
        <p className="text-gray-600">Let's plan your perfect trip timing</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Start Date</label>
          <div className="relative">
            <input
              type="date"
              className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={preferences.startDate || ""}
              onChange={(e) => updatePreference("startDate", e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">End Date</label>
          <div className="relative">
            <input
              type="date"
              className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              value={preferences.endDate || ""}
              onChange={(e) => updatePreference("endDate", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">Budget</label>
        <div className="grid grid-cols-3 gap-3">
          {preferenceTypes.budget.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updatePreference("budget", type)}
              className={cn(
                "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                preferences.budget === type
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500"
                  : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">Travel Pace</label>
        <div className="grid grid-cols-3 gap-3">
          {preferenceTypes.pace.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updatePreference("pace", type)}
              className={cn(
                "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                preferences.pace === type
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500"
                  : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>,

    // Step 3: Interests and Companions
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-800">Who’s Coming?</h3>
        <p className="text-gray-600">Let us know about your travel companions</p>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">Interests</label>
        <div className="grid grid-cols-3 gap-3">
          {preferenceTypes.destinationType?.map((interest) => (
            <button
              key={interest}
              type="button"
              onClick={() => updatePreference("interests", interest)}
              className={cn(
                "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                preferences.interests === interest
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500"
                  : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
              )}
            >
              {interest.charAt(0).toUpperCase() + interest.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">Companions</label>
        <div className="grid grid-cols-3 gap-3">
          {preferenceTypes.travelCompanions.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => updatePreference("companions", type)}
              className={cn(
                "py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                preferences.companions === type
                  ? "bg-indigo-100 text-indigo-700 border-2 border-indigo-500"
                  : "bg-gray-100 text-gray-700 border-2 border-transparent hover:bg-gray-200"
              )}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </motion.div>,
  ];

  return (
    <div className="p-5">
      <AnimatePresence>{formSteps[step]}</AnimatePresence>
      <div className="flex justify-between mt-6">
        <button
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg"
          onClick={prevStep}
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          className="bg-indigo-600 text-white py-2 px-4 rounded-lg"
          onClick={nextStep}
        >
          {step === 2 ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default PreferenceCollector;
