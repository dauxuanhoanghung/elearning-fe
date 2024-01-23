import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { logout } from "@/app/store/userSlice";
import logo from "@/assets/logo.png";
import {
  ChevronDown,
  FacebookIcon,
  FindIcon,
  InstagramIcon,
  TwitterIcon,
} from "@/components/Icons";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/common";
import { Avatar } from "@/components/ui";
import useDropdown from "@/hooks/useDropdown";
import { isEmptyObject, isLecturer } from "@/utils/utils";

const socialMedia = [
  {
    icon: FacebookIcon,
    href: "https://www.facebook.com/",
  },
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/",
  },
  {
    icon: TwitterIcon,
    href: "https://twitter.com/",
  },
];

const navItems = [
  {
    href: "/",
    key: "Home",
    isAuthenticated: false,
    isLecturer: false,
  },
  {
    href: "/my-course",
    key: "my-course",
    isAuthenticated: true,
    isLecturer: false,
  },
  {
    href: "/my-favorite",
    key: "my-favorite",
    isAuthenticated: true,
    isLecturer: false,
  },
  {
    href: "/my-business",
    key: "my-business",
    isAuthenticated: true,
    isLecturer: true,
  },
  {
    href: "/register-lecturer",
    key: "register-lecturer",
    isAuthenticated: false,
    isLecturer: false,
  },
];

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

const Header = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // #region sticky
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set isSticky to true when scrolling down, and false when scrolling up
      setSticky(window.scrollY > 177);
    };
    // Attach the event listener to the scroll event
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // #endregion

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

  const [openCategories, setOpenCategories] = useState(false);
  const toggleOpenCategories = () => {
    setOpenCategories((prev) => !prev);
  };
  const handleOpenCategoriesBlur = () => {
    setOpenCategories(false);
  };
  // #endregion

  const FirstNav = ({ classes }) => {
    return (
      <nav
        className={classNames(
          "border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-800",
          classes,
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between px-4 py-2.5 md:px-6">
          <Link to="/" className="flex items-center">
            <img src={logo} className="mr-3 h-6 sm:h-9" />
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
              Education
            </span>
          </Link>
          <div className="flex flex-wrap items-center">
            {socialMedia.map((social, idx) => (
              <Link
                key={idx}
                to={social.href}
                className="hidden items-center rounded-lg p-2 text-sm font-medium text-gray-500 
                hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-600 sm:inline-flex"
              >
                <social.icon />
              </Link>
            ))}
            <span className="ml-1 mr-0 h-5 w-0.5 bg-gray-200 dark:bg-gray-600 lg:ml-3 lg:mr-1.5 lg:inline"></span>
            <LanguageSwitcher />
            <span className="mx-0 h-5 w-0.5 bg-gray-200 dark:bg-gray-600 lg:mx-1.5 lg:inline"></span>
            {isEmptyObject(currentUser) ? (
              <>
                {[
                  { href: "/login", key: "header.login" },
                  { href: "/signup", key: "header.signup" },
                ].map((link, idx) => (
                  <Link
                    key={idx}
                    to={link.href}
                    className="ml-2 w-20 text-sm font-medium text-sky-600 hover:bg-gray-50 
                    hover:underline dark:text-sky-500 dark:hover:bg-gray-700"
                  >
                    {t(link.key)}
                  </Link>
                ))}
              </>
            ) : (
              <div
                ref={avatarRef}
                className="relative"
                onClick={toggleOpenAvatar}
              >
                <Avatar src={currentUser.avatar} />
                <div
                  className="absolute left-[-100%] top-[110%] z-10 hidden w-32 divide-y divide-gray-100 rounded-lg bg-white shadow 
                  dark:divide-gray-600 dark:bg-gray-700 md:left-0 md:w-44"
                  style={{ display: openAvatar && "block" }}
                >
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
                </div>
              </div>
            )}
            <span className="ml-1 mr-0 h-5 w-0.5 bg-gray-200 dark:bg-gray-600 lg:ml-3 lg:mr-1.5 lg:inline"></span>
            <ThemeSwitcher />
          </div>
        </div>
      </nav>
    );
  };

  return (
    <header className="shadow-md transition-all">
      {isSticky && (
        <FirstNav classes="fixed top-0 z-50 w-full shadow opacity-95" />
      )}
      <FirstNav />
      <nav className="border-b border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700">
        <div className="mx-auto grid max-w-7xl px-4 py-4 md:px-6 lg:grid-cols-2">
          <form className="mb-4 flex lg:order-2 lg:mb-0">
            <label
              className="mb-2 h-[1px] w-[1px] overflow-hidden whitespace-nowrap 
              text-sm font-medium text-gray-50 dark:text-gray-300"
            >
              Search
            </label>
            <div
              onBlur={handleOpenCategoriesBlur}
              onClick={toggleOpenCategories}
              className="relative z-10 hidden shrink-0 items-center rounded-l-lg border border-gray-300 
              bg-gray-100 px-4 py-2.5 text-center text-sm font-medium text-black hover:bg-gray-200 
              dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 md:block"
            >
              <span className="md:inline-flex">
                All categories
                <ChevronDown />
              </span>
              <div
                className="absolute left-[-1rem] top-12 z-10 hidden w-44 divide-y-[1px] rounded-sm 
                border-gray-300 bg-white shadow dark:bg-gray-700"
                style={{
                  display: openCategories && "block",
                }}
              >
                <ul className="p-1 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 
                        dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Mockups
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="inline-flex w-full px-4 py-2 hover:bg-gray-100 
                        dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Templates
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="relative w-full">
              <input
                value={searchKw}
                onChange={handleSearchChange}
                onKeyDown={handleEnter}
                type="search"
                className="z-20 block w-full rounded-lg border border-gray-300 bg-gray-50
                p-2.5 text-sm text-black focus:border-sky-500 dark:border-gray-800 
                dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-400 
                dark:focus:border-sky-500 md:rounded-l-none md:border-l-4 md:border-l-gray-50"
                placeholder={t("header.searchPlaceholder")}
                required
              />
              <button
                type="submit"
                className="absolute right-0 top-0 mt-[0.667px] rounded-r-lg border border-blue-700 bg-blue-700 
                p-2.5 text-sm font-medium text-white hover:bg-blue-800  dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <FindIcon />
              </button>
            </div>
          </form>
          <div className="order-1 flex items-center">
            <ul className="mt-0 flex flex-row text-sm font-medium">
              {navItems
                .filter(
                  (item) =>
                    !item.isAuthenticated ||
                    (item.isAuthenticated && !isEmptyObject(currentUser)) ||
                    (item.isLecturer && isLecturer(currentUser)),
                )
                .map((item, idx) => (
                  <li key={idx}>
                    <Link
                      to={item.href}
                      className="mx-0.5 px-2 text-black hover:text-blue-600 dark:text-white dark:hover:text-blue-500"
                    >
                      {t(`header.${item.key}`)}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
