import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Share Your Feedback",
  description: "I'd love to hear about your experience! Please share your thoughts, project feedback, or general comments.",
  openGraph: {
    title: "Share Your Feedback",
    description: "I'd love to hear about your experience! Please share your thoughts, project feedback, or general comments.",
    type: "website",
    siteName: "Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Share Your Feedback",
    description: "I'd love to hear about your experience! Please share your thoughts, project feedback, or general comments.",
  },
};

export default function FeedbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
