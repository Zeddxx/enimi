import { useEffect, useState } from "react"

const useTheme = () => {
    const [theme, setTheme] = useState<string>();
    useEffect(() => {
        const handleSystemThemeChange = (e: MediaQueryListEvent | MediaQueryList) => {
            if(e.matches) {
                setTheme("dark");
            }else {
                setTheme("light")
            }
        };

        const systemDarkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
        handleSystemThemeChange(systemDarkModeQuery);

        systemDarkModeQuery.addEventListener("change", handleSystemThemeChange);

        return () => {
            systemDarkModeQuery.removeEventListener("change", handleSystemThemeChange);
        }
    }, [])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    }

    return { theme, toggleTheme};
}
export default useTheme;