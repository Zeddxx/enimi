import React from "react";

type InitialContextType = {
  theme: string | undefined;
  toggleTheme: () => void;
};

const initialContext: InitialContextType = {
  theme: undefined,
  toggleTheme: () => {},
};

const ThemeContext = React.createContext<InitialContextType>(initialContext);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = React.useState<string | undefined>(() => {
    const storedTheme = localStorage.getItem("enimi");

    return storedTheme ? storedTheme : undefined;
  });

  React.useEffect(() => {
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

    // check if theme is in local storage or not!
    const storedTheme = localStorage.getItem("enimi");
    if (storedTheme && storedTheme !== theme) {
      setTheme(storedTheme);
    }

    // Cleanup
    return () => {
      systemDarkModeQuery.removeEventListener(
        "change",
        handleSystemThemeChange
      );
    };
  }, []);

  React.useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.style.colorScheme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.colorScheme = "light";
    }

    return () => {
      document.documentElement.classList.remove("dark", "light");
    };
  }, [theme]);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("enimi", newTheme);
      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
