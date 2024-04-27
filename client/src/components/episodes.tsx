import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "./ui/input";

interface IEpisode {
  title: string;
  id: string;
}

const Episodes = ({
  episodes,
  id,
  animeId,
  isFocused
}: {
  episodes?: IEpisode[];
  id: string;
  animeId?: string;
  isFocused?: boolean;
}) => {
  const [searchEpisode, setSearchEpisode] = useState<string>("");

  if (!episodes || !animeId) return null;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchEpisode(e.target.value);
  };

  const filteredEpisodes = episodes?.filter((episode, index) => {
    const lowerCaseSearchTerm = searchEpisode.toLowerCase();
    if (searchEpisode) {
      if (episode.id) {
        return episode.id.toLowerCase().includes(lowerCaseSearchTerm);
      } else {
        return (
          episode.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          index.toString().includes(lowerCaseSearchTerm)
        );
      }
    } else {
      return true;
    }
  });

  return (
    <aside className={cn(
      "2xl:max-w-xs w-full relative h-[476.55px] overflow-hidden",
      isFocused && "opacity-0"
    )}>
      <div className="w-full p-2 border-b border-muted flex justify-between items-center">
        <p>Episodes</p>

        <Input
          type="text"
          value={searchEpisode}
          onChange={handleSearchChange}
          placeholder="Search by episode number"
          className="w-40 truncate"
        />
      </div>
      {episodes.length > 24 ? (
        <div className="grid overflow-y-scroll h-full gap-3 py-3 pb-16 pr-2 grid-cols-4 place-content-start">
          {(filteredEpisodes && filteredEpisodes.length > 0
            ? filteredEpisodes
            : episodes
          )
            .slice(0, 40)
            .map((episode) => (
              <a
                href={`/watch/${episode.id}-${animeId}`}
                className={cn(
                  "py-2 rounded h-fit odd:bg-muted grid place-items-center border border-muted",
                  id === episode.id && "!bg-primary text-muted"
                )}
                key={episode.id}
              >
                <p className="text-xs font-medium">EP {episode.id.split("-").pop()}</p>
              </a>
            ))}
        </div>
      ) : (
        <div className="overflow-y-scroll divide-y-[1px] divide-muted h-full pb-10">
          {episodes.slice(0, 32).map((episode) => (
            <a
              href={`/watch/${episode.id}-${animeId}`}
              className={cn(
                "w-full odd:bg-muted p-3 block",
                id === episode.id && "text-muted !bg-primary"
              )}
              key={episode.id}
            >
              <p className="truncate text-sm">{episode.title}</p>
            </a>
          ))}
        </div>
      )}
      <div className=""></div>
    </aside>
  );
};
export default Episodes;
