import { useState, type FormEvent, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  Eye,
  EyeOff,
  User,
  AtSign,
  Mail,
  CalendarDays,
  LockKeyhole,
  UserRoundPlus,
  Loader2,
  AlertCircle,
  Sparkles,
  Users,
} from "lucide-react";

import { signup } from "../../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    password: "",
    rePassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function validate(): string {
    if (!formData.name.trim()) {
      return "Please enter your full name.";
    }

    if (!formData.email.trim()) {
      return "Please enter your email address.";
    }

    if (!formData.gender) {
      return "Please select a gender.";
    }

    if (!formData.dateOfBirth) {
      return "Please enter your date of birth.";
    }

    if (!formData.password) {
      return "Please enter a password.";
    }

    const strongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!strongPassword.test(formData.password)) {
      return "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.";
    }

    if (formData.password !== formData.rePassword) {
      return "Passwords do not match.";
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
      const response = await signup(formData);

      localStorage.setItem(
        "token",
        response.data.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.data.user)
      );

      console.log("Register success:", response.data);

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
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#080B18]
        px-4
        py-8
        sm:px-6
      "
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Purple glow */}
        <div
          className="
            absolute
            -left-40
            -top-32
            h-[28rem]
            w-[28rem]
            rounded-full
            bg-purple-600/20
            blur-[140px]
          "
        />

        {/* Pink glow */}
        <div
          className="
            absolute
            -bottom-40
            -right-40
            h-[30rem]
            w-[30rem]
            rounded-full
            bg-pink-500/15
            blur-[150px]
          "
        />

        {/* Coral glow */}
        <div
          className="
            absolute
            bottom-1/3
            left-1/2
            h-64
            w-64
            -translate-x-1/2
            rounded-full
            bg-[#FF7A59]/5
            blur-[120px]
          "
        />
      </div>

      {/* Decorative circles */}

      <div
        className="
          pointer-events-none
          absolute
          right-8
          top-10
          h-24
          w-24
          rounded-full
          border
          border-purple-400/10
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          right-14
          top-16
          h-12
          w-12
          rounded-full
          border
          border-pink-400/10
        "
      />

      {/* =====================================================
          REGISTER CARD
      ====================================================== */}

      <div
        className="
          relative
          z-10
          flex
          min-h-[calc(100vh-4rem)]
          items-center
          justify-center
        "
      >
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
          {/* Card glows */}

          <div
            className="
              pointer-events-none
              absolute
              -right-24
              -top-24
              h-56
              w-56
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
              h-56
              w-56
              rounded-full
              bg-pink-500/10
              blur-3xl
            "
          />

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
                mb-6
                flex
                items-center
                justify-center
                gap-2
              "
            >
              <div
                className="
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
                "
              >
                <Sparkles className="h-4 w-4 text-white" />
              </div>

              <span
                className="
                  text-lg
                  font-extrabold
                  tracking-tight
                  text-white
                "
              >
                Route{" "}
                <span
                  className="
                    bg-gradient-to-r
                    from-[#7C3AED]
                    via-[#EC4899]
                    to-[#FF7A59]
                    bg-clip-text
                    text-transparent
                  "
                >
                  Posts
                </span>
              </span>
            </motion.div>

            {/* =================================================
                HEADER
            ================================================== */}

            <div className="text-center">
              <div
                className="
                  mx-auto
                  mb-4
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.05]
                "
              >
                <UserRoundPlus
                  className="
                    h-6
                    w-6
                    text-[#EC4899]
                  "
                />
              </div>

              <h1
                className="
                  text-2xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-3xl
                "
              >
                Create your account
              </h1>

              <p
                className="
                  mt-2
                  text-sm
                  text-[#94A3B8]
                "
              >
                Join the Route Posts community.
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
                <AlertCircle
                  className="
                    mt-0.5
                    h-4
                    w-4
                    shrink-0
                    text-red-400
                  "
                />

                <p
                  className="
                    text-sm
                    leading-5
                    text-red-300
                  "
                >
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
              {/* Full name */}

              <FormField
                label="Full name"
                icon={<User className="h-4 w-4" />}
              >
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </FormField>

              {/* Username */}

              <FormField
                label="Username"
                icon={<AtSign className="h-4 w-4" />}
              >
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Choose a username"
                  autoComplete="username"
                  className={inputClass}
                />
              </FormField>

              {/* Email */}

              <FormField
                label="Email address"
                icon={<Mail className="h-4 w-4" />}
              >
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  className={inputClass}
                />
              </FormField>

              {/* Gender + Date of birth */}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {/* Gender */}

                <FormField
                  label="Gender"
                  icon={<Users className="h-4 w-4" />}
                >
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className={`
                      ${inputClass}
                      appearance-none
                      cursor-pointer
                    `}
                  >
                    <option
                      value=""
                      className="bg-[#141A30]"
                    >
                      Select gender
                    </option>

                    <option
                      value="male"
                      className="bg-[#141A30]"
                    >
                      Male
                    </option>

                    <option
                      value="female"
                      className="bg-[#141A30]"
                    >
                      Female
                    </option>
                  </select>
                </FormField>

                {/* Date */}

                <FormField
                  label="Date of birth"
                  icon={
                    <CalendarDays className="h-4 w-4" />
                  }
                >
                  <input
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className={`
                      ${inputClass}
                      cursor-pointer
                    `}
                  />
                </FormField>
              </div>

              {/* Password */}

              <PasswordField
                id="password"
                name="password"
                label="Password"
                value={formData.password}
                onChange={handleChange}
                showPassword={showPassword}
                onToggle={() =>
                  setShowPassword((prev) => !prev)
                }
                placeholder="Create a strong password"
              />

              {/* Confirm password */}

              <PasswordField
                id="rePassword"
                name="rePassword"
                label="Confirm password"
                value={formData.rePassword}
                onChange={handleChange}
                showPassword={showRePassword}
                onToggle={() =>
                  setShowRePassword((prev) => !prev)
                }
                placeholder="Confirm your password"
              />

              {/* Password hint */}

              <p
                className="
                  -mt-2
                  text-xs
                  leading-5
                  text-[#64748B]
                "
              >
                Use at least 8 characters with uppercase,
                lowercase, a number, and a special character.
              </p>

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
                    <Loader2
                      className="
                        h-4
                        w-4
                        animate-spin
                      "
                    />

                    Creating account...
                  </>
                ) : (
                  <>
                    <UserRoundPlus className="h-4 w-4" />

                    Create New Account
                  </>
                )}
              </motion.button>
            </form>

            {/* Footer */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                text-xs
                text-[#64748B]
              "
            >
              <Sparkles className="h-3.5 w-3.5" />

              <span>
                Start connecting with the Route community
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ============================================================
   REUSABLE FORM FIELD
============================================================ */

interface FormFieldProps {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function FormField({
  label,
  icon,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-[#F8FAFC]
        "
      >
        {label}
      </label>

      <div className="relative">
        <div
          className="
            pointer-events-none
            absolute
            left-3.5
            top-1/2
            z-10
            -translate-y-1/2
            text-[#64748B]
          "
        >
          {icon}
        </div>

        <div className="[&>input]:pl-11 [&>select]:pl-11">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   PASSWORD FIELD
============================================================ */

interface PasswordFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  showPassword: boolean;
  onToggle: () => void;
  placeholder: string;
}

function PasswordField({
  id,
  name,
  label,
  value,
  onChange,
  showPassword,
  onToggle,
  placeholder,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="
          mb-2
          block
          text-sm
          font-semibold
          text-[#F8FAFC]
        "
      >
        {label}
      </label>

      <div className="relative">
        <LockKeyhole
          className="
            pointer-events-none
            absolute
            left-3.5
            top-1/2
            z-10
            h-4
            w-4
            -translate-y-1/2
            text-[#64748B]
          "
        />

        <input
          id={id}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={
            id === "password"
              ? "new-password"
              : "new-password"
          }
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
          onClick={onToggle}
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
  );
}

/* ============================================================
   SHARED INPUT STYLE
============================================================ */

const inputClass = `
  w-full
  rounded-xl
  border
  border-white/10
  bg-white/[0.04]
  py-3
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
`;