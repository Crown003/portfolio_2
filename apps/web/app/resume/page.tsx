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
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground font-display">
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

      <div className="hidden sm:block w-full max-w-4xl flex-1 rounded-2xl overflow-hidden border border-border shadow-xl bg-card">
        <iframe 
          src="/Resumecrown.pdf#view=FitH" 
          title="Harshit Tiwari Resume"
          className="w-full h-full border-none bg-white"
        />
      </div>

      <div className="sm:hidden w-full flex flex-col items-center justify-center gap-6 py-20 text-center">
        <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-border">
          <svg className="w-8 h-8 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
        </div>
        <div className="flex flex-col gap-2 max-w-xs">
          <h3 className="font-bold text-lg font-display">PDF Viewer Unavailable</h3>
          <p className="text-sm text-slate-500">
            PDF preview is not supported on mobile browsers. Tap below to download and view.
          </p>
        </div>
        <a 
          href="/Resumecrown.pdf" 
          download="Harshit_Tiwari_Resume.pdf"
          className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl text-sm"
        >
          Download Resume PDF
        </a>
      </div>
    </div>
  );
}
