import { RefObject, useEffect, useRef, useState } from "react";

const useDropdown = (): [boolean, () => void, RefObject<HTMLDivElement>] => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleBlur = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleBlur);
    }

    return () => {
      document.removeEventListener("click", handleBlur);
    };
  }, [isOpen]);

  return [isOpen, toggleDropdown, dropdownRef];
};

export default useDropdown;
