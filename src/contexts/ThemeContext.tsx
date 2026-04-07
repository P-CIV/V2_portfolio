import { useEffect, useState } from "react";
import { ThemeContext, type Theme } from "./ThemeContextValue";

const getSystemTheme = (): Theme => {
  if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
};

const getStoredTheme = (): Theme | null => {
  try {
    return localStorage.getItem("theme") as Theme;
  } catch {
    return null;
  }
};

const setStoredTheme = (theme: Theme): void => {
  try {
    localStorage.setItem("theme", theme);
  } catch {
    console.warn("localStorage is not available");
  }
};

const removeStoredTheme = (): void => {
  try {
    localStorage.removeItem("theme");
  } catch {
    console.warn("localStorage is not available");
  }
};

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const stored = getStoredTheme();
    return stored || getSystemTheme();
  });

  const [isAutoTheme, setIsAutoTheme] = useState<boolean>(() => {
    return !getStoredTheme();
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleSystemThemeChange = (e: MediaQueryListEvent): void => {
      if (isAutoTheme) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleSystemThemeChange);
      return () => mediaQuery.removeEventListener("change", handleSystemThemeChange);
    }
  }, [isAutoTheme]);

  const toggleTheme = (): void => {
    setTheme((prev) => {
      const newTheme = prev === "dark" ? "light" : "dark";
      setStoredTheme(newTheme);
      setIsAutoTheme(false);
      return newTheme;
    });
  };

  const setAutoTheme = (): void => {
    removeStoredTheme();
    setIsAutoTheme(true);
    setTheme(getSystemTheme());
  };

  const cycleTheme = (): void => {
    if (isAutoTheme) {
      // Auto → Light
      setTheme("light");
      setStoredTheme("light");
      setIsAutoTheme(false);
    } else if (theme === "light") {
      // Light → Dark
      setTheme("dark");
      setStoredTheme("dark");
      setIsAutoTheme(false);
    } else {
      // Dark → Auto
      removeStoredTheme();
      setIsAutoTheme(true);
      setTheme(getSystemTheme());
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setAutoTheme, cycleTheme, isAutoTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};