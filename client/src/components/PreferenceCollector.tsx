import { useState } from 'react';
import { Calendar, type CalendarProps } from "@/components/ui/calendar";
import { cn } from '@/lib/utils';
import { TravelPreference } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

// Define preference options
const destinationOptions = [
  { icon: "umbrella-beach", label: "Beach Paradise", value: "beach" },
  { icon: "city", label: "Urban Exploration", value: "city" },
  { icon: "mountain", label: "Mountain Retreat", value: "mountains" },
  { icon: "landmark", label: "Cultural Journey", value: "culture" },
  { icon: "hiking", label: "Adventure", value: "adventure" },
  { icon: "tree", label: "Countryside", value: "countryside" },
];

const durationOptions = [
  { label: "Weekend Trip", description: "2-3 days", value: "weekend" },
  { label: "Short Vacation", description: "4-7 days", value: "short" },
  { label: "Standard Holiday", description: "8-14 days", value: "standard" },
  { label: "Extended Journey", description: "14+ days", value: "long" },
];

const budgetOptions = [
  { label: "Budget-Friendly", description: "Economical options", value: "budget" },
  { label: "Mid-Range", description: "Balanced quality & value", value: "midrange" },
  { label: "Luxury Experience", description: "Premium options", value: "luxury" },
];

const paceOptions = [
  { label: "Relaxed", description: "Slow-paced, plenty of downtime", value: "relaxed" },
  { label: "Moderate", description: "Balanced activity & relaxation", value: "moderate" },
  { label: "Active", description: "Action-packed, fully scheduled", value: "active" },
];

const companionOptions = [
  { icon: "user", label: "Solo Traveler", value: "solo" },
  { icon: "heart", label: "Couple", value: "couple" },
  { icon: "users", label: "Family", value: "family" },
  { icon: "user-friends", label: "Friends", value: "friends" },
  { icon: "users", label: "Group", value: "group" },
];

interface PreferenceCollectorProps {
  onComplete: (preferences: TravelPreference) => void;
  onChatStart: () => void;
}

