import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "TravelPal AI created the perfect Japan itinerary for our family. It balanced kid-friendly activities with cultural experiences that kept everyone engaged. The local food recommendations were outstanding!",
    name: "Sarah J.",
    location: "Family trip to Japan",
    image: "https://randomuser.me/api/portraits/women/32.jpg"
  },
  {
    id: 2,
    rating: 5,
    text: "As a solo traveler, safety was my main concern. TravelPal AI understood this and planned a wonderful European adventure with safe accommodations and neighborhoods while still finding authentic local experiences.",
    name: "Marcus T.",
    location: "Solo trip across Europe",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    id: 3,
    rating: 4.5,
    text: "We told the AI we wanted adventure and cultural immersion in Thailand, and it delivered beyond our expectations. The off-the-beaten-path suggestions gave us experiences we'd never have found on our own.",
    name: "Aisha & David",
    location: "Couple's adventure in Thailand",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-poppins mb-4">Traveler Stories</h2>
          <p className="text-medium max-w-2xl mx-auto">See how TravelPal AI has helped travelers create unforgettable experiences.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-sm">
              <div className="flex text-[#FFB400] mb-3">
                {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                  <Star key={i} fill="currentColor" size={18} />
                ))}
                {testimonial.rating % 1 > 0 && (
                  <div className="relative">
                    <Star fill="currentColor" fillOpacity={0.5} size={18} />
                    <div className="absolute top-0 left-0 overflow-hidden" style={{ width: '50%' }}>
                      <Star fill="currentColor" size={18} />
                    </div>
                  </div>
                )}
              </div>
              <p className="mb-4">"{testimonial.text}"</p>
              <div className="flex items-center">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name} 
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-medium">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
