import AnimeCarousel from "@/components/shared/anime-carousel";
import { useGetTrendingQuery } from "@/redux/api"

const Landing = () => {
  const { data, isLoading } = useGetTrendingQuery()

  if(isLoading) {
    return (
        <p className="">loading...</p>
    )
  }

  if(!data) {
    return (
        <div className="">no</div>
    )
  }

  return (
    <div>
        <AnimeCarousel animes={data.results} />
    </div>
  )
}
export default Landing