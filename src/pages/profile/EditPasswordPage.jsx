import { useState } from "react";

import ProfileLayout from "./ProfileLayout";

const EditPasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
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
      if (newPassword.length < 8) {
        isValid = false;
        errorMessage = "New password must be at least 8 characters long.";
      } else if (!/[a-z]/g.test(newPassword) || !/[A-Z]/g.test(newPassword)) {
        isValid = false;
        errorMessage =
          "New password must contain both lowercase and uppercase letters.";
      } else if (!/\d/.test(newPassword)) {
        isValid = false;
        errorMessage = "New password must contain at least one digit.";
      } else if (newPassword !== retypedPassword) {
        isValid = false;
        errorMessage = "New passwords do not match.";
      }
    }
    if (!isValid) {
      alert(errorMessage);
      return;
    }
    const data = {
      currentPassword,
      newPassword,
    };
    try {
      const response = await fetch("/api/change-password", {
        method: "POST", // Adjust method based on your API
        headers: { "Content-Type": "application/json" }, // Adjust headers if needed
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Password changed successfully!");
        // Handle successful password change (e.g., clear inputs)
        setCurrentPassword("");
        setNewPassword("");
        setRetypedPassword("");
      } else {
        alert("Error changing password. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again.");
    }
  };
  return (
    <ProfileLayout title="Change password">
      <div className="mx-auto w-[90%] flex-col justify-center">
        <p className="font-bold">Email:</p>
        <div className="mb-3 flex items-center border-2 border-solid border-black bg-white px-5 py-3 text-black">
          <span className="">
            Your email address is <b>2051052103phuc@ou.edu.vn</b>
          </span>
          <button class="ml-2 bg-gray-600 px-4 py-2 text-white">Edit</button>
        </div>
        <hr class="w-py my-8 h-px border-0 bg-gray-200 dark:bg-gray-700" />
        <p className="font-bold">Password:</p>
        <input
          className="mb-3 flex w-full items-center border-2 border-solid border-black px-5 py-3 text-black"
          type="password"
          placeholder="Enter current password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          className="mb-3 flex w-full items-center border-2 border-solid border-black px-5 py-3 text-black"
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <input
          className="mb-3 flex w-full items-center border-2 border-solid border-black px-5 py-3 text-black"
          type="password"
          placeholder="Re-type new password"
          value={retypedPassword}
          onChange={(e) => setRetypedPassword(e.target.value)}
        />
        <button
          onClick={handleChangePassword}
          className="dark:border-gray-70 my-4 mb-2 me-2 bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:bg-slate-400 dark:text-zinc-700 dark:hover:bg-gray-700  dark:hover:text-white dark:focus:ring-gray-700"
        >
          Change Password
        </button>
      </div>
    </ProfileLayout>
  );
};
export default EditPasswordPage;
