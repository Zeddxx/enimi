// react imports
import React from "react";
import { useParams } from "react-router-dom";

// components
import Episodes from "@/components/episodes";
import Loader from "@/components/loader/loader";

// utilites
import {
  cn,
  converUppercase,
  convertToReadableTime,
  destructureId,
  getEpisodeNavigation,
} from "@/lib/utils";

// rtk queries
import {
  useGetAnimeInfoByIdQuery,
  useGetEpisodeLinksQuery,
  useGetRecommendationByIdQuery,
} from "@/redux/api";

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
import InfoContainer from "@/components/shared/info-container";
import AnimeCard from "@/components/shared/anime-card";

const Watch = () => {
  // react-router-dom hooks
  const { episodeId } = useParams();

  // authentication hook
  const { user } = useAuth();

  // destructuring the animeId and the episode id from the parameter
  const { episodeId: id, animeId } = destructureId(episodeId as string);

  // localstorage hook to set the currently watching anime into localstorage
  const { setAnimeWatch } = useStoreAnime();

  // RTK Query
  const { data, isLoading } = useGetEpisodeLinksQuery({ id: id! });
  const { data: info, isLoading: isInfoLoading } = useGetAnimeInfoByIdQuery({
    id: animeId,
  });
  const { data: recommendations } = useGetRecommendationByIdQuery({
    id: animeId,
  });

  // RTK mutation to set the current watching into database.
  const [watching] = useAddWatchingMutation();

  // side-effects to add the currently wathing anime into
  // localStorage if user is !loggedIn
  // else add into the database of the user.
  React.useEffect(() => {
    const addWatch = async () => {
      try {
        // checking if all exists then there is not user then.
        if (episodeId && info && !user) {
          // add anime into localStorage.
          setAnimeWatch({
            episodeId,
            title: info.title.userPreferred,
            episodeNumber: Number(id.split("-").pop()) ?? 0,
            poster: info.coverImage.large,
          });
        } else if (episodeId && info && !!user) {
          // add anime into user's database.
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

  // lazy importing the player to make the build light weight.
  const EnimiPlayer = React.lazy(
    () => import("@/components/players/enimi-player")
  );

  if (isLoading || isInfoLoading) {
    return <Loader />;
  }

  if (!data?.sources) {
    return <p className="">No Media found</p>;
  }

  // function to get previous and next episodes from the episodes[]
  const { next, prev } = getEpisodeNavigation(
    info?.anime_episodes ?? [{ title: "", id: "" }],
    id!
  );

  // a function to toggle next or prev episodes.
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

          {info?.nextair && (
            <div className="w-full p-2 bg-muted">
              <p className="w-fit mx-auto">
                Next Episode of{" "}
                <span className="text-primary underline underline-offset-1">
                  {converUppercase(info?.title.userPreferred)}
                </span>{" "}
                will be aired at: {convertToReadableTime(info.nextair)}
              </p>
            </div>
          )}
        </div>

        {/* A Brief Introduction. */}
        <InfoContainer info={info!} />
      </div>

      <div className="my-5 max-w-screen-2xl w-full px-4 mx-auto">
        <h4 className="sub_headings">Recommendations</h4>
        <div className="anime_card_wrapper">
          {recommendations?.results.map((anime) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </div>
    </section>
  );
};
export default Watch;

const LoadingAnime = () => {
  return <div className="aspect-video w-full">loading...</div>;
};
