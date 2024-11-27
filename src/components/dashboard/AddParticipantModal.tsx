import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store/Store";
import { getEvents } from "@/store/features/eventSlice";
import { useForm } from "react-hook-form";
import { createParticipant } from "@/store/features/participantSlice";

interface AddParticipantModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface ParticipantFormData {
  username: string;
  email: string;
  phone: string;
  event: string;
}
export function AddParticipantModal({
  isOpen,
  onOpenChange,
}: AddParticipantModalProps) {
  const { events, count } = useSelector((state: any) => state.event);
  const { countparticipant } = useSelector((state: any) => state.participant);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    const data: any = { page: 1, limit: 10 };
    dispatch(getEvents(data));
  }, [count]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ParticipantFormData>();

  console.log("hgj");

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    dispatch(createParticipant(data));
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Participant</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter participant's full name"
              {...register("username", { required: "Full name is required" })}
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter email address"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Enter phone number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[+]?[0-9]{10,13}$/,
                  message: "Invalid phone number",
                },
              })}
            />
            {errors.phone && (
              <span className="text-red-500">{errors.phone.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="event">Select Event</Label>
            <select
              id="event"
              {...register("event", {
                required: "Event selection is required",
              })}
              className="w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="">Select an event</option>
              {events?.data?.map((event: any) => (
                <option key={event._id} value={event._id}>
                  {event.name} -{" "}
                  {new Date(event?.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </option>
              ))}
            </select>
            {errors.event && (
              <span className="text-red-500">{errors.event.message}</span>
            )}
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Add Participant</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
