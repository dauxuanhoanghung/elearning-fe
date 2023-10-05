import React, { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Comment from "./Comment"; // Assuming you have a Comment component
import {
  Button,
  InputAdornment,
  TextField,
  Typography,
  List,
  ListItem,
  Divider,
  IconButton,
} from "@mui/material";
import courseCommentService from "../../services/courseCommentService";
import { lectureCommentService } from "../../services";
import { useSnackbar } from "../../contexts/SnackbarContext";

const CommentContainer = (props) => {
  const { showSnackbar } = useSnackbar();
  const { comments = [], setComments, courseId, lectureId, blogId, getMoreComments, page } =
    props;
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    // Handle comment submission here, e.g., send to a server, update state, etc.
    // You can add your logic here to save the new comment.
    console.log("New Comment:", newComment);
    if (courseId) {
      const request = { content: newComment, course: courseId };
      const res = await courseCommentService.createComment(request);
      setComments([newComment, ...comments]);
      console.log(comments)
    } else if (lectureId) {
      const request = { content: newComment, lecture: lectureId };
      const res = await lectureCommentService.createComment(request);
      setComments([newComment, ...comments]);
      console.log(comments)
      console.log(res)
    } else if (blogId) {
    }
    if (res.data.status === 201) {
      setNewComment("");
      showSnackbar({ message: "Comment successfully created", severity: "success" });
    }
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        rows={4}
        value={newComment}
        onChange={handleCommentChange}
        onKeyUp={(e) => e.keyCode === 13 && handleCommentSubmit()}
        style={{ marginTop: "16px" }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={handleCommentSubmit}>
                <SendOutlinedIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {page !== -1 && (
        <Button onClick={getMoreComments} variant="text">
          See more...
        </Button>)}
      <List>
        {comments.map((comment, index) => (
          <React.Fragment key={comment.id}>
            <ListItem>
              <Comment {...comment} />
            </ListItem>
            {index < comments.length - 1 && (
              <Divider variant="inset" component="li" />
            )}
          </React.Fragment>
        ))}
      </List>
    </>
  );
};

export default CommentContainer;
