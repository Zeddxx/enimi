import { LoaderIcon } from "lucide-react";
import React from "react";
import { useInView } from "react-intersection-observer";

interface LoadMoreProps {
  fetchNextPage: () => void;
}

const LoadMore = ({ fetchNextPage }: LoadMoreProps) => {
  const { ref, inView } = useInView();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div
      ref={ref}
      className="max-w-screen-2xl w-full mx-auto px-4 mt-4 flex justify-center"
    >
      <span className="text-primary">
        <LoaderIcon className="animate-spin  h-8 w-8" />
      </span>
    </div>
  );
};
export default LoadMore;
