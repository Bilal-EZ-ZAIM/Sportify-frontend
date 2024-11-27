import { useEffect, useState } from "react";
import { CreateEventModal } from "./dashboard/CreateEventModal";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
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
import { getEvents } from "@/store/features/eventSlice";

export function EventList() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { events, count } = useSelector((state: any) => state.event);
  console.log(events);

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const data: any = { page: currentPage, limit: 6 };
    dispatch(getEvents(data));
  }, [currentPage, count]);

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
                      className="text-green-400"
                      variant="ghost"
                      size="sm"
                    >
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-500">
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

      <CreateEventModal
        isOpen={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </div>
  );
}
