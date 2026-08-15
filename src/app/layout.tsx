import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import OrientationGuard from "@/components/OrientationGuard";
import { ThemeProvider } from "@/context/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DISHAA - Virtual Campus Map & Spatial Navigation",
  description: "Next-Gen 2D/3D Interactive Campus Map, Indoor Floor Plans, Faculty Directory & Pathfinding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased light-theme light`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900 light-theme light">
        <ThemeProvider>
          <OrientationGuard>{children}</OrientationGuard>
        </ThemeProvider>
      </body>
    </html>
  );
}
