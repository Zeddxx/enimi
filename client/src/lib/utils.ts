import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(year: number | undefined, month: number | undefined, day: number | undefined) {
  if(!year || !month || !day) {
    return "?"
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  const monthIndex = month - 1;
  const formattedDate = `${months[monthIndex]} ${day}, ${year}`

  return formattedDate;
}

export function destructureId(value: string) {
  const lastIndex = value.lastIndexOf("-");
  const episodeId = value.substring(0, lastIndex);
  const animeId = value.substring(lastIndex + 1);

  return { episodeId, animeId }
}