import type { ThemeOwnProps } from "@radix-ui/themes/props";
import { createContext, type Context } from "react";

type ThemeContextType = {
  toggleTheme: () => void;
  theme: ThemeOwnProps["appearance"];
  color: ThemeOwnProps["accentColor"];
  setColor: (color: ThemeOwnProps["accentColor"]) => void;
};

export const ThemeContext: Context<ThemeContextType | undefined> =
  createContext<ThemeContextType | undefined>(undefined);
