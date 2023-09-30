import { createSlice } from "@reduxjs/toolkit";
import {
  clearLS,
  getProfileFromLS,
  setAccessTokenToLS,
  setProfileToLS,
  setRefreshTokenToLS,
} from "../../../utils/auth";

const initialState = {
  isLogin: Object.keys(getProfileFromLS()) === 0 ? true : false,
  user: getProfileFromLS() || {},
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
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
