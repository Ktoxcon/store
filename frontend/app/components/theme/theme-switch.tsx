import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import { useTheme } from "@store/lib/hooks/use-theme-context";

export function ThemeSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton variant="outline" onClick={() => toggleTheme()}>
      {theme === "dark" ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
}
