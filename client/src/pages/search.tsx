import AnimeCard from "@/components/shared/anime-card";
import { Button } from "@/components/ui/button";
import { generatePageNumbers } from "@/lib/utils";
import { useGetSearchedAnimeQuery } from "@/redux/api";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [params] = useSearchParams();
  const query = (params.get("a") as string) || "";
  const page = Number(params.get("page") ?? 1);
  const destructedQuery = query.split("-").join(" ");
  const { data, isLoading } = useGetSearchedAnimeQuery({
    query: destructedQuery,
    page,
  });

  if (isLoading) {
    return <p className="">Loading...</p>;
  }

  const handlePagination = (page: number) => {
    window.location.replace(`/search?a=${query}&page=${page}`);
  };

  return (
    <section className="my-20">
      <div className="max-w-screen-2xl mx-auto px-4 min-h-[calc(100dvh-80px)]">
        <h1 className="sub_headings">
          Search Query: <span>{destructedQuery}</span>
        </h1>

        <div className="anime_card_wrapper">
          {data?.results
            .filter((anime) => anime.status !== "NOT_YET_RELEASED")
            .map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
        </div>
      </div>

      <div className="pagination_container">
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
      </div>
    </section>
  );
};
export default Search;
