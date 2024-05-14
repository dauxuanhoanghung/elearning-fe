import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@/app/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { userService } from "@/services";
import ProfileLayout from "./ProfileLayout";

const EditPasswordPage: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.user.user);
  const { showSnackbar } = useSnackbar();

  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [retypedPassword, setRetypedPassword] = useState<string>("");
  const handleChangePassword = async () => {
    // Input validation
    let isValid = true;
    let errorMessage = "";
    if (
      currentPassword === "" ||
      newPassword === "" ||
      retypedPassword === ""
    ) {
      isValid = false;
      errorMessage = "Please fill in all fields.";
    } else {
      // Minimum length check (adjust as needed)
      if (newPassword.trim().length < 6) {
        isValid = false;
        errorMessage = "New password must be at least 6 characters long.";
      }
    }
    if (!isValid) {
      showSnackbar({ message: errorMessage, severity: "error" });
      return;
    }
    const data = {
      currentPassword,
      newPassword,
    };
    try {
      const response = await userService.changePassword(data);

      if (response.status === 200) {
        showSnackbar({
          message: "Password changed successfully!",
          severity: "success",
        });
        setCurrentPassword("");
        setNewPassword("");
        setRetypedPassword("");
      } else
        showSnackbar({ message: "Fail to change password", severity: "error" });
    } catch (error) {
      showSnackbar({
        message: "Error changing password. Please try again.",
        severity: "error",
      });
    }
  };
  return (
    <ProfileLayout title="Change password">
      <form className="mx-auto w-[90%] flex-col justify-center">
        <p className="font-bold">Email:</p>
        <div className="mb-3 flex items-center border-solid border-black bg-white px-5 py-3 text-black">
          <span className="">
            Your email address is <b>{currentUser.email}</b>
          </span>
        </div>
        <hr className="w-py my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <div>
          <Label htmlFor="currentPassword" className="font-bold">
            Password:
          </Label>
          <Input
            id="currentPassword"
            className="mb-3 flex w-full items-center border-solid border-black px-5 py-3 text-black"
            type="password"
            placeholder="Enter current password"
            value={currentPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCurrentPassword(e.target.value)
            }
          />
        </div>
        <div>
          <Label htmlFor="newPassword" className="font-bold">
            New Password:
          </Label>
          <Input
            className="mb-3 flex w-full items-center border-solid border-black px-5 py-3 text-black"
            id="newPassword"
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setNewPassword(e.target.value)
            }
          />
        </div>
        <div>
          <Label htmlFor="newPassword" className="font-bold">
            Retype Password:
          </Label>
          <Input
            className="mb-3 flex w-full items-center border-solid border-black px-5 py-3 text-black"
            type="password"
            placeholder="Re-type new password"
            value={retypedPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setRetypedPassword(e.target.value)
            }
          />
        </div>
        <Button
          type="button"
          onClick={handleChangePassword}
          className="my-4 me-2 bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-white dark:text-black dark:hover:bg-gray-700  dark:hover:text-white dark:focus:ring-gray-700"
        >
          Change Password
        </Button>
      </form>
    </ProfileLayout>
  );
};
export default EditPasswordPage;
