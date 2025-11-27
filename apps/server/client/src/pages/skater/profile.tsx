import type { ClosetItem, UserProfile } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "wouter";
import Navigation from "@/components/Navigation";
import { ChallengeButton } from "@/components/skater/ChallengeButton";
import { ClosetGrid } from "@/components/skater/ClosetGrid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

export default function SkaterProfile() {
  const params = useParams();
  const handle = params.handle || "";
  const { user } = useAuth();
  const { toast } = useToast();

  const { data: profile, isLoading: profileLoading } = useQuery<UserProfile>({
    queryKey: ["/api/profiles", handle],
    enabled: !!handle,
  });

  const { data: closetItems = [], isLoading: closetLoading } = useQuery<
    ClosetItem[]
  >({
    queryKey: ["/api/profiles", handle, "closet"],
    enabled: !!handle,
  });

  useEffect(() => {
    if (!profileLoading && !profile) {
      toast({
        title: "Skater not found",
        description: `@${handle} isn't in the system yet.`,
        variant: "destructive",
      });
    }
  }, [profileLoading, profile, handle, toast]);

  const canChallenge = useMemo(() => {
    return !!(profile && user && profile.id !== user.uid);
  }, [profile, user]);

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="mx-auto w-full max-w-6xl px-4 pt-8">
          <div className="flex items-center gap-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <div className="mx-auto w-full max-w-6xl px-4 pt-8">
          <Card className="bg-gray-900 border-gray-700 p-8 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">
              Profile Not Found
            </h2>
            <p className="text-neutral-400">@{handle} doesn't exist yet.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      {/* Background (bedroom graffiti) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[url('/profile-background.png')] bg-cover bg-center brightness-[0.55]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80" />
      </div>

      <Navigation />

      {/* Header / hero */}
      <section className="mx-auto w-full max-w-6xl px-4 pt-8 md:pt-12">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-success/70">
              {profile.photoURL ? (
                <img
                  src={profile.photoURL}
                  alt={profile.displayName || handle}
                  className="h-full w-full object-cover"
                  data-testid="profile-avatar"
                />
              ) : (
                <div className="grid h-full w-full place-items-center bg-neutral-900 text-neutral-400 text-xl">
                  {profile.displayName?.charAt(0)?.toUpperCase() ?? "S"}
                </div>
              )}
            </div>
            <div>
              <h1
                className="text-2xl font-bold text-white tracking-tight"
                data-testid="profile-display-name"
              >
                {profile.displayName ?? handle}
              </h1>
              <p className="text-success/90" data-testid="profile-handle">
                @{handle}
              </p>
              <p
                className="text-sm text-neutral-300"
                data-testid="profile-stats"
              >
                {profile.stance} • {profile.homeSpot} • W/L {profile.wins ?? 0}/
                {profile.losses ?? 0}
              </p>
            </div>
          </div>

          {/* Challenge */}
          {canChallenge ? (
            <ChallengeButton
              challengedId={profile.id}
              challengedHandle={handle}
            />
          ) : (
            <Button variant="secondary" disabled className="opacity-60">
              {user ? "Your Profile" : "Sign in to Challenge"}
            </Button>
          )}
        </div>

        {/* Bio */}
        {profile.bio && (
          <p
            className="mt-4 max-w-3xl text-neutral-200"
            data-testid="profile-bio"
          >
            {profile.bio}
          </p>
        )}
      </section>

      {/* Closet */}
      <section className="mx-auto w-full max-w-6xl px-4 pb-24 pt-8">
        <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide text-orange-400">
          Closet
        </h2>
        {closetLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        ) : (
          <ClosetGrid items={closetItems} />
        )}
      </section>

      {/* Footer brand strip */}
      <footer className="border-t border-white/10 bg-black/30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 text-sm text-neutral-300">
          <span>SkateHubba™ — Own Your Tricks.</span>
          <span>© Design Mainline LLC</span>
        </div>
      </footer>
    </div>
  );
}
