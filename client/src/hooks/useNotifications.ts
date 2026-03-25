import { useNotification, type NotificationType, type NotificationPosition } from "@/contexts/NotificationContext";

interface NotificationOptions {
  title?: string;
  duration?: number;
  position?: NotificationPosition;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const useNotifications = () => {
  const { addNotification, removeNotification, clearNotifications } = useNotification();

  return {
    success: (message: string, options?: NotificationOptions) =>
      addNotification({
        type: "success",
        message,
        ...options,
      }),

    error: (message: string, options?: NotificationOptions) =>
      addNotification({
        type: "error",
        message,
        ...options,
      }),

    info: (message: string, options?: NotificationOptions) =>
      addNotification({
        type: "info",
        message,
        ...options,
      }),

    warning: (message: string, options?: NotificationOptions) =>
      addNotification({
        type: "warning",
        message,
        ...options,
      }),

    remove: removeNotification,
    clear: clearNotifications,
  };
};
