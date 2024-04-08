import { useRef } from "react";
import { useTranslation } from "react-i18next";

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
import userService from "@/services/user.service";
import ProfileLayout from "./ProfileLayout";

const DeleteAccountPage = () => {
  const { t } = useTranslation();

  const passwordRef = useRef("");
  const handleClick = async () => {
    const password = passwordRef.current.value;
    try {
      const response = await userService.deleteSelf({
        password,
      });
      if (response.ok) {
        // Account deleted successfully
        // Handle any additional logic or UI updates here
      } else {
        // Handle error response from server
        // Display appropriate error message to the user
      }
    } catch (error) {
      // Handle network error or other exceptions
      // Display appropriate error message to the user
    }
  };
  return (
    <ProfileLayout title="Delete Account">
      <div className="mx-auto w-[90%]">
        <p>
          <span className="font-bold text-red-500">Warning: </span>
          If you close your account, you will be unsubscribed from your 1
          course, and will lose access forever.
        </p>
        <Dialog>
          <DialogTrigger>
            <button className="mb-2 me-2 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
              Close Account
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Close your account?</DialogTitle>
              <DialogDescription>
                Are you sure you want to close your account?
              </DialogDescription>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Input
                    id="password"
                    type="password"
                    ref={passwordRef}
                    placeholder="Enter your password"
                    className="col-span-3"
                  />
                </div>
              </div>
            </DialogHeader>
            <DialogFooter>
              <button
                onClick={handleClick}
                className="dark:border-gray-70 my-4 mb-2 me-2 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-slate-400 dark:text-zinc-700 dark:hover:bg-gray-700  dark:hover:text-white dark:focus:ring-gray-700"
              >
                Close Account
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </ProfileLayout>
  );
};

export default DeleteAccountPage;
