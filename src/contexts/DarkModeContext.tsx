import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface DarkModeContextType {
  isDarkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

// Create a context with default value 'false' (light mode)
const DarkModeContext = createContext<DarkModeContextType>({
  isDarkMode: false,
  setDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider: React.FC<{ children: ReactNode }> = (props) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const theme = localStorage.getItem("is-dark-tw-theme");
    return theme === "true";
  });

  useEffect(() => {
    if (isDarkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [isDarkMode]);

  const setDarkMode = (value: boolean) => {
    setIsDarkMode(value);
    localStorage.setItem("is-dark-tw-theme", value + "");
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
