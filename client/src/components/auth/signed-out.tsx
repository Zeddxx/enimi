import { useAuth } from "@/context";
import { cn } from "@/lib/utils";

const SignedOut = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) return null;
  return <div className={cn(className)}>{children}</div>;
};
export default SignedOut;
