 "use client";
 import { useEffect } from "react";
 import { onAuthStateChanged } from "firebase/auth";
 import { auth } from "@/lib/firebase";
 import { useAuthStore } from "@/store/authStore";

 export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setUser, setLoading } = useAuthStore();

  useEffect(() => {
    // onAuthStateChanged is a Firebase listener
    // It fires every time the user logs in or out
    // Firebase calls this automatically — we just react to it
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);      // update our store with the user
      setLoading(false);  // we now know the auth state
    });

    // Cleanup — stop listening when component unmounts
    return () => unsubscribe();
  }, [setUser, setLoading]);

  return <>{children}</>;
}