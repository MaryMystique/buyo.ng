"use client";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Check your email for a reset link!");
    } catch (err: any) {
      setError("Failed to send reset email. Make sure the email is correct.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Reset Password</h2>
        <p className="text-gray-500 mb-6 text-sm">Enter your email and we'll send you a link to get back into your account.</p>
        
        {message && <div className="bg-green-50 text-green-600 p-3 rounded-xl mb-4 text-sm">{message}</div>}
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-4 text-sm">{error}</div>}

        <form onSubmit={handleReset} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 text-white py-3 rounded-full font-semibold hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <Link href="/auth" className="text-orange-500 text-sm hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}