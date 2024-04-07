import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import Avatar from "../ui/Avatar";

const LecturerCard = (props) => {
  const { lecturer } = props;
  const { courseCount = 0, avatar, firstName, lastName } = lecturer;
  const { t } = useTranslation();

  const toLecturerUrl = (lecturer) => {
    const slug = lecturer?.slug ? lecturer.slug : lecturer.username;
    return `/user/${slug}`;
  };

  return (
    <Link
      to={toLecturerUrl(lecturer)}
      className="flex gap-8 rounded-lg border border-gray-500 bg-white p-4 shadow-md dark:bg-gray-800"
    >
      <div>
        <Avatar src={avatar} className="h-16 w-16" isSignalShown={false} />
      </div>
      <div>
        <h3 className="text-lg font-medium text-black dark:text-white">
          {firstName + " " + lastName}
        </h3>
        <p className="mt-2 text-gray-700 dark:text-gray-600">
          {courseCount} Courses
        </p>
      </div>
    </Link>
  );
};

export default LecturerCard;
