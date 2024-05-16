import { Link } from "react-router-dom";

import Avatar from "@/components/ui/Avatar";
import { twMerge } from "tailwind-merge";
import { MultiUsersIcon } from "../Icons/index";

interface CourseCardProps {
  id: number;
  name: string;
  description: string;
  background: string;
  countRegistration: number;
  user: {
    avatar: string;
    firstName: string;
    lastName: string;
    [key: string]: any;
  };
  isSearchPage?: boolean;
}

/**
 *
 * @param {id, name, description, background, countRegistration, user} props: Card
 * @returns
 */
const CourseCard: React.FC<CourseCardProps> = (props) => {
  const {
    id,
    name,
    description,
    background,
    countRegistration,
    user,
    isSearchPage = false,
  } = props;

  return (
    <div
      title={name}
      className="relative w-full rounded border border-gray-200 shadow dark:border-gray-700 dark:bg-gray-600"
    >
      <Link
        to={`/course/${id}/view`}
        className={twMerge(isSearchPage ? "flex" : "")}
      >
        <div
          className={twMerge(
            "flex items-center justify-center rounded bg-gray-300 dark:bg-gray-700",
            isSearchPage ? "max-h-60 w-[40%]" : "mb-2 h-36",
          )}
        >
          <img
            className="h-full w-full object-cover"
            src={background}
            alt={name}
          />
        </div>
        <div
          className={twMerge(
            "p-2 text-gray-900 dark:text-gray-50",
            isSearchPage ? "w-[60%]" : "",
          )}
        >
          <div className="mb-2 min-h-12 text-justify text-lg font-extrabold">
            {name}
          </div>
          <div className="mb-2 max-h-[5rem] min-h-[3rem] overflow-hidden text-justify text-sm">
            {description}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-start">
            <Avatar
              src={user.avatar}
              isSignalShown={false}
              className="mx-4 h-10 w-10 "
            />
            <div className="flex h-10 items-center text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</div>
          </div>
          <div className="mt-4 flex items-end">
            <MultiUsersIcon />
            <span className="ml-2">{countRegistration + " students"}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
