import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Loader2,
  LogIn,
  Mail,
  UserRound,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import { signin } from "../../services/authService";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate(): string {
    if (!formData.login.trim()) {
      return "Please enter your email, username, or login.";
    }

    if (!formData.password) {
      return "Please enter your password.";
    }

    return "";
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationMessage = validate();

    if (validationMessage) {
      setFormError(validationMessage);
      return;
    }

    setFormError("");
    setIsLoading(true);

    try {
      const response = await signin(
        formData.login,
        formData.password
      );

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      );

      console.log("Login success:", response.data);

      navigate("/");
    } catch (error: any) {
      const serverMessage =
        error.response?.data?.message;

      setFormError(
        serverMessage ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#080B18]
      px-4
      py-8
      sm:px-6
    ">
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      ">
        {/* Purple glow */}
        <div className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-purple-600/20
          blur-[130px]
        " />

        {/* Pink glow */}
        <div className="
          absolute
          -bottom-40
          -right-32
          h-[30rem]
          w-[30rem]
          rounded-full
          bg-pink-500/15
          blur-[140px]
        " />

        {/* Center glow */}
        <div className="
          absolute
          left-1/2
          top-1/2
          h-80
          w-80
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-500/5
          blur-[120px]
        " />
      </div>

      {/* Decorative circles */}
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

      {/* =====================================================
          LOGIN CARD
      ====================================================== */}

      <div className="
        relative
        z-10
        flex
        min-h-[calc(100vh-4rem)]
        items-center
        justify-center
      ">
        <motion.div
          initial={{
            opacity: 0,
            y: 25,
            scale: 0.98,
          }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
          }}
          transition={{
            duration: 0.45,
          }}
          className="
            relative
            w-full
            max-w-md
            overflow-hidden
            rounded-3xl
            border
            border-white/10
            bg-[#141A30]/85
            p-6
            shadow-2xl
            shadow-black/40
            backdrop-blur-xl
            sm:p-8
          "
        >
          {/* Card glow */}
          <div className="
            pointer-events-none
            absolute
            -right-24
            -top-24
            h-56
            w-56
            rounded-full
            bg-purple-600/10
            blur-3xl
          " />

          <div className="
            pointer-events-none
            absolute
            -bottom-24
            -left-24
            h-56
            w-56
            rounded-full
            bg-pink-500/10
            blur-3xl
          " />

          <div className="relative">
            {/* =================================================
                BRAND
            ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.4,
                delay: 0.05,
              }}
              className="
                mb-7
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <div className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-[#7C3AED]
                via-[#EC4899]
                to-[#FF7A59]
                shadow-lg
                shadow-pink-500/20
              ">
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <span className="
                text-lg
                font-extrabold
                tracking-tight
                text-white
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
              </span>
            </motion.div>

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="text-center">
              <h1 className="
                text-2xl
                font-bold
                tracking-tight
                text-white
                sm:text-3xl
              ">
                Welcome back
              </h1>

              <p className="
                mt-2
                text-sm
                text-[#94A3B8]
              ">
                Login to continue to Route Posts.
              </p>
            </div>

            {/* =================================================
                ERROR
            ================================================== */}

            {formError && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-xl
                  border
                  border-red-400/15
                  bg-red-400/[0.05]
                  px-4
                  py-3
                "
              >
                <AlertCircle className="
                  mt-0.5
                  h-4
                  w-4
                  shrink-0
                  text-red-400
                " />

                <p className="
                  text-sm
                  leading-5
                  text-red-300
                ">
                  {formError}
                </p>
              </motion.div>
            )}

            {/* =================================================
                FORM
            ================================================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              {/* Login */}
              <div>
                <label
                  htmlFor="login"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-[#F8FAFC]
                  "
                >
                  Email, username, or login
                </label>

                <div className="relative">
                  <div className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                  ">
                    <Mail className="
                      h-4
                      w-4
                      text-[#64748B]
                    " />
                  </div>

                  <input
                    id="login"
                    name="login"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder="Enter your email or username"
                    autoComplete="username"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      py-3
                      pl-11
                      pr-4
                      text-sm
                      text-[#F8FAFC]
                      outline-none
                      placeholder:text-[#64748B]
                      transition-all
                      duration-300
                      focus:border-[#EC4899]/40
                      focus:bg-white/[0.06]
                      focus:shadow-[0_0_20px_rgba(236,72,153,0.10)]
                    "
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="
                  mb-2
                  flex
                  items-center
                  justify-between
                ">
                  <label
                    htmlFor="password"
                    className="
                      text-sm
                      font-semibold
                      text-[#F8FAFC]
                    "
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <div className="
                    pointer-events-none
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                  ">
                    <LockKeyhole className="
                      h-4
                      w-4
                      text-[#64748B]
                    " />
                  </div>

                  <input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-white/10
                      bg-white/[0.04]
                      py-3
                      pl-11
                      pr-12
                      text-sm
                      text-[#F8FAFC]
                      outline-none
                      placeholder:text-[#64748B]
                      transition-all
                      duration-300
                      focus:border-[#EC4899]/40
                      focus:bg-white/[0.06]
                      focus:shadow-[0_0_20px_rgba(236,72,153,0.10)]
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      rounded-lg
                      p-1.5
                      text-[#64748B]
                      transition-colors
                      hover:bg-white/5
                      hover:text-[#EC4899]
                    "
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* =================================================
                  SUBMIT
              ================================================== */}

              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={
                  !isLoading
                    ? { scale: 1.01 }
                    : {}
                }
                whileTap={
                  !isLoading
                    ? { scale: 0.98 }
                    : {}
                }
                className="
                  mt-2
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-gradient-to-r
                  from-[#7C3AED]
                  via-[#EC4899]
                  to-[#FF7A59]
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-pink-500/20
                  transition-all
                  duration-300
                  hover:shadow-xl
                  hover:shadow-pink-500/30
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  disabled:shadow-none
                "
              >
                {isLoading ? (
                  <>
                    <Loader2 className="
                      h-4
                      w-4
                      animate-spin
                    " />

                    Logging in...
                  </>
                ) : (
                  <>
                    <LogIn className="h-4 w-4" />

                    Login
                  </>
                )}
              </motion.button>
            </form>

            {/* =================================================
                FOOTER
            ================================================== */}

            <div className="
              mt-6
              flex
              items-center
              justify-center
              gap-2
              text-xs
              text-[#64748B]
            ">
              <UserRound className="h-3.5 w-3.5" />

              <span>
                Welcome to the Route Posts community
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}