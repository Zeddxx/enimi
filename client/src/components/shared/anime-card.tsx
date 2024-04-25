import { IAnime } from "@/types";

const AnimeCard = ({ anime }: { anime: IAnime }) => {
  return (
    <div key={anime.id} className="aspect-[12/16]">
      <a
        href={`/${anime.animeId}`}
        className="h-full w-full rounded-md overflow-hidden block shadow"
      >
        <img
          src={anime.coverImage.large}
          alt="anime image poster"
          className="h-full w-full object-cover"
        />
      </a>
      <h5 className="mt-2 font-medium">
        <a
          href={`/${anime.animeId}`}
          className="hover:text-primary line-clamp-1 transition-colors duration-200"
        >
          {anime.title.userPreferred}
        </a>
      </h5>
    </div>
  );
};
export default AnimeCard;
