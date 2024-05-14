interface ChatState {
  selectedChatInfo: {
    user?: any; // Type for user
    group?: any; // Type for group
  };
  isGroup: boolean;
}

interface UserState {
  isLogin: boolean;
  user?: any; // Adjust the type according to your user object structure
}
