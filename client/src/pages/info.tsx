import AnimeRelation from "@/components/anime-relation";
import Loader from "@/components/loader/loader";
import SEO from "@/components/seo";
import AnimeCard from "@/components/shared/anime-card";
import AnimeInfoTitleContainer from "@/components/shared/anime-info-title-container";
import AnimePoster from "@/components/shared/anime-poster";
import BannerImage from "@/components/shared/banner-image";
import { formatDate } from "@/lib/utils";
import {
  useGetAnimeInfoByIdQuery,
  useGetRecommendationByIdQuery,
} from "@/redux/api";
import { Navigate, useParams } from "react-router-dom";

const Info = () => {
  const { animeId } = useParams();

  const id = animeId?.split("-").pop() ?? "";
  const { data, isLoading } = useGetAnimeInfoByIdQuery({ id });
  const { data: recommendations } = useGetRecommendationByIdQuery({ id });

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return null;
  }

  return (
    <section className="relative w-full">
      <SEO
        title={`${data.title.userPreferred} | Enimi`}
        description={data.description}
        name="Enimi Anime Details"
        type="webpage"
      />
      {/* Info Banner */}
      <BannerImage
        bannerImage={data.bannerImage}
        fallbackImg={data.coverImage.large}
      />
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-40">
        <div className="w-full flex lg:flex-row flex-col">
          {/* cover image container */}
          <AnimePoster coverImage={data.coverImage.large} />

          {/* Center container contains title and description */}
          <div className="w-full lg:ml-5 ml-0">
            {/* ANIME TITLE AND ITS DETAILS. */}
            <AnimeInfoTitleContainer data={data} />

            {/* ANIME DESCRIPTION */}
            <div className="my-4">
              <p
                className="info_description line-clamp-4"
                dangerouslySetInnerHTML={{ __html: data.description }}
              ></p>
            </div>

            {/* anime genres[] */}
            <div className="">
              <h2 className="text-lg font-medium">Genres:</h2>
              <div className="flex items-center gap-3">
                {data.genres.map((genre) => (
                  <p className="text-sm" key={genre}>
                    {genre}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* additional information */}
          <div className="lg:max-w-sm w-full lg:p-6 p-0 flex-shrink-0 rounded mt-6 lg:mt-0">
            <div className="space-y-2">
              {/* studios container */}
              <div className="">
                <p className="text-lg font-medium">Studios:</p>
                <div className="">
                  {data.studios.map((studio, index) => (
                    <span
                      className="text-muted-foreground"
                      key={studio.name + index}
                    >
                      {studio.name}
                      {", "}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dates */}
              <div className="">
                <p className="text-lg font-medium">Aired: </p>
                <div className="text-muted-foreground w-full">
                  <span>
                    {formatDate(
                      data.startIn.year,
                      data.startIn.month,
                      data.startIn.day
                    )}
                  </span>{" "}
                  <span>to</span>{" "}
                  <span>
                    {formatDate(
                      data.endIn.year,
                      data.endIn.month,
                      data.endIn.day
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <AnimeRelation relation={data.relation} id={id} />

        <div className="my-5">
          <h4 className="sub_headings">Recommendations</h4>
          <div className="anime_card_wrapper">
            {recommendations?.results.map((anime) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Info;
