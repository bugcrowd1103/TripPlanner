import { Link } from "wouter";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="text-xl font-bold text-primary">TravelAI</a>
          </Link>

          <div className="flex gap-6">
            <Link href="/">
              <span className="cursor-pointer">Home</span>
            </Link>
            <Link href="/about">
              <span className="cursor-pointer">About</span>
            </Link>
            <Link href="/explore">
              <span className="cursor-pointer">Explore</span>
            </Link>
            <div className="relative group">
              <span className="cursor-pointer">Plan</span>
              <div className="absolute hidden group-hover:block w-48 bg-white shadow-lg rounded-lg mt-2">
                <Link href="/arvr">
                  <span className="block px-4 py-2 hover:bg-gray-100">AR/VR</span>
                </Link>
                <Link href="/hotels">
                  <span className="block px-4 py-2 hover:bg-gray-100">Hotels</span>
                </Link>
                <Link href="/events">
                  <span className="block px-4 py-2 hover:bg-gray-100">Events</span>
                </Link>
              </div>
            </div>
            <Link href="/pricing">
              <span className="cursor-pointer">Pricing</span>
            </Link>
            <Link href="/feed">
              <span className="cursor-pointer">Feed</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}