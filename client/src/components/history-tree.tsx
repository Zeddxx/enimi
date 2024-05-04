// shadcn components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// utils functions imports...
import { cn } from "@/lib/utils";

// type imports
import { IAnimeEpisode } from "@/types/anime.types";

interface Props {
  title: string;
  id: string;
  animeId: string;
  episodes: IAnimeEpisode[];
}

const HistoryTree = ({ title, id, episodes, animeId }: Props) => {
  return (
    <div className={cn("2xl:max-w-screen-2xl mx-auto max-w-7xl px-4 mt-3")}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/home" className="hover:text-primary">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="hover:text-primary"
              href={`/anime/${title
                .toLowerCase()
                .split(" ")
                .join("-")}-${animeId}`}
            >
              {title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {episodes.find((anime) => anime.id === id)?.title}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
export default HistoryTree;
