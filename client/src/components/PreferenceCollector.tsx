
import { useState } from 'react';
import { TravelPreference } from '@shared/schema';
import { cn } from '@/lib/utils';

interface PreferenceCollectorProps {
  onComplete: (preferences: TravelPreference) => void;
}

const PreferenceCollector = ({ onComplete }: PreferenceCollectorProps) => {
  const [preferences, setPreferences] = useState<Partial<TravelPreference>>({});

  const updatePreference = (key: keyof TravelPreference, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const destinationOptions = [
    { value: 'beach', label: 'Beach', icon: 'umbrella-beach' },
    { value: 'city', label: 'City', icon: 'city' },
    { value: 'mountain', label: 'Mountain', icon: 'mountain' },
    { value: 'cultural', label: 'Cultural', icon: 'landmark' },
    { value: 'adventure', label: 'Adventure', icon: 'hiking' },
    { value: 'nature', label: 'Nature', icon: 'tree' }
  ];

  const renderDestinationQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">Where would you like to go?</h4>
      
      {/* Specific destination input */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Enter your destination</label>
        <input 
          type="text" 
          placeholder="e.g., Paris, Tokyo, New York" 
          className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-4"
          value={preferences.customDestination || ""}
          onChange={(e) => updatePreference("customDestination", e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {destinationOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn flex-1 min-w-[140px] border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.destinationType === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("destinationType", option.value)}
          >
            <div className="flex justify-center mb-3">
              <span className="text-2xl text-primary">{option.label}</span>
            </div>
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const handleSubmit = () => {
    if (preferences.customDestination && preferences.destinationType) {
      onComplete(preferences as TravelPreference);
    }
  };

  return (
    <div className="preference-collector p-6">
      {renderDestinationQuestion()}
      <button 
        className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark"
        onClick={handleSubmit}
      >
        Continue
      </button>
    </div>
  );
};

export default PreferenceCollector;
