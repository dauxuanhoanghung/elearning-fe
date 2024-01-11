import { forwardRef } from "react";

const Menu = forwardRef((props, ref) => {
  const { children, open, className } = props;

  return (
    <div
      ref={ref}
      className={`absolute left-1/2 top-1/2 z-[100] mt-2 w-40 rounded-sm border border-gray-100
       bg-white shadow-lg focus:outline-none dark:border-gray-600 dark:bg-gray-800 ${className}`}
      role="menu"
      tabindex="-1"
      style={{ display: !open && "none" }}
    >
      {children}
    </div>
  );
});

export default Menu;
