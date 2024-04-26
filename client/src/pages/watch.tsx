import Episodes from "@/components/episodes";
import Loader from "@/components/loader/loader";
import EnimiPlayer from "@/components/players/enimi-player";
import { destructureId } from "@/lib/utils";
import { useGetAnimeInfoByIdQuery, useGetEpisodeLinksQuery } from "@/redux/api";
import { useParams } from "react-router-dom";

const Watch = () => {
  const { episodeId } = useParams();
  const { episodeId: id, animeId } = destructureId(episodeId as string);

  const { data, isLoading } = useGetEpisodeLinksQuery({ id: id! });
  const { data: info, isLoading: isInfoLoading } = useGetAnimeInfoByIdQuery({
    id: animeId,
  });

  if (isLoading || isInfoLoading) {
    return <Loader />;
  }

  if (!data?.sources) {
    return <p className="">No Media found</p>;
  }

  return (
    <section className="w-full">
      <div className="2xl:max-w-screen-2xl max-w-7xl my-8 w-full mx-auto px-4 flex gap-x-2 2xl:flex-row flex-col">
        <Episodes episodes={info?.anime_episodes} id={id} animeId={info?.id} />
        <div className="flex-1 order-first 2xl:order-none">
          <EnimiPlayer sources={data.sources} />
        </div>
        <aside className="max-w-xs w-full bg-white"></aside>
      </div>
    </section>
  );
};
export default Watch;
