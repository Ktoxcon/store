import { Theme } from "@radix-ui/themes";
import type { ThemeOwnProps } from "@radix-ui/themes/props";

import { useRef, type ReactNode } from "react";
import { AppThemeContext } from "../context/theme.context";
import { useLocalStorage } from "../hooks/use-local-storage";

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeRef = useRef<HTMLDivElement>(null);
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
      <Theme ref={themeRef} appearance={theme} accentColor={color}>
        {children}
      </Theme>
    </AppThemeContext.Provider>
  );
};
