import { Button, buttonVariants } from "../ui/button";
import { IAnimeInfo } from "@/types/anime.types";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  useAddWatchLaterMutation,
  useGetWatchLaterQuery,
  useRemoveWatchLaterMutation,
} from "@/redux/user";
import { IoBookmarkOutline, IoBookmark } from "react-icons/io5";
import { useState } from "react";

const AnimeInfoTitleContainer = ({ data }: { data: IAnimeInfo }) => {
  const [addWatchLater] = useAddWatchLaterMutation();
  const [removeWatchLater] = useRemoveWatchLaterMutation();
  const { data: watchLater } = useGetWatchLaterQuery();

  const isInWatchList: boolean =
    watchLater?.some((a) => a.animeId === data.animeId) ?? false;
  const [isBookmarked, setIsBookmarked] = useState<boolean>(
    isInWatchList ?? false
  );

  const handleAddWatchLater = async () => {
    await addWatchLater({
      animeId: data.animeId,
      bannerImage: data.bannerImage ?? "",
      coverImage: data.coverImage.large ?? data.coverImage.medium,
      format: data.format,
      title: data.title.userPreferred ?? data.title.english,
    })
      .unwrap()
      .then(() => setIsBookmarked(true));
  };

  const handleRemoveWatchList = async () => {
    await removeWatchLater({ id: data.animeId })
      .unwrap()
      .then(() => setIsBookmarked(false));
  };

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
        {data.nextair && (
          <p className="anime_utils">Next Episode: {data.nextair.episode}</p>
        )}
      </div>

      {/* ANIME CTA BUTTON */}
      <div className="w-full flex sm:flex-row flex-col gap-3 mt-3">
        <Link
          to={`/watch/${data?.anime_episodes[0].id}-${data.id}`}
          className={cn(
            buttonVariants({
              className: "rounded-none w-full truncate",
            })
          )}
        >
          Watch - <span className="truncate ml-1">{data.title.english}</span>
        </Link>
        {isBookmarked ? (
          <Button
            onClick={handleRemoveWatchList}
            className="rounded-none group w-full"
            variant="outline"
            size="icon"
          >
            <IoBookmark className="h-4 w-4 group-hover:fill-primary text-primary transition-colors duration-300" />
            <span className="ml-2">Bookmarked</span>
          </Button>
        ) : (
          <Button
            onClick={handleAddWatchLater}
            className="rounded-none group w-full"
            variant="outline"
            size="icon"
          >
            <IoBookmarkOutline className="h-4 w-4 group-hover:fill-primary text-primary transition-colors duration-300" />
            <span className="ml-2">Watch Later</span>
          </Button>
        )}
      </div>
    </div>
  );
};
export default AnimeInfoTitleContainer;
