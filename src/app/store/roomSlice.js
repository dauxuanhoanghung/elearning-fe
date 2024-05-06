import { createSlice } from "@reduxjs/toolkit";
import { createOffer, updatePreference } from "../peerConnection";

const servers = {
  iceServers: [
    {
      urls: [
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
        "stun:stun.services.mozilla.com",
      ],
    },
  ],
  iceCandidatePoolSize: 10,
};

const generateColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const roomSlice = createSlice({
  name: "room",
  initialState: {
    mainStream: null,
    participants: {},
    currentUser: null,
  },
  reducers: {
    setMainStream: (state, action) => {
      console.log("setMainStream", { ...state }, action);
      state.mainStream = action.payload.mainStream;
      console.log("setMainStream.state", state);
    },
    addParticipant: (state, action) => {
      console.log("addParticipant", { ...state }, action);

      let newUser = action.payload;
      const currentUserId = Object.keys(state.currentUser)[0];
      const newUserId = Object.keys(newUser)[0];

      if (state.mainStream && currentUserId !== newUserId) {
        newUser = addConnection(newUser, state.currentUser, state.mainStream);
      }

      if (currentUserId === newUserId) newUser[newUserId].currentUser = true;
      newUser[newUserId].avatarColor = generateColor();
      state.participants = { ...state.participants, ...newUser };
      console.log("addParticipant", state);
    },
    setUser: (state, action) => {
      console.log("setuser", { ...state }, action);
      let payload = action.payload;
      let participants = { ...state.participants };
      const userId = Object.keys(payload)[0];
      payload[userId].avatarColor = generateColor();
      // initializeListensers(userId);
      // state = {
      //   ...state,
      //   currentUser: { ...payload },
      //   participants,
      // };
      state.currentUser = { ...payload };
      state.participants = participants;
      console.log("setUser.state", state);
    },
    removeParticipant: (state, action) => {
      delete state.participants[action.payload.id];
      console.log("removeParticipant", state);
    },
    updateUser: (state, action) => {
      console.log("updateUser", state, action);
      const userId = Object.keys(state.currentUser)[0];
      updatePreference(userId, action.payload.currentUser);
      console.log("updateUser", state, action);
      state.currentUser[userId] = {
        ...state.currentUser[userId],
        ...action.payload.currentUser,
      };
      console.log("updateUser", state);
    },
    updateParticipant: (state, action) => {
      const newUserId = Object.keys(action.payload)[0];
      state.participants[newUserId] = {
        ...state.participants[newUserId],
        ...action.payload[newUserId],
      };
      console.log("updateParticipant", state);
    },
  },
});

const addConnection = (newUser, currentUser, stream) => {
  const peerConnection = new RTCPeerConnection(servers);
  stream.getTracks().forEach((track) => {
    peerConnection.addTrack(track, stream);
  });
  const newUserId = Object.keys(newUser)[0];
  const currentUserId = Object.keys(currentUser)[0];

  const offerIds = [newUserId, currentUserId].sort((a, b) =>
    a.localeCompare(b),
  );

  newUser[newUserId].peerConnection = peerConnection;
  if (offerIds[0] !== currentUserId)
    createOffer(peerConnection, offerIds[0], offerIds[1]);
  return newUser;
};

export const {
  setMainStream,
  addParticipant,
  setUser,
  removeParticipant,
  updateUser,
  updateParticipant,
} = roomSlice.actions;
export default roomSlice.reducer;
