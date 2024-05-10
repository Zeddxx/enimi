import { IAnimeEpisode } from "@/types/anime.types";
import { ExtendedError } from "@/types/more.types";
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

/**
 * A function to get the next episode and the previous episode from the current episode id.
 * @param episodes total number of episodes that exist in the anime database.
 * @param currentId the current episode id in which we are;
 * @returns next and previous episode id.
 */
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
    const prevEpisodeId = prevIndex >= 0 ? episodes[prevIndex].id : false;

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

/**
 * a custom error checker if the error satisfies the condition then return the error object.
 * @param error default(unknown)
 * @returns errors object
 */
export const isCustomError = (error: unknown) => {
  return (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as ExtendedError).data.message === "string"
  );
};

// generate pagination pages
/**
 *  A simple pagination page number genrator to map and show those pages which can be accessable.
 * @param total the total number of pages that the particular route have!
 * @param page the current page we are on
 * @returns the array of page number which have to map.
 */
export const generatePageNumbers = (
  total: number,
  page: number,
  lastPage: number
) => {
  const totalPages = total || 1;
  const pagesToShow = 5;
  const currentPage = page;
  const pageNumbers = [];

  let startPage = 1;
  let endPage = totalPages;

  if (totalPages > pagesToShow) {
    const halfPagesToShow = Math.floor(pagesToShow / 2);
    if (currentPage <= halfPagesToShow) {
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + halfPagesToShow >= totalPages) {
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      startPage = currentPage - halfPagesToShow;
      endPage = currentPage + halfPagesToShow;
    }
  }

  for (let i = startPage; i <= endPage; i++) {
    if (i <= lastPage) {
      pageNumbers.push(i);
    } else {
      break; // Stop adding pages once lastPage is reached
    }
  }

  return pageNumbers;
};

export function formatDBDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

  const minutesDiff = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60)
  );
  const hoursDiff = Math.floor(minutesDiff / 60);
  const daysDiff = Math.floor(hoursDiff / 24);
  const monthDiff = Math.floor(daysDiff / 30);

  if (minutesDiff < 1) {
    // Adjust threshold here
    return "Just now";
  } else if (minutesDiff < 60) {
    return `${minutesDiff} ${minutesDiff === 1 ? "minute" : "minutes"} ago`;
  } else if (hoursDiff < 24) {
    return `${hoursDiff} ${hoursDiff === 1 ? "hour" : "hours"} ago`;
  } else if (daysDiff < 30) {
    return `${daysDiff} ${daysDiff === 1 ? "day" : "days"} ago`;
  } else {
    return `${monthDiff} ${monthDiff === 1 ? "month" : "months"} ago`;
  }
}
