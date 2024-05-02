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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AnimeInfoTitleContainer = ({ data }: { data: IAnimeInfo }) => {
  const [addWatchLater] = useAddWatchLaterMutation();
  const [removeWatchLater] = useRemoveWatchLaterMutation();
  const { data: watchLater } = useGetWatchLaterQuery();
  const [id, setId] = useState<string>("");

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    if (watchLater) {
      const isInList = watchLater.find((item) => item.animeId === data.animeId);
      setId(isInList?._id ?? "");
      setIsBookmarked(!!isInList);
    } else {
      return;
    }
  }, [watchLater, data.animeId]);

  const handleAddWatchLater = async () => {
    toast
      .promise(
        addWatchLater({
          animeId: data.animeId,
          bannerImage: data.bannerImage ?? "",
          coverImage: data.coverImage.large ?? data.coverImage.medium,
          format: data.format,
          title: data.title.userPreferred ?? data.title.english,
        }).unwrap(),
        {
          loading: `Adding ${data.title.userPreferred} to your watch list...`,
          success: `Added ${data.title.userPreferred} to your watch list!`,
          error: `Failed to add ${data.title.userPreferred} to your watch list!`,
        }
      )
      .then(() => setIsBookmarked(true))
      .catch(() => setIsBookmarked(false));
  };

  const handleRemoveWatchList = async () => {
    if (!id) return;

    toast
      .promise(removeWatchLater({ id }).unwrap(), {
        loading: `Removing ${data.title.userPreferred} from your watch list!`,
        success: `Removed ${data.title.userPreferred} from your watch list`,
        error: `Could not remove ${data.title.userPreferred} from your watch list!`,
      })
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
