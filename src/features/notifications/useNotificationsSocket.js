import useWebSocket from "react-use-websocket";

export function useNotificationSocket(userId, refetchNotification) {
  useWebSocket(`ws://localhost:8000/ws/notifications/${userId}/`, {
    onOpen: () => console.log("Websocket connected"),
    onMessage: () => {
      refetchNotification();
    },
    shouldReconnect: () => true,
  });
}
