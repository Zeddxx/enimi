import React from "react";
import { AuthContext } from "./auth-context";
import { ThemeContext } from "./theme-context";

export const useTheme = () => React.useContext(ThemeContext);
export const useAuth = () => React.useContext(AuthContext);