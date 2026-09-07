"use client";

import React, { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend, FiCheckCircle, FiLoader, FiAward, FiFolder } from "react-icons/fi";
import { useSearchParams } from "next/navigation";

const NeumorphicSVG = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 -mt-16 -mr-16 pointer-events-none opacity-40 dark:opacity-[0.08] z-0">
    <g className="[filter:url(#filter0_ii_3879_1051)] dark:[filter:url(#filter0_ii_3879_1051_dark)]">
      <path className="fill-[#F3F3F4] dark:fill-[#212126]" d="M12.465 24C12.465 25.6569 11.1219 27 9.46504 27H3C1.34315 27 0 25.6569 0 24L0 16.7835C0 15.7859 0.287483 14.8095 0.828037 13.971L6.42026 5.29723C6.53971 5.11195 6.74508 5 6.96554 5L10.7794 5C11.2778 5 11.5901 5.5387 11.3424 5.97122L6.26224 14.8413L9.46504 14.8413C11.1219 14.8413 12.465 16.1844 12.465 17.8413V24ZM29.5 24C29.5 25.6569 28.1569 27 26.5 27H20.035C18.3781 27 17.035 25.6569 17.035 24L17.035 16.7835C17.035 15.7859 17.3224 14.8095 17.863 13.971L23.4552 5.29723C23.5747 5.11195 23.78 5 24.0005 5L27.8143 5C28.3128 5 28.625 5.5387 28.3773 5.97122L23.2972 14.8413H26.5C28.1569 14.8413 29.5 16.1844 29.5 17.8413L29.5 24Z" fillOpacity="1"></path>
    </g>
    <defs>
      <filter id="filter0_ii_3879_1051" x="0" y="5" width="29.5" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="1"></feOffset>
        <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0.0745098 0 0 0 0 0.0745098 0 0 0 0 0.0862745 0 0 0 0.18 0"></feColorMatrix>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_3879_1051"></feBlend>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="-1"></feOffset>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"></feColorMatrix>
        <feBlend mode="normal" in2="effect1_innerShadow_3879_1051" result="effect2_innerShadow_3879_1051"></feBlend>
      </filter>
      <filter id="filter0_ii_3879_1051_dark" x="0" y="5" width="29.5" height="23" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="1"></feOffset>
        <feGaussianBlur stdDeviation="1.5"></feGaussianBlur>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0.968627 0 0 0 0 0.968627 0 0 0 0 0.972549 0 0 0 0.1 0"></feColorMatrix>
        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_3879_1051"></feBlend>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"></feColorMatrix>
        <feOffset dy="-1"></feOffset>
        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
        <feColorMatrix type="matrix" values="0 0 0 0 0.258824 0 0 0 0 0.262745 0 0 0 0 0.301961 0 0 0 1 0"></feColorMatrix>
        <feBlend mode="normal" in2="effect1_innerShadow_3879_1051" result="effect2_innerShadow_3879_1051"></feBlend>
      </filter>
    </defs>
  </svg>
);

