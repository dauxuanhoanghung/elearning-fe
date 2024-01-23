import classNames from "classnames";
import React from "react";

import { ChevronDown } from "@/components/Icons";
import { useBoolean } from "@/hooks/useBoolean";

const Accordion = ({ title, children }) => {
  const { value, toggle } = useBoolean(false);

  return (
    <div className="w-full bg-gray-300 text-gray-900 hover:bg-gray-500 dark:bg-gray-600 dark:text-gray-50">
      <div
        className="flex cursor-pointer items-center justify-between px-4 py-2 md:px-8"
        onClick={toggle}
      >
        <div className="text-lg">{title}</div>
        <div>
          {value ? (
            <ChevronDown />
          ) : (
            <ChevronDown className="rotate-180 transition-all" />
          )}
        </div>
      </div>
      <div
        className={classNames(
          "overflow-hidden border-t border-gray-700 transition-[max-height] duration-300 dark:border-gray-300",
          {
            "max-h-96": value,
            "max-h-0": !value,
          },
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Accordion;
