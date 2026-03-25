import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useNotification, type Notification } from "@/contexts/NotificationContext";
import { Button } from "@/components/ui/button";

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    case "error":
      return <AlertCircle className="w-5 h-5 text-red-500" />;
    case "warning":
      return <AlertTriangle className="w-5 h-5 text-amber-500" />;
    case "info":
      return <Info className="w-5 h-5 text-blue-500" />;
    default:
      return null;
  }
};

const getNotificationStyles = (type: Notification["type"]) => {
  switch (type) {
    case "success":
      return "bg-green-50 border-green-200 text-green-900";
    case "error":
      return "bg-red-50 border-red-200 text-red-900";
    case "warning":
      return "bg-amber-50 border-amber-200 text-amber-900";
    case "info":
      return "bg-blue-50 border-blue-200 text-blue-900";
    default:
      return "bg-gray-50 border-gray-200 text-gray-900";
  }
};

const getPositionClasses = (position: string) => {
  const baseClasses = "fixed z-50 pointer-events-none";
  const positionMap: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 transform -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 transform -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };
  return `${baseClasses} ${positionMap[position] || positionMap["top-right"]}`;
};

const NotificationItem: React.FC<{ notification: Notification }> = ({ notification }) => {
  const { removeNotification } = useNotification();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="pointer-events-auto"
    >
      <div
        className={`
          flex items-start gap-3 p-4 rounded-lg border shadow-lg max-w-sm
          ${getNotificationStyles(notification.type)}
        `}
      >
        {/* Icon */}
        <div className="flex-shrink-0 mt-0.5">{getNotificationIcon(notification.type)}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {notification.title && <p className="font-semibold text-sm mb-1">{notification.title}</p>}
          <p className="text-sm opacity-90 break-words">{notification.message}</p>
          {notification.action && (
            <Button
              size="sm"
              variant="ghost"
              onClick={notification.action.onClick}
              className="mt-2 h-auto p-0 text-xs font-medium"
            >
              {notification.action.label}
            </Button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => removeNotification(notification.id)}
          className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export const NotificationContainer: React.FC = () => {
  const { notifications } = useNotification();

  // Group notifications by position
  const groupedNotifications = notifications.reduce(
    (acc, notification) => {
      const position = notification.position || "top-right";
      if (!acc[position]) {
        acc[position] = [];
      }
      acc[position].push(notification);
      return acc;
    },
    {} as Record<string, Notification[]>
  );

  return (
    <>
      {Object.entries(groupedNotifications).map(([position, notifs]) => (
        <div key={position} className={getPositionClasses(position)}>
          <div className="flex flex-col gap-3">
            <AnimatePresence mode="popLayout">
              {notifs.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      ))}
    </>
  );
};
