import { Theme } from "@radix-ui/themes";
import type { ThemeOwnProps } from "@radix-ui/themes/props";
import { ThemeProvider } from "next-themes";
import { useRef, type ReactNode } from "react";
import { AppThemeContext } from "../context/theme.context";
import { useLocalStorage } from "../hooks/use-local-storage";

export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
  const themeRef = useRef<HTMLDivElement>(null);
  const [color, storeColor] = useLocalStorage<ThemeOwnProps["accentColor"]>(
    "color",
    "tomato"
  );

  const setColor = (color: ThemeOwnProps["accentColor"]) => {
    storeColor(color);

    if (themeRef.current) {
      themeRef.current.dataset.accentColor = color;
    }
  };

  return (
    <ThemeProvider attribute="class">
      <AppThemeContext.Provider value={{ color, setColor }}>
        <Theme ref={themeRef} accentColor={color}>
          {children}
        </Theme>
      </AppThemeContext.Provider>
    </ThemeProvider>
  );
};
