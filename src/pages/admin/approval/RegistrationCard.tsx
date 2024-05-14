import { useState } from "react";

import Avatar from "@/components/ui/Avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { lecturerRegistrationService } from "@/services";

interface RegistrationCardProps {
  form: any;
  registrationForms: any;
  // setRegistrationForms: any;
}

const RegistrationCard: React.FC<RegistrationCardProps> = (props) => {
  const { showSnackbar } = useSnackbar();
  const { form } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [reason, setReason] = useState<string>("");
  const handleReasonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setReason(e.target.value);
  };

  const handleAcceptRegistration = async () => {
    const res = await lecturerRegistrationService.approvalForm(form?.id);
    if (res.status === 204) {
      showSnackbar({ message: res.message, severity: "info" });
    }
  };

  const handleDeclineRegistration = async () => {
    const request = { id: form.id, reason: reason };
    setReason("");
    const res = await lecturerRegistrationService.rejectForm(request);
    if (res.status === 204) {
      setOpenModal(false);
      showSnackbar({ message: res.message, severity: "info" });
    }
  };

  return (
    <div className="rounded-lg border p-4">
      <div className="flex p-2">
        <div>
          <Avatar
            src={form?.user.avatar}
            className="h-20 w-20"
            isSignalShown={false}
          />
          <p>Registration Date: {form?.registrationDate}</p>
          <div>User Information:</div>
          <div>First Name: {form?.user.firstName}</div>
          <div>Last Name: {form?.user.lastName}</div>
        </div>
        <div>
          <img src={form?.imageUrl} className="max-h-48 w-80 object-cover" />
        </div>
      </div>
      <div className="flex justify-around p-2">
        <Button onClick={handleAcceptRegistration}>Accept</Button>
        <Button onClick={() => setOpenModal(true)}>Decline</Button>
      </div>
      <Dialog open={openModal}>
        <DialogContent
          className="text-black dark:text-white sm:max-w-[425px]"
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle className="text-black dark:text-white">
              Reject to be the lecturer
            </DialogTitle>
            <DialogDescription>
              Tell the users why you reject them
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="reason" className="text-right">
                Reason
              </Label>
              <Input
                id="reason"
                className="col-span-3"
                value={reason}
                onChange={handleReasonChange}
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
            <Button onClick={handleDeclineRegistration}>
              Decide to decline
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RegistrationCard;
