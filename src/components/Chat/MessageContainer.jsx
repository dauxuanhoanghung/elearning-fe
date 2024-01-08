import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import {
  and,
  collection,
  limit,
  onSnapshot,
  or,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { db } from "@/app/firebase/config";
import firebaseService from "@/app/firebase/firebaseService";
import Message from "./Message";

const MessageContainer = () => {
  const currentUser = useSelector((state) => state.user.user);
  const selectedChatUser = useSelector((state) => state.chat.selectedChatUser);
  // #region Chat message input
  const [message, setMessage] = useState("");
  const sendMessage = async () => {
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }
    await firebaseService.addDocument("messages", {
      text: message,
      senderId: currentUser.id,
      recipientId: selectedChatUser.id,
    });
    setMessage("");
  };
  // #endregion
  // #region messages show
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    if (!selectedChatUser) return;
    console.log("current user: ", currentUser);
    console.log("selected chat user: ", selectedChatUser);
    const callQuery = query(
      collection(db, "messages"),
      or(
        and(
          where("senderId", "==", currentUser.id),
          where("recipientId", "==", selectedChatUser.id),
        ),
        and(
          where("senderId", "==", selectedChatUser.id),
          where("recipientId", "==", currentUser.id),
        ),
      ),
      orderBy("createdAt", "desc"),
      limit(15),
    );
    console.log("callQuery", callQuery);
    const unsubscribe = onSnapshot(callQuery, (QuerySnapshot) => {
      console.log(QuerySnapshot);
      const fetchedMessages = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), id: doc.id });
      });
      setMessages([...fetchedMessages].reverse());
    });

    return () => {
      unsubscribe();
    };
  }, [selectedChatUser]);
  // #endregion
  if (!selectedChatUser)
    return (
      <>
        <Typography>Choose a user to chat</Typography>
      </>
    );

  return (
    <>
      <Grid container>
        <Grid sm={12} minHeight="80vh">
          <Box overflowX={"scroll"} width="100%">
            {messages.map((msg, index) => (
              <React.Fragment key={index}>
                <Message {...msg} />
              </React.Fragment>
            ))}
            {messages?.length === 0 && (
              <>
                <Typography overflow="none" variant="subtitle2">
                  Begin your chat with {selectedChatUser.firstName}
                </Typography>
              </>
            )}
          </Box>
        </Grid>
        <Grid sm={12}>
          <Box>
            <TextField
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyUp={(e) => {
                if (e.keyCode === 13) {
                  sendMessage();
                }
              }}
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={sendMessage}>
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default MessageContainer;
