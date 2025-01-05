import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useAppTheme } from "@store/lib/hooks/use-app-theme";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useAppTheme();

  return (
    <IconButton variant="outline" onClick={() => toggleTheme()}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
