import Loader from "@/components/loader/loader";
import LoadMore from "@/components/shared/load-more";
import { useInfiniteMovies } from "@/lib/react-query";
import React from "react";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

const Movies = () => {
  const { data, hasNextPage, fetchNextPage, isLoading } = useInfiniteMovies();
  const movies = React.useMemo(() => data?.pages.flat(), [data?.pages]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full min-h-[100dvh]">
      <div className="max-w-screen-2xl mx-auto w-full px-4 my-6">
        <h1 className="text-4xl font-medium mb-6 text-primary">Movies</h1>

        <div className="anime_card_wrapper">
          {movies?.map((anime, idx) => (
            <div key={anime.id + idx} className="h-full">
              <a
                href={`/anime/${anime.animeId}`}
                title={anime.title.userPreferred}
                className="w-full rounded-md overflow-hidden block shadow group relative md:h-80 h-72"
              >
                <img
                  src={anime.image}
                  alt="anime image poster"
                  className="h-full w-full object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
                />
                <span className="absolute -bottom-1/2 group-hover:bottom-1/2 duration-300 translate-y-1/2 left-1/2 -translate-x-1/2">
                  <MdOutlinePlayCircleFilled className="h-16 w-16 fill-primary" />
                </span>
                <div className="flex gap-x-2 absolute top-2 right-2  items-center">
                  <p className="bg-primary px-3 py-px text-sm rounded">
                    {anime.released}
                  </p>
                </div>
              </a>
              <h5 className="mt-2 font-medium">
                <a
                  href={`/anime/${anime.animeId}`}
                  className="hover:text-primary line-clamp-1 transition-colors duration-200"
                >
                  {anime.title.userPreferred}
                </a>
              </h5>
            </div>
          ))}
        </div>

        {hasNextPage && <LoadMore fetchNextPage={fetchNextPage} />}
      </div>
    </section>
  );
};
export default Movies;
