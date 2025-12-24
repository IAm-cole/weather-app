import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { WeatherProvider } from "./context/context";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Now - Real-time Weather Updates",
  description:
    "Get current weather information for any location worldwide with beautiful, real-time weather updates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <WeatherProvider>
        <body className={inter.className}>{children}</body>
      </WeatherProvider>
    </html>
  );
}
