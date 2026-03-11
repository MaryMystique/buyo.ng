 "use client";
 import { useAuthStore } from "@/store/authStore";
 import { useRouter } from "next/navigation";
 import { useEffect } from "react";

 export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Not logged in at all
      if (!user) {
        router.push("/auth");
        return;
      }
      // Logged in but not admin
      if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        router.push("/");
        return;
      }
    }
  }, [user, loading, router]);

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authorized
  if (!user || user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return null;
  }

  return <>{children}</>;
}