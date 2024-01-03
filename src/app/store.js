import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import chatSlice from "./store/chatSlice";
import userSlice from "./store/userSlice";

const persistUserConfig = {
  key: "user",
  storage,
};

const userReducer = combineReducers({
  user: userSlice,
});

const persistedReducer = persistReducer(persistUserConfig, userReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
