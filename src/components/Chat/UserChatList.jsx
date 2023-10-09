import { Avatar, Box, Divider, List, ListItem, Typography } from "@mui/material";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../app/firebase/config";
import { changeUser } from "../../app/store/user/chatSlice";

const UserChatList = () => {
  const currentUser = useSelector(state => state.user.user);
  const dispatch = useDispatch();
  const handleChangeChatUser = (user) => {
    dispatch(changeUser({ ...user, createdAt: user.createdAt.toDate().toString() }))
    console.log(user)
  }
  const [chatUsers, setChatUsers] = useState([]);
  useEffect(() => {
    const q = query(
      collection(db, 'users'),
      where('userId', '!=', currentUser.id),
      limit(8)
    );

    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const users = [];
        console.log(querySnapshot)
        querySnapshot.forEach((doc) => {
          users.push(doc.data());
        });
        setChatUsers(users);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, [currentUser.id]);
  return <>
    <Box sx={{ width: "25%", height: "100%", backgroundColor: "#eee", overflow: "scroll" }}>
      <List>
        {chatUsers.map((user) => (
          <React.Fragment key={user.userId}>
            <ListItem disablePadding onClick={() => handleChangeChatUser(user)}>
              <Avatar alt={user.name} src={user.avatar} />
              <Typography variant="body1" sx={{ marginLeft: 2 }}>
                {user.displayName}
              </Typography>
            </ListItem>
            <Divider />
          </React.Fragment>
        ))}
      </List>

    </Box>
  </>
}

export default UserChatList;