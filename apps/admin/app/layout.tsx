import "./globals.css";

export const metadata = {
  title: "SkateHubba™ Admin",
  description:
    "Admin panel for managing spots, streams, users, clips, events, and marketplace.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-gray-100">{children}</body>
    </html>
  );
}
