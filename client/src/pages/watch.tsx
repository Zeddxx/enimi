// react imports
import { useParams } from "react-router-dom";

// components
import Episodes from "@/components/episodes";
import Loader from "@/components/loader/loader";
import EnimiPlayer from "@/components/players/enimi-player";

// utilites
import { cn, destructureId, getEpisodeNavigation } from "@/lib/utils";

// rtk queries
import { useGetAnimeInfoByIdQuery, useGetEpisodeLinksQuery } from "@/redux/api";

// lucide icons
import {
  ChevronFirst,
  ChevronLast,
  ForwardIcon,
  Lightbulb,
} from "lucide-react";
import HistoryTree from "@/components/history-tree";

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

  const { next, prev } = getEpisodeNavigation(
    info?.anime_episodes ?? [{ title: "", id: "" }],
    id!
  );

  const handleNavigation = (type: "NEXT" | "PREV") => {
    if (type === "NEXT") {
      window.location.assign(`/watch/${next}-${animeId}`);
    } else if (type === "PREV") {
      window.location.assign(`/watch/${prev}-${animeId}`);
    }
  };

  return (
    <section className="w-full">
      {/* Breadcrmbs */}
      <HistoryTree
        episodes={info?.anime_episodes ?? []}
        animeId={info?.id ?? ""}
        title={info?.title.userPreferred ?? ""}
        id={id}
      />

      <div className="2xl:max-w-screen-2xl max-w-7xl my-3 w-full mx-auto px-4 flex gap-x-2 2xl:flex-row flex-col">
        {/* episodes components */}
        <Episodes
          isFocused={false}
          episodes={info?.anime_episodes}
          id={id}
          animeId={info?.id}
        />

        {/* the enimi player! */}
        <div className="flex-1 order-first 2xl:order-none">
          <EnimiPlayer id={id} sources={data.sources} />
          <div className="flex justify-end items-center w-full px-1 my-2 gap-x-1.5">
            <span className="group cursor-pointer text-sm hover:text-primary border border-muted rounded duration-300 p-1.5 flex items-center">
              <ForwardIcon className="h-4 w-4" />
            </span>
            <span
              // onClick={handleToggleFocused}
              className={cn(
                "group cursor-pointer text-sm hover:text-primary border border-muted rounded duration-300 p-1.5 flex items-center"
                // isFocused && "text-primary"
              )}
            >
              <Lightbulb className="h-4 w-4" />
            </span>
            <button
              disabled={!prev}
              onClick={() => handleNavigation("PREV")}
              className="group cursor-pointer text-sm hover:text-primary border border-muted rounded duration-300 p-1.5 flex items-center disabled:opacity-50 disabled:pointer-events-none disabled:hover:text-white"
            >
              <ChevronFirst className="h-4 w-4" />
              {/* prev */}
            </button>
            <button
              disabled={!next}
              onClick={() => handleNavigation("NEXT")}
              className="group cursor-pointer text-sm hover:text-primary border border-muted rounded duration-300 p-1.5 flex items-center disabled:opacity-50 disabled:pointer-events-none disabled:hover:text-white"
            >
              {/* next */}
              <ChevronLast className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* A Brief Introduction. */}
        <aside className="max-w-xs w-full bg-white"></aside>
      </div>
    </section>
  );
};
export default Watch;
