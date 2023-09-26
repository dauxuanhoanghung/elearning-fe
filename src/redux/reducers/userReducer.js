import {
  FETCH_USER_SUCCESS,
  FETCH_USER_LOGIN,
  FETCH_USER_ERROR,
  USER_LOGOUT,
  USER_REFRESH,
} from "../actions/userAction";

const INITIAL_STATE = {
  account: { email: "", },
  accessToken: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };

    case FETCH_USER_SUCCESS:
      return {
        ...state,
        account: {
          email: action.data.email,
          token: action.data.token,
          auth: true,
        },
        isLoading: false,
        isError: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        account: {
          auth: false,
        },
        isLoading: false,
        isError: true,
      };
    case USER_LOGOUT:
      localStorage.removeItem("reqres-token");
      localStorage.removeItem("reqres-email");
      return {
        ...state,
        account: {
          email: "",
          auth: false,
          token: "",
        },
      };
    case USER_REFRESH:
      return {
        ...state,
        account: {
          email: localStorage.getItem("reqres-email"),
          auth: true,
          token: localStorage.getItem("reqres-token"),
        },
      };
    default:
      return state;
  }
};

export default userReducer;
