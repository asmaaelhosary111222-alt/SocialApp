import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Bell, Check, Loader2, X } from "lucide-react";

import NotificationItem from "./NotificationItem";

import {
  getNotifications,
  markNotificationRead,
} from "../../services/notificationService";

import type { Notification } from "../../types/notification";

interface NotificationDropdownProps {
  onClose: () => void;
}

export default function NotificationDropdown({
  onClose,
}: NotificationDropdownProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getNotifications(token, 1, 10);

        setNotifications(data);
      } catch (error) {
        console.error("Failed to load notifications", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNotifications();
  }, []);

  const handleRead = async (notificationId: string) => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await markNotificationRead(notificationId, token);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification._id === notificationId
            ? {
                ...notification,
                isRead: true,
              }
            : notification
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: -8, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="
          absolute
          right-0
          top-14
          z-50
          w-[calc(100vw-2rem)]
          max-w-[380px]
          overflow-hidden
          rounded-2xl
          border
          border-white/10
          bg-[#141A30]/95
          shadow-2xl
          shadow-black/40
          backdrop-blur-2xl
        "
      >
        <div className="flex items-center justify-center gap-3 px-6 py-10">
          <Loader2
            size={20}
            className="animate-spin text-[#EC4899]"
          />

          <span className="text-sm text-[#94A3B8]">
            Loading notifications...
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="
        absolute
        right-0
        top-14
        z-50
        w-[calc(100vw-2rem)]
        max-w-[380px]
        overflow-hidden
        rounded-2xl
        border
        border-white/10
        bg-[#141A30]/95
        shadow-2xl
        shadow-black/50
        backdrop-blur-2xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/[0.08] px-4 py-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-br
              from-[#7C3AED]/20
              via-[#EC4899]/15
              to-[#FF7A59]/10
              text-[#EC4899]
            "
          >
            <Bell size={19} />
          </div>

          <div>
            <h3 className="text-sm font-bold text-white">
              Notifications
            </h3>

            <p className="mt-0.5 text-xs text-[#64748B]">
              {unreadCount > 0
                ? `${unreadCount} unread notification${
                    unreadCount > 1 ? "s" : ""
                  }`
                : "You're all caught up"}
            </p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={onClose}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="
            flex
            h-8
            w-8
            items-center
            justify-center
            rounded-lg
            text-[#64748B]
            transition
            hover:bg-white/[0.06]
            hover:text-white
          "
          aria-label="Close notifications"
        >
          <X size={17} />
        </motion.button>
      </div>

      {/* Notification list */}
      <div className="max-h-[420px] overflow-y-auto p-2">
        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center px-6 py-12 text-center"
          >
            <div
              className="
                mb-4
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-white/[0.04]
                text-[#64748B]
              "
            >
              <Bell size={23} />
            </div>

            <h4 className="text-sm font-semibold text-white">
              No notifications
            </h4>

            <p className="mt-1 max-w-[220px] text-xs leading-5 text-[#64748B]">
              You don't have any notifications right now.
            </p>
          </motion.div>
        ) : (
          <AnimatePresence initial={false}>
            <div className="space-y-1">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification._id}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: Math.min(index * 0.04, 0.2),
                  }}
                >
                  <NotificationItem
                    notification={notification}
                    onRead={() =>
                      handleRead(notification._id)
                    }
                  />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="border-t border-white/[0.08] px-4 py-3">
          <div className="flex items-center justify-center gap-2 text-xs text-[#64748B]">
            <Check size={14} className="text-[#7C3AED]" />
            <span>Click a notification to mark it as read</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}