import { motion } from "motion/react";
import {
  Bell,
  Check,
  Heart,
  MessageCircle,
} from "lucide-react";

import type { Notification } from "../../types/notification";

interface NotificationItemProps {
  notification: Notification;
  onRead: () => void;
}

// Turns a date into a short relative label like "7d", "3h", "now"
function formatTimeAgo(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();

  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 1) return "now";
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}h`;

  return `${diffDays}d`;
}

export default function NotificationItem({
  notification,
  onRead,
}: NotificationItemProps) {
  const isLike = notification.type === "like_post";

  return (
    <motion.div
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.2 }}
      className={`
        group
        relative
        overflow-hidden
        rounded-xl
        border
        p-3
        transition-all
        duration-300
        ${
          notification.isRead
            ? `
              border-white/[0.06]
              bg-white/[0.02]
              hover:border-white/10
              hover:bg-white/[0.05]
            `
            : `
              border-pink-500/15
              bg-gradient-to-r
              from-[#7C3AED]/10
              via-[#EC4899]/[0.06]
              to-transparent
              hover:border-pink-500/25
              hover:from-[#7C3AED]/15
              hover:via-[#EC4899]/10
            `
        }
      `}
    >
      {/* Unread glow */}
      {!notification.isRead && (
        <div
          className="
            pointer-events-none
            absolute
            left-0
            top-0
            h-full
            w-0.5
            bg-gradient-to-b
            from-[#7C3AED]
            via-[#EC4899]
            to-[#FF7A59]
          "
        />
      )}

      <div className="flex gap-3">
        {/* Avatar */}
        <div className="relative shrink-0">
          <div
            className={`
              rounded-full
              p-[2px]
              ${
                notification.isRead
                  ? "bg-white/10"
                  : "bg-gradient-to-br from-[#7C3AED] via-[#EC4899] to-[#FF7A59]"
              }
            `}
          >
            <img
              src={notification.actor.photo}
              alt={notification.actor.name}
              className="
                h-10
                w-10
                rounded-full
                border-2
                border-[#141A30]
                object-cover
              "
            />
          </div>

          {/* Notification type badge */}
          <span
            className={`
              absolute
              -bottom-1
              -right-1
              flex
              h-5
              w-5
              items-center
              justify-center
              rounded-full
              border-2
              border-[#141A30]
              text-white
              shadow-lg
              ${
                isLike
                  ? `
                    bg-gradient-to-br
                    from-[#EC4899]
                    to-[#FF4D8D]
                    shadow-pink-500/20
                  `
                  : `
                    bg-gradient-to-br
                    from-[#7C3AED]
                    to-[#EC4899]
                    shadow-purple-500/20
                  `
              }
            `}
          >
            {isLike ? (
              <Heart
                size={10}
                fill="currentColor"
                strokeWidth={2}
              />
            ) : (
              <MessageCircle
                size={10}
                fill="currentColor"
                strokeWidth={2}
              />
            )}
          </span>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Top row */}
          <div className="flex items-start justify-between gap-2">
            <p className="min-w-0 text-sm leading-5 text-[#CBD5E1]">
              <span className="font-semibold text-white">
                {notification.actor.name}
              </span>

              <span className="text-[#94A3B8]">
                {isLike
                  ? " liked your post"
                  : " commented on your post"}
              </span>
            </p>

            {/* Time + unread indicator */}
            <div className="flex shrink-0 items-center gap-1.5">
              <span className="text-[11px] font-medium text-[#64748B]">
                {formatTimeAgo(notification.createdAt)}
              </span>

              {!notification.isRead && (
                <span
                  className="
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-[#EC4899]
                    shadow-[0_0_8px_rgba(236,72,153,0.9)]
                  "
                />
              )}
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-2.5 flex items-center justify-between">
            <div
              className={`
                flex
                h-7
                w-7
                items-center
                justify-center
                rounded-lg
                ${
                  isLike
                    ? "bg-pink-500/10 text-[#EC4899]"
                    : "bg-purple-500/10 text-[#A78BFA]"
                }
              `}
            >
              {isLike ? (
                <Heart
                  size={14}
                  fill="currentColor"
                  strokeWidth={1.8}
                />
              ) : (
                <MessageCircle
                  size={14}
                  strokeWidth={1.8}
                />
              )}
            </div>

            {!notification.isRead && (
              <motion.button
                type="button"
                onClick={onRead}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-lg
                  border
                  border-white/10
                  bg-white/[0.04]
                  px-2.5
                  py-1.5
                  text-[11px]
                  font-semibold
                  text-[#CBD5E1]
                  transition-all
                  duration-200
                  hover:border-pink-500/30
                  hover:bg-pink-500/10
                  hover:text-white
                "
              >
                <Check
                  size={12}
                  className="text-[#EC4899]"
                />

                Mark as read
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}