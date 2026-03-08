import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Code2, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth0 } from "@auth0/auth0-react";
const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const navigate = useNavigate();
  const [mode, setMode] = useState("login");
  const [emailId, setEmail] = useState("test6@gmail.com");
  const [password, setPassword] = useState("Test123@");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailId, password }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Invalid Credentials");
      }

      navigate("/");
    } catch (err) {
      setError(err.message || "ERROR: Invalid Credentials");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setIsLoading(true);
    setError("");
    const requestData = { firstName, lastName, emailId, password };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestData),
        },
      );

      if (!response.ok) {
        const errorMsg = await response.json();
        throw new Error(errorMsg || "Signup failed");
      }

      // After successful signup, switch to login mode
      setMode("login");
      setError("");
      alert("Account created! Please login.");
    } catch (error) {
      setError(error.message || "ERROR: Invalid data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mode === "login") {
      handleLogin();
    } else {
      handleSignup();
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020617] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full -z-10 animate-pulse" />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -z-10 animate-pulse"
        style={{ animationDelay: "1s" }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-[420px]"
      >
        <div className="glass-dark rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Code2 className="text-white w-7 h-7" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
              {mode === "login" ? "Welcome Back" : "Create Account"}
            </h1>
            <p className="text-slate-400 text-sm">
              {mode === "login"
                ? "Login to continue to DevInsta"
                : "Join the developer community today"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {mode === "signup" && (
              <div className="grid grid-cols-2 gap-4">
                <AuthInput
                  label="First Name"
                  placeholder="Alex"
                  icon={User}
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <AuthInput
                  label="Last Name"
                  placeholder="Rivera"
                  icon={User}
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
            )}

            <AuthInput
              label="Email Address"
              type="email"
              placeholder="alex@techflow.com"
              icon={Mail}
              value={emailId}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <AuthInput
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              showPasswordToggle
              required
            />

            {error && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-xs font-medium"
              >
                {error}
              </motion.p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-gradient-to-r from-indigo-500 to-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:scale-100 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <span>{mode === "login" ? "Login" : "Sign Up"}</span>
              )}
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest">
              <span className="bg-[#0a0a0a] px-4 text-slate-500 font-bold">
                Or continue with
              </span>
            </div>
          </div>

          <button
            className="w-full py-3.5 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-sm hover:bg-white/10 transition-all flex items-center justify-center gap-3"
            onClick={() => loginWithRedirect()}
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>

          <div className="mt-8 text-center">
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
              className="text-slate-400 text-sm hover:text-emerald-400 transition-colors"
            >
              {mode === "login"
                ? "New to DevInsta? Create account"
                : "Already have an account? Log in"}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

function AuthInput({
  label,
  type = "text",
  icon: Icon,
  showPasswordToggle,
  ...rest
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputType = showPasswordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative group">
        <div
          className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isFocused ? "text-emerald-400" : "text-slate-500 group-hover:text-slate-400"}`}
        >
          <Icon size={18} />
        </div>
        <input
          type={inputType}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-white/5 border rounded-xl pl-12 pr-12 py-3.5 text-sm text-white placeholder:text-slate-600 focus:outline-none transition-all ${
            isFocused
              ? "border-emerald-500/50 ring-4 ring-emerald-500/10"
              : "border-white/10 group-hover:border-white/20"
          }`}
          {...rest}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
}

export default Login;