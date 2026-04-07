import { createContext } from "react";

export type Theme = "dark" | "light";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
  setAutoTheme: () => void;
  cycleTheme: () => void;
  isAutoTheme: boolean;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
