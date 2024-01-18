import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";

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
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Link
          style={{ cursor: "pointer", textDecoration: "none" }}
          to={`/course/${id}/view`}
        >
          <CardMedia
            component="img"
            height="194"
            image={background}
            alt={name}
          />
        </Link>
        <CardContent sx={{ paddingY: 0 }}>
          <Typography variant="h6" color="text.primary">
            {name}
          </Typography>
        </CardContent>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: "#eee" }}
              aria-label="recipe"
              src={user.avatar}
              alt={user.firstName}
            >
              {user?.avatar}
            </Avatar>
          }
          title={`${user?.firstName} ${user?.lastName}`}
          sx={{ paddingY: 0 }}
        />
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleToggleFavorite}
          >
            {favorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <Link
            style={{ cursor: "pointer", textDecoration: "none" }}
            to={`/course/${id}/view`}
          >
            <Button>Go to course</Button>
          </Link>
        </CardActions>
      </Card>
    </>
  );
};

export default CourseCard;
