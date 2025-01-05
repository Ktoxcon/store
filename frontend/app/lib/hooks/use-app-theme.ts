import { useContext } from "react";
import { AppThemeContext } from "../context/theme.context";

export function useAppTheme() {
  const themeContext = useContext(AppThemeContext);

  if (!themeContext) {
    throw new Error("useAppTheme must be used within an AppThemeProvider");
  }

  return themeContext;
}
