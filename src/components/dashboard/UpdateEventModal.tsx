import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { updateEvent } from "@/store/features/eventSlice";
import { AppDispatch } from "@/store/store/Store";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";

interface UpdateEventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  event: any | null;
}

interface EventFormValues {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  status: string;
}

export function UpdateEventModal({
  isOpen,
  onOpenChange,
  event,
}: UpdateEventModalProps) {

  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm<EventFormValues>({
    defaultValues: {
      name: event?.name || "",
      description: event?.description || "",
      date: event?.date ? event.date.split("T")[0] : "",
      location: event?.location || "",
      participants: event?.participants || 0,
      status: event?.status || "upcoming",
    },
  });

  React.useEffect(() => {
    if (event) {
      setValue("name", event.name);
      setValue("description", event.description);
      setValue("date", event.date.split("T")[0]);
      setValue("location", event.location);
      setValue("participants", event.participants);
      setValue("status", event.status || "upcoming");
    }
  }, [event, setValue]);

  const onSubmit = (data: EventFormValues) => {
    if (event) {
      const updatedData: any = {};
      if (data.name !== event.name) updatedData.name = data.name;
      if (data.description !== event.description)
        updatedData.description = data.description;
      if (data.date !== event.date.split("T")[0]) updatedData.date = data.date;
      if (data.location !== event.location)
        updatedData.location = data.location;
      if (data.participants !== event.participants)
        updatedData.participants = data.participants;
      if (data.status !== event.status) updatedData.status = data.status;

      updatedData.id = event._id;

      console.log("Updated Event Data:", updatedData);

      dispatch(updateEvent(updatedData));
      Swal.fire({
        title: "Event Updated",
        text: "The event has been updated successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => {
        onOpenChange(false);
      }, 2000);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4 py-4">
            {/* Event Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Event Title</label>
              <Input
                defaultValue={event?.name}
                placeholder="Enter event title"
                {...register("name", { required: "Event title is required" })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                defaultValue={event?.description} // Use value here for controlled input
                placeholder="Enter event description"
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Date and Location */}
            <div className="grid grid-cols-2 gap-4">
              {/* Date */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  type="date"
                  defaultValue={event?.date ? event.date.split("T")[0] : ""} // Ensure the date format is correct
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <p className="text-red-500 text-sm">{errors.date.message}</p>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Location</label>
                <Input
                  defaultValue={event?.location} // Use value here for controlled input
                  placeholder="Enter location"
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">
                    {errors.location.message}
                  </p>
                )}
              </div>
            </div>

            {/* Participants and Status */}
            <div className="grid grid-cols-2 gap-4">
              {/* Max Participants */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Max Participants</label>
                <Input
                  type="number"
                  defaultValue={event?.participants || 0} // Use value here for controlled input
                  {...register("participants", {
                    required: "Number of participants is required",
                    valueAsNumber: true,
                    min: { value: 1, message: "At least 1 participant" },
                  })}
                />
                {errors.participants && (
                  <p className="text-red-500 text-sm">
                    {errors.participants.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Controller
                  name="status"
                  control={control}
                  rules={{ required: "Status is required" }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className="w-full rounded-md border border-gray-300 p-2 bg-white"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="ongoing">Ongoing</option>
                      <option value="completed">Completed</option>
                    </select>
                  )}
                />
                {errors.status && (
                  <p className="text-red-500 text-sm">
                    {errors.status.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
