import {
  clearLS,
  getProfileFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from "@/utils/auth";
import { createSlice } from "@reduxjs/toolkit";

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
    loginFailed: (state, action) => {
      state.isLogin = false;
      state.user = {};
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
export const { login, loginFailed, logout, setUser, loadFromLocalStorage } =
  userSlice.actions;

export default userSlice.reducer;
