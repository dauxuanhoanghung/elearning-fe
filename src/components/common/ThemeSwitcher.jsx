import { DarkThemeIcon, LightThemeIcon } from "@/components/Icons";
import { useDarkMode } from "@/contexts/DarkModeContext";

const ThemeSwitcher = () => {
  const { isDarkMode, setDarkMode } = useDarkMode();
  const changeTheme = () => {
    setDarkMode(!isDarkMode);
  };

  return (
    <button onClick={changeTheme}>
      {isDarkMode && <DarkThemeIcon />}
      {!isDarkMode && <LightThemeIcon />}
    </button>
  );
};

export default ThemeSwitcher;
