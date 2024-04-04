import React, { useState } from "react";
import { Link } from "react-router-dom";

const menuItems = [
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Change Password",
    href: "/edit-password",
  },
  {
    label: "Setting",
    href: "/settings",
  },
  {
    label: "Close account",
    href: "/delete-account",
  },
];

const Sidebar = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (idx) => {
    setSelectedItem(idx);
  };

  return (
    <div className="h-fit w-64 text-black dark:border-gray-200">
      <ul>
        {menuItems.map(({ label, href }, idx) => (
          <li key={idx} onClick={() => handleItemClick(idx)}>
            <Link to={href}>
              <span
                className={`block cursor-pointer p-4 text-black hover:bg-gray-800 hover:text-white 
            dark:text-white dark:hover:bg-gray-600 dark:hover:text-gray-100
             ${selectedItem === idx ? "bg-gray-800 text-white  dark:bg-gray-600 dark:text-gray-100" : ""}`}
              >
                {label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
