import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

import { Loader } from "lucide-react";

import { setUser } from "@/app/store/userSlice";
import SpinnerOverlay from "@/components/common/SpinnerOverlay";
import { Avatar } from "@/components/ui";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { userService } from "@/services";
import ProfileLayout from "./ProfileLayout";

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();

  // #region input avatar
  const [backgroundImageURL, setBackgroundImageURL] = useState<string>("");
  const handleBackgroundImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const backgroundImage = e.target.files[0];
    if (backgroundImage == null) {
      setBackgroundImageURL("");
      setUserInfo({ ...userInfo, avatarFile: null });
      return;
    }
    setUserInfo({ ...userInfo, avatarFile: backgroundImage });
    setBackgroundImageURL(URL.createObjectURL(backgroundImage));
  };
  // #endregion
  const { showSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  // #region User info
  const [loading, setLoading] = useState<boolean>(true);
  const [userInfo, setUserInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatar: "",
    avatarFile: null,
  });
  const getUser = async () => {
    const res = await userService.getCurrentUser();
    console.log(res);
    const data = res.data;
    if (res.status === 200) {
      setUserInfo({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatarFile: null,
        username: data.username,
        avatar: data.avatar,
      });
      dispatch(setUser(data));
    }
    setLoading(false);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, files } = e.target;
    setUserInfo((prevUser) => {
      if (type === "file") {
        return { ...prevUser, [name]: files[0] };
      } else {
        return { ...prevUser, [name]: value };
      }
    });
  };

  const validateForm = () => {
    if (!userInfo.username || userInfo.username.trim() === "") {
      showSnackbar({ message: "Username is required.", severity: "error" });
      return false;
    }
    if (!userInfo.firstName || userInfo.firstName.trim() === "") {
      showSnackbar({ message: "First name is required.", severity: "error" });
      return false;
    }
    if (!userInfo.lastName || userInfo.lastName.trim() === "") {
      showSnackbar({ message: "Last name is required.", severity: "error" });
      return false;
    }
    if (!userInfo.email || userInfo.email.trim() === "") {
      showSnackbar({ message: "Email is required.", severity: "error" });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    }
    const request = new FormData();
    for (let field in userInfo)
      if (field !== "avatarFile") request.append(field, userInfo[field].trim());
    if (userInfo["avatarFile"])
      request.append("avatarFile", userInfo.avatarFile);
    const res = await userService.updateAccount(request);
    setLoading(false);
    if (res.data.status === 200) {
      getUser();
    }
  };
  // #endregion
  useEffect(() => {
    document.title = "My Profile";
    getUser();
  }, []);

  return (
    <>
      {loading && <SpinnerOverlay />}
      <ProfileLayout title="Profile">
        <div className="mx-auto my-4 w-[90%]">
          <div className="flex w-full justify-center">
            <Avatar
              isSignalShown={false}
              src={userInfo.avatar}
              className="my-4 h-28 w-28"
            />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="username"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("signup.username")}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                     focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                      dark:focus:ring-blue-500 sm:text-sm"
                  type="text"
                  name="username"
                  value={userInfo?.username}
                  id="username"
                  disabled
                  onChange={handleInputChange}
                  placeholder="Your username"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("login.yourEmail")}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                    focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                     dark:focus:ring-blue-500 sm:text-sm"
                  type="text"
                  name="email"
                  id="email"
                  value={userInfo?.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label
                  htmlFor="firstName"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("signup.firstName")}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                    focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                     dark:focus:ring-blue-500 sm:text-sm"
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={userInfo?.firstName}
                  onChange={handleInputChange}
                  placeholder="Your first name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  {t("signup.lastName")}
                </label>
                <input
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                    focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                     dark:focus:ring-blue-500 sm:text-sm"
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={userInfo?.lastName}
                  onChange={handleInputChange}
                  placeholder="Your last name"
                  required
                />
              </div>
              <div className="col-span-2">
                <input
                  className="hidden"
                  type="file"
                  id="avatarInput"
                  accept="image/*"
                  onChange={handleBackgroundImageUpload}
                />
                <label htmlFor="avatarInput" className="cursor-pointer">
                  {backgroundImageURL ? (
                    <>
                      <span className="text-sm">Your avatar</span>
                      <img
                        src={backgroundImageURL}
                        alt="Avatar Preview"
                        className="mt-2 h-48 w-48 rounded-full object-cover"
                      />
                    </>
                  ) : (
                    <div className="flex h-36 min-h-24 items-center justify-center rounded-md border border-gray-300">
                      <span className="text-sm">Add your new avatar here</span>
                    </div>
                  )}
                </label>
              </div>
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  disabled={loading}
                >
                  {loading && <Loader />}
                  Update Info
                </button>
              </div>
            </div>
          </form>
        </div>
      </ProfileLayout>
    </>
  );
};

export default ProfilePage;
