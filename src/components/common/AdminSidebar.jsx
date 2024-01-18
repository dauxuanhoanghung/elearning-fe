import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

import {
  BillingsIcon,
  CourseIcon,
  FindIcon,
  HomeIcon,
  InboxIcon,
  MultiUsersIcon,
  ProfileIcon,
  SettingsIcon,
  StatsIcon,
} from "@/components/Icons";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

const sidebarOptions = [
  { key: "admin.sidebar.dashboard", icon: HomeIcon, href: "/admin" },
  { key: "admin.sidebar.users", icon: MultiUsersIcon, href: "/admin/users" },
  { key: "admin.sidebar.profile", icon: ProfileIcon, href: "/admin/profile" },
  {
    key: "admin.sidebar.settings",
    icon: SettingsIcon,
    href: "/admin/settings",
  },
  {
    key: "admin.sidebar.invoices",
    icon: BillingsIcon,
    href: "/admin/invoices",
  },
  { key: "admin.sidebar.inbox", icon: InboxIcon, href: "/admin/inbox" },
  { key: "admin.sidebar.courses", icon: CourseIcon, href: "/admin/courses" },
  { key: "admin.sidebar.stats", icon: StatsIcon, href: "/admin/stats" },
];

const AdminSidebar = (props) => {
  const { t } = useTranslation();
  const { open = true } = props;
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <aside
      className={classNames(
        `transition-width fixed left-0 top-0 z-20 flex h-full w-64 flex-shrink-0 flex-col pt-16 
        duration-200 lg:flex`,
        {
          "lg:w-64": open,
          "lg:w-16": !open,
        },
      )}
    >
      <div className="relative flex min-h-0 flex-1 flex-col bg-gray-50 pt-0 dark:bg-gray-700">
        <div className="flex flex-1 flex-col overflow-hidden overflow-y-auto pb-4 pt-8">
          <div
            className={classNames("flex-1 bg-gray-50 dark:bg-gray-700", {
              "px-3": open,
            })}
          >
            <ul className="pb-2 pt-1">
              <li>
                <form className="lg:hidden">
                  <label htmlFor="mobile-search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <FindIcon />
                    </div>
                    <input
                      type="text"
                      id="mobile-search"
                      className="text-dark-500 mb-2 block w-full rounded-lg border border-gray-300
                      bg-gray-50 p-2.5 pl-10 text-sm font-light focus:border-fuchsia-300 focus:ring-2 focus:ring-fuchsia-50"
                      placeholder="Search"
                    />
                  </div>
                </form>
              </li>
              {sidebarOptions.map((opt, idx) => (
                <li key={idx} className="my-1">
                  <Link
                    to={opt.href}
                    className={classNames(
                      `text-dark-500 group flex items-center rounded-lg py-2 text-base font-normal transition-all 
                      duration-200 hover:bg-gray-200 dark:hover:bg-gray-500`,
                      {
                        "bg-white shadow-lg shadow-gray-200 hover:bg-white":
                          pathname === opt.href,
                        "px-4": open,
                        "px-2": !open,
                      },
                    )}
                  >
                    <div
                      title={t(opt.key)}
                      className={classNames(
                        `mr-1 grid place-items-center rounded-lg p-2 text-center text-gray-800 shadow-lg 
                        shadow-gray-300 dark:bg-gray-700 dark:text-white dark:shadow-gray-600`,
                        {
                          "bg-fuchsia-500": pathname === opt.href,
                          "bg-white ": pathname !== opt.href,
                        },
                      )}
                    >
                      <opt.icon className="h-5 w-5" />
                    </div>
                    <span className="text-dark-500 ml-8 text-sm font-medium dark:text-gray-200">
                      {t(opt.key)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div
          className={classNames(
            "relative bottom-0 left-0 hidden w-full items-center justify-center gap-y-2 bg-gray-100 dark:bg-gray-800 lg:flex",
            {
              "flex-col py-4": !open,
              "space-x-4 p-4": open,
            },
          )}
        >
          <ThemeSwitcher className="h-7 w-7" />
          <a
            title="Settings"
            className="hover:text-dark-500 inline-flex cursor-pointer justify-center rounded p-2
             text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <SettingsIcon />
          </a>
          <LanguageSwitcher isAdminPage={true} showFull={open} />
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
