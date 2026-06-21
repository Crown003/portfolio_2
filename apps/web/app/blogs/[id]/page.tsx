import React from "react";
import { db } from "@repo/database";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FiCalendar, FiClock, FiChevronLeft } from "react-icons/fi";

interface BlogPageProps {
  params: Promise<{
    id: string;
  }>;
}

const formatDate = (dateInput: string | Date) => {
  try {
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return String(dateInput);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return String(dateInput);
  }
};

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { id } = await params;

  let post;
  try {
    post = await db.post.findUnique({
      where: { id },
    });
  } catch (error) {
    console.error("Failed to fetch blog post:", error);
    return notFound();
  }

  if (!post) {
    return notFound();
  }

  return (
    <div className="relative flex flex-col gap-6 pt-2 pb-16 sm:pt-4 sm:pb-24 font-sans antialiased text-foreground max-w-4xl mx-auto w-full">
      {/* Back button */}
      <div>
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-foreground dark:text-slate-400 dark:hover:text-white transition-colors group cursor-pointer select-none"
        >
          <FiChevronLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Back to Writings</span>
        </Link>
      </div>

      {/* Hero Header Section */}
      <article className="flex flex-col gap-6 mt-2">
        {/* Meta information tags */}
        <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
          <span className="flex items-center gap-1">
            <FiCalendar /> {formatDate(post.publishedAt)}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <FiClock /> {post.readTime}
          </span>
          <span>•</span>
          <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-[oklch(62.3%_0.214_259.815)] font-semibold lowercase">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-5xl font-extrabold tracking-[-0.025em] text-foreground leading-[1.12] font-display">
          {post.title}
        </h1>

        {/* Excerpt/Intro */}
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-normal border-l-2 border-slate-300 dark:border-slate-800 pl-4 italic">
          {post.excerpt}
        </p>

        {/* Thumbnail */}
        {post.thumbnailUrl && (
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-border bg-card/45 backdrop-blur-md my-4 shadow-sm">
            <img
              src={post.thumbnailUrl}
              alt={post.title}
              className="object-cover w-full h-full"
            />
          </div>
        )}

        {/* Content Body */}
        <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-6 text-sm sm:text-base font-sans mt-4 whitespace-pre-wrap">
          {post.content}
        </div>

        {/* Project Details (if applicable) */}
        {(post.projectSummary || post.projectApproach) && (
          <div className="flex flex-col gap-6 mt-10 border-t border-border/40 pt-10">
            {post.projectSummary && (
              <div className="p-6 rounded-2xl border border-border/80 bg-slate-500/5 backdrop-blur-md">
                <h3 className="text-base font-bold text-foreground font-display mb-3">
                  Project Summary
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-normal whitespace-pre-wrap">
                  {post.projectSummary}
                </p>
              </div>
            )}

            {post.projectApproach && (
              <div className="p-6 rounded-2xl border border-border/80 bg-slate-500/5 backdrop-blur-md">
                <h3 className="text-base font-bold text-foreground font-display mb-3">
                  Approach & Execution
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-normal whitespace-pre-wrap">
                  {post.projectApproach}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Footer Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 border-t border-border/40 pt-6 mt-8">
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md border border-border/60 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-500/5 select-none"
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>
        )}
      </article>
    </div>
  );
}
