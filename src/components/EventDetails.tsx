import { Button } from './ui/button';
import { Card } from './ui/card';
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Clock,
  Mail,
  User,
} from 'lucide-react';

interface EventDetailsProps {
  event: {
    _id: string;
    name: string;
    description: string;
    organisateur: {
      name: string;
      email: string;
    };
    price: number;
    participants: number;
    location: string;
    date: string;
    event_image: {
      url: string;
    };
  };
}

export function EventDetails({ event }: EventDetailsProps) {
  const formattedDate = new Date(event.date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column - Image */}
        <div>
          <img
            src={event.event_image.url}
            alt={event.name}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        {/* Right Column - Event Details */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{event.name}</h1>
            <p className="text-lg text-gray-600">{event.description}</p>
          </div>

          <Card className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Date & Time</p>
                  <p className="font-medium">{formattedDate}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{event.location}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-medium">{event.participants} max</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <DollarSign className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-500">Entry Fee</p>
                  <p className="font-medium">${event.price}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Organizer Information */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Event Organizer</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="h-5 w-5 text-gray-500" />
                <span>{event.organisateur.name}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>{event.organisateur.email}</span>
              </div>
            </div>
          </Card>

          <Button size="lg" className="w-full">
            Register for Event
          </Button>
        </div>
      </div>
    </div>
  );
}