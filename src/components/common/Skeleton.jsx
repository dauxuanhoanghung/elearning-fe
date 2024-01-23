import { CircleAvatarIcon, LoadingImageIcon } from "../Icons/index";

const Skeleton = (props) => {
  const { isRow = true, className } = props;

  if (isRow)
    return (
      <div className="flex select-none flex-col gap-5 rounded-sm bg-white p-2 shadow-lg dark:bg-gray-600 sm:h-56 sm:flex-row">
        <div className="flex h-full animate-pulse items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-700 sm:h-full sm:w-72">
          <LoadingImageIcon />
        </div>
        <div className="flex flex-1 flex-col gap-5 sm:p-2">
          <div className="flex flex-1 flex-col gap-3">
            <div className="flex justify-between gap-3">
              <div className="h-12 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
              <div className="h-12 w-1/5 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
            </div>
            <div className="h-3 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-3 w-full animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-700"></div>
          </div>
          <div className="mt-auto flex gap-3">
            <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="h-8 w-20 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div className="ml-auto h-8 w-40 animate-pulse rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="w-full animate-pulse rounded border border-gray-200 p-2 shadow dark:border-gray-700 dark:bg-gray-600">
        <div className="mb-2 flex h-36 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
          <LoadingImageIcon />
        </div>
        <div className="mb-2 h-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mb-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700"></div>
        <div className="mt-4 flex items-center">
          <CircleAvatarIcon />
          <div className="h-8 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
        </div>
      </div>
    );
};

export default Skeleton;
