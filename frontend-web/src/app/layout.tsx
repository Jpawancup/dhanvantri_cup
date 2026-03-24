import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import InitDB from "@/components/providers/InitDB";
import RealtimeNotifications from "@/components/shared/RealtimeNotifications";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Dhanvantri | Healthcare Ecosystem",
  description: "Modern healthcare system combining trust with social connection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans antialiased", outfit.variable, inter.variable)}>
      <body className="bg-background text-foreground overflow-x-hidden min-h-screen flex flex-col">
        <InitDB />
        <RealtimeNotifications />
        {children}
      </body>
    </html>
  );
}
