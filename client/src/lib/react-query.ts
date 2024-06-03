import { BASE_URL } from "@/constants";
import { IAnime } from "@/types/anime.types";
import { useInfiniteQuery } from "@tanstack/react-query";

async function fetchPopularAnime({
  limit = 16,
  page,
}: {
  limit: number;
  page: number;
}) {
  try {
    const response = await fetch(
      BASE_URL + `/api/popular?limit=${limit}&page=${page}`
    );
    const data = await response.json();
    return data.results as IAnime[];
  } catch (error) {
    console.log(error);
    throw Error;
  }
}

export function useGetPopularAnime() {
  return useInfiniteQuery({
    queryKey: ["popular_anime"],
    queryFn: ({ pageParam }) =>
      fetchPopularAnime({ limit: 16, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage?.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}
