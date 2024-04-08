import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Loader } from "lucide-react";

import { setUser } from "@/app/store/userSlice";
import { Spinner } from "@/components/common";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { userService } from "@/services";
import ProfileLayout from "./ProfileLayout";

const ProfilePage = (props) => {
  // #region input avatar
  const [backgroundImageURL, setBackgroundImageURL] = useState("");
  const handleBackgroundImageUpload = (e) => {
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
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState({
    id: "",
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    avatarFile: null,
  });
  const getUser = async () => {
    const res = await userService.getCurrentUser();
    const data = res.data;
    if (res.status === 200) {
      setUserInfo({
        id: data.id,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        avatarFile: null,
        username: data.username,
      });
      dispatch(setUser(data));
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
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
      {loading ? (
        <Spinner />
      ) : (
        <ProfileLayout title="Profile">
          <div className="mx-auto my-4 w-[90%]">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <input
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                     focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                      dark:focus:ring-blue-500 sm:text-sm"
                    type="text"
                    name="username"
                    value={userInfo?.username}
                    disabled
                    onChange={handleInputChange}
                    placeholder="Your username"
                    required
                  />
                </div>
                <div>
                  <input
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                    focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                     dark:focus:ring-blue-500 sm:text-sm"
                    type="text"
                    name="firstName"
                    value={userInfo?.firstName}
                    onChange={handleInputChange}
                    placeholder="Your first name"
                    required
                  />
                </div>
                <div>
                  <input
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                    focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                     dark:focus:ring-blue-500 sm:text-sm"
                    type="text"
                    name="lastName"
                    value={userInfo?.lastName}
                    onChange={handleInputChange}
                    placeholder="Your last name"
                    required
                  />
                </div>
                <div>
                  <input
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600
                    focus:ring-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500
                     dark:focus:ring-blue-500 sm:text-sm"
                    type="text"
                    name="email"
                    value={userInfo?.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                  />
                </div>
                <div>
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
                      <div className="flex h-24 items-center justify-center rounded-md border border-gray-300">
                        <span className="text-sm">
                          Add your new avatar here
                        </span>
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
      )}
    </>
  );
};

export default ProfilePage;
