import { Theme } from "@radix-ui/themes";
import type { ThemeOwnProps } from "@radix-ui/themes/props";

import { type ReactNode } from "react";
import { AppThemeContext } from "../context/theme.context";
import { useLocalStorage } from "../hooks/use-local-storage";

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage<ThemeOwnProps["appearance"]>(
    "theme",
    "light"
  );
  const [color, setColor] = useLocalStorage<ThemeOwnProps["accentColor"]>(
    "color",
    "tomato"
  );

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <AppThemeContext.Provider value={{ color, theme, setColor, toggleTheme }}>
      <Theme appearance={theme} accentColor={color}>
        {children}
      </Theme>
    </AppThemeContext.Provider>
  );
};
