import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  Check,
  Loader2,
  Inbox,
  Sparkles,
} from "lucide-react";

import NotificationItem from "./NotificationItem";
import type { Notification } from "../../types/notification";

import {
  getNotifications,
  markNotificationRead,
  markAllNotificationsRead,
} from "../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const [filter, setFilter] = useState<"all" | "unread">("all");

  useEffect(() => {
    async function fetchNotifications() {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const data = await getNotifications(token, 1, 40);

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
      console.error(
        "Failed to mark notification as read",
        error
      );
    }
  };

  const handleMarkAllRead = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      await markAllNotificationsRead(token);

      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        }))
      );
    } catch (error) {
      console.error(
        "Failed to mark all notifications as read",
        error
      );
    }
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const visibleNotifications =
    filter === "unread"
      ? notifications.filter(
          (notification) => !notification.isRead
        )
      : notifications;

  /* =========================
     Loading State
  ========================= */

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#080B18]">
        {/* Background glows */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-32 top-20 h-72 w-72 rounded-full bg-[#7C3AED]/10 blur-3xl" />

          <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-[#EC4899]/10 blur-3xl" />
        </div>

        <div className="relative mx-auto flex min-h-screen w-full max-w-4xl items-center justify-center px-4">
          <div className="flex flex-col items-center">
            <div
              className="
                mb-5
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-white/10
                bg-[#141A30]/80
                shadow-xl
                shadow-purple-500/10
                backdrop-blur-xl
              "
            >
              <Loader2
                size={26}
                className="animate-spin text-[#EC4899]"
              />
            </div>

            <p className="text-sm font-medium text-[#94A3B8]">
              Loading notifications...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#080B18]">
      {/* =========================
          Background
      ========================= */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#7C3AED]/10 blur-3xl" />

        <div className="absolute -right-32 top-32 h-96 w-96 rounded-full bg-[#EC4899]/10 blur-3xl" />

        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-[#FF7A59]/5 blur-3xl" />
      </div>

      {/* =========================
          Page
      ========================= */}

      <div className="relative mx-auto w-full max-w-4xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            ease: "easeOut",
          }}
          className="
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.08]
            bg-[#141A30]/80
            shadow-2xl
            shadow-black/30
            backdrop-blur-2xl
          "
        >
          {/* =========================
              Header
          ========================= */}

          <div className="border-b border-white/[0.08] p-5 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              {/* Title */}
              <div className="flex items-start gap-4">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#7C3AED]/20
                    via-[#EC4899]/15
                    to-[#FF7A59]/10
                    text-[#EC4899]
                    shadow-lg
                    shadow-pink-500/10
                  "
                >
                  <Bell size={23} />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
                      Notifications
                    </h1>

                    {unreadCount > 0 && (
                      <span
                        className="
                          rounded-full
                          bg-gradient-to-r
                          from-[#EC4899]
                          to-[#FF7A59]
                          px-2
                          py-0.5
                          text-[10px]
                          font-bold
                          text-white
                          shadow-lg
                          shadow-pink-500/20
                        "
                      >
                        {unreadCount}
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-sm leading-5 text-[#64748B]">
                    Realtime updates for likes, comments,
                    shares, and follows.
                  </p>
                </div>
              </div>

              {/* Mark all button */}
              {unreadCount > 0 && (
                <motion.button
                  type="button"
                  onClick={handleMarkAllRead}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="
                    inline-flex
                    w-fit
                    items-center
                    gap-2
                    rounded-xl
                    border
                    border-white/10
                    bg-white/[0.04]
                    px-3.5
                    py-2.5
                    text-sm
                    font-semibold
                    text-[#CBD5E1]
                    transition-all
                    duration-300
                    hover:border-pink-500/30
                    hover:bg-pink-500/10
                    hover:text-white
                  "
                >
                  <Check
                    size={16}
                    className="text-[#EC4899]"
                  />

                  Mark all as read
                </motion.button>
              )}
            </div>
          </div>

          {/* =========================
              Filters
          ========================= */}

          <div className="border-b border-white/[0.08] px-5 py-4 sm:px-7">
            <div className="flex items-center gap-2">
              {/* All */}
              <button
                type="button"
                onClick={() => setFilter("all")}
                className={`
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    filter === "all"
                      ? `
                        bg-gradient-to-r
                        from-[#7C3AED]
                        via-[#EC4899]
                        to-[#FF7A59]
                        text-white
                        shadow-lg
                        shadow-pink-500/15
                      `
                      : `
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        text-[#94A3B8]
                        hover:bg-white/[0.06]
                        hover:text-white
                      `
                  }
                `}
              >
                All
              </button>

              {/* Unread */}
              <button
                type="button"
                onClick={() => setFilter("unread")}
                className={`
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  transition-all
                  duration-300
                  ${
                    filter === "unread"
                      ? `
                        bg-gradient-to-r
                        from-[#7C3AED]
                        via-[#EC4899]
                        to-[#FF7A59]
                        text-white
                        shadow-lg
                        shadow-pink-500/15
                      `
                      : `
                        border
                        border-white/[0.08]
                        bg-white/[0.03]
                        text-[#94A3B8]
                        hover:bg-white/[0.06]
                        hover:text-white
                      `
                  }
                `}
              >
                Unread

                <span
                  className={`
                    min-w-5
                    rounded-full
                    px-1.5
                    py-0.5
                    text-center
                    text-[10px]
                    font-bold
                    ${
                      filter === "unread"
                        ? "bg-white/20 text-white"
                        : "bg-white/[0.07] text-[#94A3B8]"
                    }
                  `}
                >
                  {unreadCount}
                </span>
              </button>
            </div>
          </div>

          {/* =========================
              Notifications
          ========================= */}

          <div className="p-3 sm:p-5">
            {visibleNotifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/[0.06]
                  bg-white/[0.02]
                  px-6
                  py-16
                  text-center
                "
              >
                <div
                  className="
                    mb-5
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    from-[#7C3AED]/10
                    via-[#EC4899]/10
                    to-[#FF7A59]/5
                    text-[#64748B]
                  "
                >
                  {filter === "unread" ? (
                    <Check size={28} />
                  ) : (
                    <Inbox size={28} />
                  )}
                </div>

                <h2 className="text-base font-semibold text-white">
                  {filter === "unread"
                    ? "You're all caught up"
                    : "No notifications yet"}
                </h2>

                <p className="mt-2 max-w-sm text-sm leading-6 text-[#64748B]">
                  {filter === "unread"
                    ? "You don't have any unread notifications right now."
                    : "When someone likes, comments, or interacts with your posts, you'll see it here."}
                </p>

                <Sparkles
                  size={16}
                  className="mt-5 text-[#7C3AED]"
                />
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="space-y-2">
                  {visibleNotifications.map(
                    (notification, index) => (
                      <motion.div
                        key={notification._id}
                        initial={{
                          opacity: 0,
                          y: 10,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.98,
                        }}
                        transition={{
                          duration: 0.25,
                          delay: Math.min(
                            index * 0.04,
                            0.25
                          ),
                        }}
                      >
                        <NotificationItem
                          notification={notification}
                          onRead={() =>
                            handleRead(
                              notification._id
                            )
                          }
                        />
                      </motion.div>
                    )
                  )}
                </div>
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}