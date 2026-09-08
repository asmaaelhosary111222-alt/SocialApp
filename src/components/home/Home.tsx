import { motion } from "motion/react";

import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import SuggestedFriends from "./suggestedfriends/SuggestedFriends";




export default function Home() {
  return (
    <div
      className="
        relative
        min-h-[calc(100vh-72px)]
        overflow-hidden
        bg-[#080B18]
        px-4
        py-5
        sm:px-6
        lg:px-7
        lg:py-6
      "
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Left purple glow */}
        <div
          className="
            absolute
            -left-40
            top-20
            h-96
            w-96
            rounded-full
            bg-purple-600/10
            blur-[140px]
          "
        />

        {/* Right pink glow */}
        <div
          className="
            absolute
            -right-40
            top-40
            h-96
            w-96
            rounded-full
            bg-pink-500/10
            blur-[150px]
          "
        />

        {/* Bottom coral glow */}
        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-72
            w-72
            -translate-x-1/2
            rounded-full
            bg-[#FF7A59]/5
            blur-[130px]
          "
        />
      </div>

      {/* =====================================================
          DASHBOARD
      ====================================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-[1600px]
          grid-cols-1
          gap-5
          lg:grid-cols-[220px_minmax(0,1fr)]
          xl:grid-cols-[220px_minmax(0,1fr)_280px]
          xl:gap-6
        "
      >
        {/* =================================================
            LEFT SIDEBAR
        ================================================== */}

        <motion.aside
          initial={{
            opacity: 0,
            x: -15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.4,
          }}
          className="
            hidden
            lg:block
          "
        >
          <div className="sticky top-24">
            <Sidebar />
          </div>
        </motion.aside>

        {/* =================================================
            MOBILE SIDEBAR
        ================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: -10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.35,
          }}
          className="
            lg:hidden
          "
        >
          <Sidebar />
        </motion.div>

        {/* =================================================
            MIDDLE FEED
        ================================================== */}

        <motion.main
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: 0.05,
          }}
          className="
            min-w-0
            w-full
          "
        >
          <Feed />
        </motion.main>

        {/* =================================================
            RIGHT SIDEBAR
        ================================================== */}

        <motion.aside
          initial={{
            opacity: 0,
            x: 15,
          }}
          animate={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 0.4,
            delay: 0.1,
          }}
          className="
            hidden
            xl:block
          "
        >
          <div className="sticky top-24">
            <SuggestedFriends />
          </div>
        </motion.aside>
      </div>
    </div>
  );
}