import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { AppDispatch } from "@/store/store/Store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { updateParticipant } from "@/store/features/participantSlice";

interface UpdateParticipantModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  participant: any | null;
}

interface ParticipantFormValues {
  id: string;
  username: string;
  phone: string;
  email: string;
}

export function UpdateParticipantModal({
  isOpen,
  onOpenChange,
  participant,
}: UpdateParticipantModalProps) {
  const { isLoading } = useSelector((state: any) => state.event);

  const dispatch: AppDispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ParticipantFormValues>({
    defaultValues: {
      username: participant?.username || "",
      phone: participant?.phone || "",
      email: participant?.email || 0,
    },
  });

  React.useEffect(() => {
    if (participant) {
      setValue("username", participant.username);
      setValue("phone", participant.phone);
      setValue("email", participant.email);
    }
  }, [participant, setValue]);

  const onSubmit = (data: ParticipantFormValues) => {
    if (participant) {
      const updatedData: any = {};
      if (data.username !== participant.username)
        updatedData.username = data.username;
      if (data.email !== participant.email) updatedData.email = data.email;
      if (data.phone !== participant.phone) updatedData.phone = data.phone;

      updatedData.id = participant._id;

      console.log("Updated Event Data:", updatedData);

      dispatch(updateParticipant(updatedData));
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
              <label className="text-sm font-medium">
                Participant full name
              </label>
              <Input
                defaultValue={participant?.username}
                placeholder="Enter participant username"
                {...register("username", { required: "username is required" })}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                defaultValue={participant?.email}
                type="email"
                placeholder="Enter participant email"
                {...register("email", { required: "email is required" })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-medium">phone</label>
              <Input
                defaultValue={participant?.phone}
                placeholder="Enter Participant Phone"
                {...register("phone", {
                  required: "Phone is required",
                  minLength: {
                    value: 10,
                    message: "Phone must be at least 10 characters",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm">{errors.phone.message}</p>
              )}
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
