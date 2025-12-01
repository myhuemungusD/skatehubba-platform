'use client';

import { useState, useEffect } from 'react'; // <-- Added useState here
import { useRouter, useSearchParams } from 'next/navigation';
import { signInWithPopup, GoogleAuthProvider, signInAnonymously } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { GrittyButton } from '@skatehubba/ui';
import { Loader2, Flame, User, LogIn } from 'lucide-react'; // <-- Added User, LogIn for icons

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      router.push(redirectTo);
    } catch (error) {
      console.error('Google sign-in failed', error);
      setLoading(false);
    }
  };

  const handleGuestSignIn = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      router.push(redirectTo);
    } catch (error) {
      console.error('Guest sign-in failed', error);
      setLoading(false);
    }
  };

  // Auto-redirect if already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.replace(redirectTo);
      }
    });
    return () => unsubscribe();
  }, [router, redirectTo]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink">
      <div className="w-full max-w-md space-y-8 rounded-2xl border-4 border-neon bg-grime/90 p-10 shadow-grit backdrop-blur-sm">
        <div className="text-center">
          <Flame className="mx-auto h-16 w-16 text-blood" />
          <h1 className="mt-6 text-5xl font-black text-neon drop-shadow-glow">SKATEHUBBA™</h1>
          <p className="mt-3 text-xl text-gold">One shot. Own it.</p>
        </div>

        <div className="space-y-5">
          <GrittyButton
            variant="default"
            size="lg"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <LogIn className="mr-2 h-6 w-6" />
            )}
            SIGN IN WITH GOOGLE
          </GrittyButton>

          <GrittyButton
            variant="ghost" // Using a secondary variant for the less committed option
            size="lg"
            onClick={handleGuestSignIn}
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              <Loader2 className="mr-2 h-6 w-6 animate-spin" />
            ) : (
              <User className="mr-2 h-6 w-6" />
            )}
            SKATE AS GUEST
          </GrittyButton>
        </div>
        
        <p className="px-8 text-center text-sm text-paper/70">
          *Guest accounts are temporary and cannot save challenge progress.
        </p>
      </div>
    </div>
  );
}
