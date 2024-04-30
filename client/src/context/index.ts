import { useContext } from "react";
import { AuthContext } from "./auth-context";
import { ThemeContext } from "./theme-context";

export const useTheme = () => useContext(ThemeContext);
export const useAuth = () => useContext(AuthContext);