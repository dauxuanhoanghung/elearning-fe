import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import chatSlice from "./store/chatSlice";
import roomSlice from "./store/roomSlice";
import userSlice from "./store/userSlice";

const persistUserConfig = {
  key: "user",
  storage,
};

const persistedReducer = persistReducer(persistUserConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    chat: chatSlice,
    room: roomSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: {
  //       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
  //       ignoredPaths: ["room.mainStream"],
  //     },
  //   }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const getStore = () => store;
export let persistor = persistStore(store);
