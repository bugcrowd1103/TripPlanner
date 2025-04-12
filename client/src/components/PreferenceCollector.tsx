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
    companions: 'couple'
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

  const handleSubmit = () => {
    if (preferences.customDestination && preferences.startDate && preferences.endDate) {
      onComplete(preferences as TravelPreference);
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
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
        <h3 className="text-2xl font-bold text-gray-800">Personalize</h3>
        <p className="text-gray-600">Tell us what makes your trip special</p>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Interests</label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g., Food, Museums, Hiking, Photography"
            className="w-full py-3 px-4 pl-10 rounded-lg border border-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            value={preferences.interests || ""}
            onChange={(e) => updatePreference("interests", e.target.value)}
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute left-3 top-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-sm font-medium mb-2 text-gray-700">Travel Companions</label>
        <div className="grid grid-cols-3 gap-3 mb-5">
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

      <div className="mb-5">
        <label className="block text-sm font-medium mb-1 text-gray-700">Additional Notes</label>
        <textarea
          placeholder="Any special requirements or preferences?"
          className="w-full py-3 px-4 rounded-lg border border-gray-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          value={preferences.additionalNotes || ""}
          onChange={(e) => updatePreference("additionalNotes", e.target.value)}
          rows={3}
        />
      </div>
    </motion.div>
  ];

  return (
    <div className="relative p-8 bg-white rounded-xl shadow-2xl transition-all duration-500 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 opacity-50 z-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDBMNTYgNTBMMjggMEwwIDUwTDI4IDEwMFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RkZDZmZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-10"></div>
      </div>

      {/* Progress indicator */}
      <div className="relative z-10 mb-8">
        <div className="flex justify-between items-center">
          {[0, 1, 2].map((stepNumber) => (
            <div key={stepNumber} className="flex flex-col items-center">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300",
                  step >= stepNumber
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-200 text-gray-600"
                )}
              >
                {stepNumber + 1}
              </div>
              <div className="text-xs mt-1 text-gray-600">
                {stepNumber === 0 ? "Destination" : stepNumber === 1 ? "Dates" : "Details"}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-2 h-1 w-full bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-indigo-600 transition-all duration-300"
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Form content */}
      <div className="relative z-10 min-h-[400px]">
        <AnimatePresence mode="wait">
          {formSteps[step]}
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <div className="relative z-10 flex justify-between mt-8">
        <button
          type="button"
          onClick={prevStep}
          className={cn(
            "px-6 py-3 rounded-lg font-medium transition-all duration-200",
            step === 0
              ? "opacity-0 pointer-events-none"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          )}
        >
          Back
        </button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={nextStep}
          className={cn(
            "px-6 py-3 rounded-lg font-medium text-white transition-all duration-200",
            step === 2
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              : "bg-indigo-600 hover:bg-indigo-700"
          )}
        >
          {step === 2 ? "Create My Trip" : "Continue"}
        </motion.button>
      </div>
    </div>
  );
};

export default PreferenceCollector;
