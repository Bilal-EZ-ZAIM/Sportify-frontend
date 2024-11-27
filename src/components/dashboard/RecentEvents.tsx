import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { PencilIcon } from "lucide-react";
import { Event } from "@/types";

// interface RecentEventsProps {
//   events: Event[];
//   onUpdateEvent: (event: Event) => void;
// }

export function RecentEvents({ events, onUpdateEvent }: any) {
  console.log(events);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Recent Events</h2>
        <Button variant="outline" size="sm">
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {events?.map((event: any) => (
          <div
            key={event._id}
            className="flex items-center justify-between p-4 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div>
              <p className="font-medium">{event.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(event?.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                ${
                  event?.status === "upcoming"
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300"
                    : event?.status === "ongoing"
                    ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-300"
                    : "bg-gray-50 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                }`}
              >
                {/* {event?.status?.charAt(0).toUpperCase() +
                  event?.status.slice(1)} */}
              {/* </span> */}
              <Button
                variant="ghost"
                size="sm"
                className="bg-gray-200"
                onClick={() => onUpdateEvent(event)}
              >
                <PencilIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
