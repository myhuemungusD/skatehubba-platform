import { useQuery } from "@tanstack/react-query";
import { api } from "../lib/api";

export function useProfile() {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => api.getProfile(),
    staleTime: 5 * 60 * 1000,
    enabled: false,
  });
}
