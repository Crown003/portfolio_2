"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiBookOpen } from "react-icons/fi";
import BlogCard, { BlogPost, BlogCardSkeleton } from "../../components/blog-card";

type CategoryFilter = "All" | "Engineering" | "Design" | "DevOps";

export default function BlogListing() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function loadBlogs() {
      try {
        const res = await fetch("/api/blogs");
        if (res.ok) {
          const data = await res.json();
          setPosts(data);
        }
      } catch (err) {
        console.error("Failed to load blogs:", err);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = filteredPosts.find((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured || selectedCategory !== "All");

  return (
    <div className="relative flex flex-col gap-10 pt-2 pb-10 sm:pt-4 sm:pb-12 font-sans antialiased text-foreground">
      
      {/* Hero Header Section */}
      <div className="flex flex-col items-start text-left gap-4 max-w-5xl px-1">
        
        {/* Decorative Tagline Badge */}
        <div className="rotating-chip-container">
          <div className="rotating-chip-glow" />
          <div className="relative z-10 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-card text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
            <span>Tech Log & Insights</span>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl sm:text-6xl font-extrabold tracking-[-0.025em] text-foreground leading-[1.08] font-display sm:whitespace-nowrap">
          Writings on <span className="text-[oklch(62.3%_0.214_259.815)]">systems</span>, web & design.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl font-normal text-balance mt-1">
          Deep dives into modern API designs, frontend performance, and cloud architectures. Written by developers, for developers.
        </p>

      </div>

      {/* Interactive Controls & Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 border-b border-border/80 pb-6">
        
        {/* Category Selector Buttons */}
        <div className="flex flex-wrap gap-2">
          {(["All", "Engineering", "Design", "DevOps"] as CategoryFilter[]).map((category) => {
            const isActive = selectedCategory === category;
            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`relative px-4 py-2 rounded-lg text-xs font-bold font-sans transition-all duration-200 cursor-pointer ${isActive
                  ? "border border-slate-800 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900 shadow-sm"
                  : "border border-border bg-card/60 hover:bg-slate-100/70 dark:hover:bg-slate-800/40 text-slate-500 hover:text-foreground dark:text-slate-400"
                }`}
              >
                <span className="relative z-10">{category}</span>
                {isActive && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-lg bg-slate-900 dark:bg-slate-100 -z-0"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Search Input Bar */}
        <div className="relative max-w-xs w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            <FiSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search articles, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card/45 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
          />
        </div>

      </div>

      {/* Blogs Listing Area */}
      <div className="flex flex-col gap-10">
        
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-10 w-full"
            >
              {selectedCategory === "All" && !searchQuery && <BlogCardSkeleton isFeatured={true} />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
            </motion.div>
          ) : filteredPosts.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-20 border border-border/60 bg-slate-500/5 rounded-2xl flex flex-col items-center justify-center gap-3 font-sans"
            >
              <FiBookOpen className="w-10 h-10 text-slate-400 animate-pulse" />
              <span className="text-sm font-bold text-foreground">No articles match your criteria</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">Try modifying your search or filters.</span>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col gap-10"
            >
              {/* 1. Featured Article Card */}
              {selectedCategory === "All" && featuredPost && !searchQuery && (
                <BlogCard post={featuredPost} />
              )}

              {/* 2. Regular Grid Cards */}
              {regularPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {regularPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

    </div>
  );
}