import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatInfo: {}, // bao gom user, group
  isGroup: false,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChatUser: (state, action) => {
      state.selectedChatInfo = action?.payload;
      state.isGroup = false;
    },
    changeChatGroup: (state, action) => {
      state.selectedChatInfo = action?.payload;
      state.isGroup = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeChatUser, changeChatGroup } = chatSlice.actions;

export default chatSlice.reducer;
