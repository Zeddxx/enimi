import { useCurrentUserQuery, useVerifyTokenQuery } from "@/redux/auth";
import { ICurrentUser } from "@/types/user.types";
import { createContext } from "react";

interface InitialContextType {
  isLoading: boolean;
  user: ICurrentUser | null;
  isLoggedIn: boolean;
}

const initialContext: InitialContextType = {
  isLoading: false,
  user: null,
  isLoggedIn: false,
};

const AuthContext = createContext<InitialContextType>(initialContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { isError } = useVerifyTokenQuery();
  const { data, isLoading } = useCurrentUserQuery();
  return (
    <AuthContext.Provider
      value={{
        user: data ?? null,
        isLoading,
        isLoggedIn: !isError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }