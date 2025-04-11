import { Link, useLocation } from "wouter";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <span className="text-primary text-2xl font-bold font-poppins">
              TravelPal<span className="text-[#00A699]">AI</span>
            </span>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className={`font-medium ${location === '/' ? 'text-primary' : 'text-dark hover:text-primary'} transition`}>
              Home
            </a>
          </Link>
          <Link href="/my-trips">
            <a className={`font-medium ${location === '/my-trips' ? 'text-primary' : 'text-dark hover:text-primary'} transition`}>
              My Trips
            </a>
          </Link>
          <Link href="#">
            <a className="font-medium text-dark hover:text-primary transition">
              Inspiration
            </a>
          </Link>
          <Link href="#">
            <a className="font-medium text-dark hover:text-primary transition">
              Help
            </a>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-4 rounded-full border border-primary transition">
            Sign In
          </button>
          <button className="hidden md:block bg-primary text-white hover:bg-opacity-90 font-medium py-2 px-4 rounded-full transition">
            Sign Up
          </button>
          <button className="md:hidden text-dark">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
