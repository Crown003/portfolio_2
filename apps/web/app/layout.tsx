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
      <body className={`bg-background text-foreground min-h-screen w-full flex flex-col items-center justify-start overflow-x-hidden m-0 p-0 ${geistSans.variable} ${geistMono.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {/* CHANGED: 'w-screen' replaced with 'w-full' and added responsive padding */}
          <div className="w-full max-w-7xl flex flex-col py-4 px-4 md:px-8 gap-8 mx-auto box-border">
            <Navbar />
            <main className="w-full flex-1 flex flex-col selection:bg-sky-500/20 selection:text-sky-600">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}