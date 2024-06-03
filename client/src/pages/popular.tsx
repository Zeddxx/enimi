import Loader from "@/components/loader/loader";
import AnimeCard from "@/components/shared/anime-card";
import LoadMore from "@/components/shared/load-more";
import { useGetPopularAnime } from "@/lib/react-query";
import React from "react";

const Popular = () => {
  const {
    data: popular,
    isLoading,
    fetchNextPage,
    hasNextPage,
  } = useGetPopularAnime();
  const popularAnimes = React.useMemo(
    () => popular?.pages.flat(),
    [popular?.pages]
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="w-full">
      <div className="page_wrapper">
        <h1 className="page_heading">Popular.</h1>
        <p>Anime which have higher popularity.</p>

        <div className="anime_card_wrapper">
          {/* {data?.results.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))} */}

          {popularAnimes?.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))}
        </div>
        {hasNextPage && <LoadMore fetchNextPage={fetchNextPage} />}
      </div>

      {/* <div className="pagination_container">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handlePagination(Number(page) - 1)}
            disabled={Number(page) === 1 || page == 0}
          >
            Prev
          </Button>
          {generatePageNumbers(
            data?.page.total ?? 1,
            Number(page),
            data?.page.lastPage ?? 1
          ).map((pageNum) => (
            <Button
              variant="outline"
              key={pageNum}
              onClick={() => handlePagination(Number(pageNum))}
              disabled={
                Number(pageNum) == page ||
                Number(pageNum) == (data?.page.currentPage ?? 1)
              }
              className={
                Number(pageNum) == page ||
                Number(pageNum) == (data?.page.currentPage ?? 1)
                  ? "disabled:opacity-100 border-primary/40 bg-primary text-primary-foreground"
                  : ""
              }
            >
              {pageNum}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => handlePagination(Number(page) + 1)}
            disabled={!data?.page.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div> */}
    </section>
  );
};
export default Popular;
