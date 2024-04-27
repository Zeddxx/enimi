import { IAnimeEpisode } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  year: number | undefined,
  month: number | undefined,
  day: number | undefined
) {
  if (!year || !month || !day) {
    return "?";
  }

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthIndex = month - 1;
  const formattedDate = `${months[monthIndex]} ${day}, ${year}`;

  return formattedDate;
}

export function destructureId(value: string) {
  const lastIndex = value.lastIndexOf("-");
  const episodeId = value.substring(0, lastIndex);
  const animeId = value.substring(lastIndex + 1);

  return { episodeId, animeId };
}

interface EpisodeNavigation {
  next: string | false;
  prev: string | false;
}

export const getEpisodeNavigation = (
  episodes: IAnimeEpisode[],
  currentId: string
): EpisodeNavigation => {

  const currentIndex = episodes.findIndex((ep) => ep.id === currentId);

  if (currentIndex !== -1) {
    const nextIndex = currentIndex + 1;
    const prevIndex = currentIndex - 1;

    const nextEpisodeId =
      nextIndex < episodes.length ? episodes[nextIndex].id : false;
    const prevEpisodeId =
      prevIndex >= 0 ? episodes[prevIndex].id : false;

    return {
      next: nextEpisodeId,
      prev: prevEpisodeId,
    };
  } else {
    return {
      next: false,
      prev: false,
    };
  }
};
