import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "focus:ring-blue-600dark:border-gray-600 block w-full rounded-lg border border-gray-300 bg-gray-50 px-3.5 py-2.5 text-gray-900 focus:border-blue-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
