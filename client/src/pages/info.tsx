import AnimeRelation from "@/components/anime-relation";
import AnimeInfoTitleContainer from "@/components/shared/anime-info-title-container";
import AnimePoster from "@/components/shared/anime-poster";
import BannerImage from "@/components/shared/banner-image";
import { formatDate } from "@/lib/utils";
import {
  useGetAnimeInfoByIdQuery,
  useGetRecommendationByIdQuery,
} from "@/redux/api";
import { Link, useParams } from "react-router-dom";

const Info = () => {
  const { animeId } = useParams();

  const id = animeId?.split("-").pop() ?? "";
  const { data, isLoading } = useGetAnimeInfoByIdQuery({ id });
  const { data: recommendations } = useGetRecommendationByIdQuery({ id });

  if (isLoading) {
    return <p className="">Loading...</p>;
  }

  if (!data) {
    return null;
  }

  return (
    <section className="relative w-full">
      <BannerImage bannerImage={data.bannerImage} />
      <div className="max-w-screen-2xl mx-auto px-4 w-full pt-32">
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
          <div className="lg:max-w-sm w-full lg:p-6 p-0 rounded mt-6 lg:mt-0">
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

        {/* Relations */}
        <h3 className="sub_headings">Relations</h3>
        <AnimeRelation relation={data.relation} id={id} />

        <div className="my-5">
          <h4 className="sub_headings">Recommendations</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:grid-cols-3 gap-4">
            {recommendations?.results.map((anime) => (
              <div key={anime.id} className="aspect-[12/16]">
                <Link
                  to={`/${anime.animeId}`}
                  className="h-full w-full rounded-md overflow-hidden block shadow"
                >
                  <img
                    src={anime.coverImage.large}
                    alt="anime image poster"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <h5 className="mt-2 font-medium">
                  <Link preventScrollReset={false} to={`/${anime.animeId}`} className="hover:text-primary line-clamp-1 transition-colors duration-200">
                    {anime.title.userPreferred}
                  </Link>
                </h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default Info;
