import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/store/Store";
import { createEvent } from "@/store/features/eventSlice";
import { useState } from "react";
import { useSelector } from "react-redux";

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
  image: File | null;
}

export function CreateEventModal({
  isOpen,
  onOpenChange,
}: CreateEventModalProps) {
  const dispatch: AppDispatch = useDispatch();
  const { status, erros } = useSelector((state: any) => state.event);
  const [image, setImage] = useState<File | null>(null);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EventFormData>();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  console.log("console.log(status);");
  console.log(status);
  console.log("console.log(status);");

  const onSubmit = async (data: EventFormData) => {
    console.log("console.log(status);");
    console.log(status);
    console.log("console.log(status);");

    console.log(erros);

    console.log(data);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("date", data.date);
    formData.append("location", data.location);
    formData.append("participants", data.participants.toString());
    formData.append("status", data.status);
    if (image) {
      formData.append("image", image);
    }

    data.image = image;

    console.log(formData);

    dispatch(createEvent(data));

    if (status === true) {
      console.log(status);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {/* Event Title */}
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
            {erros?.length > 0 &&
              erros.map((item: any, index: number) =>
                item.path === "name" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* description */}
          <div className="space-y-2">
            <label className="text-sm font-medium">description</label>
            <Controller
              name="description"
              control={control}
              defaultValue=""
              rules={{ required: "description is required" }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  placeholder="Enter event description"
                  className="mt-1"
                />
              )}
            />
            {erros?.length > 0 &&
              erros.map((item: any, index: number) =>
                item.path === "description" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Date and Location */}
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
              {erros?.length > 0 &&
                erros.map((item: any, index: number) =>
                  item.path === "date" ? (
                    <p className="text-red-500 text-sm mt-1" key={index}>
                      {item.msg}
                    </p>
                  ) : null
                )}
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
              {erros?.length > 0 &&
                erros.map((item: any, index: number) =>
                  item.path === "location" ? (
                    <p className="text-red-500 text-sm mt-1" key={index}>
                      {item.msg}
                    </p>
                  ) : null
                )}
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>
          </div>

          {/* Participants */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Max Participants</label>
            <Controller
              name="participants"
              control={control}
              defaultValue={0}
              rules={{
                required: "Participants number is required",
                min: {
                  value: 1,
                  message: "At least 1 participant is required",
                },
              }}
              render={({ field }) => (
                <Input {...field} type="number" className="mt-1" />
              )}
            />
            {erros?.length > 0 &&
              erros.map((item: any, index: number) =>
                item.path === "participants" ? (
                  <p className="text-red-500 text-sm mt-1" key={index}>
                    {item.msg}
                  </p>
                ) : null
              )}
            {errors.participants && (
              <p className="text-red-500 text-sm">
                {errors.participants.message}
              </p>
            )}
          </div>

          {/* Event Image */}
          <div className="space-y-2">
            <label className="text-sm font-medium">Event Image</label>
            <Input
              type="file"
              onChange={handleImageChange}
              accept="image/*"
              className="mt-1"
            />
            {image && (
              <p className="text-sm text-gray-500 mt-2">
                Image selected: {image.name}
              </p>
            )}
          </div>

          {/* Action Buttons */}
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
