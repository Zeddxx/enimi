import { useGetSearchedAnimeQuery } from "@/redux/api";
import React from "react";
import { Link } from "react-router-dom";

const SearchSuggestions = ({ value, setIsOpen }: { value: string, setIsOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const { data, isLoading } = useGetSearchedAnimeQuery({
    query: value,
    page: 1,
  });

  if (isLoading) {
    return <p>Currently loading</p>;
  }

  if (!data || !data?.results.length) {
    return <p>No Anime found!</p>;
  }

  return (
    <div className="space-y-3 max-h-96 overflow-y-scroll">
      {data.results.slice(0, 5).map((anime) => {
        return (
          <div key={anime.id} className="h-24 w-full flex gap-x-2">
            <img
              src={anime.coverImage.medium}
              alt={`${anime.title.userPreferred} cover image`}
              className="h-full w-16 rounded shrink-0"
            />

            <div className="space-y-1.5">
              <Link
                to={`/anime/${anime.animeId}`}
                className="hover:text-primary duration-300 line-clamp-2"
              >
                {anime.title.userPreferred}
              </Link>
              <div className="w-full flex gap-2">
                <p className="text-xs border border-muted text-muted-foreground rounded px-1">
                  {anime.status}
                </p>
                {!!anime.averageScore && (
                  <p className="text-xs border border-muted text-muted-foreground rounded px-1">
                    {anime.averageScore}
                  </p>
                )}
                <p className="text-xs border border-muted text-muted-foreground rounded px-1">
                  {anime.seasonYear}
                </p>
              </div>

              <div className="flex gap-2 text-xs">
                {anime.genres.slice(0, 4).map((genre) => (
                  <p>{genre}</p>
                ))}
                {anime.genres.length > 4 && `+${anime.genres.length - 4}`}
              </div>
            </div>
          </div>
        );
      })}

      {data.results.length > 5 && (
        <div className="flex w-[98%]">
          <Link
          onClick={() => setIsOpen(false)}
            className="w-full text-sm hover:bg-muted py-2 flex justify-center rounded border border-muted"
            to={`/search?a=${value}`}
          >
            Show More
          </Link>
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
