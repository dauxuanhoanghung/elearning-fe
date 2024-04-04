import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

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
    const data = res.data.data;
    if (res.data.status === 200) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(userInfo);
    const request = new FormData();
    for (let field in userInfo) request.append(field, userInfo[field]);
    // request.append("username", userInfo.username);
    // request.append("firstName", userInfo.firstName);
    // request.append("lastName", userInfo.lastName);
    // request.append("email", userInfo.email);
    if (userInfo.avatarFile) request.append("avatarFile", userInfo.avatarFile);
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
          <div className="mx-auto w-[90%]">
            <form onSubmit={handleSubmit}>
              <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <input
                    className="w-full rounded-md bg-gray-100 px-4 py-2"
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
                    className="w-full rounded-md bg-gray-100 px-4 py-2"
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
                    className="w-full rounded-md bg-gray-100 px-4 py-2"
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
                    className="w-full rounded-md bg-gray-100 px-4 py-2"
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
                    className="w-full rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                  >
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
