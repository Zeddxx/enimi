import { useGetEpisodeLinksQuery } from "@/redux/api"
import { useParams } from "react-router-dom"

const Watch = () => {
  const { episodeId } = useParams()
  
  const { data, isLoading } = useGetEpisodeLinksQuery({ id: episodeId! })

  if(isLoading) {
    return <p className="">Loading...</p>
  }

  console.log(data);

  return (
    <div>Watch</div>
  )
}
export default Watch