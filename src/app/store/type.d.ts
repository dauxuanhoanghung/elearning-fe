interface ChatState {
  selectedChatInfo: {
    user?: any; // Type for user
    group?: any; // Type for group
  };
  isGroup: boolean;
}

interface UserState {
  isLogin: boolean;
  user: Record<string, any>; // Adjust the type according to your user object structure
}
