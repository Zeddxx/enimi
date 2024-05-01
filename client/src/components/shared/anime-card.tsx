import { IAnime } from "@/types/anime.types";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

const AnimeCard = ({ anime }: { anime: IAnime }) => {
  return (
    <div key={anime.id} className="aspect-[12/16]">
      <a
        href={`/${anime.animeId}`}
        className="h-full w-full rounded-md overflow-hidden block shadow group relative"
      >
        <img
          src={anime.coverImage.large}
          alt="anime image poster"
          className="h-full w-full object-cover group-hover:scale-105 duration-300"
        />
        <span className="absolute -bottom-1/2 group-hover:bottom-1/2 duration-300 translate-y-1/2 left-1/2 -translate-x-1/2">
          <MdOutlinePlayCircleFilled className="h-12 w-12 fill-primary" />
        </span>
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
