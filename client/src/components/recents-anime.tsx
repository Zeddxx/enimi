import { useGetRecentAnimesQuery } from "@/redux/api";
import { MdOutlinePlayCircleFilled } from "react-icons/md";

const RecentsAnime = () => {
  const { data, isLoading } = useGetRecentAnimesQuery();

  if (isLoading) {
    return <p className="">Loading...</p>;
  }

  return (
    <div className="w-full">
      <h4 className="sub_headings">Recents Episodes</h4>
      <div className="anime_card_wrapper">
        {data?.map((anime) => (
          <div key={anime.id} className="sm:aspect-[12/16] aspect-[9/14]">
            <a
              href={`/watch/${anime.episode_id}-${anime.anilistId}`}
              className="h-full w-full rounded-md overflow-hidden block shadow group relative"
            >
              <img
                src={anime.image_url}
                alt="anime image poster"
                className="h-full w-full object-cover group-hover:scale-110 group-hover:brightness-75 transition-all duration-300"
              />
              <span className="absolute -bottom-1/2 group-hover:bottom-1/2 duration-300 translate-y-1/2 left-1/2 -translate-x-1/2">
                <MdOutlinePlayCircleFilled className="h-16 w-16 fill-primary" />
              </span>
              <div className="flex gap-x-2 absolute top-2 right-2  items-center">
                <p className="bg-primary px-3 py-px text-sm rounded">
                  Ep {anime.episode}
                </p>
                <p className="bg-primary px-3 py-px text-sm rounded">
                  {anime.subOrdub}
                </p>
              </div>
            </a>
            <h5 className="mt-2 font-medium">
              <a
                href={`/watch/${anime.episode_id}-${anime.anilistId}`}
                className="hover:text-primary line-clamp-1 transition-colors duration-200"
              >
                {anime.title}
              </a>
            </h5>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RecentsAnime;
