import { DarkThemeIcon, LightThemeIcon } from "@/components/Icons";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useDebounce } from "@/hooks/useDebounce";

const ThemeSwitcher = () => {
  const { isDarkMode, setDarkMode } = useDarkMode();
  const changeTheme = useDebounce(() => {
    setDarkMode(!isDarkMode);
  }, 300);

  return (
    <button onClick={changeTheme}>
      {isDarkMode && <DarkThemeIcon />}
      {!isDarkMode && <LightThemeIcon />}
    </button>
  );
};

export default ThemeSwitcher;
