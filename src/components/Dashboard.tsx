import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  CalendarDaysIcon,
  UsersIcon,
  ActivityIcon,
  TrendingUpIcon,
  BarChart3Icon,
  UserPlusIcon,
} from "lucide-react";
import { EventCard } from "./EventCard";
import { StatCard } from "./dashboard/StatCard";
import { ParticipantChart } from "./dashboard/ParticipantChart";
import { RecentEvents } from "./dashboard/RecentEvents";
import { UpdateEventModal } from "./dashboard/UpdateEventModal";
import { AddParticipantModal } from "./dashboard/AddParticipantModal";
import { Event } from "@/types";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getEvents } from "@/store/features/eventSlice";
import { AppDispatch } from "@/store/store/Store";


export function Dashboard() {
  const { events, count } = useSelector((state: any) => state.event);
  console.log(events);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const data: any = { page: 1, limit: 3 };
    dispatch(getEvents(data));
  }, [count]);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isAddParticipantModalOpen, setIsAddParticipantModalOpen] =
    useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const handleUpdateEvent = (event: Event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back, Admin</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={() => setIsAddParticipantModalOpen(true)}
            className="flex items-center gap-2"
          >
            <UserPlusIcon className="h-4 w-4" />
            Add Participant
          </Button>
          <Button className="flex items-center gap-2">
            <BarChart3Icon className="h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Events"
          value="12"
          icon={<CalendarDaysIcon className="h-6 w-6 text-blue-600" />}
          trend={{ value: 12, isPositive: true }}
          className="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard
          title="Total Participants"
          value="248"
          icon={<UsersIcon className="h-6 w-6 text-green-600" />}
          trend={{ value: 8, isPositive: true }}
          className="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard
          title="Active Events"
          value="5"
          icon={<ActivityIcon className="h-6 w-6 text-purple-600" />}
          trend={{ value: 2, isPositive: false }}
          className="bg-purple-50 dark:bg-purple-900/20"
        />
        <StatCard
          title="Monthly Growth"
          value="+24%"
          icon={<TrendingUpIcon className="h-6 w-6 text-orange-600" />}
          trend={{ value: 24, isPositive: true }}
          className="bg-orange-50 dark:bg-orange-900/20"
        />
      </div>

      {/* Charts and Recent Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ParticipantChart />
        <RecentEvents events={events?.data} onUpdateEvent={handleUpdateEvent} />
      </div>

      {/* Featured Events */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Events</h2>
          <Button variant="outline">View All Events</Button>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events?.data.map((event: any) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      </section>

      {/* Modals */}
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        event={selectedEvent}
      />

      <AddParticipantModal
        isOpen={isAddParticipantModalOpen}
        onOpenChange={setIsAddParticipantModalOpen}
      />
    </div>
  );
}
