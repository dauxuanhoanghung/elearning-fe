import defaultAvatar from "@/assets/default-avatar.jpg";

const Avatar = ({
  src,
  isCircle = true,
  isSignalShown = true,
  className = "",
  style = {},
}) => {
  src = src?.length > 0 ? src : defaultAvatar;
  return (
    <div className="relative px-2 hover:cursor-pointer">
      <img
        className={`inline-block h-8 w-8 border-none
            ${className} 
            ${isCircle ? "rounded-full" : "rounded"}`}
        style={{ borderRadius: "100%", ...style }}
        src={src}
        alt=""
      />
      {isSignalShown && (
        <span
          className="absolute bottom-0 left-8 h-3.5 w-3.5 translate-y-1/4 transform 
        rounded-full border-2 border-white bg-green-400 dark:border-gray-800"
        ></span>
      )}
    </div>
  );
};

export default Avatar;
