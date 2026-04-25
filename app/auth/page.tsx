"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { useAuthStore } from "@/store/authStore";
import { Eye, EyeOff } from "lucide-react";

export default function AuthPage() {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-dvh flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (user) return null;

   // Including the code helps you debug if a new Firebase error pops up
   function getErrorMessage(code: string) {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please login instead.";
      case "auth/invalid-email":
        return "Please enter a valid email format (e.g., name@example.com).";
      case "auth/invalid-credential":
      case "auth/wrong-password":
      case "auth/user-not-found":
        return "Incorrect email or password. Please try again.";
      case "auth/weak-password":
        return "Your password is too weak. It must be at least 6 characters.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please wait a moment and try again.";
      case "auth/network-request-failed":
        return "Network error. Please check your internet connection.";
      default:
        return `Something went wrong. Please try again.`;
    }
  }

  // function to clear all states when switching tabs
  function handleTabSwitch(toLogin: boolean) {
    setIsLogin(toLogin);
    setError("");
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!isLogin && password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setFormLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const result = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(result.user, { displayName: name });
      }
      router.push("/");
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setFormLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setFormLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err: any) {
      setError(getErrorMessage(err.code));
    } finally {
      setFormLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-md p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-orange-500">Buyo</h1>
          <p className="text-gray-500 mt-2 text-sm">
            {isLogin ? "Welcome back! Sign in to continue" : "Create your account to start shopping"}
          </p>
        </div>

        <div className="flex bg-gray-100 rounded-full p-1 mb-6">
          <button
            onClick={() => handleTabSwitch(true)}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              isLogin ? "bg-white shadow text-orange-500" : "text-gray-500"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => handleTabSwitch(false)}
            className={`flex-1 py-2 rounded-full text-sm font-semibold transition-all ${
              !isLogin ? "bg-white shadow text-orange-500" : "text-gray-500"
            }`}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {!isLogin && (
              <div className="relative">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            )}

            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {!isLogin && (
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full border-2 border-gray-200 bg-white rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 transition-colors pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            )}

            {isLogin && (
              <div className="flex justify-end -mt-2">
                <button
                  type="button"
                  onClick={() => router.push("/forgot-password")}
                  className="text-xs text-orange-500 hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={formLoading}
              className="bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 transition-all"
            >
              {formLoading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
            </button>
          </form>
        </div>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-gray-400 text-sm">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={formLoading}
          className="w-full flex items-center justify-center gap-3 border-2 border-gray-200 py-3 rounded-full text-sm font-semibold text-gray-700 hover:border-orange-500 hover:text-orange-500 transition-all"
        >
          <span className="text-xl">🇬</span>
          Continue with Google
        </button>
      </div>
    </div>
  );
}