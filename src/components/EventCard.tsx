import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CalendarDays, MapPin, Users } from "lucide-react";
import { Event } from "@/types";

interface EventCardProps {
  event: Event;
}

export function EventCard({ event }: any) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={event.event_image.url}
        alt={event.name}
        className="h-48 w-full object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
        <div className="space-y-3 mb-4">
          <div className="flex items-center text-gray-500">
            <CalendarDays className="h-4 w-4 mr-2" />
            <span>
              {new Date(event?.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center text-gray-500">
            <MapPin className="h-4 w-4 mr-2" />
            <span>{event.location}</span>
          </div>
          <div className="flex items-center text-gray-500">
            <Users className="h-4 w-4 mr-2" />
            <span>{event.participants} participants</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          {/* <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
            ${
              event.status === "upcoming"
                ? "bg-blue-50 text-blue-700"
                : event.status === "ongoing"
                ? "bg-green-50 text-green-700"
                : "bg-gray-50 text-gray-700"
            }`}
          >
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span> */}
          <Button>View Details</Button>
        </div>
      </div>
    </Card>
  );
}
