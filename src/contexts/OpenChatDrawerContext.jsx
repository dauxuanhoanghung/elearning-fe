import React, { createContext, useContext, useState } from "react";

const OpenChatDrawerContext = createContext();

export const useOpenChatDrawer = () => {
  return useContext(OpenChatDrawerContext);
};

export const OpenChatDrawerProvider = ({ children }) => {
  const [openChatDrawer, setOpenChatDrawer] = useState(false);

  const handleOpenChatDrawer = () => {
    setOpenChatDrawer(true);
  };

  const handleCloseChatDrawer = () => {
    setOpenChatDrawer(false);
  };

  return (
    <OpenChatDrawerContext.Provider
      value={{
        openChatDrawer,
        handleOpenChatDrawer,
        handleCloseChatDrawer,
        setOpenChatDrawer,
      }}
    >
      {children}
    </OpenChatDrawerContext.Provider>
  );
};
