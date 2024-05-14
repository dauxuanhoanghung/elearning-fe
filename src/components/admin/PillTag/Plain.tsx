import React from "react";
import { twMerge } from "tailwind-merge";

const PillTagPlain: React.FC<{
  small: boolean;
  className?: string;
  icon?: any;
  [props: string]: any;
}> = ({ small = false, className = "", icon: Icon, ...props }) => {
  return (
    <div
      className={twMerge(
        "inline-flex items-center capitalize leading-none",
        small ? "text-xs" : "text-sm",
        className,
      )}
    >
      {props.icon && (
        <Icon
          path={props.icon}
          h="h-4"
          w="w-4"
          className={small ? "mr-1" : "mr-2"}
          size={small ? 14 : null}
        />
      )}
      {props.label && <span>{props.label}</span>}
    </div>
  );
};

export default PillTagPlain;