function FeedbackFormContent() {
  const searchParams = useSearchParams();
  const preSelectedProjectId = searchParams.get("project");
  const isProjectReview = Boolean(preSelectedProjectId);
  
  const [projectDetails, setProjectDetails] = useState<any>(null);
  const [loadingProject, setLoadingProject] = useState(isProjectReview);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    clientName: "",
    clientRole: "",
    content: "",
    rating: 5,
  });

  useEffect(() => {
    if (preSelectedProjectId) {
      fetch("/api/projects")
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) {
            const matched = data.find((p: any) => p.id === preSelectedProjectId);
            if (matched) {
              setProjectDetails(matched);
            }
          }
        })
        .catch(err => console.error("Failed to load project:", err))
        .finally(() => setLoadingProject(false));
    }
  }, [preSelectedProjectId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const payload = {
        ...formData,
        projectId: isProjectReview ? preSelectedProjectId : null,
      };

      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const StarIcon = ({ filled, onClick }: { filled: boolean; onClick: () => void }) => (
    <svg 
      onClick={onClick}
      className={`w-7 h-7 sm:w-8 sm:h-8 cursor-pointer transition-all duration-200 hover:scale-110 active:scale-95 ${filled ? "text-foreground fill-foreground drop-shadow-xs" : "text-border fill-transparent"}`} 
      viewBox="0 0 20 20"
      stroke="currentColor"
      strokeWidth={filled ? "0" : "1"}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full bg-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_8px_32px_rgba(0,0,0,0.4)] border border-border rounded-3xl overflow-hidden relative z-10"
      >
        <NeumorphicSVG />
        
        <div className="relative z-10 p-6 sm:p-8 pt-8 sm:pt-10">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center py-12 gap-4"
              >
                <div className="w-16 h-16 bg-secondary text-foreground border border-border rounded-full flex items-center justify-center mb-2">
                  <FiCheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-bold font-display text-foreground tracking-tight">Thank You!</h2>
                <p className="text-muted-foreground text-sm max-w-[320px] leading-relaxed">
                  Your {isProjectReview ? "project review" : "endorsement"} has been submitted successfully. I truly appreciate you taking the time!
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                exit={{ opacity: 0, scale: 0.9 }}
                onSubmit={handleSubmit} 
                className="flex flex-col gap-6"
              >
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold font-display text-foreground tracking-tight mb-2">
                    {isProjectReview ? "Project Review" : "Share an Endorsement"}
                  </h1>
                  <p className="text-muted-foreground text-sm">
                    {isProjectReview
                      ? "Please let me know how it was working together on this project. Your review means a lot!"
                      : "Recommend skills, share collaboration experience, or leave a professional endorsement."}
                  </p>
                </div>

                {/* Locked Category Banner (Set via Admin Link) */}
                {isProjectReview ? (
                  loadingProject ? (
                    <div className="w-full h-16 rounded-2xl bg-secondary/30 animate-pulse flex items-center justify-center border border-border">
                      <FiLoader className="animate-spin text-muted-foreground" />
                    </div>
                  ) : projectDetails ? (
                    <div className="w-full bg-secondary/30 border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                      {projectDetails.imageUrl ? (
                        <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-background border border-border">
                          <img src={projectDetails.imageUrl} alt={projectDetails.title} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-secondary border border-border text-foreground flex items-center justify-center shrink-0 font-bold text-lg">
                          {projectDetails.title[0]}
                        </div>
                      )}
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest mb-0.5">Project</span>
                        <h4 className="text-sm font-bold text-foreground truncate font-display">{projectDetails.title}</h4>
                        {projectDetails.description && (
                          <p className="text-xs text-muted-foreground truncate mt-0.5">{projectDetails.description}</p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full bg-secondary/30 border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                      <div className="w-12 h-12 rounded-xl bg-secondary border border-border text-foreground flex items-center justify-center shrink-0">
                        <FiFolder className="w-5 h-5 text-current" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest mb-0.5">Category</span>
                        <h4 className="text-sm font-bold text-foreground truncate font-display">Project Review</h4>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">Review and feedback for project collaboration.</p>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="w-full bg-secondary/30 border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-xs">
                    <div className="w-12 h-12 rounded-xl bg-secondary border border-border text-foreground flex items-center justify-center shrink-0">
                      <FiAward className="w-5 h-5 text-current" />
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-[10px] font-mono font-medium text-muted-foreground uppercase tracking-widest mb-0.5">Category</span>
                      <h4 className="text-sm font-bold text-foreground truncate font-display">Professional Endorsement</h4>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">Share your experience working with me as a collaborator or peer.</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-col gap-4 mt-1">
                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 block font-sans">
                      {isProjectReview ? "Your Rating" : "Rating / Recommendation"}
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <StarIcon 
                          key={star} 
                          filled={star <= formData.rating} 
                          onClick={() => setFormData({...formData, rating: star})} 
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-1">
                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block font-sans">Your Name *</label>
                      <input 
                        required 
                        value={formData.clientName} 
                        onChange={e => setFormData({...formData, clientName: e.target.value})} 
                        placeholder="e.g. Harshit"
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all shadow-xs" 
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block font-sans">Your Role / Company</label>
                      <input 
                        value={formData.clientRole} 
                        onChange={e => setFormData({...formData, clientRole: e.target.value})} 
                        placeholder="e.g. Lead Engineer at CrownTech"
                        className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all shadow-xs" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block font-sans">
                      {isProjectReview ? "Your Project Review *" : "Your Endorsement / Recommendation *"}
                    </label>
                    <textarea 
                      required 
                      value={formData.content} 
                      onChange={e => setFormData({...formData, content: e.target.value})} 
                      placeholder={
                        isProjectReview
                          ? "Please share your thoughts on the project deliverables, communication, and results..."
                          : "Share what makes working with me great, skills, reliability, and impact..."
                      }
                      className="w-full px-4 py-3 bg-secondary/30 border border-border rounded-xl text-sm text-foreground focus:outline-hidden focus:ring-1 focus:ring-foreground/20 transition-all resize-none min-h-[120px] shadow-xs leading-relaxed" 
                    />
                  </div>
                </div>

                <button 
                  disabled={submitting} 
                  type="submit" 
                  className="w-full mt-2 bg-slate-900 dark:bg-white text-white dark:text-black font-semibold py-3.5 rounded-xl hover:opacity-90 active:scale-[0.99] disabled:opacity-40 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {submitting ? <FiLoader className="w-4 h-4 animate-spin" /> : <FiSend className="w-4 h-4" />}
                  <span>
                    {submitting 
                      ? "Submitting..." 
                      : isProjectReview 
                        ? "Submit Project Review" 
                        : "Submit Endorsement"}
                  </span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <Suspense fallback={<div className="flex justify-center py-12"><FiLoader className="animate-spin text-foreground w-8 h-8" /></div>}>
        <FeedbackFormContent />
      </Suspense>
    </div>
  );
}
