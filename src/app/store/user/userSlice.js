import { createSlice } from "@reduxjs/toolkit";
import {
  clearLS,
  getProfileFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from "@/utils/auth";

const initialState = {
  isLogin: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      setAccessTokenToLS(action?.payload?.token);
      setRefreshTokenToLS(action?.payload?.token);
      state.isLogin = true;
    },
    setUser: (state, action) => {
      setProfileToLS(action?.payload);
      state.user = action?.payload;
      state.isLogin = true;
    },
    logout: (state) => {
      clearLS();
      state.user = {};
      state.isLogin = false;
    },
    loadFromLocalStorage: (state, action) => {
      state.user = getProfileFromLS() || {};
      state.isLogin = Object.keys(getProfileFromLS()) === 0 ? true : false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setUser, loadFromLocalStorage } =
  userSlice.actions;

export default userSlice.reducer;
