import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  KeyRound,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { changePassword } from "../../services/authService";

export default function ChangePassword() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      setIsLoading(true);

      await changePassword(password, newPassword, token);

      setMessage("Password changed successfully.");

      setPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error("Failed to change password:", error);

      const serverMessage = error.response?.data?.message;

      setError(
        serverMessage ||
          "Failed to change password. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="
      relative
      min-h-screen
      overflow-hidden
      bg-[#080B18]
      px-4
      py-10
      sm:px-6
    ">
      {/* ==================== BACKGROUND ==================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="
          absolute
          -left-32
          -top-32
          h-96
          w-96
          rounded-full
          bg-purple-600/15
          blur-[130px]
        " />

        <div className="
          absolute
          -bottom-40
          -right-32
          h-[28rem]
          w-[28rem]
          rounded-full
          bg-pink-500/10
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
          blur-[110px]
        " />
      </div>

      {/* ==================== CARD ==================== */}

      <div className="
        relative
        z-10
        flex
        min-h-[calc(100vh-5rem)]
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
          transition={{ duration: 0.45 }}
          className="
            relative
            w-full
            max-w-lg
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
            {/* ==================== HEADER ==================== */}

            <div className="flex items-start gap-4">
              <div className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-2xl
                bg-gradient-to-br
                from-[#7C3AED]
                via-[#EC4899]
                to-[#FF7A59]
                shadow-lg
                shadow-pink-500/20
              ">
                <KeyRound className="h-5 w-5 text-white" />
              </div>

              <div>
                <h1 className="
                  text-xl
                  font-bold
                  tracking-tight
                  text-white
                ">
                  Change Password
                </h1>

                <p className="
                  mt-1.5
                  text-sm
                  leading-5
                  text-[#94A3B8]
                ">
                  Keep your account secure with a strong
                  password.
                </p>
              </div>
            </div>

            {/* Security badge */}
            <div className="
              mt-5
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-emerald-400/10
              bg-emerald-400/[0.04]
              px-3
              py-2.5
            ">
              <ShieldCheck className="
                h-4
                w-4
                shrink-0
                text-emerald-400
              " />

              <p className="text-xs text-[#94A3B8]">
                Choose a password that you don't use on
                other websites.
              </p>
            </div>

            {/* ==================== FORM ==================== */}

            <form
              onSubmit={handleSubmit}
              className="mt-7 space-y-5"
            >
              {/* Current Password */}
              <PasswordInput
                label="Current password"
                placeholder="Enter current password"
                value={password}
                onChange={setPassword}
                visible={showPassword}
                onToggle={() =>
                  setShowPassword((prev) => !prev)
                }
              />

              {/* New Password */}
              <div>
                <PasswordInput
                  label="New password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={setNewPassword}
                  visible={showNewPassword}
                  onToggle={() =>
                    setShowNewPassword((prev) => !prev)
                  }
                />

                <div className="
                  mt-2
                  flex
                  items-start
                  gap-2
                ">
                  <LockKeyhole className="
                    mt-0.5
                    h-3.5
                    w-3.5
                    shrink-0
                    text-purple-400
                  " />

                  <p className="
                    text-[11px]
                    leading-5
                    text-[#64748B]
                  ">
                    At least 8 characters with uppercase,
                    lowercase, number, and special character.
                  </p>
                </div>
              </div>

              {/* Confirm Password */}
              <PasswordInput
                label="Confirm new password"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                visible={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword((prev) => !prev)
                }
              />

              {/* ==================== MESSAGES ==================== */}

              {message && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    border
                    border-emerald-400/15
                    bg-emerald-400/[0.06]
                    px-4
                    py-3
                  "
                >
                  <CheckCircle2 className="
                    h-4
                    w-4
                    shrink-0
                    text-emerald-400
                  " />

                  <p className="
                    text-sm
                    font-medium
                    text-emerald-300
                  ">
                    {message}
                  </p>
                </motion.div>
              )}

              {error && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: -5,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  className="
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
                    {error}
                  </p>
                </motion.div>
              )}

              {/* ==================== SUBMIT ==================== */}

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
                    Updating...
                  </>
                ) : (
                  <>
                    <KeyRound className="h-4 w-4" />
                    Update password
                  </>
                )}
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}

/* =========================================================
   PASSWORD INPUT
========================================================= */

interface PasswordInputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onToggle: () => void;
}

function PasswordInput({
  label,
  placeholder,
  value,
  onChange,
  visible,
  onToggle,
}: PasswordInputProps) {
  return (
    <div>
      <label className="
        mb-2
        block
        text-sm
        font-semibold
        text-[#F8FAFC]
      ">
        {label}
      </label>

      <div className="relative">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-white/[0.04]
            px-4
            py-3
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
          onClick={onToggle}
          aria-label={
            visible
              ? `Hide ${label.toLowerCase()}`
              : `Show ${label.toLowerCase()}`
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
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}