import { IAnime } from "@/types/anime.types";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

const AnimeCard = ({ anime }: { anime: IAnime }) => {
  return (
    <div key={anime.id} className="aspect-[12/16]">
      <a
        href={`/${anime.animeId}`}
        className="anime_card_image_wrapper group"
      >
        <img
          src={anime.coverImage.large}
          alt="anime image poster"
          className="group-hover:scale-105"
        />
        <span className="anime_card_hover">
          <MdOutlinePlayCircleFilled className="h-12 w-12 fill-primary" />
        </span>
      </a>
      <h5 className="mt-2 font-medium">
        <a
          href={`/${anime.animeId}`}
          className="anime_card_title"
        >
          {anime.title.userPreferred}
        </a>
      </h5>
    </div>
  );
};
export default AnimeCard;
