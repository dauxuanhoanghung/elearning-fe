import { Message } from "@mui/icons-material";
import { Box } from "@mui/material";
import { addDoc, and, collection, limit, onSnapshot, or, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const currentUser = useSelector(state => state.user.user);
  const selectedChatUser = useSelector(state => state.chat.selectedChatUser);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const sendMessage = async () => {
    if (message.trim() === '') {
      alert('Enter valid message');
      return;
    }
    const { id, firstName, lastName, avatar } = currentUser;
    await addDoc(collection(db, 'messages'), {
      text: message,
      senderId: currentUser.id,
      recipientId: [selectedChatUser.id]
    });
    setMessage('');
  };

  // useEffect(() => {
  //   const callQuery = query(
  //     collection(db, 'messages'),
  //     or(
  //       and(where('senderId', '==', profile.id), where('recipientId', '==', recipient.id)),
  //       and(where('senderId', '==', recipient.id), where('recipientId', '==', profile.id))
  //     ),
  //     orderBy('createdAt', 'desc'),
  //     limit(8)
  //   );

  //   const unsubscribe = onSnapshot(callQuery, (QuerySnapshot) => {
  //     console.log(QuerySnapshot);
  //     const fetchedMessages = [];
  //     QuerySnapshot.forEach((doc) => {
  //       fetchedMessages.push({ ...doc.data(), id: doc.id });
  //     });
  //     setMessages([...messages, ...fetchedMessages].reverse());
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [selectedChatUser]);
  return <>
    <Box padding={2} overflow={'scroll'} width="100%">
      {messages.map((msg, index) => (
        <Box sx={{ display: 'flex', width: '100%' }} justifyContent={msg.senderId === profile.id ? 'flex-end' : 'flex-start'}>
          {msg.senderId !== profile.id && (<Avatar sx={{ bgcolor: 'red' }} aria-label='recipe' src={recipient.avatar} />)}
          <Message key={index}
            message={msg.text}
            isMyMessage={msg.senderId === profile.id}
            width="100%"
          />
          {msg.senderId === profile.id && (<Avatar sx={{ bgcolor: 'red' }} aria-label='recipe' src={profile.avatar} />)}
        </Box>
      ))}
    </Box>
  </>
}

export default MessageContainer;