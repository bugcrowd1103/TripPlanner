import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import MyTrips from "@/pages/MyTrips";
import ItineraryDetails from "@/pages/ItineraryDetails";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LiveChatbot from "@/components/LiveChatbot";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/my-trips" component={MyTrips} />
      <Route path="/itinerary/:id" component={ItineraryDetails} />
      <Route path="/explore" component={NotFound} />
      <Route path="/hotels" component={NotFound} />
      <Route path="/events" component={NotFound} />
      <Route path="/feed" component={NotFound} />
      <Route path="/about" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col font-inter text-dark">
        <Header />
        <main className="flex-grow">
          <Router />
        </main>
        <Footer />
        <LiveChatbot />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
