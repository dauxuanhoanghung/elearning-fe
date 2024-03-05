import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "@/app/store/userSlice";
import logo from "@/assets/logo.png";
import {
  AppsIcon,
  FindIcon,
  NotificationIcon,
  SidebarIcon,
} from "@/components/Icons";
import { Avatar } from "@/components/ui";
import useDropdown from "@/hooks/useDropdown";
import {
  BillingsIcon,
  LogoutIcon,
  MultiUsersIcon,
  ProfileIcon,
  SettingsIcon,
} from "../Icons/index";
import Menu from "../ui/Menu";

const avtOptions = [
  {
    href: "/profile",
    key: "profile",
  },
  {
    href: "/settings",
    key: "settings",
  },
];

const appOptions = [
  {
    key: "admin.home.users",
    href: "/admin/users",
    icon: MultiUsersIcon,
  },
  {
    key: "admin.home.profile",
    href: "/admin/profile",
    icon: ProfileIcon,
  },
  {
    key: "admin.home.settings",
    href: "/admin/settings",
    icon: SettingsIcon,
  },
  {
    key: "admin.home.invoices",
    href: "/admin/invoices",
    icon: BillingsIcon,
  },
  {
    key: "admin.home.logout",
    href: "/logout",
    icon: LogoutIcon,
  },
];

const AdminNavbar = (props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // #region action user
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  const [openAvatar, toggleOpenAvatar, avatarRef] = useDropdown();
  // #endregion
  // #region search
  const [searchKw, setSearchKw] = useState("");
  const handleSearchChange = (e) => {
    setSearchKw(e.target.value);
  };
  const handleEnter = (event) => {
    if (event.keyCode === 13 && searchKw.trim().length > 0) {
      history.push(`/search/${searchKw}`);
      setSearchKw("");
    }
  };
  // #endregion
  // #region Apps
  const [openNoti, toggleNoti, notiRef] = useDropdown();
  // #endregion
  // #region Notification
  const [openApp, toggleApp, appRef] = useDropdown();
  // #endregion

  // #region sidebar interactive
  const { setOpenSidebar } = props;
  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };
  // #endregion

  return (
    <nav className="fixed z-30 w-full bg-white shadow-sm dark:bg-gray-900">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              className="mr-4 cursor-pointer rounded p-2 text-gray-600
             hover:bg-gray-100 hover:text-gray-900 lg:inline"
              onClick={toggleSidebar}
            >
              <SidebarIcon />
            </button>
            <Link to="/admin" className="flex items-center">
              <img src={logo} className="mr-3 h-9" />
              <span className="hidden self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:block">
                Education
              </span>
            </Link>
            <form className="hidden lg:block lg:pl-8">
              <div className="relative mt-1 lg:w-80">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <FindIcon />
                </div>
                <input
                  value={searchKw}
                  onChange={handleSearchChange}
                  onKeyDown={handleEnter}
                  type="search"
                  className="z-20 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 
                  text-sm text-black focus:border-sky-500 focus:ring-blue-500 dark:border-gray-800
                  dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-sky-500"
                  placeholder={t("header.searchPlaceholder")}
                  required
                />
              </div>
            </form>
          </div>
          <div className="flex items-center md:mr-10">
            <button
              id="toggleSidebarMobileSearch"
              type="button"
              className="rounded-2xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            >
              <FindIcon className="h-6 w-6" />
            </button>
            <button
              type="button"
              ref={notiRef}
              onClick={toggleNoti}
              className="rounded-2xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="sr-only">View notifications</span>
              <NotificationIcon />
            </button>
            <Menu open={openNoti} className="left-[60%] top-12 min-w-[32rem]  ">
              <div className="block bg-gray-50 px-4 py-2 text-center text-base font-medium text-gray-700">
                Notifications
              </div>
              <div>
                <a
                  href="#"
                  className="flex border-b px-4 py-3 hover:bg-gray-100"
                >
                  <div className="flex-shrink-0">
                    <img
                      className="h-11 w-11 rounded-full"
                      src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/bonnie-green.png"
                      alt="Jese image"
                    />
                    <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-fuchsia-600">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z"></path>
                        <path d="M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full pl-3">
                    <div className="mb-1.5 text-sm font-normal text-gray-500">
                      New message from
                      <span className="font-semibold text-gray-900">
                        Bonnie Green
                      </span>
                      : "Hey, what's up? All set for the presentation?"
                    </div>
                    <div className="text-xs font-medium text-fuchsia-500">
                      a few moments ago
                    </div>
                  </div>
                </a>
                <a href="#" className="flex px-4 py-3 hover:bg-gray-100">
                  <div className="flex-shrink-0">
                    <img
                      className="h-11 w-11 rounded-full"
                      src="https://demos.creative-tim.com/soft-ui-flowbite-pro/images/users/robert-brown.png"
                      alt="Robert image"
                    />
                    <div className="absolute -mt-5 ml-6 flex h-5 w-5 items-center justify-center rounded-full border border-white bg-purple-500">
                      <svg
                        className="h-3 w-3 text-white"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"></path>
                      </svg>
                    </div>
                  </div>
                  <div className="w-full pl-3">
                    <div className="mb-1.5 text-sm font-normal text-gray-500">
                      <span className="font-semibold text-gray-900">
                        Robert Brown
                      </span>
                      posted a new video: Glassmorphism - learn how to implement
                      the new design trend.
                    </div>
                    <div className="text-xs font-medium text-fuchsia-500">
                      3 hours ago
                    </div>
                  </div>
                </a>
              </div>
              <a
                href="#"
                className="block bg-gray-50 py-2 text-center text-base font-normal text-gray-900 hover:bg-gray-100"
              >
                <div className="inline-flex items-center ">
                  <svg
                    className="mr-2 h-5 w-5 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  View all
                </div>
              </a>
            </Menu>
            <button
              type="button"
              onClick={toggleApp}
              ref={appRef}
              className="rounded-2xl p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <span className="sr-only">Apps</span>
              <AppsIcon />
            </button>
            <Menu open={openApp} className="left-[70%] top-12 min-w-[20rem]">
              <div className="grid grid-cols-3 gap-4 p-4">
                {appOptions.map((opt, idx) => (
                  <Link
                    key={idx}
                    to={opt.href}
                    className="block rounded-2xl p-4 text-center text-gray-500 
                    hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600"
                  >
                    <opt.icon className="mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {t(opt.key)}
                    </div>
                  </Link>
                ))}
              </div>
            </Menu>
            <div className="ml-3">
              <div
                className="relative"
                onClick={toggleOpenAvatar}
                ref={avatarRef}
              >
                <Avatar src={currentUser.avatar} />
                <Menu open={openAvatar} className="-left-full top-6">
                  <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div>{currentUser.firstName}</div>
                    <div className="truncate font-medium">
                      {currentUser.email}
                    </div>
                  </div>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    {avtOptions.map((opt, idx) => (
                      <li key={idx}>
                        <Link
                          to={opt.href}
                          className="block px-4 py-2 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600"
                        >
                          {t(`header.${opt.key}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200
                     dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Sign out
                    </button>
                  </div>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
