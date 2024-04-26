import React, { createContext, useContext, useEffect, useState } from "react";

type InitialContextType = {
  theme: string | undefined;
  toggleTheme: () => void;
};

const initialTheme: InitialContextType = {
  theme: undefined,
  toggleTheme: () => {},
};

const ThemeContext = createContext<InitialContextType>(initialTheme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<string>();

  useEffect(() => {
    const handleSystemThemeChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      if (e.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    const systemDarkModeQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    handleSystemThemeChange(systemDarkModeQuery);

    // Listen for changes in system theme preference
    systemDarkModeQuery.addEventListener("change", handleSystemThemeChange);

    // Cleanup
    return () => {
      systemDarkModeQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark"
    } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.style.colorScheme = "light"
    }

    return () => {
      document.documentElement.classList.remove("dark", "light");
    };
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
