import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "GoChinaPass - AI Travel Planner for China",
    template: "%s | GoChinaPass",
  },
  description:
    "Plan your trip to China with AI. Generate personalized itineraries, find hotels, get travel tips, and navigate China with confidence.",
  keywords: [
    "China travel",
    "China travel guide",
    "AI trip planner",
    "China VPN",
    "China eSIM",
    "Beijing travel",
    "Shanghai travel",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
