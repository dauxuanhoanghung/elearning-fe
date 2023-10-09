import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./store/user/userSlice";
import chatSlice from "./store/user/chatSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    chat: chatSlice,
  },
});
