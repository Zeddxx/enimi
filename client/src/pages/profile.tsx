import UserAvatar from "@/components/user/user-avatar";
import { useGetWatchLaterQuery } from "@/redux/auth";
import { Link } from "react-router-dom";

const Profile = () => {
  const { data } = useGetWatchLaterQuery();

  return (
    <section className="w-full min-h-[calc(100dvh-80px)]">
      <div className="max-w-screen-2xl mx-auto h-[40vw] max-h-72 min-h-44 min-w-full bg-muted relative">
        {/* user avtar */}
        <UserAvatar />
      </div>

      <div className="max-w-screen-2xl pt-36 mx-auto px-4 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-3xl">Your Watchlist.</h2>
          <Link
            to="/watch-later"
            className="text-sm underline hover:text-primary"
          >
            see all.
          </Link>
        </div>
        <div className="anime_card_wrapper mt-4">
          {data?.map((anime) => (
            <div className="aspect-[12/16]" key={anime._id}>
              <a
                href={`/anime/${anime.animeId}`}
                className="anime_card_image_wrapper group"
              >
                <img
                  src={anime.coverImage}
                  alt="anime cover image"
                  className="group-hover:scale-105"
                />
              </a>
              <a
                href={`/anime/${anime.animeId}`}
                className="anime_card_title mt-1"
              >
                {anime.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Profile;
