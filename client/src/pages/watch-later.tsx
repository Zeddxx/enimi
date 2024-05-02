import Loader from "@/components/loader/loader";
import { useGetWatchLaterQuery } from "@/redux/user"

const WatchLater = () => {
  const { data, isLoading } = useGetWatchLaterQuery();

  if(isLoading) {
    return <Loader />
  }

  return (
    <section className="w-full">
      <div className="max-w-screen-2xl w-full mx-auto px-4 min-h-[calc(100dvh-80px)]">
        <h1 className="sub_headings underline underline-offset-4">Your Watch List.</h1>
        <div className="anime_card_wrapper my-8">
          {data?.map((anime) => (
            <div className="aspect-[12/16]" key={anime._id}>
              <a href={`/${anime.animeId}`} className="anime_card_image_wrapper group">
                <img src={anime.coverImage} alt="anime cover image" className="group-hover:scale-105" />
              </a>
              <a
              href={`/${anime.animeId}`}
              className="anime_card_title mt-1">
                {anime.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
export default WatchLater