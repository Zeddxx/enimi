import { useCurrentUserQuery, useVerifyTokenQuery } from "@/redux/auth";
import { ICurrentUser } from "@/types/user.types";
import { createContext, useEffect, useState } from "react";

interface InitialContextType {
  isLoading: boolean;
  user: ICurrentUser | null;
  isLoggedIn: boolean;
}

const initialContext: InitialContextType = {
  isLoading: true,
  user: null,
  isLoggedIn: false,
};

const AuthContext = createContext<InitialContextType>(initialContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authState, setAuthState] =
    useState<InitialContextType>(initialContext);
  const { isError } = useVerifyTokenQuery();
  const { data, isLoading } = useCurrentUserQuery();

  useEffect(() => {
    if (!isLoading) {
      setAuthState({
        user: data ?? null,
        isLoading,
        isLoggedIn: !isError,
      });
    }
  }, [data, isError, isLoading]);
  return (
    <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>
  );
};

export { AuthContext };
