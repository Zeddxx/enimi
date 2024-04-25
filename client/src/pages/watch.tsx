import EnimiPlayer from "@/components/players/enimi-player";
import { useGetEpisodeLinksQuery } from "@/redux/api";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { episodeId } = useParams();

  const { data, isLoading } = useGetEpisodeLinksQuery({ id: episodeId! });

  if (isLoading) {
    return <p className="">Loading...</p>;
  }

  if (!data?.sources) {
    return <p className="">No Media found</p>;
  }

  return (
    <section className="w-full">
      <div className="max-w-screen-2xl w-full mx-auto px-4">
        <EnimiPlayer sources={data.sources} />
      </div>
    </section>
  );
};
export default Watch;
