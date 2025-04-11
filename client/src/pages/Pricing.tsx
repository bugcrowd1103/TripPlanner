import { useState, useEffect } from 'react';
import { Check, X, Globe } from 'lucide-react';
import { useLocation } from 'wouter';

const Pricing = () => {
  const [, setLocation] = useLocation();
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [userRegion, setUserRegion] = useState('global');
  
  // Pricing data structured by region
  const pricingData = {
    global: {
      currency: 'USD',
      symbol: '$',
      basic: 0,
      premium: 29,
      pro: 49,
      exchange: 1
    },
    north_america: {
      currency: 'USD',
      symbol: '$',
      basic: 0,
      premium: 29,
      pro: 49,
      exchange: 1
    },
    south_america: {
      currency: 'USD',
      symbol: '$',
      basic: 0,
      premium: 25,
      pro: 42,
      exchange: 1
    },
    europe: {
      currency: 'EUR',
      symbol: '€',
      basic: 0,
      premium: 28,
      pro: 47,
      exchange: 0.93
    },
    asia: {
      currency: 'INR',
      symbol: '₹',
      basic: 0,
      premium: 2000,
      pro: 3999,
      exchange: 83.2
    },
    australia: {
      currency: 'AUD',
      symbol: 'A$',
      basic: 0,
      premium: 42,
      pro: 69,
      exchange: 1.53
    },
    africa: {
      currency: 'USD',
      symbol: '$',
      basic: 0,
      premium: 20,
      pro: 35,
      exchange: 1
    }
  };
  
  // Features list
  const features = {
    basic: [
      'Basic itinerary planning',
      'Limited destination search',
      'Community recommendations',
      'Basic weather information',
      'Web access only'
    ],
    premium: [
      'Everything in Basic',
      'Unlimited AI-powered itineraries',
      'Personalized recommendations',
      'Real-time updates and alerts',
      'Mobile app access',
      'Offline downloads',
      'Priority customer support'
    ],
    pro: [
      'Everything in Premium',
      'VIP concierge service',
      'Exclusive deals and discounts',
      'Flight and hotel price tracking',
      'Last-minute booking assistance',
      'Family sharing up to 5 users',
      'Augmented Reality experiences',
      '24/7 emergency travel support'
    ]
  };
  
  // Attempt to detect user's region (simplified version)
  useEffect(() => {
    // In a real app, this would be more sophisticated with geolocation or IP-based detection
    const detectRegion = async () => {
      try {
        // Simple time-based detection for demo purposes
        const now = new Date();
        const hour = now.getUTCHours();
        
        // Very simplified region detection based on time
        if (hour >= 1 && hour < 8) {
          setUserRegion('asia');
        } else if (hour >= 8 && hour < 16) {
          setUserRegion('europe');
        } else {
          setUserRegion('north_america');
        }
        
        setSelectedRegion(userRegion);
      } catch (error) {
        console.error('Failed to detect region:', error);
      }
    };
    
    detectRegion();
  }, []);
  
  // Get pricing for currently selected region
  const pricing = pricingData[selectedRegion as keyof typeof pricingData];
  
  // Available regions for dropdown
  const regions = [
    { value: 'global', label: 'Global (USD)' },
    { value: 'north_america', label: 'North America (USD)' },
    { value: 'south_america', label: 'South America (USD)' },
    { value: 'europe', label: 'Europe (EUR)' },
    { value: 'asia', label: 'Asia (INR)' },
    { value: 'australia', label: 'Australia (AUD)' },
    { value: 'africa', label: 'Africa (USD)' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-indigo-600 py-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-grid-white/20 bg-grid-white [mask-image:linear-gradient(to_bottom,white,transparent)]" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Choose the plan that's right for your travel needs
            </p>
            
            <div className="flex justify-center gap-4 mt-8 max-w-md mx-auto">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-2 w-full">
                <div className="flex items-center w-full">
                  <Globe className="w-5 h-5 mr-2 ml-2" />
                  <select 
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full bg-transparent border-none focus:outline-none text-white"
                  >
                    {regions.map(region => (
                      <option key={region.value} value={region.value} className="text-gray-800">
                        {region.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Free Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold mb-1">Basic</h3>
                <p className="text-gray-500 mb-4">Essential travel planning</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{pricing.symbol}0</span>
                  <span className="text-gray-500 ml-1">/year</span>
                </div>
                <p className="text-gray-500 text-sm mt-2">Free forever</p>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {features.basic.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="w-full mt-6 py-3 px-6 rounded-lg bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition"
                  onClick={() => setLocation('/')}
                >
                  Get Started
                </button>
              </div>
            </div>
            
            {/* Premium Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden transform md:-translate-y-4 hover:shadow-lg transition border-2 border-primary">
              <div className="bg-primary text-white text-center py-2 text-sm font-bold">
                MOST POPULAR
              </div>
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold mb-1">Premium</h3>
                <p className="text-gray-500 mb-4">Enhanced travel experience</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{pricing.symbol}{pricing.premium}</span>
                  <span className="text-gray-500 ml-1">/year</span>
                </div>
                {pricing.currency !== 'USD' && (
                  <p className="text-gray-500 text-sm mt-2">≈ ${Math.round(pricing.premium / pricing.exchange)} USD</p>
                )}
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {features.premium.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="w-full mt-6 py-3 px-6 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition"
                  onClick={() => setLocation('/')}
                >
                  Subscribe Now
                </button>
              </div>
            </div>
            
            {/* Pro Plan */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-xl font-bold mb-1">Pro</h3>
                <p className="text-gray-500 mb-4">Ultimate travel luxury</p>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold">{pricing.symbol}{pricing.pro}</span>
                  <span className="text-gray-500 ml-1">/year</span>
                </div>
                {pricing.currency !== 'USD' && (
                  <p className="text-gray-500 text-sm mt-2">≈ ${Math.round(pricing.pro / pricing.exchange)} USD</p>
                )}
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {features.pro.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className="w-full mt-6 py-3 px-6 rounded-lg bg-gray-800 text-white font-medium hover:bg-gray-700 transition"
                  onClick={() => setLocation('/')}
                >
                  Go Pro
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-2">Can I change my plan later?</h3>
              <p className="text-gray-600">
                Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes to your subscription will take effect at the end of your current billing cycle.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-2">Are there any hidden fees?</h3>
              <p className="text-gray-600">
                No, the price you see is the price you pay. We believe in transparent pricing without any hidden fees or charges.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-2">Does the plan auto-renew?</h3>
              <p className="text-gray-600">
                Yes, all paid plans auto-renew to ensure uninterrupted service. You'll receive a reminder email 7 days before your renewal date, and you can cancel at any time.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="font-bold text-lg mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600">
                We offer a 14-day money-back guarantee for new subscribers. If you're not satisfied with our service within the first 14 days, contact our support team for a full refund.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-primary to-indigo-600 rounded-2xl overflow-hidden shadow-lg">
          <div className="p-8 md:p-12 text-white">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Start Your Travel Journey Today</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who are already planning amazing trips with Triponic
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="bg-white text-primary font-bold py-3 px-8 rounded-lg hover:bg-blue-50 transition shadow-lg"
                  onClick={() => setLocation('/')}
                >
                  Try For Free
                </button>
                <button 
                  className="bg-white/20 backdrop-blur-sm text-white font-bold py-3 px-8 rounded-lg hover:bg-white/30 transition"
                  onClick={() => setLocation('/')}
                >
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;