import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import Avatar from "@/components/ui/Avatar";
import { useSnackbar } from "@/contexts/SnackbarContext";
import { favoriteService } from "@/services";
import { isEmptyObject } from "@/utils/utils";

/**
 *
 * @param {id, name, description, background, countRegistration, user} props: Card
 * @returns
 */
const CourseCard = (props) => {
  const { id, name, description, background, countRegistration, user } = props;
  const currentUser = useSelector((state) => state.user.user);
  // #region Snackbar
  const { showSnackbar } = useSnackbar();
  // #endregion
  // #region Favorites
  const [favorites, setFavorites] = useState(false);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current && !favorites) {
      firstRender.current = false;
      const getInitialFavorite = async () => {
        const res = await favoriteService.fetchInitialFavorite(id);
        if (res.data.data) {
          setFavorites(true);
        }
      };
      getInitialFavorite();
      return;
    }
  }, [favorites]);
  const handleToggleFavorite = async () => {
    if (!isEmptyObject(currentUser)) {
      setFavorites((prev) => !prev);
      const res = await favoriteService.toggle({ course: id });
      const fav = res.status !== 204;
      showSnackbar({
        message: fav
          ? "Add to favorites success"
          : "Remove from favorites success",
        severity: fav ? "success" : "info",
      });
    } else {
      showSnackbar({
        message: "Please login first",
        severity: "error",
      });
    }
  };

  // #endregion

  return (
    <div
      title={name}
      className="relative w-full rounded border border-gray-200 shadow dark:border-gray-700 dark:bg-gray-600"
    >
      <Link to={`/course/${id}/view`}>
        <div className="mb-2 flex h-36 items-center justify-center rounded bg-gray-300 dark:bg-gray-700">
          <img
            className="h-full w-full object-cover"
            src={background}
            alt={name}
          />
        </div>
        <div className="p-2 text-gray-900 dark:text-gray-50">
          <div className="min-h-12 mb-2 text-justify text-lg font-extrabold">
            {name}
          </div>
          <div className="mb-2 max-h-[5rem] min-h-[3rem] overflow-hidden text-justify text-sm">
            {description}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-start">
            <Avatar
              src={user.avatar}
              isSignalShown={true}
              className="mx-4 h-10 w-10 "
            />
            <div className="flex h-10 items-center text-xl font-semibold">{`${user.firstName} ${user.lastName}`}</div>
          </div>
          <div className="mt-4 flex items-center">
            <div className="h-8 w-full rounded-full bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
