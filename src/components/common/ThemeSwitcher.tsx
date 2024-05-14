import { DarkThemeIcon, LightThemeIcon } from "@/components/Icons";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { useDebounce } from "@/hooks/useDebounce";

interface ThemeSwitcherProps {
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = (props) => {
  const { className } = props;
  const { isDarkMode, setDarkMode } = useDarkMode();
  const changeTheme = useDebounce(() => {
    setDarkMode(!isDarkMode);
  }, 300);

  return (
    <button
      onClick={changeTheme}
      className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {isDarkMode && <DarkThemeIcon className={className} />}
      {!isDarkMode && <LightThemeIcon className={className} />}
    </button>
  );
};

export default ThemeSwitcher;
