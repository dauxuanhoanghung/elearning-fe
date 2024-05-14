import { LoaderIcon } from "lucide-react";
import { twMerge } from "tailwind-merge";

const SpinnerOverlay: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <LoaderIcon
        className={twMerge(
          "animate-spin text-black dark:text-white",
          className,
        )}
        size={48}
      />
    </div>
  );
};

export default SpinnerOverlay;
