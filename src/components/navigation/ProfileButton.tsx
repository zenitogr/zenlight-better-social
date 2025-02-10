"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAuth } from "@/lib/context/auth";
import { User } from "lucide-react";

export function ProfileButton() {
  const { user, profile } = useAuth();
  
  return (
    <Button asChild variant="ghost" className="gap-2">
      <Link href={user ? `/profile/${profile?.username}` : "/login"}>
        <User className="h-4 w-4" />
        {profile?.full_name || profile?.username || "Guest"}'s Profile
      </Link>
    </Button>
  );
} 