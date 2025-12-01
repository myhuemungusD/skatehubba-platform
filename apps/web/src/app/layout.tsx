import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/Providers';
import { cn } from '@/lib/utils';
import { inter, pressStart } from '@/lib/fonts';

export const metadata: Metadata = {
  title: { default: 'SkateHubba™ – One Shot. Own It.', template: '%s | SkateHubba™' },
  description: 'Real S.K.A.T.E. never dies. Remote challenges. GPS spots. Heshur AI.',
  metadataBase: new URL('https://skatehubba.com'),
  openGraph: {
    title: 'SkateHubba™',
    description: 'One shot. Own it.',
    images: ['/og-image.jpg'],
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          pressStart.variable,
          'min-h-screen bg-ink text-paper font-inter antialiased',
          'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-grime via-ink to-ink'
        )}
      >
        {/* ALL CLIENT-ONLY CODE LIVES INSIDE PROVIDERS */}
        {/* Toaster is rendered inside Providers → full context, no hydration error */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
