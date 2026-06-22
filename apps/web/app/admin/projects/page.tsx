"use client";

import React, { useState, useEffect, useRef } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiX, FiLink, FiGithub, FiChevronDown, FiSearch, FiUploadCloud, FiLoader } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { LoadingSpinner } from "../../../components/loading-spinner";
import { useToast } from "../../../components/toast-provider";
import { Skeleton } from "../../../components/skeleton";
import { getSupabaseClient } from "../../../lib/supabase";

type Project = {
  id: string;
  title: string;
  description: string;
  content: string | null;
  imageUrl: string | null;
  liveUrl: string | null;
  githubUrl: string | null;
  tags: string[];
  showOnHomepage: boolean;
  blogPostId: string | null;
};

const initialFormState = {
  title: "",
  description: "",
  imageUrl: "",
  liveUrl: "",
  githubUrl: "",
  tags: "",
  showOnHomepage: false,
  blogPostId: "",
};

function ProjectCardSkeleton() {
  return (
    <div className="p-5 border border-border bg-card/45 backdrop-blur-sm rounded-2xl flex flex-col gap-3 relative shadow-sm overflow-hidden">
      <Skeleton className="w-1/2 h-6" />
      <div className="flex flex-col gap-1.5 mt-1">
        <Skeleton className="w-full h-3" />
        <Skeleton className="w-4/5 h-3" />
      </div>
      <div className="flex gap-3 mt-2">
        <Skeleton className="w-12 h-3" />
        <Skeleton className="w-16 h-3" />
      </div>
      <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-border/40">
        <Skeleton className="w-6 h-6 rounded-md" />
        <Skeleton className="w-6 h-6 rounded-md" />
      </div>
    </div>
  );
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogs, setBlogs] = useState<{ id: string; title: string }[]>([]);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [formData, setFormData] = useState(initialFormState);
  const [submitting, setSubmitting] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [comboboxSearch, setComboboxSearch] = useState("");
  const [isComboboxOpen, setIsComboboxOpen] = useState(false);
  const comboboxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (comboboxRef.current && !comboboxRef.current.contains(e.target as Node)) {
        setIsComboboxOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [projRes, blogRes] = await Promise.all([
        fetch("/api/projects"),
        fetch("/api/blogs")
      ]);
      if (projRes.ok) setProjects(await projRes.json());
      if (blogRes.ok) setBlogs(await blogRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const handleOpen = (project?: Project) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        title: project.title,
        description: project.description,
        imageUrl: project.imageUrl || "",
        liveUrl: project.liveUrl || "",
        githubUrl: project.githubUrl || "",
        tags: project.tags.join(", "),
        showOnHomepage: project.showOnHomepage,
        blogPostId: project.blogPostId || "",
      });
    } else {
      setEditingId(null);
      setFormData(initialFormState);
    }
    setIsDrawerOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map(t => t.trim()).filter(Boolean),
    };
    try {
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchData();
        setIsDrawerOpen(false);
        showToast("success", "Project saved successfully!");
      } else {
        showToast("error", "Failed to save project.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "An error occurred while saving.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;
    try {
      const res = await fetch(`/api/projects/${projectToDelete}`, { method: "DELETE" });
      if (res.ok) {
        await fetchData();
        showToast("success", "Project deleted successfully!");
      } else {
        showToast("error", "Failed to delete project.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "An error occurred while deleting.");
    } finally {
      setProjectToDelete(null);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploadingImage(true);
    try {
      const supabase = getSupabaseClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `project-${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
      
      const { error } = await supabase.storage
        .from("project-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("project-images")
        .getPublicUrl(fileName);

      if (!urlData || !urlData.publicUrl) throw new Error("Failed to get public URL");

      setFormData(prev => ({ ...prev, imageUrl: urlData.publicUrl }));
      showToast("success", "Image uploaded successfully!");
    } catch (err: any) {
      console.error("Image upload failed:", err);
      showToast("error", err.message || "Failed to upload image. Ensure 'project-images' bucket is public.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Projects Manager</h1>
          <p className="text-sm text-slate-500">Manage your portfolio projects and homepage features.</p>
        </div>
        <button onClick={() => handleOpen()} className="flex items-center gap-2 bg-foreground text-background px-4 py-2 rounded-lg font-bold text-xs hover:opacity-90 transition-colors">
          <FiPlus /> New Project
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
          <ProjectCardSkeleton />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map(proj => (
            <div key={proj.id} className="p-5 border border-border bg-card/45 backdrop-blur-sm rounded-2xl flex flex-col gap-3 relative shadow-sm">
              {proj.showOnHomepage && <span className="absolute top-5 right-5 text-[10px] font-bold uppercase bg-amber-500/10 border border-amber-500/20 text-amber-500 px-2 py-0.5 rounded-full">Featured on Home</span>}
              <h3 className="font-bold text-lg text-foreground pr-24">{proj.title}</h3>
              <p className="text-sm text-slate-500 line-clamp-2">{proj.description}</p>
              
              <div className="flex gap-3 text-xs mt-1">
                {proj.liveUrl && <a href={proj.liveUrl} target="_blank" className="text-sky-500 hover:underline flex items-center gap-1"><FiLink/> Live</a>}
                {proj.githubUrl && <a href={proj.githubUrl} target="_blank" className="text-slate-500 hover:underline flex items-center gap-1"><FiGithub/> Source</a>}
                {proj.blogPostId && <span className="text-emerald-500 flex items-center gap-1">Has Case Study</span>}
              </div>
              
              <div className="flex justify-end gap-2 mt-auto pt-4 border-t border-border/40">
                <button onClick={() => handleOpen(proj)} className="p-1.5 text-slate-500 hover:text-sky-500 transition-colors"><FiEdit2 /></button>
                <button onClick={() => setProjectToDelete(proj.id)} className="p-1.5 text-slate-500 hover:text-rose-500 transition-colors"><FiTrash2 /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-card p-6 rounded-2xl max-w-sm w-full border border-border">
            <h3 className="font-bold text-lg mb-2 text-foreground">Confirm Deletion</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete this project? This cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setProjectToDelete(null)} className="px-4 py-2 border border-border rounded-lg text-xs font-bold hover:bg-slate-500/5">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Form Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <div className="fixed inset-0 z-[100] flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60" 
              onClick={() => !submitting && setIsDrawerOpen(false)} 
            />
            
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 240 }}
              className="relative w-full max-w-md bg-card border-l border-border h-full flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-6 border-b border-border/60 bg-card shrink-0 z-10">
              <h2 className="font-bold text-lg font-display text-foreground">{editingId ? "Edit Project" : "New Project"}</h2>
              <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-foreground"><FiX className="w-5 h-5" /></button>
            </div>
            
            <div data-lenis-prevent="true" className="flex-1 overflow-y-auto overscroll-contain p-6">
              <form onSubmit={handleSubmit} className="flex flex-col gap-5 min-h-full">
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 block">Title *</label>
                <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-3 py-2 bg-slate-500/10 border border-border rounded-lg text-sm text-foreground focus:outline-hidden focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all" />
              </div>
              
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 block">Description *</label>
                <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full px-3 py-2 bg-slate-500/10 border border-border rounded-lg text-sm text-foreground focus:outline-hidden focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none" rows={3} />
              </div>
              
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 block">Image URL</label>
                <div className="flex gap-2">
                  <input value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full px-3 py-2 bg-slate-500/10 border border-border rounded-lg text-sm text-foreground focus:outline-hidden focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all" />
                  <div className="relative shrink-0">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageUpload} 
                      disabled={isUploadingImage}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                    />
                    <button type="button" disabled={isUploadingImage} className="flex items-center justify-center h-full px-4 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors disabled:opacity-50 border border-sky-600">
                      {isUploadingImage ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiUploadCloud className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 block">Live URL</label>
                  <input value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full px-3 py-2 bg-slate-500/10 border border-border rounded-lg text-sm text-foreground focus:outline-hidden focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all" />
                </div>
                <div>
                  <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 block">GitHub URL</label>
                  <input value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full px-3 py-2 bg-slate-500/10 border border-border rounded-lg text-sm text-foreground focus:outline-hidden focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all" />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 block">Tags (comma separated)</label>
                <input value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} placeholder="React, Next.js, Tailwind" className="w-full px-3 py-2 bg-slate-500/10 border border-border rounded-lg text-sm text-foreground focus:outline-hidden focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all" />
              </div>
              
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider mb-1 block">Linked Architecture Blog</label>
                <div className="relative" ref={comboboxRef}>
                  <div 
                    className="w-full px-3 py-2 bg-slate-500/10 border border-border rounded-lg text-sm text-foreground focus:outline-hidden focus:border-sky-500/50 focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer flex items-center justify-between"
                    onClick={() => setIsComboboxOpen(!isComboboxOpen)}
                  >
                    <span className={!formData.blogPostId ? "text-slate-500" : ""}>
                      {formData.blogPostId ? blogs.find(b => b.id === formData.blogPostId)?.title || "Selected Blog" : "Select an article..."}
                    </span>
                    <FiChevronDown className="text-slate-400" />
                  </div>
                  
                  <AnimatePresence>
                    {isComboboxOpen && (
                      <motion.div 
                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
                        className="absolute z-50 top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-xl overflow-hidden flex flex-col max-h-60"
                      >
                        <div className="p-2 border-b border-border/50 flex items-center gap-2 bg-slate-500/5 shrink-0">
                          <FiSearch className="text-slate-400 w-4 h-4" />
                          <input 
                            autoFocus
                            placeholder="Search articles..."
                            className="bg-transparent border-none outline-hidden text-sm w-full text-foreground"
                            value={comboboxSearch}
                            onChange={(e) => setComboboxSearch(e.target.value)}
                          />
                        </div>
                        <div className="overflow-y-auto flex-1 p-1">
                          <div 
                            className={`px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${!formData.blogPostId ? 'bg-sky-500/10 text-sky-500 dark:text-sky-400 font-medium' : 'hover:bg-slate-500/10 text-foreground'}`}
                            onClick={() => { setFormData({...formData, blogPostId: ""}); setIsComboboxOpen(false); setComboboxSearch(""); }}
                          >
                            None
                          </div>
                          {blogs.filter(b => b.title.toLowerCase().includes(comboboxSearch.toLowerCase())).map(b => (
                            <div 
                              key={b.id} 
                              className={`px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${formData.blogPostId === b.id ? 'bg-sky-500/10 text-sky-500 dark:text-sky-400 font-medium' : 'hover:bg-slate-500/10 text-foreground'}`}
                              onClick={() => { setFormData({...formData, blogPostId: b.id}); setIsComboboxOpen(false); setComboboxSearch(""); }}
                            >
                              {b.title}
                            </div>
                          ))}
                          {blogs.filter(b => b.title.toLowerCase().includes(comboboxSearch.toLowerCase())).length === 0 && (
                            <div className="px-3 py-4 text-xs text-center text-slate-500">No articles found</div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <p className="text-[10px] text-slate-500 mt-1">If linked, a button to read the case study will appear on the project card.</p>
              </div>
              
              <div className="flex items-center gap-3 p-3 mt-2 bg-slate-500/10 border border-border rounded-lg">
                <input type="checkbox" checked={formData.showOnHomepage} onChange={e => setFormData({...formData, showOnHomepage: e.target.checked})} id="showHome" className="w-4 h-4 rounded border-border" />
                <label htmlFor="showHome" className="text-sm font-medium text-foreground cursor-pointer select-none">Feature on Homepage</label>
              </div>
              
              <button disabled={submitting} type="submit" className="w-full mt-auto bg-foreground text-background font-bold py-3 rounded-lg hover:opacity-90 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
                {submitting ? <LoadingSpinner className="w-5 h-5" /> : null}
                <span>{submitting ? "Saving Project..." : "Save Project"}</span>
              </button>
              </form>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </div>
  );
}
