import defaultAvatar from "@/assets/default-avatar.jpg";
import classNames from "classnames";
import { twMerge } from "tailwind-merge";

interface AvatarProps {
  src?: string;
  alt?: string;
  isCircle?: boolean;
  isSignalShown?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  isCircle = true,
  isSignalShown = true,
  className = "",
  style = {},
  alt,
}) => {
  src = src?.length > 0 ? src : defaultAvatar;
  return (
    <div
      className={twMerge(
        "relative mx-auto h-8 w-8 hover:cursor-pointer",
        className,
      )}
    >
      <div className="relative mx-auto h-full w-full hover:cursor-pointer">
        <img
          className={classNames(
            `block h-full w-full border-none object-cover`,
            {
              "rounded-full": isCircle,
              rounded: !isCircle,
            },
          )}
          style={{ borderRadius: "100%", ...style }}
          src={src}
          alt={alt}
        />
        {isSignalShown && (
          <span
            className="absolute bottom-0 left-full h-3.5 w-3.5 -translate-x-full translate-y-1/4 
          transform rounded-full border-2 border-white bg-green-400 dark:border-gray-800"
          ></span>
        )}
      </div>
    </div>
  );
};

export default Avatar;
