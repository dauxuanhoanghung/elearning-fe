import React, { useState } from "react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
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

import Comment from "./Comment";
import { lectureCommentService, courseCommentService } from "@/services";
import { useSnackbar } from "@/contexts/SnackbarContext";

const CommentContainer = (props) => {
  const { showSnackbar } = useSnackbar();
  const {
    comments = [],
    setComments,
    courseId,
    lectureId,
    blogId,
    getMoreComments,
    page,
  } = props;
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    let res = null;
    if (courseId) {
      const request = { content: newComment, course: courseId };
      res = await courseCommentService.createComment(request);
      setComments([newComment, ...comments]);
    } else if (lectureId) {
      const request = { content: newComment, lecture: lectureId };
      res = await lectureCommentService.createComment(request);
      setComments([newComment, ...comments]);
    } else if (blogId) {
    }
    if (res?.data.status === 201) {
      setNewComment("");
      showSnackbar({
        message: "Comment successfully created",
        severity: "success",
      });
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
        </Button>
      )}
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
