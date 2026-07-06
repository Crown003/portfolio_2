"use client";

import React, { useState, useEffect } from "react";
import { FiTrash2, FiEye, FiEyeOff, FiLink, FiCheck } from "react-icons/fi";
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
  const [selectedProjectId, setSelectedProjectId] = useState("");
  const [copied, setCopied] = useState(false);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedbackToDelete, setFeedbackToDelete] = useState<string | null>(null);
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
        showToast("success", `Testimonial ${!currentStatus ? "added to" : "removed from"} homepage.`);
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

  const handleCopyLink = () => {
    if (!selectedProjectId) {
      showToast("error", "Please select a project first.");
      return;
    }
    
    const url = `${window.location.origin}/feedback?project=${selectedProjectId}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast("success", "Link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-border pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-foreground">Client Feedback</h1>
          <p className="text-sm text-slate-500">Manage testimonials and select which to display on the homepage.</p>
        </div>
      </div>

      {/* Generate Link Section */}
      <div className="bg-card/45 backdrop-blur-sm border border-border p-5 rounded-2xl shadow-sm flex flex-col gap-3">
        <h3 className="text-sm font-bold text-foreground">Generate Feedback Link</h3>
        <p className="text-xs text-slate-500">Select a project to generate a personalized feedback link for your client. They won't need to select the project manually.</p>
        
        <div className="flex flex-col sm:flex-row items-center gap-3 mt-1">
          <select 
            value={selectedProjectId}
            onChange={(e) => setSelectedProjectId(e.target.value)}
            className="w-full sm:flex-1 bg-slate-500/10 border border-border text-foreground text-sm rounded-xl px-4 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-sky-500/20"
          >
            <option value="" className="bg-background text-foreground">Select a project...</option>
            {projects.map(p => (
              <option key={p.id} value={p.id} className="bg-background text-foreground">{p.title}</option>
            ))}
          </select>
          
          <button 
            onClick={handleCopyLink}
            disabled={!selectedProjectId}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 bg-foreground text-background font-bold rounded-xl text-sm hover:opacity-90 disabled:opacity-50 transition-all"
          >
            {copied ? <FiCheck className="text-emerald-500" /> : <FiLink />}
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner className="w-8 h-8 text-sky-500" />
        </div>
      ) : feedbackList.length === 0 ? (
        <div className="text-center py-12 text-slate-500 border border-border border-dashed rounded-2xl bg-card/10">
          No feedback received yet.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {feedbackList.map(item => (
            <div key={item.id} className="p-5 border border-border bg-card/45 backdrop-blur-sm rounded-2xl flex flex-col gap-3 relative shadow-sm">
              {item.showOnHome && (
                <span className="absolute top-5 right-5 text-[10px] font-bold uppercase bg-slate-100 text-slate-900 border border-slate-200 dark:bg-white/10 dark:text-white dark:border-white/20 px-2 py-0.5 rounded-full">
                  Live on Home
                </span>
              )}
              
              <div className="pr-24">
                <h3 className="font-bold text-lg text-foreground">{item.clientName}</h3>
                <p className="text-xs text-slate-500">
                  {item.clientRole} {item.project && `• Project: ${item.project.title}`}
                </p>
                {item.rating && (
                  <div className="flex gap-0.5 mt-1.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className={`w-3.5 h-3.5 ${star <= item.rating! ? "text-slate-800 fill-slate-800 dark:text-slate-300 dark:fill-slate-300 drop-shadow-sm" : "text-slate-300 dark:text-slate-700"}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="bg-slate-500/5 p-4 rounded-xl border border-border/50 text-sm text-slate-600 dark:text-slate-300 italic whitespace-pre-wrap">
                "{item.content}"
              </div>
              
              <div className="flex justify-between items-center mt-auto pt-4 border-t border-border/40">
                <span className="text-[10px] text-slate-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button 
                    disabled={togglingId === item.id}
                    onClick={() => toggleVisibility(item.id, item.showOnHome)} 
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-50 ${item.showOnHome ? 'bg-slate-500/10 text-slate-500 hover:bg-slate-500/20' : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20'}`}
                  >
                    {togglingId === item.id ? (
                      <><LoadingSpinner className="w-3.5 h-3.5" /> {item.showOnHome ? "Hiding..." : "Showing..."}</>
                    ) : item.showOnHome ? <><FiEyeOff /> Hide</> : <><FiEye /> Show</>}
                  </button>
                  <button 
                    disabled={deletingId === item.id}
                    onClick={() => setFeedbackToDelete(item.id)} 
                    className="p-1.5 text-slate-500 hover:text-rose-500 transition-colors bg-slate-500/10 rounded-lg hover:bg-rose-500/10 disabled:opacity-50 flex items-center justify-center min-w-[28px]"
                  >
                    {deletingId === item.id ? <LoadingSpinner className="w-4 h-4" /> : <FiTrash2 />}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Modal */}
      {feedbackToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="bg-card p-6 rounded-2xl max-w-sm w-full border border-border">
            <h3 className="font-bold text-lg mb-2 text-foreground">Confirm Deletion</h3>
            <p className="text-sm text-slate-500 mb-6">Are you sure you want to delete this feedback? This cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setFeedbackToDelete(null)} className="px-4 py-2 border border-border rounded-lg text-xs font-bold hover:bg-slate-500/5">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-bold">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
