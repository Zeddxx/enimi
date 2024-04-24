import { cn } from "@/lib/utils";
import { IAnime } from "@/types";
import { Link } from "react-router-dom";

const AnimeRelation = ({
  relation,
  id,
}: {
  relation: IAnime[];
  id: string;
}) => {
  return (
    <div className="w-full gap-3 grid xl:grid-cols-8 lg:grid-cols-6 md:grid-cols-5 sm:grid-cols-4">
      {relation
        .filter((relation) => relation.type !== "MANGA")
        .splice(0, 12)
        .map((relation) => (
          <Link
            to={`/${
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
          </Link>
        ))}
    </div>
  );
};
export default AnimeRelation;
