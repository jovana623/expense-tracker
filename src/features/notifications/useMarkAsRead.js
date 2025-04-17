import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markNotificationAsRead } from "../../services/apiNotifications";

export function useMarkAsRead() {
  const queryClient = useQueryClient();

  const { mutate: markAsRead } = useMutation({
    mutationFn: async (id) => {
      return await markNotificationAsRead(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["notifications"] });

      const previousNotifications = queryClient.getQueryData(["notifications"]);

      queryClient.setQueryData(["notifications"], (old) =>
        old?.map((notification) =>
          notification.id === id
            ? { ...notification, is_read: true }
            : notification
        )
      );

      return { previousNotifications };
    },
    onError: (err, id, context) => {
      if (context?.previousNotifications) {
        queryClient.setQueryData(
          ["notifications"],
          context.previousNotifications
        );
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return { markAsRead };
}
