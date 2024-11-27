import { useEffect, useState } from "react";
import { CreateEventModal } from "./dashboard/CreateEventModal";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import Swal from "sweetalert2";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { PlusIcon } from "lucide-react";
import { AppDispatch } from "@/store/store/Store";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { deleteEvent, getEvents } from "@/store/features/eventSlice";
import { UpdateEventModal } from "./dashboard/UpdateEventModal";

export function EventList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { events, count } = useSelector((state: any) => state.event);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const data: any = { page: currentPage, limit: 6 };
    dispatch(getEvents(data));
  }, [currentPage, count]);

  const deletedEvent = (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteEvent(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your Event has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Events</h1>
        <Button onClick={() => setIsCreateModalOpen((pre) => !pre)}>
          <PlusIcon className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Participants</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events &&
              events.data?.map((item: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">{item?.name}</TableCell>
                  <TableCell>
                    {new Date(item?.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{item?.location} </TableCell>
                  <TableCell>{item.participants}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      Active
                    </span>
                  </TableCell>
                  <TableCell className="flex gap-1 items-center justify-end">
                    <Button
                      onClick={() => {
                        setIsUpdateModalOpen((prev) => !prev);
                        setSelectedEvent(item);
                      }}
                      className="text-green-400"
                      variant="ghost"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500"
                      onClick={() => deletedEvent(item._id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      {events && (
        <div className="flex justify-end mt-4 space-x-1">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className={`flex items-center px-2 py-1 text-xs rounded border transition-all duration-300 ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-blue-500 hover:text-white border-gray-300"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            <span className="ml-1">Prev</span>
          </button>

          <div className="flex space-x-1">
            {Array.from({ length: events.totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`px-2 py-1 text-xs rounded border transition-all duration-300 ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-white text-gray-600 hover:bg-blue-100 hover:text-blue-600 border-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            disabled={currentPage === events.totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className={`flex items-center px-2 py-1 text-xs rounded border transition-all duration-300 ${
              currentPage === events.totalPages
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-600 hover:bg-blue-500 hover:text-white border-gray-300"
            }`}
          >
            <span className="mr-1">Next</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </div>
      )}

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />

      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        event={selectedEvent}
      />
    </div>
  );
}
