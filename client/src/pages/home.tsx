import Loader from "@/components/loader/loader";
import PopularAnimeCarousel from "@/components/popular-anime-carousel";
import RecentsAnime from "@/components/recents-anime";
import SEO from "@/components/seo";
import AnimeCarousel from "@/components/shared/anime-carousel";
import { useGetPopularQuery, useGetTrendingQuery } from "@/redux/api";

const Home = () => {
  const { data: trending, isLoading: isTrendingLoading } = useGetTrendingQuery();
  const { data: popular, isLoading: isPopularLoading } = useGetPopularQuery()

  if (isTrendingLoading && isPopularLoading) {
    return <Loader />;
  }

  if (!trending || !popular) {
    return <div className="">no</div>;
  }

//   console.log(popular);

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

      <div className="px-4 max-w-screen-2xl w-full mx-auto">
        <RecentsAnime />
      </div>
    </section>
  );
};
export default Home;
