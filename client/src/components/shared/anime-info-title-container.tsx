import { Bookmark } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { IAnimeInfo } from "@/types";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

const AnimeInfoTitleContainer = ({ data }: { data: IAnimeInfo }) => {
  return (
    <div className="max-w-md lg:max-w-full w-full mx-auto">
      <h1 className="text-[clamp(1.3rem,5vw,2.3rem)] lg:text-start text-center font-medium lg:mt-0 my-3">
        {data.title.english ?? data.title.userPreferred}
      </h1>
      <div className="flex lg:justify-start items-center gap-2 flex-wrap justify-center">
        <p className="anime_utils">Episodes: {data?.episodes}</p>
        <p className="anime_utils">Type: {data?.format}</p>
        <p className="anime_utils">Rating: {data?.score.decimalScore}</p>
        <p className="anime_utils">Status: {data?.status}</p>
        <p className="anime_utils">Duration: {data?.duration}</p>
      </div>

      {/* ANIME CTA BUTTON */}
      <div className="w-full flex sm:flex-row flex-col gap-3 mt-3">
        <Link
          to={`/watch/${data?.anime_episodes[0].episodeId}`}
          className={cn(
            buttonVariants({
              className: "rounded-none w-full truncate",
            })
          )}
        >
          Watch - <span className="truncate ml-1">{data.title.english}</span>
        </Link>
        <Button
          className="rounded-none group w-full"
          variant="outline"
          size="icon"
        >
          <Bookmark className="h-4 w-4 group-hover:fill-primary text-primary transition-colors duration-300" />
          <span className="ml-2 block sm:hidden">Watch Later</span>
        </Button>
      </div>
    </div>
  );
};
export default AnimeInfoTitleContainer;
