import ContinueWatching from "@/components/continue-watching";
import Loader from "@/components/loader/loader";
import PopularAnimeCarousel from "@/components/popular-anime-carousel";
import RecentsAnime from "@/components/recents-anime";
import SEO from "@/components/seo";
import AnimeCarousel from "@/components/shared/anime-carousel";
import { useGetPopularQuery, useGetTrendingQuery } from "@/redux/api";

const Home = () => {
  const { data: trending, isLoading: isTrendingLoading } = useGetTrendingQuery({ limit: "12", page: 1});
  const { data: popular, isLoading: isPopularLoading } = useGetPopularQuery({ limit: "12", page: 1 })

  if (isTrendingLoading && isPopularLoading) {
    return <Loader />;
  }

  if (!trending || !popular) {
    return <div className="">no</div>;
  }

  return (
    <section>
      <SEO
        title="Enimi | watch your favorite anime without any ads!"
        description="A Minimalist enimi anime web streaming application created using MERN stack."
        name="Enimi"
        type="webpage"
      />
      <AnimeCarousel animes={trending.results} />

      <div className="px-4 my-6 max-w-screen-2xl w-full mx-auto">
        <PopularAnimeCarousel populars={popular.results} />
      </div>

      <div className="px-4 my-6 max-w-screen-2xl w-full mx-auto">
      <h1 className="text-3xl mb-4">Continue Watching.</h1>
        <ContinueWatching />
      </div>

      <div className="px-4 max-w-screen-2xl w-full mx-auto">
        <RecentsAnime />
      </div>
    </section>
  );
};
export default Home;
