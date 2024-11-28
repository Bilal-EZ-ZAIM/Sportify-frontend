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
import Swal from "sweetalert2";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import {
  deleteParticipants,
  getParticipants,
  updateParticipant,
} from "@/store/features/participantSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store/Store";
import { useEffect, useState } from "react";
import { UpdateParticipantModal } from "./dashboard/UpdateParticipantModal";

export function ParticipantList() {
  const { countparticipant, participant } = useSelector(
    (state: any) => state.participant
  );
  
  const dispatch: AppDispatch = useDispatch();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEvent, selectedParticipant] = useState<any>(null);

  useEffect(() => {
    const data: any = { page: 1, limit: 10 };
    dispatch(getParticipants(data));
  }, [countparticipant]);

  const deletedParticipants = (id: string) => {
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
        dispatch(deleteParticipants(id));
        Swal.fire({
          title: "Deleted!",
          text: "Your Participant has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Participants</h1>
        <div className="flex items-center gap-x-4">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input placeholder="Search participants..." className="pl-10" />
          </div>
          <Button>Export List</Button>
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Registration Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participant?.data.map((item: any, index: number) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{item.username}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phone}</TableCell>
                <TableCell>{item.event.name}</TableCell>
                <TableCell>
                  {new Date(item.registered_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </TableCell>
                <TableCell className="flex gap-1 items-center justify-end">
                  <Button
                    onClick={() => {
                      setIsUpdateModalOpen((prev) => !prev);
                      selectedParticipant(item);
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
                    onClick={() => deletedParticipants(item._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      <UpdateParticipantModal
        isOpen={isUpdateModalOpen}
        onOpenChange={setIsUpdateModalOpen}
        participant={selectedEvent}
      />
    </div>
  );
}