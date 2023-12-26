import { Box, Divider, List, ListItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import firebaseService from "@/app/firebase/firebaseService";
import { changeChatUser } from "@/app/store/chatSlice";
import UserInfo from "./UserInfo";

const UserChatList = () => {
  const currentUser = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const handleChangeChatUser = (user) => {
    dispatch(
      changeChatUser({ ...user, createdAt: user.createdAt.toDate().toString() })
    );
  };
  const [chatUsers, setChatUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersHaveChatWithCurrentUser =
          await firebaseService.getUsersHaveChatWithCurrentUser(currentUser.id);
        setChatUsers(usersHaveChatWithCurrentUser || []);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, [currentUser.id]);
  return (
    <>
      <Box
        sx={{
          width: "25%",
          height: "100%",
          backgroundColor: "#eee",
          overflow: "scroll",
        }}
      >
        <List>
          {chatUsers.map((user) => (
            <React.Fragment key={user.id}>
              <ListItem
                disablePadding
                onClick={() => handleChangeChatUser(user)}
              >
                <UserInfo {...user} />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </Box>
    </>
  );
};

export default UserChatList;
