import './globals.css';
import type { Metadata } from 'next';
import { Inter, Press_Start_2P } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Providers } from '@/components/Providers';
import { Toaster } from '@skatehubba/ui/toast';
import { GrittyCursor } from '@skatehubba/ui/cursor';

// Fonts
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const pressStart = Press_Start_2P({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-pressstart',
  display: 'swap',
});

// SEO + Brand Lock
export const metadata: Metadata = {
  title: {
    default: 'SkateHubba™ – One Shot. Own It.',
    template: '%s | SkateHubba™',
  },
  description: 'Real S.K.A.T.E. never dies. Remote challenges. GPS spots. Heshur AI. The streets are live.',
  keywords: ['skatehubba', 'skate', 's.k.a.t.e', 'skateboarding', 'street skate', 'spots'],
  authors: [{ name: 'myhuemungusD' }],
  creator: 'myhuemungusD',
  metadataBase: new URL('https://skatehubba.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://skatehubba.com',
    siteName: 'SkateHubba™',
    title: 'SkateHubba™ – Real S.K.A.T.E. Never Dies',
    description: 'One-take challenges. 3D spots. Heshur AI coach.',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SkateHubba™',
    description: 'One shot. Own it.',
    images: ['/og-image.jpg'],
    creator: '@myhuemungusD',
  },
  robots: { index: true, follow: true },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0a0a" />
        {/* Neon cursor – pure CSS, no JS overhead */}
        <style jsx global>{`
          * {
            cursor: url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='16' cy='16' r='14' stroke='%2339ff14' stroke-width='4' fill='none'/%3E%3C/svg%3E"), auto;
          }
          ::selection {
            background: #39ff14;
            color: #0a0a0a;
          }
        `}</style>
      </head>
      <body
        className={cn(
          inter.variable,
          pressStart.variable,
          'min-h-screen bg-ink text-paper',
          'font-inter antialiased',
          'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-grime via-ink to-ink',
          'selection:bg-neon selection:text-ink'
        )}
      >
        {/* Global grime texture overlay */}
        <div
          className="pointer-events-none fixed inset-0 opacity-10"
          style={{
            backgroundImage: 'url(/textures/grime.png)',
            backgroundSize: '400px',
          }}
        />

        {/* All providers: Auth, Query, Zustand, Theme */}
        <Providers>
          <main className="relative z-10">{children}</main>
          <Toaster position="bottom-center" />
        </Providers>

        {/* Optional: debug user */}
        {/* <div className="fixed bottom-4 right-4 z-50">
          <GrittyButton size="sm" variant="ghost">
            Debug
          </GrittyButton>
        </div> */}
      </body>
    </html>
  );
}
