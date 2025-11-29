import type { Spot } from "@skatehubba/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type SpotListParams, spotsApi } from "../api/spotsApi";

export const useSpots = (params: SpotListParams) => {
  return useQuery({
    queryKey: ["spots", params],
    queryFn: ({ signal }) => spotsApi.getSpots(params, signal),
  });
};

export const useSpot = (id: string) => {
  return useQuery({
    queryKey: ["spots", id],
    queryFn: ({ signal }) => spotsApi.getSpot(id, signal),
    enabled: !!id,
  });
};

export const useCreateSpot = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Omit<Spot, "id" | "createdAt" | "createdBy">) =>
      spotsApi.createSpot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["spots"] });
    },
  });
};
