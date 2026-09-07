"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiTrash2, FiEye, FiEyeOff, FiLink, FiCheck, FiAward, FiFolder } from "react-icons/fi";
import { useToast } from "../../../components/toast-provider";
import { LoadingSpinner } from "../../../components/loading-spinner";

type Testimonial = {
  id: string;
  clientName: string;
  clientRole: string | null;
  content: string;
  rating: number | null;
  showOnHome: boolean;
  project?: { title: string };
  createdAt: string;
};

type Project = {
  id: string;
  title: string;
};

export default function FeedbackManager() {
  const [feedbackList, setFeedbackList] = useState<Testimonial[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [linkType, setLinkType] = useState<"endorsement" | "project">("endorsement");
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [copied, setCopied] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "endorsements" | "projects" | "home">("all");
  const { showToast } = useToast();

  useEffect(() => {
    fetchData();
    fetchProjects();
  }, []);

  async function fetchData() {
    try {
      const res = await fetch("/api/feedback");
      if (res.ok) {
        setFeedbackList(await res.json());
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchProjects() {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        setProjects(await res.json());
      }
    } catch (err) {
      console.error("Failed to fetch projects");
    }
  }

  const toggleVisibility = async (id: string, currentStatus: boolean) => {
    setTogglingId(id);
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ showOnHome: !currentStatus }),
      });
      if (res.ok) {
        await fetchData();
        showToast("success", `Feedback ${!currentStatus ? "added to" : "removed from"} homepage.`);
      } else {
        showToast("error", "Failed to update status.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "An error occurred.");
    } finally {
      setTogglingId(null);
    }
  };

  const handleDelete = async () => {
    if (!feedbackToDelete) return;
    const id = feedbackToDelete;
    
    const prevList = [...feedbackList];
    setFeedbackList(feedbackList.filter(f => f.id !== id));
    setFeedbackToDelete(null);
    setDeletingId(id);
    
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: "DELETE" });
      if (res.ok) {
        showToast("success", "Feedback deleted successfully.");
      } else {
        setFeedbackList(prevList);
        showToast("error", "Failed to delete feedback.");
      }
    } catch (err) {
      console.error(err);
      setFeedbackList(prevList);
      showToast("error", "An error occurred.");
    } finally {
      setDeletingId(null);
    }
  };

  const getGeneratedUrl = () => {
    if (typeof window === "undefined") return "";
    if (linkType === "endorsement") {
      return `${window.location.origin}/feedback?type=endorsement`;
    }
    return selectedProjectId 
      ? `${window.location.origin}/feedback?project=${selectedProjectId}` 
      : `${window.location.origin}/feedback`;
  };

  const handleCopyLink = () => {
    if (linkType === "project" && !selectedProjectId) {
      showToast("error", "Please select a project first.");
      return;
    }
    
    const url = getGeneratedUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast("success", "Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const filteredList = feedbackList.filter(item => {
    if (activeTab === "endorsements") return !item.project;
    if (activeTab === "projects") return !!item.project;
    if (activeTab === "home") return item.showOnHome;
    return true;
  });

  const springTransition = {
    type: "spring" as const,
    stiffness: 400,
    damping: 32,
    mass: 0.8,
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Feedback & Endorsements</h1>
          <p className="text-sm text-muted-foreground">Manage client reviews, professional endorsements, and toggle homepage testimonials.</p>
        </div>
      </div>

      {/* Generate Link Section */}
      <div className="bg-card border border-border p-6 rounded-2xl shadow-xs flex flex-col gap-5">
        <div>
          <h3 className="text-base font-bold text-foreground">Generate Shareable Link</h3>
          <p className="text-xs text-muted-foreground mt-1">Create dedicated links for collecting professional endorsements or project reviews. Form category is locked based on the link you share.</p>
        </div>
        
        {/* 2-Category Selector with Smooth Sliding Pill */}
        <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-secondary/40 border border-border rounded-xl relative">
          <button
            type="button"
            onClick={() => setLinkType("endorsement")}
            className={`relative flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold transition-colors duration-200 z-10 ${
              linkType === "endorsement" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {linkType === "endorsement" && (
              <motion.div
                layoutId="activeLinkTypePill"
                className="absolute inset-0 bg-card border border-border rounded-lg shadow-xs -z-10"
                transition={springTransition}
              />
            )}
            <FiAward className="w-4 h-4 text-current" />
            <span>Endorsement Link</span>
          </button>

          <button
            type="button"
            onClick={() => setLinkType("project")}
            className={`relative flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold transition-colors duration-200 z-10 ${
              linkType === "project" ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {linkType === "project" && (
              <motion.div
                layoutId="activeLinkTypePill"
                className="absolute inset-0 bg-card border border-border rounded-lg shadow-xs -z-10"
                transition={springTransition}
              />
            )}
            <FiFolder className="w-4 h-4 text-current" />
            <span>Project Review Link</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {linkType === "project" ? (
            <select 
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full sm:flex-1 bg-secondary/30 border border-border text-foreground text-sm rounded-xl px-4 py-3 focus:outline-hidden focus:ring-1 focus:ring-foreground/20"
            >
              <option value="" className="bg-card text-foreground">Select a project...</option>
              {projects.map(p => (
                <option key={p.id} value={p.id} className="bg-card text-foreground">{p.title}</option>
              ))}
            </select>
          ) : (
            <div className="w-full sm:flex-1 bg-secondary/30 border border-border text-muted-foreground text-xs rounded-xl px-4 py-3 font-mono truncate select-all">
              {getGeneratedUrl()}
            </div>
          )}
          
          <button 
            onClick={handleCopyLink}
            disabled={linkType === "project" && !selectedProjectId}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold rounded-xl text-sm hover:opacity-90 disabled:opacity-40 transition-all shrink-0 shadow-sm active:scale-[0.98]"
          >
            {copied ? <FiCheck className="w-4 h-4" /> : <FiLink className="w-4 h-4" />}
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs with Smooth Moving Indicator */}
      <div className="flex items-center gap-1.5 border-b border-border pb-3 relative">
        {[
          { id: "all", label: `All (${feedbackList.length})`, icon: null },
          { id: "endorsements", label: `Endorsements (${feedbackList.filter(f => !f.project).length})`, icon: FiAward },
          { id: "projects", label: `Project Reviews (${feedbackList.filter(f => !!f.project).length})`, icon: FiFolder },
          { id: "home", label: `Live on Home (${feedbackList.filter(f => f.showOnHome).length})`, icon: null },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 z-10 flex items-center gap-1.5 ${
                isActive ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeFilterTabPill"
                  className="absolute inset-0 bg-foreground rounded-lg -z-10 shadow-xs"
                  transition={springTransition}
                />
              )}
              {Icon && <Icon className="w-3.5 h-3.5 text-current" />}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback List */}
      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner className="w-8 h-8 text-foreground" />
        </div>
      ) : filteredList.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground border border-border border-dashed rounded-2xl bg-card">
          No entries found in this category.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredList.map(item => (
            <div key={item.id} className="p-6 border border-border bg-card rounded-2xl flex flex-col gap-4 relative shadow-xs">
              <div className="flex items-center gap-2 absolute top-6 right-6">
                {item.project ? (
                  <span className="text-[11px] font-medium border border-border bg-secondary/50 text-foreground px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <FiFolder className="w-3 h-3 text-muted-foreground" /> Project
                  </span>
                ) : (
                  <span className="text-[11px] font-medium border border-border bg-secondary/50 text-foreground px-2.5 py-0.5 rounded-full flex items-center gap-1">
                    <FiAward className="w-3 h-3 text-muted-foreground" /> Endorsement
                  </span>
                )}

                {item.showOnHome && (
                  <span className="text-[10px] font-bold bg-slate-900 dark:bg-white text-white dark:text-black px-2.5 py-0.5 rounded-full">
                    Live
                  </span>
                )}
              </div>
              
              <div className="pr-32">
                <h3 className="font-bold text-lg text-foreground tracking-tight">{item.clientName}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {item.clientRole || "Colleague / Peer"} {item.project && `• ${item.project.title}`}
                </p>
                {item.rating && (
                  <div className="flex gap-0.5 mt-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-3.5 h-3.5 ${star <= item.rating! ? "text-foreground fill-foreground" : "text-border fill-transparent"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-secondary/20 p-4 rounded-xl border border-border/60 text-sm text-foreground/90 italic whitespace-pre-wrap leading-relaxed">
                "{item.content}"
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border">
                <span className="text-[11px] text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</span>
                <div className="flex items-center gap-3">
                  <button 
                    disabled={togglingId === item.id}
                    onClick={() => toggleVisibility(item.id, item.showOnHome)} 
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-secondary/50 hover:bg-secondary border border-border text-foreground transition-all disabled:opacity-50"
                  >
                    {togglingId === item.id ? (
                      <><LoadingSpinner className="w-3.5 h-3.5" /> Updating...</>
                    ) : item.showOnHome ? <><FiEyeOff className="w-3.5 h-3.5" /> Hide from Home</> : <><FiEye className="w-3.5 h-3.5" /> Show on Home</>}
                  </button>
                  <button 
                    disabled={deletingId === item.id}
                    onClick={() => setFeedbackToDelete(item.id)} 
                    className="text-xs font-semibold text-red-500 hover:text-red-400 transition-colors disabled:opacity-50 px-2 py-1"
                  >
                    {deletingId === item.id ? <LoadingSpinner className="w-4 h-4 text-red-500" /> : "Delete"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {feedbackToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="bg-card p-6 rounded-2xl max-w-sm w-full border border-border shadow-xl">
            <h3 className="font-bold text-lg mb-2 text-foreground">Confirm Deletion</h3>
            <p className="text-sm text-muted-foreground mb-6">Are you sure you want to delete this entry? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setFeedbackToDelete(null)} 
                className="px-4 py-2 border border-border rounded-xl text-xs font-semibold hover:bg-secondary transition-colors text-foreground"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete} 
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-semibold transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
