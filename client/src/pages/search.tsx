import AnimeCard from "@/components/shared/anime-card";
import { useGetSearchedAnimeQuery } from "@/redux/api";
import { useSearchParams } from "react-router-dom";

const Search = () => {
  const [params] = useSearchParams();
  const query = (params.get("a") as string) || "";
  const destructedQuery = query.split("-").join(" ");
  const { data, isLoading } = useGetSearchedAnimeQuery({
    query: destructedQuery,
    page: 1,
  });

  if (isLoading) {
    return <p className="">Loading...</p>;
  }

  return (
    <section className="my-20">
      <div className="max-w-screen-2xl mx-auto px-4">
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
    </section>
  );
};
export default Search;
