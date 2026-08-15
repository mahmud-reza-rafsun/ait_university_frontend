import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Advanced Information of Technology",
  description: "A modern university management system built with Next.js 15, featuring admissions, daily lessons, role-based dashboards, weekly exams, and Stripe-powered payments.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <div>
        <Navbar />
      </div>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
