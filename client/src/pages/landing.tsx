import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="w-full">
      <div className="max-w-screen-2xl mx-auto w-full px-4">
        <div className="w-full max-w-6xl mx-auto min-h-[calc(100dvh-80px)] flex flex-col items-center justify-center">
          <h1 className="text-[clamp(1.7rem,7vw,3.8rem)] text-center font-semibold">
            Explore, Watch, Stay Updated, Save or Share with others.
          </h1>

          <p className="text-center text-muted-foreground">
            Watch your favorite anime without any anoying ads and popups. Not only this save anime to watch them later with mern functionality.
          </p>

          <div className="flex gap-3 mt-3 max-w-xl w-full">
          <Link to="/home" className={cn(buttonVariants({ className: "w-full" }))}>
            Explore.
          </Link>
          <Link to="/login" className={cn(buttonVariants({ className: "w-full", variant: "outline"}))}>
            Login.
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Landing;
