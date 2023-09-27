import {
  Alert,
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Slide,
  Snackbar,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../contexts/UserContext";
import { isEmptyObject } from "../../utils/utils";

function TransitionLeft(props) {
  return <Slide {...props} direction="left" />;
}
/**
 *
 * @param {id, name, description, background, countRegistration, user} props: Card
 * @returns
 */
const CourseCard = (props) => {
  const { id, name, description, background, countRegistration, user } = props;
  const { user: currentUser } = useContext(UserContext);
  // #region Snackbar
  const [snackState, setSnackState] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleClose = () => {
    setSnackState(false);
  };
  // #endregion
  // #region Favorites
  const [favorites, setFavorites] = useState(false);
  const handleToggleFavorite = () => {
    if (!isEmptyObject(currentUser)) {
      setFavorites((prev) => !prev);
      setSnackState({
        open: true,
        message: favorites
          ? "Add to favorites success"
          : "Remove from favorites success",
        severity: favorites ? "success" : "info",
      });
    } else {
      setSnackState({ open: true, message: "Please login first", severity: "error" });
    }
  };
  useEffect(() => {}, []);
  // #endregion

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia component="img" height="194" image={background} alt={name} />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#eee" }} aria-label="recipe">
              {user?.avatar}
            </Avatar>
          }
          title={`${user?.firstName} ${user?.lastName}`}
        />
        <CardActions disableSpacing>
          <IconButton
            aria-label="add to favorites"
            onClick={handleToggleFavorite}
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
      <Snackbar
        open={snackState.open}
        autoHideDuration={1000}
        onClose={handleClose}
        TransitionComponent={TransitionLeft}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleClose}
          severity={snackState.severity}
          sx={{ width: "100%" }}
        >
          {snackState.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CourseCard;
