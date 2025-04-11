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

const mealOptions = [
  { label: "Local Cuisine", description: "Authentic local dishes", value: "local" },
  { label: "Fine Dining", description: "Upscale restaurants", value: "fine-dining" },
  { label: "Street Food", description: "Casual & authentic", value: "street-food" },
  { label: "International", description: "Familiar options", value: "international" },
];

const dietaryOptions = [
  { label: "No Restrictions", value: "none" },
  { label: "Vegetarian", value: "vegetarian" },
  { label: "Vegan", value: "vegan" },
  { label: "Gluten-Free", value: "gluten-free" },
  { label: "Dairy-Free", value: "dairy-free" },
  { label: "Halal", value: "halal" },
  { label: "Kosher", value: "kosher" },
];

const accommodationOptions = [
  { label: "Hotel", icon: "building", value: "hotel" },
  { label: "Resort", icon: "umbrella-beach", value: "resort" },
  { label: "Vacation Rental", icon: "home", value: "vacation-rental" },
  { label: "Boutique", icon: "gem", value: "boutique" },
  { label: "Hostel", icon: "users", value: "hostel" },
  { label: "Camping", icon: "campground", value: "camping" },
];

const transportationOptions = [
  { label: "Rental Car", icon: "car", value: "rental-car" },
  { label: "Public Transit", icon: "bus", value: "public-transit" },
  { label: "Walking/Biking", icon: "walking", value: "walking-biking" },
  { label: "Guided Tours", icon: "map", value: "guided-tours" },
  { label: "Ride Services", icon: "taxi", value: "ride-services" },
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
    mealPreferences: "",
    dietaryRestrictions: "",
    accommodation: "",
    transportationMode: "",
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
    
    if (currentQuestion < 8) {
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
  
  const renderMealPreferencesQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">What type of dining experiences do you prefer?</h4>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {mealOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.mealPreferences === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("mealPreferences", option.value)}
          >
            <span className="font-medium">{option.label}</span>
            <span className="block text-sm text-medium mt-1">{option.description}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        <h5 className="text-lg font-medium mb-2">Any dietary restrictions?</h5>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {dietaryOptions.map(option => (
            <button 
              key={option.value}
              className={cn(
                "border rounded-lg py-2 px-3 text-center hover:border-primary hover:bg-white hover:shadow-sm transition text-sm",
                preferences.dietaryRestrictions === option.value 
                  ? "border-primary bg-white shadow-sm" 
                  : "border-gray-300"
              )}
              onClick={() => updatePreference("dietaryRestrictions", option.value)}
            >
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderAccommodationQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">What type of accommodation do you prefer?</h4>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {accommodationOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.accommodation === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("accommodation", option.value)}
          >
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-2xl text-primary">
                {option.icon === "building" && (
                  <>
                    <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
                    <path d="M9 22v-4h6v4" />
                    <path d="M8 6h.01" />
                    <path d="M16 6h.01" />
                    <path d="M8 10h.01" />
                    <path d="M16 10h.01" />
                    <path d="M8 14h.01" />
                    <path d="M16 14h.01" />
                  </>
                )}
                {option.icon === "umbrella-beach" && (
                  <>
                    <path d="M20.2 17.2a4 4 0 0 0-5.6-5.6M18 19a4 4 0 0 0-6-6M18 22v-3M10 18a4 4 0 0 1 4-4h3" />
                    <circle cx="12" cy="12" r="10" />
                  </>
                )}
                {option.icon === "home" && (
                  <>
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </>
                )}
                {option.icon === "gem" && (
                  <>
                    <polygon points="6 3 18 3 22 9 12 22 2 9" />
                    <path d="m12 22 4-13-10-6" />
                    <path d="M12 22 8 9l10-6" />
                    <path d="M2 9h20" />
                  </>
                )}
                {option.icon === "users" && (
                  <>
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </>
                )}
                {option.icon === "campground" && (
                  <>
                    <path d="M4 20V10c0-4.4 3.6-8 8-8s8 3.6 8 8v10" />
                    <path d="M8 16H4" />
                    <path d="M12 10h.01" />
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
  
  const renderTransportationQuestion = () => (
    <div className="mb-10">
      <h4 className="text-xl font-medium mb-4">How would you like to get around?</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {transportationOptions.map(option => (
          <button 
            key={option.value}
            className={cn(
              "preference-btn border rounded-xl p-4 text-center hover:border-primary hover:bg-white hover:shadow-md transition",
              preferences.transportationMode === option.value 
                ? "border-primary bg-white shadow-md" 
                : "border-gray-300"
            )}
            onClick={() => updatePreference("transportationMode", option.value)}
          >
            <div className="flex justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-2xl text-primary">
                {option.icon === "car" && (
                  <>
                    <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
                    <circle cx="6.5" cy="16.5" r="2.5" />
                    <circle cx="16.5" cy="16.5" r="2.5" />
                  </>
                )}
                {option.icon === "bus" && (
                  <>
                    <path d="M8 6v12m8-12v12" />
                    <rect width="16" height="16" x="4" y="5" rx="2" />
                    <path d="M4 13h16" />
                    <path d="M4 5h16" />
                  </>
                )}
                {option.icon === "walking" && (
                  <>
                    <path d="m8 16-1 4m0-11a1 1 0 1 0 2 0 1 1 0 1 0-2 0m5 1-1.5 9 3.5 3" />
                    <path d="M7 12a1 1 0 1 0 2 0 1 1 0 1 0-2 0m8-3-3.5 3-1.5 8" />
                  </>
                )}
                {option.icon === "map" && (
                  <>
                    <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                    <line x1="9" x2="9" y1="3" y2="18" />
                    <line x1="15" x2="15" y1="6" y2="21" />
                  </>
                )}
                {option.icon === "taxi" && (
                  <>
                    <path d="M12 18H8a2 2 0 0 1-2-2v-1h12v1a2 2 0 0 1-2 2h-4ZM10 6h4m-4.5 3 .5-3h4l.5 3" />
                    <path d="M5 10h14a1 1 0 0 1 1 1v1H4v-1a1 1 0 0 1 1-1Z" />
                    <path d="M5 18v2" />
                    <path d="M19 18v2" />
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
      case 6:
        return renderMealPreferencesQuestion();
      case 7:
        return renderAccommodationQuestion();
      case 8:
        return renderTransportationQuestion();
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
