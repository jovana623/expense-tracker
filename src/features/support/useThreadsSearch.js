import { useQuery } from "@tanstack/react-query";
import { searchThreads } from "../../services/apiSupport";

export function useThreadSearch(search) {
  const { data: searchResults, isLoading } = useQuery({
    queryFn: () => searchThreads(search),
    queryKey: ["search-threads", search],
    enabled: !!search && search.trim().length >= 2,
  });

  return { searchResults, isLoading };
}
