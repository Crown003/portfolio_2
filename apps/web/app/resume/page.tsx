import React from "react";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export const metadata = {
  title: "Resume | Crown",
  description: "My professional resume.",
};

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center h-screen px-4 pt-20 pb-4 w-full relative z-10 max-w-6xl mx-auto overflow-hidden">
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-4 shrink-0">
        <div className="flex flex-col items-start gap-2">
          <Link 
            href="/" 
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-2 transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
            My Resume
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-2">
            View or download my professional resume.
          </p>
        </div>
        
        <a 
          href="/Resumecrown.pdf" 
          download="Harshit_Tiwari_Resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm hover:opacity-90 active:scale-95 transition-all shadow-md shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download PDF
        </a>
      </div>

      <div className="w-full max-w-4xl flex-1 rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
        <iframe 
          src="/Resumecrown.pdf#view=FitH" 
          title="Harshit Tiwari Resume"
          className="w-full h-full border-none bg-white"
        />
      </div>
    </div>
  );
}
