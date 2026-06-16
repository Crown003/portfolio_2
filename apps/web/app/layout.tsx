import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar";
import Foot from "../components/foot";
import { ThemeProvider } from "../components/theme-provider";
import SmoothScroll from "../components/smoothScroll";

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

// Prevents pinch-zoom overflow & layout blowout on mobile
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5, // allow zoom but clamp wild zoom-out
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-hidden">
      <body className={`bg-background selection:bg-sky-500/20 selection:text-sky-600 text-foreground min-h-screen flex flex-col items-center justify-start m-0 p-0 ${geistSans.variable} ${geistMono.variable} font-sans overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SmoothScroll>
          <Navbar />
          <div className="relative w-full max-w-7xl flex flex-col pt-4 px-4 md:px-8 mx-auto box-border flex-1">
            <main className="w-full flex-1 flex flex-col selection:bg-sky-500/20 selection:text-sky-600">
              {children}
            </main>
          </div>
          <footer className="relative w-full flex flex-col bg-background border-t border-border dark:shadow-[0_-1px_32px_-8px_rgba(0,0,0,0.55)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_100%)] shadow-[inset_-12px_-8px_40px_#46464620]">
            <Foot/>
          </footer>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}