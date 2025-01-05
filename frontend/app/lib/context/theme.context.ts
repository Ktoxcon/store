import type { ThemeOwnProps } from "@radix-ui/themes/props";
import { createContext, type Context } from "react";

type AppThemeContextType = {
  color: ThemeOwnProps["accentColor"];
  setColor: (color: ThemeOwnProps["accentColor"]) => void;
};

export const AppThemeContext: Context<AppThemeContextType | undefined> =
  createContext<AppThemeContextType | undefined>(undefined);
