import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedChatUser: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    changeChatUser: (state, action) => {
      state.selectedChatUser = action?.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeChatUser } = chatSlice.actions;

export default chatSlice.reducer;
