import React, { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import Comment from "../Comment"; // Assuming you have a Comment component
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

const CommentContainer = (props) => {
  const { comments = [], setComments, courseId, lectureId, blogId, getCommentsByCourseId } =
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
      console.log(request);
      const res = await courseCommentService.createComment(request);
      console.log(res.data.data)
      setComments([newComment, ...comments]);
      console.log(comments)
    } else if (lectureId) {
    } else if (blogId) {
    }
    setNewComment("");
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
      <Button onClick={getCommentsByCourseId} variant="text">
        See more...
      </Button>
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
