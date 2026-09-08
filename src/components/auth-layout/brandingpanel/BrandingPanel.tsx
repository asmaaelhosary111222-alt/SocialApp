import { motion } from "motion/react";
import {
  ArrowUpRight,
  Building2,
  GraduationCap,
  Sparkles,
  Users,
} from "lucide-react";

export default function BrandingPanel() {
  const stats = [
    { value: "2012", label: "FOUNDED" },
    { value: "40K+", label: "GRADUATES" },
    { value: "50+", label: "PARTNER COMPANIES" },
    { value: "5", label: "BRANCHES" },
    { value: "20", label: "DIPLOMAS AVAILABLE" },
  ];

  return (
    <div className="relative flex min-h-full overflow-hidden bg-[#080B18] p-8 lg:p-12">
      {/* ==================== BACKGROUND GLOW ==================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-purple-600/20
          blur-[120px]
        " />

        <div className="
          absolute
          -bottom-40
          -right-20
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-pink-500/15
          blur-[130px]
        " />

        <div className="
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-orange-500/5
          blur-[100px]
        " />
      </div>

      {/* ==================== DECORATIVE SHAPES ==================== */}

      <div className="
        pointer-events-none
        absolute
        right-10
        top-10
        h-24
        w-24
        rounded-full
        border
        border-purple-400/10
      " />

      <div className="
        pointer-events-none
        absolute
        right-16
        top-16
        h-12
        w-12
        rounded-full
        border
        border-pink-400/10
      " />

      {/* ==================== CONTENT ==================== */}

      <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col justify-center">
        {/* Brand badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 backdrop-blur-xl"
        >
          <span className="
            flex
            h-6
            w-6
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-[#7C3AED]
            to-[#EC4899]
          ">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </span>

          <span className="text-xs font-medium text-[#CBD5E1]">
            The Route Posts Community
          </span>
        </motion.div>

        {/* ==================== HERO ==================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05 }}
        >
          <h1 className="
            text-5xl
            font-extrabold
            tracking-tight
            text-white
            sm:text-6xl
            lg:text-7xl
          ">
            Route{" "}
            <span className="
              bg-gradient-to-r
              from-[#7C3AED]
              via-[#EC4899]
              to-[#FF7A59]
              bg-clip-text
              text-transparent
            ">
              Posts
            </span>
          </h1>

          <p className="
            mt-5
            max-w-xl
            text-lg
            leading-8
            text-[#94A3B8]
            sm:text-xl
          ">
            Connect with friends and the world around you
            on Route Posts.
          </p>
        </motion.div>

        {/* ==================== ABOUT CARD ==================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="
            relative
            mt-10
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#141A30]/75
            p-6
            shadow-2xl
            shadow-black/30
            backdrop-blur-xl
            sm:p-7
          "
        >
          {/* Card glow */}
          <div className="
            pointer-events-none
            absolute
            -right-20
            -top-20
            h-48
            w-48
            rounded-full
            bg-purple-600/10
            blur-3xl
          " />

          <div className="relative">
            {/* Label */}
            <div className="flex items-center gap-2">
              <div className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-lg
                bg-gradient-to-br
                from-[#7C3AED]
                to-[#EC4899]
                shadow-lg
                shadow-purple-500/20
              ">
                <Building2 className="h-4 w-4 text-white" />
              </div>

              <p className="
                text-xs
                font-bold
                tracking-[0.18em]
                text-[#EC4899]
              ">
                ABOUT ROUTE ACADEMY
              </p>
            </div>

            {/* Heading */}
            <h2 className="
              mt-4
              text-xl
              font-bold
              leading-snug
              text-white
              sm:text-2xl
            ">
              Egypt's Leading IT Training Center Since 2012
            </h2>

            {/* Description */}
            <p className="
              mt-3
              text-sm
              leading-6
              text-[#94A3B8]
            ">
              Route Academy is the premier IT training center
              in Egypt, established in 2012. We specialize in
              delivering high-quality training courses in
              programming, web development, and application
              development.
            </p>

            {/* ==================== STATS ==================== */}

            <div className="
              mt-7
              grid
              grid-cols-2
              gap-3
              sm:grid-cols-3
            ">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.25 + index * 0.05,
                  }}
                  whileHover={{
                    y: -3,
                  }}
                  className="
                    group
                    relative
                    overflow-hidden
                    rounded-2xl
                    border
                    border-white/10
                    bg-white/[0.035]
                    p-4
                    transition-colors
                    hover:bg-white/[0.06]
                  "
                >
                  {/* Hover glow */}
                  <div className="
                    pointer-events-none
                    absolute
                    -right-6
                    -top-6
                    h-16
                    w-16
                    rounded-full
                    bg-pink-500/10
                    opacity-0
                    blur-2xl
                    transition-opacity
                    group-hover:opacity-100
                  " />

                  <p className="
                    relative
                    text-xl
                    font-extrabold
                    tracking-tight
                    text-white
                  ">
                    {stat.value}
                  </p>

                  <p className="
                    relative
                    mt-1
                    text-[9px]
                    font-semibold
                    leading-4
                    tracking-[0.12em]
                    text-[#64748B]
                  ">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ==================== BOTTOM MESSAGE ==================== */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-6 flex items-center gap-3 text-sm text-[#64748B]"
        >
          <div className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-lg
            border
            border-white/10
            bg-white/[0.03]
          ">
            <Users className="h-4 w-4 text-[#EC4899]" />
          </div>

          <span>
            Built for learners, creators, and the Route community.
          </span>

          <ArrowUpRight className="ml-auto h-4 w-4 text-[#EC4899]" />
        </motion.div>
      </div>
    </div>
  );
}