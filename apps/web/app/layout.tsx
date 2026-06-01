import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar";
import { ThemeProvider } from "../components/theme-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Harshit Tiwari | Portfolio",
  description: "Personal Portfolio & Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden ${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* 95% Width Global Frame */}
          <div className="w-[95%] max-w-7xl mx-auto flex-1 flex flex-col py-4 gap-8">
            <Navbar />
            <main className="flex-1 flex flex-col selection:bg-sky-500/20 selection:text-sky-600">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
