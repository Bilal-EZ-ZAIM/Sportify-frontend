import { Link } from "react-router-dom";
import { Pricing } from "./Pricing";
import { TeamMembers } from "./TeamMembers";
import { Button } from "./ui/button";
import { Trophy, Calendar, Users, ArrowRight } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="px-4 py-6 md:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              SportEvents
            </span>
          </div>
          <Link to="/login">
            <Button variant="outline">Sign In</Button>{" "}
          </Link>
        </nav>
      </header>

      <main>
        {/* Hero Content */}
        <section className="px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Manage Sports Events</span>
            <span className="block text-blue-600">Like Never Before</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-lg text-gray-500 sm:max-w-xl">
            The complete platform for organizing sports events, managing
            registrations, and connecting with participants.
          </p>
          <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>

        {/* Features */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <Calendar className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Event Management</h3>
                <p className="mt-2 text-gray-500">
                  Create and manage sports events with ease
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">
                  Registration Handling
                </h3>
                <p className="mt-2 text-gray-500">
                  Streamline participant registration process
                </p>
              </div>
              <div className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-600">
                  <Trophy className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Event Analytics</h3>
                <p className="mt-2 text-gray-500">
                  Track and analyze event performance
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">
              Featured Events
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <img
                    src={`https://images.unsplash.com/photo-1498846323785-c40aafaaa4f8?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                    alt="Event"
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">
                      City Marathon {i}
                    </h3>
                    <p className="text-gray-500 mb-4">March {15 + i}, 2024</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600 font-medium">
                        {150 + i * 10} participants
                      </span>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <Pricing />
        <TeamMembers />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-6 w-6" />
                <span className="text-xl font-bold">SportEvents</span>
              </div>
              <p className="mt-4 text-gray-400">
                Making sports event management simple and efficient.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Contact</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <p className="text-gray-400">
                Follow us on social media for updates and news.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
