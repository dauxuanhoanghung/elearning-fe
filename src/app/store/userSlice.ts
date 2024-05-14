import { clearLS, setAccessTokenToLS, setRefreshTokenToLS } from "@/utils/auth";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  isLogin: false,
  user: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string }>) => {
      setAccessTokenToLS(action?.payload?.token);
      setRefreshTokenToLS(action?.payload?.token);
      state.isLogin = true;
    },
    loginFailed: (state) => {
      state.isLogin = false;
      state.user = {};
    },
    setUser: (state, action: PayloadAction<ICurrentUser>) => {
      // setProfileToLS(action?.payload);
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
export const { login, loginFailed, logout, setUser } = userSlice.actions;

export default userSlice.reducer;
