import { Theme } from "@radix-ui/themes";
import type { ThemeOwnProps } from "@radix-ui/themes/props";
import { type ReactNode } from "react";
import { ThemeContext } from "../context/theme.context";
import { useLocalStorage } from "../hooks/use-local-storage";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<ThemeOwnProps["appearance"]>(
    "theme",
    "dark"
  );
  const [color, setColor] = useLocalStorage<ThemeOwnProps["accentColor"]>(
    "color",
    "tomato"
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <ThemeContext.Provider value={{ theme, color, setColor, toggleTheme }}>
      <Theme appearance={theme} accentColor={color}>
        {children}
      </Theme>
    </ThemeContext.Provider>
  );
};
