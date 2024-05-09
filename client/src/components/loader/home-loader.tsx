import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";

const HomeLoader = () => {
  return (
    <section className="min-h-[calc(100dvh-80px)] w-full">
      <div className="max-w-screen-2xl mx-auto w-full">
        <Skeleton className="h-[50vw] pl-0 rounded-none max-h-[620px] min-h-72 w-full" />
      </div>

      <div className="max-w-screen-2xl mx-auto px-4 mt-4 w-full">
        <div className="flex justify-between items-center">
          <div className="">
            <h2 className="text-4xl font-semibold">Popular</h2>
            <p className="text-muted-foreground text-sm">
              List of popular animes.
            </p>
          </div>

          <div className="flex items-center h-12 relative">
            <Button variant="default" className="md:w-24 rounded-none" disabled>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button variant="default" className="md:w-24 rounded-none" disabled>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="flex w-full h-64 overflow-hidden gap-x-3 my-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton className="h-full w-52 shrink-0 rounded-none" key={index} />
            ))}
        </div>
      </div>
    </section>
  );
};
export default HomeLoader;
