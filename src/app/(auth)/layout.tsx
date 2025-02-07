"use client";

import { ClientLayout } from "@/components/layout/ClientLayout";
import { useAuth } from "@/lib/context/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log('🔄 AuthLayout render - Loading:', loading, 'User:', user?.email);

  useEffect(() => {
    console.log('🔵 AuthLayout effect - Loading:', loading, 'User:', user?.email);
    if (!loading && !user) {
      console.log('🟡 AuthLayout redirecting to login - No user found');
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    console.log('🟡 AuthLayout showing loading state');
    return null;
  }

  return <ClientLayout>{children}</ClientLayout>;
} 