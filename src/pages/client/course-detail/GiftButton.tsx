import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { registrationService } from "@/services";
import { useNavigate, useParams } from "react-router-dom";

const GiftButton: React.FC = () => {
  const { courseId } = useParams();
  const { showSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");

  const handleOnClick = async () => {
    const res = await registrationService.getByEmailAndCourseId({
      email,
      courseId,
    });
    console.log(res);
    if (res.status === 404) {
      showSnackbar({
        message: "User doesn't exist on system!!",
        severity: "error",
      });
    } else if (res.status === 201) {
      showSnackbar({
        message: "User already registered this course!!",
        severity: "info",
      });
    } else if (res.status === 200) {
      localStorage.setItem("payeeEmail", email);
      navigate("/payment/" + courseId);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTrigger asChild>
          <div className="cursor-pointer dark:text-white">
            <button
              onClick={() => setOpen(true)}
              className="mt-2 w-full border border-solid p-3 font-semibold transition-all dark:border-white dark:text-white dark:hover:bg-gray-500"
            >
              Gift course
            </button>
          </div>
        </DialogTrigger>
        <DialogContent
          className="text-black dark:text-white sm:max-w-[600px]"
          onInteractOutside={() => setOpen(false)}
          hideCloseButton={true}
        >
          <DialogHeader>
            <DialogTitle className="text-4xl">GIFT COURSE</DialogTitle>
            <DialogDescription>Gift the course to user</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Label htmlFor="email" className="text-left">
              Enter email of user you want to gift this
            </Label>
            <Input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button onClick={handleOnClick}>Gift</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GiftButton;
