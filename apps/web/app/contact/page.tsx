"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiSend, FiCheckCircle, FiArrowLeft } from "react-icons/fi";
import { LoadingSpinner } from "../../components/loading-spinner";
import { useToast } from "../../components/toast-provider";

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const { showToast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSuccess(true);
        showToast("success", "Message sent successfully!");
      } else {
        showToast("error", "Failed to send message.");
      }
    } catch (err) {
      console.error(err);
      showToast("error", "An error occurred while sending.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-20 px-4 font-sans text-foreground">
      <div className="w-full max-w-lg">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold font-display tracking-tight mb-4">Get in touch</h1>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Have a project in mind or just want to say hi? Fill out the form below and I'll get back to you as soon as possible.
          </p>
        </div>

        {success ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-8 border border-sky-500/30 bg-sky-500/5 rounded-2xl flex flex-col items-center text-center gap-4"
          >
            <FiCheckCircle className="w-12 h-12 text-sky-500" />
            <h3 className="text-xl font-bold">Message Sent!</h3>
            <p className="text-slate-500 text-sm">Thanks for reaching out. I've received your message and will respond shortly.</p>
            <button onClick={() => { setSuccess(false); setFormData({name: "", email: "", content: ""}); }} className="mt-4 px-6 py-2 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-lg transition-colors text-sm">
              Send another
            </button>
          </motion.div>
        ) : (
          <motion.form 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit} className="flex flex-col gap-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2 block">Name *</label>
                <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-4 bg-card/50 border border-border rounded-xl text-sm focus:outline-hidden focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all" placeholder="Crown" />
              </div>
              <div>
                <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2 block">Email *</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-4 bg-card/50 border border-border rounded-xl text-sm focus:outline-hidden focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all" placeholder="crown@gmail.com" />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-2 block">Message *</label>
              <textarea required rows={5} value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} className="w-full p-4 bg-card/50 border border-border rounded-xl text-sm focus:outline-hidden focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all resize-none" placeholder="Tell me about your project..." />
            </div>
            <button disabled={submitting} type="submit" className="w-full py-4 bg-foreground text-background font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
              {submitting ? <LoadingSpinner className="w-5 h-5" /> : null}
              <span>{submitting ? "Sending Message..." : "Send Message"}</span>
              {!submitting && <FiSend className="w-4 h-4" />}
            </button>
          </motion.form>
        )}
      </div>
    </div>
  );
}
