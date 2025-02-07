"use client";

import { useAuth } from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log('🔄 PublicLayout render - Loading:', loading, 'User:', user?.email);

  useEffect(() => {
    console.log('🔵 PublicLayout effect - Loading:', loading, 'User:', user?.email);
    if (!loading && user) {
      console.log('🟢 PublicLayout redirecting to home - User:', user.email);
      router.replace("/");
    }
  }, [user, loading, router]);

  if (loading) {
    console.log('🟡 PublicLayout showing loading state');
    return null;
  }

  return children;
} 