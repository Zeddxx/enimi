import { useAuth } from "@/context";
import useLocalStorage from "@/hooks/use-store-anime";
import { useGetCurrentlyWatchingQuery } from "@/redux/auth";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

const ContinueWatching = () => {
  const { data, isLoading } = useGetCurrentlyWatchingQuery();
  const { getAnimeWatched } = useLocalStorage();
  const { isLoggedIn } = useAuth();

  if (isLoading) return <p>loading...</p>;

  if (
    (isLoggedIn && data?.length === 0) ||
    (!isLoggedIn && getAnimeWatched()?.length === 0)
  ) {
    return <p>No recent animes!</p>;
  }

  if (isLoggedIn)
    return (
      <div className="anime_card_wrapper">
        {data?.map((anime) => (
          <div className="sm:aspect-[12/16] aspect-[9/14]" key={anime._id}>
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
      {getAnimeWatched()?.map((anime) => (
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