const PreferenceCollector = ({ onComplete, onChatStart }: PreferenceCollectorProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [preferences, setPreferences] = useState<Partial<TravelPreference>>({
    userId: 1,
    destinationType: "",
    customDestination: "",
    duration: "",
    startDate: "",
    endDate: "",
    budget: "",
    interests: "",
    pace: "",
    companions: "",
    activities: "",
    additionalNotes: ""
  });

  const [naturalLanguageInput, setNaturalLanguageInput] = useState("");
  const { toast } = useToast();

  const updatePreference = (field: keyof TravelPreference, value: string) => {
    setPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion === 1 && !preferences.destinationType && !preferences.customDestination) {
      toast({
        title: "Please select a destination type or enter a custom destination",
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestion === 2 && !preferences.duration) {
      toast({
        title: "Please select a trip duration",
        variant: "destructive"
      });
      return;
    }
    
    if (currentQuestion < 5) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit preferences
      savePreferences();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const savePreferences = async () => {
    try {
      const response = await apiRequest("POST", "/api/preferences", preferences);
      if (response.ok) {
        const savedPreference = await response.json();
        onComplete(savedPreference);
      } else {
        throw new Error("Failed to save preferences");
      }
    } catch (error) {
      toast({
        title: "Error saving preferences",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const processNaturalLanguageInput = async () => {
    if (!naturalLanguageInput) return;
    
    try {
      toast({
        title: "Processing your description...",
      });
      
      // Call the backend API to process the natural language input
      const response = await apiRequest('POST', '/api/process-natural-language', {
        input: naturalLanguageInput
      });
      
      if (!response.ok) {
        throw new Error('Failed to process natural language input');
      }
      
      // Extract the structured preferences from the AI
      const extractedPreferences = await response.json();
      
      // Update our preference state with the extracted values
      Object.entries(extractedPreferences).forEach(([key, value]) => {
        if (value && key in preferences) {
          updatePreference(key as keyof TravelPreference, value as string);
        }
      });
      
      // Set the custom destination if a specific one was extracted
      if (extractedPreferences.customDestination) {
        updatePreference("customDestination", extractedPreferences.customDestination);
      }
      
      setNaturalLanguageInput("");
      
      toast({
        title: "Description processed successfully",
        description: "We've extracted your preferences from your description."
      });
      
      // Move to the next question
      handleNextQuestion();
    } catch (error) {
      toast({
        title: "Error processing your input",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    }
  };

  const renderDestinationQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">Where would you like to go?</h4>
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
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-2xl text-primary">
                {option.icon === "umbrella-beach" && (
                  <path d="M4 20L20 20" />
                )}
                {option.icon === "city" && (
                  <>
                    <path d="M9 20h6" />
                    <path d="M5 20h.01" />
                    <path d="M19 20h.01" />
                    <path d="M5 16h.01" />
                    <path d="M19 16h.01" />
                    <path d="M2 12h20" />
                    <path d="M19 12v8" />
                    <path d="M5 12v8" />
                    <path d="M12 2v6" />
                    <path d="M19 6v6" />
                    <path d="M5 6v6" />
                  </>
                )}
                {option.icon === "mountain" && (
                  <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
                )}
                {option.icon === "landmark" && (
                  <>
                    <path d="M3 22h18" />
                    <path d="M6 18v4" />
                    <path d="M10 18v4" />
                    <path d="M14 18v4" />
                    <path d="M18 18v4" />
                    <path d="M12 2v8" />
                    <path d="m4.93 10.93 14.14.02" />
                    <path d="M20 10 12 2 4 10" />
                  </>
                )}
                {option.icon === "hiking" && (
                  <>
                    <path d="m13 4-3 12h2l3-12" />
                    <path d="m2 14 10-10 10 10" />
                  </>
                )}
                {option.icon === "tree" && (
                  <path d="M12 22v-7l-5-2.5 5-5-5-5h12l-5 5 5 5-5 2.5v7" />
                )}
              </svg>
            </div>
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Or tell us in your own words..."
            className="w-full py-3 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={naturalLanguageInput}
            onChange={(e) => setNaturalLanguageInput(e.target.value)}
          />
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white p-2 rounded-full disabled:opacity-50"
            onClick={processNaturalLanguageInput}
            disabled={!naturalLanguageInput}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const renderDurationQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">How long are you planning to travel?</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {durationOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.duration === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("duration", option.value)}
          >
            <span className="font-medium">{option.label}</span>
            <span className="block text-sm text-medium mt-1">{option.description}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium mb-2">Start date (optional)</label>
            <input 
              type="date" 
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={preferences.startDate || ""}
              onChange={(e) => updatePreference("startDate", e.target.value)}
            />
          </div>
          <div className="w-full sm:w-1/2">
            <label className="block text-sm font-medium mb-2">Return date</label>
            <input 
              type="date" 
              className="w-full py-3 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={preferences.endDate || ""}
              onChange={(e) => updatePreference("endDate", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderBudgetQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">What's your budget for this trip?</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {budgetOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.budget === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("budget", option.value)}
          >
            <span className="font-medium">{option.label}</span>
            <span className="block text-sm text-medium mt-1">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPaceQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">What pace do you prefer for your trip?</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {paceOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.pace === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("pace", option.value)}
          >
            <span className="font-medium">{option.label}</span>
            <span className="block text-sm text-medium mt-1">{option.description}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCompanionsQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">Who will you be traveling with?</h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {companionOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.companions === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("companions", option.value)}
          >
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-2xl text-primary">
                {option.icon === "user" && (
                  <>
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </>
                )}
                {option.icon === "heart" && (
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                )}
                {option.icon === "users" && (
                  <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                )}
                {option.icon === "user-friends" && (
                  <>
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                )}
              </svg>
            </div>
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  );

  const renderCurrentQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return renderDestinationQuestion();
      case 2:
        return renderDurationQuestion();
      case 3:
        return renderBudgetQuestion();
      case 4:
        return renderPaceQuestion();
      case 5:
        return renderCompanionsQuestion();
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-light rounded-2xl shadow-sm p-8">
      <h3 className="text-2xl font-bold font-poppins mb-6">Tell us about your dream trip</h3>
      
      {renderCurrentQuestion()}
      
      <div className="mt-8 flex justify-between">
        {currentQuestion > 1 ? (
          <button 
            className="text-medium py-2 px-6 rounded-full font-medium hover:text-primary transition"
            onClick={handlePreviousQuestion}
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        
        {currentQuestion < 5 ? (
          <button 
            className="bg-primary text-white py-2 px-6 rounded-full font-medium hover:bg-opacity-90 transition"
            onClick={handleNextQuestion}
          >
            Next
          </button>
        ) : (
          <div className="flex gap-4">
            <button 
              className="border border-primary text-primary py-2 px-6 rounded-full font-medium hover:bg-gray-50 transition"
              onClick={onChatStart}
            >
              Refine with Chat
            </button>
            <button 
              className="bg-primary text-white py-2 px-6 rounded-full font-medium hover:bg-opacity-90 transition"
              onClick={handleNextQuestion}
            >
              Generate Itinerary
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PreferenceCollector;
