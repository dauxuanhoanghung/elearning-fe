import React, { ReactNode, createContext, useContext, useState } from "react";

interface OpenChatDrawerContextType {
  openChatDrawer: boolean;
  handleOpenChatDrawer: () => void;
  handleCloseChatDrawer: () => void;
  setOpenChatDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const OpenChatDrawerContext = createContext<OpenChatDrawerContextType>({
  openChatDrawer: false,
  handleOpenChatDrawer: () => {},
  handleCloseChatDrawer: () => {},
  setOpenChatDrawer: () => {},
});

export const useOpenChatDrawer = () => {
  return useContext(OpenChatDrawerContext);
};

export const OpenChatDrawerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [openChatDrawer, setOpenChatDrawer] = useState<boolean>(false);

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
