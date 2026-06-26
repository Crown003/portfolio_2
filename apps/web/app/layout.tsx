import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/navbar";
import Foot from "../components/foot";
import { ThemeProvider } from "../components/theme-provider";
import SmoothScroll from "../components/smoothScroll";
import { ClerkProvider } from '@clerk/nextjs'
import { ToastProvider } from "../components/toast-provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Harshit Tiwari | Full-Stack Engineer",
  description:
    "Full-Stack Engineer crafting reliable applications, scalable infrastructure, and polished user experiences. Explore my projects, blog, and tech stack.",
  keywords: [
    "Harshit Tiwari",
    "Full-Stack Engineer",
    "Portfolio",
    "Web Developer",
    "Next.js",
    "React",
    "Flutter",
    "Node.js",
    "TypeScript",
  ],
  authors: [{ name: "Harshit Tiwari" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Harshit Tiwari Portfolio",
    title: "Harshit Tiwari | Full-Stack Engineer",
    description:
      "Building robust systems. Designing clean interfaces. Explore my work, blog, and tech stack.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Harshit Tiwari — Full-Stack Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Harshit Tiwari | Full-Stack Engineer",
    description: "Building robust systems. Designing clean interfaces.",
    creator: "@Harshit003_",
    images: ["/og-image.png"],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="overflow-x-clip overflow-y-auto">
      <body className={`bg-background selection:bg-sky-500/20 selection:text-sky-600 text-foreground min-h-screen flex flex-col items-center justify-start m-0 p-0 ${geistSans.variable} ${geistMono.variable} font-sans overflow-x-clip`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ClerkProvider>
            <ToastProvider>
              <Navbar />
              <SmoothScroll>
            <div className="relative w-full max-w-7xl flex flex-col pt-4 px-4 md:px-8 mx-auto box-border flex-1">
              <main className="w-full flex-1 flex flex-col selection:bg-sky-500/20 selection:text-sky-600">
                {children}
              </main>
            </div>
            <footer className="relative w-full flex flex-col bg-background border-t border-border dark:shadow-[0_-1px_32px_-8px_rgba(0,0,0,0.55)] [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_100%)] shadow-[inset_-12px_-8px_40px_#46464620]">
              <Foot />
            </footer>
              </SmoothScroll>
            </ToastProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}