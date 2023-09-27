import React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import Comment from "../Comment"; // Assuming you have a Comment component
import { Button, TextField } from "@mui/material";

const comments = [
  {
    id: 1,
    user: { name: "John Doe", avatar: "avatar_url_1" },
    text: "This is the first comment.",
    createdDate: "September 27, 2023",
  },
  {
    id: 2,
    user: { name: "Jane Smith", avatar: "avatar_url_2" },
    text: "This is the second comment.",
    createdDate: "September 28, 2023",
  },
  // Add more comments here
];

const CommentContainer = (props) => {
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = () => {
    // Handle comment submission here, e.g., send to a server, update state, etc.
    // You can add your logic here to save the new comment.
    console.log("New Comment:", newComment);
    setNewComment("");
  };

  return (
    <Paper elevation={3} style={{ padding: "16px" }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <TextField
        label="Add a comment"
        variant="outlined"
        fullWidth
        multiline
        rows={4}
        value={newComment}
        onChange={handleCommentChange}
        style={{ marginTop: "16px" }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleCommentSubmit}
        style={{ marginTop: "8px" }}
      >
        Submit Comment
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
    </Paper>
  );
};

export default CommentContainer;
