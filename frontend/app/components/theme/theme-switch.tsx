import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();

  const handleThemeSwitchClick = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <IconButton variant="outline" onClick={handleThemeSwitchClick}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
