import Loader from "@/components/loader/loader";
import AnimeCard from "@/components/shared/anime-card";
import LoadMore from "@/components/shared/load-more";
import { useInfiniteTrendingAnimes } from "@/lib/react-query";
import React from "react";

const Trending = () => {
  const {
    data: trending,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteTrendingAnimes();
  const trendingAnimes = React.useMemo(
    () => trending?.pages.flat(),
    [trending?.pages]
  );

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-full">
      <div className="page_wrapper">
        <h1 className="page_heading">Trending.</h1>
        <p className="">Animes which are currently in trending.</p>
        <div className="anime_card_wrapper">
          {trendingAnimes?.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))}
        </div>

        {hasNextPage && <LoadMore fetchNextPage={fetchNextPage} />}
      </div>
    </section>
  );
};
export default Trending;
