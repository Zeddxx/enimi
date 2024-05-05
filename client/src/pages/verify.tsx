import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Verified } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

const Verify = () => {
  const [searchParams] = useSearchParams();

  const status = searchParams.get("status");
  const message = searchParams.get("message");

  return (
    <section>
      <div className="max-w-screen-2xl min-h-[calc(100dvh-80px)] grid place-items-center w-full mx-auto px-4">
        {status === "success" && (
          <div className="max-w-sm w-full">
            <p className="flex items-center text-center w-full gap-2 text-2xl">
              Account verified successfully.{" "}
              <Verified className="text-primary" />
            </p>
            {message && (
              <span className="text-muted-foreground">{message}</span>
            )}
            <Link
              to="/login"
              className={cn(buttonVariants({ className: "w-full my-2" }))}
            >
              Login
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="max-w-sm w-full">
            <p className="flex capitalize text-center w-full justify-center items-center gap-2 text-2xl">
              {message} ⚠️
            </p>
            <Link
              to="/register"
              className={cn(buttonVariants({ className: "w-full my-2" }))}
            >
              Register Again
            </Link>
          </div>
        )}

        {!status && (
          <div className="max-w-sm w-full">
            <p className="flex capitalize text-center w-full justify-center items-center gap-2 text-2xl">
              Something went wrong with verification link!
            </p>
            <p className="text-muted-foreground text-center">
              Please contact the developer!
            </p>
            {/* <a href="https://github.com/Zeddxx" target="_blank" className="mx-auto w-fit text-center block">
              Github.
            </a> */}
            <Link
              to="https://github.com/Zeddxx"
              target="_blank"
              className={cn(buttonVariants({ className: "w-full my-2" }))}
            >
              GitHub.
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
export default Verify;
