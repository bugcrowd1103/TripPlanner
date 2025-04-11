import { Brain, Globe, Sparkles, Compass, Clock, Heart, Award, Mail, MapPin, Phone, Github, Linkedin, Twitter } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Emma Davis',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1976&auto=format&fit=crop',
      bio: 'Travel enthusiast with 10+ years in tech and a passion for AI-driven solutions.'
    },
    {
      name: 'Alexander Chen',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop',
      bio: 'Machine learning expert with a background in recommendation systems.'
    },
    {
      name: 'Sophia Rodriguez',
      role: 'Head of Travel Partnerships',
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=1974&auto=format&fit=crop',
      bio: 'Former travel agent with extensive industry connections and expertise.'
    },
    {
      name: 'James Wilson',
      role: 'Lead UX Designer',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop',
      bio: 'Award-winning designer focused on creating intuitive travel experiences.'
    },
  ];
  
  const values = [
    {
      icon: <Sparkles className="w-8 h-8 text-primary mb-4" />,
      title: 'Innovation',
      description: 'We constantly push the boundaries of what\'s possible in travel technology, leveraging AI and machine learning to create personalized experiences.'
    },
    {
      icon: <Heart className="w-8 h-8 text-primary mb-4" />,
      title: 'Authenticity',
      description: 'We believe in genuine travel experiences that respect local cultures and environments, connecting travelers with the real essence of destinations.'
    },
    {
      icon: <Award className="w-8 h-8 text-primary mb-4" />,
      title: 'Excellence',
      description: 'We\'re committed to the highest standards in every recommendation we make, ensuring quality experiences for all our users.'
    },
    {
      icon: <Clock className="w-8 h-8 text-primary mb-4" />,
      title: 'Efficiency',
      description: 'We value your time, which is why we\'ve built tools that simplify trip planning while maintaining personalization and quality.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero section */}
      <div className="bg-gradient-to-r from-primary/10 to-indigo-500/10 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-indigo-600 bg-clip-text text-transparent">
            Revolutionizing Travel Planning with AI
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
            We're on a mission to make travel planning effortless, personalized, and impactful through the power of artificial intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="bg-primary text-white font-medium py-3 px-8 rounded-full hover:bg-primary/90 transition shadow-md">
              Our Story
            </button>
            <button className="bg-white text-primary font-medium py-3 px-8 rounded-full border border-primary hover:bg-primary/5 transition shadow-sm">
              Join Our Team
            </button>
          </div>
        </div>
      </div>
      
      {/* Mission section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Triponic, we believe travel should be transformative, not frustrating. Our AI-powered platform is designed to understand your unique preferences and create personalized travel experiences that go beyond the standard tourist path.
              </p>
              <p className="text-gray-600 mb-6">
                We're combining cutting-edge artificial intelligence with human expertise to revolutionize how people discover, plan, and experience travel. Our goal is to save you time while helping you create more meaningful connections with the places you visit.
              </p>
              <div className="flex gap-6">
                <div>
                  <div className="text-3xl font-bold text-primary">50K+</div>
                  <div className="text-gray-500">Happy Travelers</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">120+</div>
                  <div className="text-gray-500">Countries Covered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary">4.8</div>
                  <div className="text-gray-500">User Rating</div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Triponic Team" 
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Values section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <h2 className="text-3xl font-bold text-center mb-4">Meet Our Team</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          We're a diverse group of travelers, engineers, and industry experts united by our passion for transforming the travel planning experience.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <img 
                src={member.image} 
                alt={member.name} 
                className="w-full h-60 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-primary font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex gap-3">
                  <button className="text-gray-400 hover:text-primary transition">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-primary transition">
                    <Linkedin className="w-5 h-5" />
                  </button>
                  <button className="text-gray-400 hover:text-primary transition">
                    <Mail className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <button className="bg-white text-primary font-medium py-3 px-8 rounded-full border border-primary hover:bg-primary/5 transition">
            View Full Team
          </button>
        </div>
      </div>
      
      {/* AI technology section */}
      <div className="bg-gradient-to-r from-primary/10 to-indigo-500/10 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 order-2 md:order-1">
              <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
                <Brain className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-2xl font-bold mb-4">Our AI Technology</h3>
                <p className="text-gray-600 mb-4">
                  Triponic utilizes advanced machine learning algorithms to understand your travel preferences, analyze millions of data points, and create truly personalized recommendations.
                </p>
                <p className="text-gray-600 mb-6">
                  Our natural language processing system can understand complex travel queries and emotional contexts, allowing us to match you with experiences that align with your unique interests and travel style.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Compass className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Preference Analysis</h4>
                      <p className="text-sm text-gray-500">Learns from your interactions and feedback</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Destination Matching</h4>
                      <p className="text-sm text-gray-500">Connects you with places that match your interests</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Experience Curation</h4>
                      <p className="text-sm text-gray-500">Crafts unique itineraries beyond typical tourist routes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 order-1 md:order-2">
              <h2 className="text-3xl font-bold mb-6">Powered by Advanced AI</h2>
              <p className="text-gray-600 mb-4">
                Our proprietary AI engine combines machine learning, natural language processing, and computer vision to understand the nuances of travel preferences and create uniquely tailored experiences.
              </p>
              <p className="text-gray-600 mb-6">
                We're constantly improving our algorithms with each interaction, making our recommendations more personalized and accurate over time.
              </p>
              <button className="bg-primary text-white font-medium py-3 px-8 rounded-full hover:bg-primary/90 transition">
                Learn More About Our Technology
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-primary p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <p className="mb-8">
                Have questions about Triponic? Want to partner with us? We'd love to hear from you. Reach out using the contact information below.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-4" />
                  <span>123 Innovation Drive, San Francisco, CA 94103</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-5 h-5 mr-4" />
                  <span>hello@triponic.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-5 h-5 mr-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="bg-white/20 p-2 rounded-full hover:bg-white/30 transition">
                  <Github className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="md:w-1/2 p-8">
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Your email address"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                <button className="bg-primary text-white font-medium py-3 px-6 rounded-lg hover:bg-primary/90 transition w-full">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;