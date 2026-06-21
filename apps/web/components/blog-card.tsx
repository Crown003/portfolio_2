import React from "react";
import Link from "next/link";
import { FiClock, FiCalendar, FiArrowRight } from "react-icons/fi";

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  category: string;
  publishedAt: string | Date;
  readTime: string;
  tags: string[];
  featured?: boolean;
  thumbnailUrl?: string | null;
  projectSummary?: string | null;
  projectApproach?: string | null;
  _count?: {
    comments: number;
    likes: number;
  };
}

interface BlogCardProps {
  post: BlogPost;
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

export default function BlogCard({ post }: BlogCardProps) {
  const isFeatured = !!post.featured;

  if (isFeatured) {
    return (
      <div className="w-full group/featured relative">
        {/* Background shadow glow */}
        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-slate-400/5 via-slate-300/5 to-slate-400/5 dark:from-slate-800/10 dark:via-slate-900/10 dark:to-slate-800/10 blur-3xl opacity-0 group-hover/featured:opacity-100 transition-opacity duration-700 pointer-events-none -z-10" />

        <div className="w-full border border-border bg-card/45 backdrop-blur-md rounded-2xl p-6 sm:p-8 flex flex-col justify-between gap-6 hover:shadow-[0_40px_100px_-20px_rgba(15,23,42,0.06),0_20px_50px_-10px_rgba(15,23,42,0.08),inset_0_1px_0_0_rgba(255,255,255,0.5)] dark:hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6),0_20px_50px_-10px_rgba(0,0,0,0.7),inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300">
          
          <div className="flex flex-col gap-3">
            {/* Meta information tags */}
            <div className="flex items-center gap-3 text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
              <span className="flex items-center gap-1"><FiCalendar /> {formatDate(post.publishedAt)}</span>
              <span>•</span>
              <span className="flex items-center gap-1"><FiClock /> {post.readTime}</span>
              <span>•</span>
              <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-[oklch(62.3%_0.214_259.815)] font-semibold lowercase">
                {post.category}
              </span>
            </div>

            {/* Header Excerpt Title */}
            <h2 className="text-xl sm:text-3xl font-extrabold text-foreground font-display group-hover/featured:text-[oklch(62.3%_0.214_259.815)] transition-colors leading-snug tracking-tight">
              {post.title}
            </h2>

            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-4xl font-normal mt-1">
              {post.excerpt}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-border/40 pt-6">
            {/* Tag list */}
            <div className="flex flex-wrap gap-1.5">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-md border border-border/60 text-[10px] font-mono text-slate-500 dark:text-slate-400 bg-slate-500/5 select-none"
                >
                  #{tag.toLowerCase()}
                </span>
              ))}
            </div>

            {/* Read Link */}
            <Link href={`/blogs/${post.id}`} className="flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 group-hover/featured:text-foreground group-hover/featured:translate-x-1.5 transition-all duration-300 cursor-pointer select-none">
              <span>Read Article</span>
              <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>
      </div>
    );
  }

  return (
    <div className="group/card relative flex">
      {/* Background shadow glow */}
      <div className="absolute -inset-3 rounded-[1.8rem] bg-gradient-to-tr from-slate-400/5 to-slate-500/5 dark:from-slate-800/5 dark:to-slate-900/5 blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none -z-10" />

      <div className="w-full border border-border bg-card/45 backdrop-blur-md rounded-xl p-6 flex flex-col justify-between gap-5 hover:shadow-[0_30px_60px_-15px_rgba(15,23,42,0.05),inset_0_1px_0_0_rgba(255,255,255,0.5)] dark:hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5),inset_0_1px_0_0_rgba(255,255,255,0.05)] hover:border-slate-300 dark:hover:border-slate-800 transition-all duration-300 hover:-translate-y-0.5">
        
        <div className="flex flex-col gap-2.5">
          {/* Metadata row */}
          <div className="flex items-center gap-2 text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
            <span className="flex items-center gap-0.5"><FiCalendar /> {formatDate(post.publishedAt)}</span>
            <span>•</span>
            <span className="flex items-center gap-0.5"><FiClock /> {post.readTime}</span>
            <span>•</span>
            <span className="px-1.5 py-0.2 rounded-md bg-sky-500/10 text-[oklch(62.3%_0.214_259.815)] font-semibold lowercase">
              {post.category}
            </span>
          </div>

          {/* Post title */}
          <h3 className="text-lg font-bold text-foreground font-display group-hover/card:text-[oklch(62.3%_0.214_259.815)] transition-colors leading-snug tracking-tight">
            {post.title}
          </h3>

          {/* Post Excerpt */}
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-normal mt-0.5">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-border/40 pt-4 mt-1">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-md border border-border/60 text-[9px] font-mono text-slate-500 dark:text-slate-400 bg-slate-500/5 select-none"
              >
                #{tag.toLowerCase()}
              </span>
            ))}
          </div>

          {/* Read Link */}
          <Link href={`/blogs/${post.id}`} className="flex items-center gap-1 text-[11px] font-bold text-slate-700 dark:text-slate-300 group-hover/card:text-foreground group-hover/card:translate-x-1.5 transition-all duration-300 cursor-pointer select-none">
            <span>Read Article</span>
            <FiArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
