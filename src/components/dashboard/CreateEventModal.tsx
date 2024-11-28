import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store/Store";
import { createEvent } from "@/store/features/eventSlice";

interface CreateEventModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

interface EventFormData {
  name: string;
  description: string;
  date: string;
  location: string;
  participants: number;
  status: string;
}

export function CreateEventModal({
  isOpen,
  onOpenChange,
}: CreateEventModalProps) {

  const dispatch: AppDispatch = useDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>();

  const onSubmit = (data: EventFormData) => {
    console.log(data);
    dispatch(createEvent(data));

    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Event Title</label>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={{ required: "Event title is required" }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter event title"
                  className="mt-1"
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Enter event description"
                  className="mt-1"
                />
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Date</label>
              <Controller
                name="date"
                control={control}
                defaultValue=""
                rules={{ required: "Date is required" }}
                render={({ field }) => (
                  <Input {...field} type="date" className="mt-1" />
                )}
              />
              {errors.date && (
                <p className="text-red-500 text-sm">{errors.date.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Controller
                name="location"
                control={control}
                defaultValue=""
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter location"
                    className="mt-1"
                  />
                )}
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Max Participants</label>
              <Controller
                name="participants"
                control={control}
                defaultValue={0}
                rules={{ required: "Participants number is required", min: 1 }}
                render={({ field }) => (
                  <Input {...field} type="number" className="mt-1" />
                )}
              />
              {errors.participants && (
                <p className="text-red-500 text-sm">
                  {errors.participants.message}
                </p>
              )}
            </div>
          </div>

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
