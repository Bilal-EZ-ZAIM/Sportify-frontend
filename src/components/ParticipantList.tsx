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
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";
import { getParticipants } from "@/store/features/participantSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store/Store";
import { useEffect } from "react";

export function ParticipantList() {
  const { countparticipant, participant } = useSelector(
    (state: any) => state.participant
  );
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const data: any = { page: 1, limit: 10 };
    dispatch(getParticipants(data));
  }, [countparticipant]);

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
                <TableCell className="text-right">
                  <Button variant="ghost" size="sm">
                    View Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
