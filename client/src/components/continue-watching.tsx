import { useAuth } from "@/context";
import useLocalStorage from "@/hooks/use-store-anime";
import {
  useDeleteWatchingMutation,
  useGetCurrentlyWatchingQuery,
} from "@/redux/auth";
import { Trash } from "lucide-react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";
import { Button } from "./ui/button";
import React from "react";

const ContinueWatching = () => {
  const { data, isLoading } = useGetCurrentlyWatchingQuery();
  const { animeWatched, deleteAnime } = useLocalStorage();
  const { isLoggedIn } = useAuth();
  const [deleteWatchingById] = useDeleteWatchingMutation();

  if (isLoading) return <p>loading...</p>;

  if (
    (isLoggedIn && data?.length === 0) ||
    (!isLoggedIn && animeWatched?.length === 0)
  ) {
    return <p>No recent animes!</p>;
  }

  const handleDeleteWatching = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    if (!isLoggedIn) {
      deleteAnime(id);
    }

    deleteWatchingById({ episodeId: id }).unwrap();
  };

  if (isLoggedIn)
    return (
      <div className="anime_card_wrapper">
        {data?.map((anime) => (
          <div className="h-auto" key={anime._id}>
            <a
              href={`/watch/${anime.episodeId}`}
              title={anime.title}
              className="w-full rounded-md overflow-hidden block shadow group relative md:h-80 h-72"
            >
              <img
                src={anime.poster}
                alt="anime image poster"
                className="h-full w-full object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
              />
              <span className="absolute -bottom-1/2 group-hover:bottom-1/2 duration-300 translate-y-1/2 left-1/2 -translate-x-1/2">
                <MdOutlinePlayCircleFilled className="h-16 w-16 fill-primary" />
              </span>
              <div className="flex gap-x-2 absolute top-2 right-2  items-center">
                <p className="bg-primary px-3 py-px text-sm rounded">
                  Ep {anime.episodeNumber ?? 0}
                </p>
              </div>

              <div className="absolute -bottom-full w-full p-3 group-hover:bottom-0  duration-300">
                <Button
                  onClick={(e) => handleDeleteWatching(e, anime.episodeId)}
                  variant="outline"
                  className="w-full"
                >
                  <Trash className="" />
                </Button>
              </div>
            </a>
            <h5 className="mt-2 font-medium">
              <a
                href={`/watch/${anime.episodeId}`}
                className="hover:text-primary line-clamp-1 transition-colors duration-200"
              >
                {anime.title}
              </a>
            </h5>
          </div>
        ))}
      </div>
    );

  return (
    <div className="anime_card_wrapper">
      {animeWatched?.map((anime) => (
        <div className="sm:aspect-[12/16] aspect-[9/14]" key={anime.episodeId}>
          <a
            href={`/watch/${anime.episodeId}`}
            className="h-full w-full rounded-md overflow-hidden block shadow group relative"
          >
            <img
              src={anime.poster}
              alt="anime image poster"
              className="h-full w-full object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
            />
            <span className="absolute -bottom-1/2 group-hover:bottom-1/2 duration-300 translate-y-1/2 left-1/2 -translate-x-1/2">
              <MdOutlinePlayCircleFilled className="h-16 w-16 fill-primary" />
            </span>
            <div className="flex gap-x-2 absolute top-2 right-2  items-center">
              <p className="bg-primary px-3 py-px text-sm rounded">
                Ep {anime.episodeNumber ?? 0}
              </p>
            </div>
            <div className="absolute -bottom-full w-full p-3 group-hover:bottom-0  duration-300">
              <Button
                onClick={(e) => handleDeleteWatching(e, anime.episodeId)}
                variant="outline"
                className="w-full"
              >
                <Trash className="" />
              </Button>
            </div>
          </a>
          <h5 className="mt-2 font-medium">
            <a
              href={`/watch/${anime.episodeId}`}
              className="hover:text-primary line-clamp-1 transition-colors duration-200"
            >
              {anime.title}
            </a>
          </h5>
        </div>
      ))}
    </div>
  );
};
export default ContinueWatching;
