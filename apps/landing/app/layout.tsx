import './globals.css'

export const metadata = {
  title: "SkateHubba – Skate Anywhere",
  description: "A real skateboarding platform: S.K.A.T.E, AR check-ins, spots, and more."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
