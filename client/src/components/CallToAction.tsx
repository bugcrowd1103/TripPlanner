import { Link } from 'wouter';

interface CallToActionProps {
  onStartPlanning?: () => void;
}

const CallToAction = ({ onStartPlanning }: CallToActionProps) => {
  return (
    <section className="py-16 bg-primary bg-opacity-10">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-poppins mb-4">Ready to Plan Your Dream Trip?</h2>
        <p className="text-medium max-w-2xl mx-auto mb-8">Let our AI travel assistant create a personalized itinerary tailored to your unique preferences and interests.</p>
        {onStartPlanning ? (
          <button 
            className="bg-primary text-white text-lg font-medium py-3 px-8 rounded-full hover:bg-opacity-90 transition shadow-lg"
            onClick={onStartPlanning}
          >
            Start Planning Now
          </button>
        ) : (
          <Link href="/">
            <a className="inline-block bg-primary text-white text-lg font-medium py-3 px-8 rounded-full hover:bg-opacity-90 transition shadow-lg">
              Start Planning Now
            </a>
          </Link>
        )}
      </div>
    </section>
  );
};

export default CallToAction;
