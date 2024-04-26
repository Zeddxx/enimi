import { IAnime } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Link } from "react-router-dom";

type PopularAnimeProps = {
  populars: IAnime[];
};

const PopularAnimeCarousel = ({ populars }: PopularAnimeProps) => {
  return (
    <>
      <Carousel opts={{ align: "start" }} className="mt-4">
        <div className="flex justify-between items-center mb-4">
          <div className="">
            <h2 className="text-4xl font-semibold">Popular</h2>
            <p className="text-muted-foreground text-sm">
              List of popular animes.
            </p>
          </div>

          <div className="flex items-center h-12 relative">
            <CarouselPrevious variant="default" className="top-1/2 -translate-y-1/2 md:w-24 absolute md:-translate-x-40 -translate-x-6 rounded-none" />
            <CarouselNext variant="default" className="top-1/2 -translate-y-1/2 right-0 md:w-24 absolute rounded-none" />
          </div>
        </div>
        <CarouselContent>
          {populars.map((anime) => (
            <CarouselItem className="basis-1/10" key={anime.id}>
              <div className="relative flex items-end">
                <Link to={`/${anime.animeId}`} className="veritcal-text dark:text-white hover:text-primary dark:hover:text-primary text-secondary-foreground truncate h-64 text-base font-medium pr-0 pl-2">
                  {anime.title.userPreferred}
                </Link>
                <Link to={`/${anime.animeId}`} className="aspect-[12/16]">
                  <img
                    src={anime.coverImage.large}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
};
export default PopularAnimeCarousel;
