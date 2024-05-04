// react imports
import React from "react";
import { useParams } from "react-router-dom";

// components
import Episodes from "@/components/episodes";
import Loader from "@/components/loader/loader";

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

// shadcn components imports
import HistoryTree from "@/components/history-tree";
import useStoreAnime from "@/hooks/use-store-anime";
import { useAuth } from "@/context";
import { useAddWatchingMutation } from "@/redux/auth";

const Watch = () => {
  const { episodeId } = useParams();
  const { user } = useAuth();
  const { episodeId: id, animeId } = destructureId(episodeId as string);

  const { setAnimeWatch } = useStoreAnime();

  const { data, isLoading } = useGetEpisodeLinksQuery({ id: id! });
  const { data: info, isLoading: isInfoLoading } = useGetAnimeInfoByIdQuery({
    id: animeId,
  });
  const [watching] = useAddWatchingMutation();

  React.useEffect(() => {
    const addWatch = async () => {
      try {
        if (episodeId && info && !user) {
          setAnimeWatch({
            episodeId,
            title: info.title.userPreferred,
            episodeNumber: Number(id.split("-").pop()) ?? 0,
            poster: info.coverImage.large,
          });
        } else if (episodeId && info && !!user) {
          await watching({
            episodeId,
            title: info.title.userPreferred,
            episodeNumber: Number(id.split("-").pop()) ?? 0,
            poster: info.coverImage.large,
          }).unwrap();
        }
      } catch (error) {
        console.log("Error adding watching:", error);
      }
    };

    addWatch();
  }, [episodeId, info, user]);

  const EnimiPlayer = React.lazy(
    () => import("@/components/players/enimi-player")
  );

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
          <React.Suspense fallback={<LoadingAnime />}>
            <EnimiPlayer id={id} sources={data.sources} />
          </React.Suspense>

          {/* button to next and prev episode! */}
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
        <aside className="2xl:max-w-xs w-full p-3 border border-muted rounded">
          <div className="h-full">
            <div className="w-full rounded overflow-hidden h-28 relative before:absolute before:bottom-0 before:w-full before:h-1/2 before:left-0 before:bg-gradient-to-t before:from-[#121212] before:via-[#121212]/70 before:to-transparent before:z-10">
              <img
                src={info?.bannerImage ?? info?.coverImage.large}
                alt="anime banner image"
                className="object-cover brightness-75 h-full w-full"
              />
            </div>
            <div className="mt-1">
              <h1 className="text-xl font-semibold text-primary">
                {info?.title.english ?? info?.title.userPreferred}
              </h1>
              <div className="flex flex-wrap gap-2 mt-2">
                {info?.genres.map((genre) => (
                  <span
                    key={genre}
                    className="text-xs px-2 py-px border border-muted text-muted-foreground"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* brief description. */}
              <div className="max-h-28 mt-3 overflow-y-scroll">
                <p
                  dangerouslySetInnerHTML={{ __html: info?.description ?? "" }}
                  className="text-muted-foreground"
                ></p>
              </div>

              {/* episodes */}
              <div className="mt-3">
                <p className="text-sm">
                  Total Episodes: {info?.anime_episodes.length}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};
export default Watch;

const LoadingAnime = () => {
  return <div className="aspect-video w-full">loading...</div>;
};
