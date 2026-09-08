// src/components/auth-layout/AuthLayout.tsx

import { Outlet } from "react-router-dom";
import { motion } from "motion/react";
import AuthTabs from "./authtabs/AuthTabs";
import BrandingPanel from "./brandingpanel/BrandingPanel";

export default function AuthLayout() {
  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#080B18]
        px-4
        py-6
        sm:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          BACKGROUND EFFECTS
      ====================================================== */}

      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        {/* Purple glow */}
        <div
          className="
            absolute
            -left-40
            -top-40
            h-[32rem]
            w-[32rem]
            rounded-full
            bg-purple-600/15
            blur-[150px]
          "
        />

        {/* Pink glow */}
        <div
          className="
            absolute
            -bottom-40
            -right-40
            h-[34rem]
            w-[34rem]
            rounded-full
            bg-pink-500/10
            blur-[160px]
          "
        />

        {/* Coral glow */}
        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-96
            w-96
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-[#FF7A59]/5
            blur-[140px]
          "
        />
      </div>

      {/* =====================================================
          DECORATIVE CIRCLES
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          right-8
          top-8
          z-0
          h-32
          w-32
          rounded-full
          border
          border-white/5
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-16
          top-16
          z-0
          h-16
          w-16
          rounded-full
          border
          border-purple-400/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-10
          left-10
          z-0
          h-24
          w-24
          rounded-full
          border
          border-pink-400/10
        "
      />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-3rem)]
          w-full
          max-w-7xl
          items-center
        "
      >
        <div
          className="
            grid
            w-full
            grid-cols-1
            items-center
            gap-6
            lg:grid-cols-[1.05fr_0.95fr]
            lg:gap-8
          "
        >
          {/* =================================================
              BRANDING - DESKTOP
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="hidden lg:block"
          >
            <BrandingPanel />
          </motion.div>

          {/* =================================================
              AUTH CARD
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.08,
              ease: "easeOut",
            }}
            className="
              relative
              z-20
              w-full
              max-w-xl
              justify-self-center
              lg:max-w-none
            "
          >
            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-[#141A30]/80
                p-5
                shadow-[0_25px_80px_rgba(0,0,0,0.45)]
                backdrop-blur-xl
                sm:p-7
              "
            >
              {/* =================================================
                  CARD GLOWS
              ================================================== */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-purple-600/10
                  blur-3xl
                "
              />

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-pink-500/10
                  blur-3xl
                "
              />

              {/* =================================================
                  CARD CONTENT
              ================================================== */}

              <div className="relative z-10">
                {/* Login / Register tabs */}

                <AuthTabs />

                {/* Active auth page */}

                <div className="mt-6">
                  <Outlet />
                </div>
              </div>
            </div>
          </motion.div>

          {/* =================================================
              BRANDING - MOBILE
          ================================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: 0.15,
            }}
            className="
              order-first
              lg:hidden
            "
          >
            <div className="mx-auto max-w-xl">
              <BrandingPanel />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}