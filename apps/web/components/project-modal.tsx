"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiBookOpen, FiX } from "react-icons/fi";

interface Project {
  id: string;
  title: string;
  description: string;
  content?: string | null;
  imageUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  tags: string[];
  blogPostId?: string | null;
  createdAt: string;
}

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!project) return;

    // Lock body scroll
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.overflow = "";
      window.scrollTo(0, scrollY);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [project, handleEscape]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-[999] overflow-y-auto modal-scrollbar"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_200ms_ease-out]" />

      {/* Centering wrapper — scrollable */}
      <div className="min-h-full flex items-start sm:items-center justify-center p-4 sm:p-6 py-8 sm:py-12">
        {/* Modal panel */}
        <div
          className="relative z-10 w-full max-w-4xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/20 ring-1 ring-slate-200/50 dark:ring-slate-800/50 rounded-2xl animate-[modalSlideUp_300ms_ease-out]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white transition-all duration-200 shadow-sm ring-1 ring-slate-200/50 dark:ring-slate-700/50"
            aria-label="Close modal"
          >
            <FiX className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="p-5 sm:p-8 flex flex-col gap-5">
            {/* Top section: thumbnail + title side-by-side on desktop, stacked on mobile */}
            <div className="flex flex-col sm:flex-row gap-5">
              {/* Thumbnail */}
              {project.imageUrl && (
                <div className="relative shrink-0 w-full sm:w-48 md:w-56 h-40 sm:h-36 md:h-40 rounded-xl overflow-hidden ring-1 ring-slate-200/50 dark:ring-slate-800/50 bg-slate-100 dark:bg-slate-800">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 224px"
                    priority
                  />
                </div>
              )}

              {/* Title + actions */}
              <div className="flex flex-col gap-3 flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold font-display text-slate-900 dark:text-white tracking-tight leading-tight">
                  {project.title}
                </h2>

                {/* Action buttons */}
                <div className="flex items-center gap-2.5 flex-wrap">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-slate-900 dark:bg-white text-white dark:text-black text-xs font-bold hover:opacity-90 transition-opacity shadow-sm"
                    >
                      <FiExternalLink className="w-3.5 h-3.5" />
                      View Live
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <FiGithub className="w-3.5 h-3.5" />
                      Source Code
                    </a>
                  )}
                  {project.blogPostId && (
                    <Link
                      href={`/blogs/${project.blogPostId}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-500 text-white text-xs font-bold hover:bg-emerald-600 transition-colors shadow-sm"
                    >
                      <FiBookOpen className="w-3.5 h-3.5" />
                      Read Blog
                    </Link>
                  )}
                </div>

                {/* Tags inline with title area */}
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {project.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-mono font-semibold rounded-md ring-1 ring-slate-200/50 dark:ring-slate-700/50 select-none cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-slate-200 dark:bg-slate-800" />

            {/* Full description */}
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                About
              </span>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Content (extended description if available) */}
            {project.content && (
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                  Details
                </span>
                <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans whitespace-pre-line">
                  {project.content}
                </div>
              </div>
            )}

            {/* Blog CTA card if linked */}
            {project.blogPostId && (
              <Link
                href={`/blogs/${project.blogPostId}`}
                className="flex items-center justify-between gap-3 px-5 py-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 ring-1 ring-emerald-200/60 dark:ring-emerald-800/40 hover:ring-emerald-400 dark:hover:ring-emerald-600 transition-all duration-200 group/blog"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-emerald-500 text-white shadow-sm">
                    <FiBookOpen className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300 font-display">Read the Blog Post</span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-500 font-medium">Detailed case study & behind the scenes</span>
                  </div>
                </div>
                <span className="text-emerald-500 group-hover/blog:translate-x-1 transition-transform duration-200 text-lg">→</span>
              </Link>
            )}

            {/* Date */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                Added {new Date(project.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
