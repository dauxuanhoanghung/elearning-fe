// userReducer.js
const initialState = {
  user: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "LOGOUT_USER":
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default userReducer;
