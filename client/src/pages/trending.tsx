import Loader from "@/components/loader/loader";
import AnimeCard from "@/components/shared/anime-card";
import { Button } from "@/components/ui/button";
import { generatePageNumbers } from "@/lib/utils";
import { useGetTrendingQuery } from "@/redux/api";
import { useSearchParams } from "react-router-dom";

const Trending = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page") ?? 1;
  const { data, isLoading } = useGetTrendingQuery({
    limit: "16",
    page: Number(page),
  });

  const handlePagination = (page: number) => {
    window.location.assign(`/trending?page=${page}`);
  };

  if (isLoading) {
    return <Loader />;
  }
  return (
    <section className="w-full">
      <div className="page_wrapper">
        <h1 className="page_heading">Trending.</h1>
        <p className="">
          Animes which are currently in trending.
        </p>
        <div className="anime_card_wrapper">
          {data?.results.map((anime) => (
            <AnimeCard key={anime.animeId} anime={anime} />
          ))}
        </div>
      </div>

      <div className="pagination_container">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => handlePagination(Number(page) - 1)}
            disabled={Number(page) === 1}
          >
            Prev
          </Button>
          {generatePageNumbers(data?.page.total ?? 1, Number(page)).map(
            (pageNum) => (
              <Button
                variant="outline"
                key={pageNum}
                onClick={() => handlePagination(Number(pageNum))}
                disabled={Number(pageNum) == page}
                className={
                  Number(pageNum) == page
                    ? "disabled:opacity-100 border-primary/40 bg-primary text-primary-foreground"
                    : ""
                }
              >
                {pageNum}
              </Button>
            )
          )}
          <Button
            variant="outline"
            onClick={() => handlePagination(Number(page) + 1)}
            disabled={!data?.page.hasNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
};
export default Trending;
