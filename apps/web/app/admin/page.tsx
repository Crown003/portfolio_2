"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiX,
  FiSearch,
  FiCheck,
  FiAlertCircle,
  FiEye,
  FiBookOpen,
  FiSettings,
  FiFileText,
  FiBriefcase,
  FiEdit3,
  FiCalendar,
  FiClock,
  FiImage,
  FiLoader,
} from "react-icons/fi";
import Link from "next/link";
import { BlogPost } from "../../components/blog-card";
import { marked } from "marked";
import { getSupabaseClient } from "../../lib/supabase";

type BlogFormState = Omit<BlogPost, "id" | "publishedAt" | "_count"> & {
  id?: string;
};

const initialFormState: BlogFormState = {
  title: "",
  excerpt: "",
  content: "",
  category: "Engineering",
  readTime: "5 min read",
  tags: [],
  featured: false,
  thumbnailUrl: "",
  projectSummary: "",
  projectApproach: "",
};

interface Toast {
  id: string;
  type: "success" | "error";
  message: string;
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [formData, setFormData] = useState<BlogFormState>(initialFormState);
  const [tagsInput, setTagsInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Delete Confirmation state
  const [postToDelete, setPostToDelete] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Editor tabs: "write" | "preview"
  const [editorTab, setEditorTab] = useState<"write" | "preview">("write");

  // Image upload states
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Floating Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (type: "success" | "error", message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Fetch blogs
  async function loadBlogs() {
    try {
      const res = await fetch("/api/blogs");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Failed to load blogs:", err);
      showToast("error", "Failed to load blog posts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setMounted(true);
    loadBlogs();
  }, []);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    return (
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Open drawer for create
  const handleCreateOpen = () => {
    setEditingPostId(null);
    setFormData(initialFormState);
    setTagsInput("");
    setEditorTab("write");
    setIsDrawerOpen(true);
  };

  // Open drawer for edit
  const handleEditOpen = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content || "",
      category: post.category,
      readTime: post.readTime,
      tags: post.tags,
      featured: !!post.featured,
      thumbnailUrl: post.thumbnailUrl || "",
      projectSummary: post.projectSummary || "",
      projectApproach: post.projectApproach || "",
    });
    setTagsInput(post.tags.join(", "));
    setEditorTab("write");
    setIsDrawerOpen(true);
  };

  // Confirm and delete post
  const handleConfirmDelete = async () => {
    if (!postToDelete) return;
    setDeleting(true);

    try {
      const res = await fetch(`/api/blogs/${postToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== postToDelete));
        showToast("success", "Post deleted successfully!");
      } else {
        showToast("error", "Failed to delete the post.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      showToast("error", "An error occurred while deleting.");
    } finally {
      setDeleting(false);
      setPostToDelete(null);
    }
  };

  // Handle Thumbnail File Upload to Supabase Storage
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingThumbnail(true);
    try {
      const supabase = getSupabaseClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `thumbnail-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      setFormData(prev => ({
        ...prev,
        thumbnailUrl: urlData.publicUrl
      }));
      showToast("success", "Thumbnail uploaded to Supabase!");
    } catch (err: any) {
      console.error("Thumbnail upload failed:", err);
      showToast("error", err.message || "Failed to upload thumbnail. Check if 'blog-images' bucket is created and public in Supabase.");
    } finally {
      setUploadingThumbnail(false);
    }
  };

  // Handle Inline Image Upload for Flowcharts/Diagrams to Supabase Storage
  const handleInlineImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const supabase = getSupabaseClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `blog-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        throw error;
      }

      const { data: urlData } = supabase.storage
        .from("blog-images")
        .getPublicUrl(fileName);

      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to get public URL");
      }

      const markdownImage = `\n![${file.name}](${urlData.publicUrl})\n`;
      
      const textarea = textareaRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = formData.content || "";
        const before = text.substring(0, start);
        const after = text.substring(end, text.length);
        
        setFormData(prev => ({
          ...prev,
          content: before + markdownImage + after
        }));
        
        // Return focus and place cursor right after the inserted image
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + markdownImage.length, start + markdownImage.length);
        }, 50);
      } else {
        setFormData(prev => ({
          ...prev,
          content: (prev.content || "") + markdownImage
        }));
      }
      showToast("success", "Image uploaded and inserted at cursor!");
    } catch (err: any) {
      console.error("Image upload failed:", err);
      showToast("error", err.message || "Failed to upload image. Check if 'blog-images' bucket is created and public in Supabase.");
    } finally {
      setIsUploadingImage(false);
      e.target.value = "";
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const tagsArray = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t !== "");

    const payload = {
      ...formData,
      tags: tagsArray,
    };

    try {
      const url = editingPostId ? `/api/blogs/${editingPostId}` : "/api/blogs";
      const method = editingPostId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showToast(
          "success",
          editingPostId ? "Article updated successfully!" : "Article created successfully!"
        );

        // Reload data
        await loadBlogs();

        // Close drawer after short delay
        setTimeout(() => {
          setIsDrawerOpen(false);
          setFormData(initialFormState);
          setTagsInput("");
        }, 800);
      } else {
        const errorData = await res.json();
        showToast("error", errorData.error || "Something went wrong.");
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      showToast("error", "Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Compile Markdown to HTML string synchronously using marked
  const getMarkdownPreview = () => {
    try {
      return marked.parse(formData.content || "") as string;
    } catch (err) {
      return "<p class='text-red-500'>Error parsing Markdown</p>";
    }
  };

  return (
    <div className="relative flex flex-col gap-8 pt-2 pb-16 sm:pt-4 sm:pb-24 font-sans antialiased text-foreground">
      
      {/* Toast Notification Container */}
      <div className="fixed top-6 right-6 z-[60] flex flex-col gap-3 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl border backdrop-blur-md shadow-lg ${
                toast.type === "success"
                  ? "bg-slate-900/90 border-emerald-500/30 text-white dark:bg-white/95 dark:text-black dark:border-emerald-600/20"
                  : "bg-slate-900/90 border-rose-500/30 text-white dark:bg-white/95 dark:text-black dark:border-rose-600/20"
              }`}
            >
              <div className="mt-0.5">
                {toast.type === "success" ? (
                  <FiCheck className="w-4 h-4 text-emerald-500" />
                ) : (
                  <FiAlertCircle className="w-4 h-4 text-rose-500" />
                )}
              </div>
              <div className="flex-1 text-xs font-semibold leading-relaxed">
                {toast.message}
              </div>
              <button
                onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
                className="text-slate-400 hover:text-slate-200 dark:hover:text-slate-700 cursor-pointer"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-foreground font-display">
            Content Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 font-normal text-balance">
            Manage your blog posts, articles, case studies, and content assets.
          </p>
        </div>

        <button
          onClick={handleCreateOpen}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg text-xs hover:opacity-90 active:scale-98 transition-all duration-200 shadow-md cursor-pointer select-none"
        >
          <FiPlus className="w-4 h-4" />
          <span>New Article</span>
        </button>
      </div>

      {/* Search and stats bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative max-w-xs w-full">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
            <FiSearch className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Filter articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-card/45 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
          />
        </div>

        {/* Info */}
        <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
          Showing {filteredPosts.length} of {posts.length} articles
        </div>
      </div>

      {/* Blogs listing table */}
      <div className="border border-border bg-card/45 backdrop-blur-md rounded-2xl overflow-hidden shadow-sm">
        {loading ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-4 border-t-sky-500 border-sky-500/20 rounded-full animate-spin" />
            <span className="text-xs text-slate-500">Loading contents...</span>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-20 flex flex-col items-center justify-center gap-2">
            <FiAlertCircle className="w-8 h-8 text-slate-400" />
            <span className="text-sm font-bold text-foreground">No articles found</span>
            <span className="text-xs text-slate-500">Try creating one or modifying your search.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border/80 bg-slate-500/5 text-slate-400 text-[10px] font-mono uppercase tracking-wider font-bold">
                  <th className="p-4 pl-6">Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Read Time</th>
                  <th className="p-4 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-xs sm:text-sm">
                {filteredPosts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-slate-500/5 transition-colors group"
                  >
                    <td className="p-4 pl-6 font-medium text-foreground max-w-sm sm:max-w-md truncate">
                      {post.title}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-[oklch(62.3%_0.214_259.815)] font-semibold font-mono text-[10px]">
                        {post.category}
                      </span>
                    </td>
                    <td className="p-4">
                      {post.featured ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/10 ring-1 ring-amber-500/20 text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                          Featured
                        </span>
                      ) : (
                        <span className="text-slate-400 text-xs">Standard</span>
                      )}
                    </td>
                    <td className="p-4 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {post.readTime}
                    </td>
                    <td className="p-4 pr-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2.5">
                        <Link
                          href={`/blogs/${post.id}`}
                          target="_blank"
                          className="p-1.5 text-slate-500 hover:text-foreground dark:text-slate-400 dark:hover:text-white transition-colors"
                          title="View live post"
                        >
                          <FiEye className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleEditOpen(post)}
                          className="p-1.5 text-slate-500 hover:text-[oklch(62.3%_0.214_259.815)] transition-colors cursor-pointer"
                          title="Edit article"
                        >
                          <FiEdit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setPostToDelete(post.id)}
                          className="p-1.5 text-slate-500 hover:text-red-500 transition-colors cursor-pointer"
                          title="Delete article"
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Custom Delete Confirmation Modal */}
      {mounted && createPortal(
        <AnimatePresence>
          {postToDelete && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                onClick={() => !deleting && setPostToDelete(null)}
                className="fixed inset-0 bg-black/60"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3 }}
                data-lenis-prevent="true"
                className="relative bg-card border border-border w-full max-w-md rounded-2xl p-6 shadow-2xl z-10 space-y-4 text-center sm:text-left"
              >
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 shrink-0">
                    <FiTrash2 className="w-5 h-5" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-foreground font-display">
                      Delete Article
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                      Are you sure you want to permanently delete this blog post? This action is irreversible.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={() => setPostToDelete(null)}
                    className="px-4 py-2 border border-border text-slate-600 dark:text-slate-300 font-bold rounded-lg text-xs hover:bg-slate-500/5 transition-colors cursor-pointer select-none disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={deleting}
                    onClick={handleConfirmDelete}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-lg text-xs active:scale-98 transition-all cursor-pointer select-none disabled:opacity-50"
                  >
                    {deleting ? "Deleting..." : "Confirm Delete"}
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Sliding Drawer Overlay */}
      {mounted && isDrawerOpen && createPortal(
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={() => !submitting && setIsDrawerOpen(false)}
            className="fixed inset-0 bg-black/60"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 240 }}
            data-lenis-prevent="true"
            className="relative w-full max-w-3xl bg-card border-l border-border h-screen shadow-2xl flex flex-col z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/80 shrink-0">
              <div>
                <h2 className="text-base sm:text-lg font-bold text-foreground font-display flex items-center gap-2">
                  <FiEdit3 className="w-4 h-4 text-[oklch(62.3%_0.214_259.815)]" />
                  <span>{editingPostId ? "Edit Blog Article" : "Write New Article"}</span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {editingPostId
                    ? "Make your adjustments and update the published records."
                    : "Draft, format, and launch your next blog post."}
                </p>
              </div>
              <button
                disabled={submitting}
                onClick={() => setIsDrawerOpen(false)}
                className="p-2 text-slate-400 hover:text-foreground rounded-lg transition-colors cursor-pointer disabled:opacity-50"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <form
              onSubmit={handleSubmit}
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto p-6 space-y-6"
            >
              
              {/* 1. General Info Cluster */}
              <div className="border border-border/60 bg-slate-500/5 p-4 sm:p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2 select-none">
                  <FiFileText className="w-3.5 h-3.5 text-[oklch(62.3%_0.214_259.815)]" />
                  <span>General Info</span>
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Optimizing Next.js Edge Middleware Caching"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Excerpt *
                    </label>
                    <textarea
                      required
                      rows={2}
                      placeholder="A concise, compelling overview to show in post feeds..."
                      value={formData.excerpt}
                      onChange={(e) =>
                        setFormData({ ...formData, excerpt: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors cursor-pointer"
                    >
                      <option value="Engineering">Engineering</option>
                      <option value="Design">Design</option>
                      <option value="DevOps">DevOps</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Read Time *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5 min read"
                      value={formData.readTime}
                      onChange={(e) =>
                        setFormData({ ...formData, readTime: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
                    />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      placeholder="Next.js, Edge Computing, Caching"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 2. Media & Settings Cluster */}
              <div className="border border-border/60 bg-slate-500/5 p-4 sm:p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2 select-none">
                  <FiSettings className="w-3.5 h-3.5 text-[oklch(62.3%_0.214_259.815)]" />
                  <span>Featured & Media</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Thumbnail Image {uploadingThumbnail && <span className="text-[oklch(62.3%_0.214_259.815)] animate-pulse font-bold">(Uploading...)</span>}
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploadingThumbnail}
                      onChange={handleFileChange}
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-[10px] file:font-bold file:bg-slate-900 file:text-white dark:file:bg-white dark:file:text-black hover:file:opacity-90 file:cursor-pointer disabled:opacity-50"
                    />
                    {formData.thumbnailUrl && (
                      <div className="mt-3 relative w-32 aspect-video rounded-md overflow-hidden border border-border">
                        <img src={formData.thumbnailUrl} alt="Thumbnail preview" className="object-cover w-full h-full" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="checkbox"
                      id="featured"
                      checked={formData.featured}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          featured: e.target.checked,
                        })
                      }
                      className="rounded border-border text-[oklch(62.3%_0.214_259.815)] focus:ring-[oklch(62.3%_0.214_259.815)] h-4 w-4 cursor-pointer"
                    />
                    <label
                      htmlFor="featured"
                      className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider cursor-pointer select-none"
                    >
                      Feature this post at the top of list
                    </label>
                  </div>
                </div>
              </div>

              {/* 3. Markdown Editor & Preview Tabs Panel */}
              <div className="border border-border/60 bg-slate-500/5 p-4 sm:p-5 rounded-2xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-3">
                  <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 select-none">
                    <FiBookOpen className="w-3.5 h-3.5 text-[oklch(62.3%_0.214_259.815)]" />
                    <span>Article Content *</span>
                  </h3>

                  {/* Tab Selectors */}
                  <div className="flex bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-lg self-start">
                    <button
                      type="button"
                      onClick={() => setEditorTab("write")}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold font-mono transition-all cursor-pointer ${
                        editorTab === "write"
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-foreground dark:text-slate-400"
                      }`}
                    >
                      Write (MD)
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditorTab("preview")}
                      className={`px-3 py-1 rounded-md text-[10px] font-bold font-mono transition-all cursor-pointer ${
                        editorTab === "preview"
                          ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-xs"
                          : "text-slate-500 hover:text-foreground dark:text-slate-400"
                      }`}
                    >
                      Full Preview
                    </button>
                  </div>
                </div>

                {editorTab === "write" ? (
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        Markdown Source
                      </label>
                      <div className="flex items-center gap-2">
                        <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-md text-[10px] hover:opacity-90 active:scale-95 transition-all cursor-pointer select-none">
                          {isUploadingImage ? (
                            <FiLoader className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <FiImage className="w-3.5 h-3.5" />
                          )}
                          <span>{isUploadingImage ? "Uploading..." : "Insert Image/Diagram"}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleInlineImageUpload}
                            disabled={isUploadingImage}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    <textarea
                      ref={textareaRef}
                      required
                      rows={12}
                      placeholder="# Heading 1&#10;Write your body paragraphs using **bold** or *italic* markdown tags. Use code snippets like:&#10;```js&#10;console.log('API edges!');&#10;```"
                      value={formData.content}
                      onChange={(e) =>
                        setFormData({ ...formData, content: e.target.value })
                      }
                      className="w-full p-3.5 bg-card/60 border border-border rounded-lg text-xs font-mono text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors leading-relaxed"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                      Complete Article Layout Preview
                    </label>
                    
                    {/* Render a full blog post page mockup structure */}
                    <div className="w-full min-h-[300px] max-h-[500px] overflow-y-auto p-5 sm:p-8 bg-card border border-border rounded-xl text-foreground font-sans text-xs sm:text-sm leading-relaxed relative shadow-inner">
                      
                      {/* Meta information tags */}
                      <div className="flex items-center gap-3 text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest font-bold">
                        <span className="flex items-center gap-1">
                          <FiCalendar /> {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FiClock /> {formData.readTime || "1 min read"}
                        </span>
                        <span>•</span>
                        <span className="px-1.5 py-0.2 rounded-md bg-sky-500/10 text-[oklch(62.3%_0.214_259.815)] font-semibold lowercase">
                          {formData.category}
                        </span>
                      </div>

                      {/* Title */}
                      <h1 className="text-xl sm:text-3xl font-extrabold tracking-[-0.025em] text-foreground leading-tight font-display mt-3">
                        {formData.title || "Untitled Blog Post"}
                      </h1>

                      {/* Excerpt/Intro */}
                      {formData.excerpt && (
                        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-normal border-l-2 border-slate-300 dark:border-slate-800 pl-3 italic mt-3">
                          {formData.excerpt}
                        </p>
                      )}

                      {/* Thumbnail mockup */}
                      {formData.thumbnailUrl && (
                        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-border bg-card/45 backdrop-blur-md my-4 shadow-xs">
                          <img
                            src={formData.thumbnailUrl}
                            alt="Cover Preview"
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}

                      {/* Content Body Rendered */}
                      <div className="text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 font-sans mt-4 whitespace-pre-wrap">
                        {formData.content ? (
                          <div
                            dangerouslySetInnerHTML={{
                              __html: getMarkdownPreview(),
                            }}
                            className="preview-markdown-content space-y-4 prose prose-xs dark:prose-invert"
                          />
                        ) : (
                          <p className="text-slate-400 dark:text-slate-500 italic text-center py-6">
                            No body content written yet.
                          </p>
                        )}
                      </div>

                      {/* Project Details mockup */}
                      {(formData.projectSummary || formData.projectApproach) && (
                        <div className="flex flex-col gap-4 mt-6 border-t border-border/30 pt-6">
                          {formData.projectSummary && (
                            <div className="p-4 rounded-xl border border-border/80 bg-slate-500/5">
                              <h3 className="text-xs font-bold text-foreground font-display mb-2">
                                Project Summary
                              </h3>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {formData.projectSummary}
                              </p>
                            </div>
                          )}

                          {formData.projectApproach && (
                            <div className="p-4 rounded-xl border border-border/80 bg-slate-500/5">
                              <h3 className="text-xs font-bold text-foreground font-display mb-2">
                                Approach & Execution
                              </h3>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">
                                {formData.projectApproach}
                              </p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      {tagsInput && (
                        <div className="flex flex-wrap gap-1.5 border-t border-border/20 pt-4 mt-6">
                          {tagsInput.split(",").map((t) => t.trim()).filter((t) => t !== "").map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md border border-border/60 text-[8px] font-mono text-slate-500 dark:text-slate-400 bg-slate-500/5 select-none"
                            >
                              #{tag.toLowerCase()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* 4. Case Study Details Cluster */}
              <div className="border border-border/60 bg-slate-500/5 p-4 sm:p-5 rounded-2xl space-y-4">
                <h3 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 mb-2 select-none">
                  <FiBriefcase className="w-3.5 h-3.5 text-[oklch(62.3%_0.214_259.815)]" />
                  <span>Case Study Details (Optional)</span>
                </h3>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Project Summary
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Explain the background problem and context of this case study..."
                      value={formData.projectSummary || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectSummary: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors resize-y"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5">
                      Approach & Execution
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Explain step-by-step methodologies and design solutions used..."
                      value={formData.projectApproach || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectApproach: e.target.value,
                        })
                      }
                      className="w-full px-3.5 py-2 bg-card/60 border border-border rounded-lg text-xs font-sans text-foreground placeholder-slate-400 focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600 transition-colors resize-y"
                    />
                  </div>
                </div>
              </div>

              {/* Submit button bar */}
              <div className="border-t border-border/80 pt-5 flex items-center justify-end gap-3 shrink-0">
                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => setIsDrawerOpen(false)}
                  className="px-4 py-2 border border-border text-slate-600 dark:text-slate-300 font-bold rounded-lg text-xs hover:bg-slate-500/5 transition-colors cursor-pointer select-none disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg text-xs hover:opacity-90 active:scale-98 transition-all cursor-pointer select-none disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingPostId
                      ? "Save Changes"
                      : "Publish Article"}
                </button>
              </div>

            </form>
          </motion.div>
        </div>,
        document.body
      )}
    </div>
  );
}
