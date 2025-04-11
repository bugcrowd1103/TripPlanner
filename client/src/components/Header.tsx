
import { Link, useLocation } from "wouter";
import { Plane, Hotel, Map, Calendar, Users, MessageSquare, Info, Globe, Compass, DollarSign, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const Header = () => {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center">
            <span className="text-primary text-2xl font-bold">
              Trip<span className="text-indigo-500">onic</span>
            </span>
          </a>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/">
            <a className={`font-medium ${location === '/' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-1`}>
              <Map className="w-4 h-4" />
              <span>Home</span>
            </a>
          </Link>
          <Link href="/about">
            <a className={`font-medium ${location === '/about' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-1`}>
              <Info className="w-4 h-4" />
              <span>About</span>
            </a>
          </Link>
          <Link href="/explore">
            <a className={`font-medium ${location === '/explore' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-1`}>
              <Compass className="w-4 h-4" />
              <span>Explore</span>
            </a>
          </Link>
          
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium text-gray-700 hover:text-primary transition flex items-center gap-1">
                  <Plane className="w-4 h-4" />
                  <span>Plan</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[200px]">
                    <Link href="/ar-vr">
                      <a className={`font-medium ${location === '/ar-vr' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-2 p-2 rounded hover:bg-gray-50`}>
                        <Globe className="w-4 h-4" />
                        <span>AR/VR</span>
                      </a>
                    </Link>
                    <Link href="/hotels">
                      <a className={`font-medium ${location === '/hotels' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-2 p-2 rounded hover:bg-gray-50`}>
                        <Hotel className="w-4 h-4" />
                        <span>Hotels</span>
                      </a>
                    </Link>
                    <Link href="/events">
                      <a className={`font-medium ${location === '/events' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-2 p-2 rounded hover:bg-gray-50`}>
                        <Calendar className="w-4 h-4" />
                        <span>Events</span>
                      </a>
                    </Link>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Link href="/pricing">
            <a className={`font-medium ${location === '/pricing' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-1`}>
              <DollarSign className="w-4 h-4" />
              <span>Pricing</span>
            </a>
          </Link>
          <Link href="/feed">
            <a className={`font-medium ${location === '/feed' ? 'text-primary' : 'text-gray-700 hover:text-primary'} transition flex items-center gap-1`}>
              <Users className="w-4 h-4" />
              <span>Feed</span>
            </a>
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="bg-white text-primary hover:bg-gray-100 font-medium py-2 px-4 rounded-full border border-primary transition hidden md:block">
            Sign In
          </button>
          <button className="hidden md:block bg-primary text-white hover:bg-opacity-90 font-medium py-2 px-4 rounded-full transition">
            Sign Up
          </button>
          <button className="md:hidden text-gray-700" onClick={toggleMenu}>
            {menuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link href="/">
              <a className={`font-medium ${location === '/' ? 'text-primary' : 'text-gray-700'} py-2 flex items-center gap-2`}>
                <Map className="w-5 h-5" />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-medium ${location === '/about' ? 'text-primary' : 'text-gray-700'} py-2 flex items-center gap-2`}>
                <Info className="w-5 h-5" />
                <span>About</span>
              </a>
            </Link>
            <Link href="/explore">
              <a className={`font-medium ${location === '/explore' ? 'text-primary' : 'text-gray-700'} py-2 flex items-center gap-2`}>
                <Compass className="w-5 h-5" />
                <span>Explore</span>
              </a>
            </Link>
            <div className="py-2 pl-2 border-l border-gray-200">
              <div className="font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Plane className="w-5 h-5" />
                <span>Plan</span>
              </div>
              <div className="space-y-3 pl-7">
                <Link href="/ar-vr">
                  <a className={`font-medium ${location === '/ar-vr' ? 'text-primary' : 'text-gray-700'} py-1 flex items-center gap-2`}>
                    <Globe className="w-4 h-4" />
                    <span>AR/VR</span>
                  </a>
                </Link>
                <Link href="/hotels">
                  <a className={`font-medium ${location === '/hotels' ? 'text-primary' : 'text-gray-700'} py-1 flex items-center gap-2`}>
                    <Hotel className="w-4 h-4" />
                    <span>Hotels</span>
                  </a>
                </Link>
                <Link href="/events">
                  <a className={`font-medium ${location === '/events' ? 'text-primary' : 'text-gray-700'} py-1 flex items-center gap-2`}>
                    <Calendar className="w-4 h-4" />
                    <span>Events</span>
                  </a>
                </Link>
              </div>
            </div>
            <Link href="/pricing">
              <a className={`font-medium ${location === '/pricing' ? 'text-primary' : 'text-gray-700'} py-2 flex items-center gap-2`}>
                <DollarSign className="w-5 h-5" />
                <span>Pricing</span>
              </a>
            </Link>
            <Link href="/feed">
              <a className={`font-medium ${location === '/feed' ? 'text-primary' : 'text-gray-700'} py-2 flex items-center gap-2`}>
                <Users className="w-5 h-5" />
                <span>Feed</span>
              </a>
            </Link>

            <div className="pt-2 flex gap-3">
              <button className="bg-white text-primary font-medium py-2 px-4 rounded-full border border-primary flex-1 transition">
                Sign In
              </button>
              <button className="bg-primary text-white font-medium py-2 px-4 rounded-full flex-1 transition">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
