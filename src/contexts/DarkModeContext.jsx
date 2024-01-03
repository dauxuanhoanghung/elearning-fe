import { createContext, useContext, useEffect, useState } from "react";

// Create a context with default value 'false' (light mode)
const DarkModeContext = createContext({
  isDarkMode: false,
  setDarkMode: () => {},
});

export const useDarkMode = () => useContext(DarkModeContext);

export const DarkModeProvider = (props) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const theme = localStorage.getItem("is-dark-tw-theme");
    return theme === "true";
  });

  useEffect(() => {
    if (isDarkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
  }, [isDarkMode]);

  const setDarkMode = (value) => {
    setIsDarkMode(value);
    localStorage.setItem("is-dark-tw-theme", value + "");
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
      {props.children}
    </DarkModeContext.Provider>
  );
};
