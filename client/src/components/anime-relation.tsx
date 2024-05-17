import { cn } from "@/lib/utils";
import { IAnime } from "@/types/anime.types";

const AnimeRelation = ({
  relation,
  id,
}: {
  relation: IAnime[];
  id: string;
}) => {
  const filteredRelations = relation
    .filter((relation) => relation.type !== "MANGA")
    .filter((anime) => anime.status !== "NOT_YET_RELEASED")
    .filter((anime) => anime.format !== "MUSIC")

  if (filteredRelations.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className="sub_headings">Relations</h3>
      <div className="w-full gap-3 grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4">
        {filteredRelations.splice(0, 12).map((relation) => (
          <a
            href={`/anime/${
              relation.title.userPreferred.toLowerCase().split(" ").join("-") +
              "-" +
              relation.id
            }`}
            className={cn(
              "px-5 relative py-3 rounded-md overflow-hidden",
              id === relation.id && "border-primary"
            )}
            key={relation.id}
          >
            <img
              src={relation.bannerImage}
              alt=""
              className="absolute h-full w-full blur-sm opacity-65 inset-0 object-cover -z-10"
            />
            <p className="text-sm truncate">{relation.title.userPreferred}</p>
          </a>
        ))}
      </div>
    </>
  );
};
export default AnimeRelation;
