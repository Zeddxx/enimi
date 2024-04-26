import { useGetRecentAnimesQuery } from "@/redux/api";

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
          <div key={anime.id} className="aspect-[12/16]">
            <a
              href={`/watch/${anime.episode_id}-${anime.anilistId}`}
              className="h-full w-full rounded-md overflow-hidden block shadow relative"
            >
              <img
                src={anime.image_url}
                alt="anime image poster"
                className="h-full w-full object-cover"
              />
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
