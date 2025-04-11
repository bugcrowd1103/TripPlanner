import { Link } from "wouter";
import { Button } from "./ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/">
              <a className="text-xl font-bold text-primary">TravelAI</a>
            </Link>

            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/">
                    <span className="cursor-pointer px-4 py-2">Home</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about">
                    <span className="cursor-pointer px-4 py-2">About</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/explore">
                    <span className="cursor-pointer px-4 py-2">Explore</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Plan</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="absolute top-0 left-0 w-48 p-2 bg-white rounded-lg shadow-lg border mt-2">
                      <Link href="/flights">
                        <span className="block px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Flights</span>
                      </Link>
                      <Link href="/hotels">
                        <span className="block px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Hotels</span>
                      </Link>
                      <Link href="/events">
                        <span className="block px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">Events</span>
                      </Link>
                      <Link href="/ar-vr">
                        <span className="block px-4 py-2 hover:bg-gray-100 rounded-md cursor-pointer">AR/VR Demos</span>
                      </Link>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing">
                    <span className="cursor-pointer px-4 py-2">Pricing</span>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/feed">
                    <span className="cursor-pointer px-4 py-2">Feed</span>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Button variant="outline" className="ml-auto">
            Sign In
          </Button>
        </div>
      </div>
    </header>
  );
}