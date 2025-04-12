import { useState } from 'react';
import { TravelPreference } from '@shared/schema';
import { cn } from '@/lib/utils';
import { apiRequest } from '@/lib/queryClient'; // ✅ Make sure this exists
import { useToast } from '@/hooks/use-toast';   // Optional: for error feedback

interface PreferenceCollectorProps {
  onComplete: (preferences: TravelPreference) => void;
  onChatStart?: () => void;
}

const PreferenceCollector = ({ onComplete, onChatStart }: PreferenceCollectorProps) => {
  const [preferences, setPreferences] = useState<Partial<TravelPreference>>({});
  const { toast } = useToast(); // Optional toast for error or success

  const updatePreference = (key: keyof TravelPreference, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const destinationOptions = [
    { value: 'beach', label: 'Beach' },
    { value: 'city', label: 'City' },
    { value: 'mountain', label: 'Mountain' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'adventure', label: 'Adventure' },
    { value: 'nature', label: 'Nature' }
  ];

  const handleSubmit = async () => {
    if (preferences.customDestination && preferences.destinationType) {
      try {
        const response = await apiRequest('POST', '/api/preferences', preferences);
        const data = await response.json();

        if (!response.ok || !data.id) {
          throw new Error('Failed to save preferences');
        }

        // Pass complete preference with ID to parent
        onComplete({ ...(preferences as TravelPreference), id: data.id });
      } catch (error: any) {
        console.error('Error saving preferences:', error);
        toast({
          title: 'Error',
          description: error?.message || 'Something went wrong while saving preferences.',
          variant: 'destructive'
        });
      }
    } else {
      toast({
        title: 'Missing Information',
        description: 'Please select a destination and destination type.',
        variant: 'destructive'
      });
    }
  };

  const renderDestinationQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">Where would you like to go?</h4>

      {/* Text input for specific destination */}
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

      {/* Destination type options */}
      <div className="flex flex-wrap gap-4">
        {destinationOptions.map(option => (
          <button
            key={option.value}
            type="button"
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

  return (
    <div className="preference-collector p-6">
      {renderDestinationQuestion()}

      <button
        className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary-dark"
        onClick={handleSubmit}
      >
        Continue
      </button>

      {onChatStart && (
        <button
          className="mt-4 w-full py-2 px-4 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition"
          onClick={onChatStart}
        >
          Start Chat
        </button>
      )}
    </div>
  );
};

export default PreferenceCollector;
