"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

export interface DbTestimonial {
  id: string;
  clientName: string;
  clientRole: string | null;
  clientAvatar: string | null;
  content: string;
  rating?: number | null;
  project?: { title: string } | null;
}

const NeumorphicSVG = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className || "absolute top-0 right-0 w-48 h-48 -mt-10 -mr-10 pointer-events-none opacity-[0.03] dark:opacity-[0.03] z-0"}>
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

function TestimonialCard({ t }: { t: DbTestimonial }) {
  const initials = t.clientName.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();
  
  return (
    <div className="group relative flex flex-col gap-5 overflow-hidden rounded-[24px] p-7 bg-white dark:bg-background border border-slate-200/60 dark:border-slate-800 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] hover:shadow-[0px_8px_16px_-4px_rgba(0,0,0,0.15),0px_4px_8px_-2px_rgba(25,28,33,0.04),0px_0px_0px_1px_rgba(25,28,33,0.08)] dark:shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.4),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.2)] dark:hover:shadow-[0px_8px_16px_-4px_rgba(0,0,0,0.6),0px_4px_8px_-2px_rgba(25,28,33,0.04),0px_0px_0px_1px_rgba(25,28,33,0.2)] transition-all duration-500 will-change-transform cursor-pointer">
      <NeumorphicSVG />
      
      {t.rating && (
        <div className="flex gap-0.5 relative z-10">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg key={star} className={`w-4 h-4 ${star <= t.rating! ? "text-slate-800 fill-slate-800 dark:text-slate-300 dark:fill-slate-300 drop-shadow-sm" : "text-slate-200 dark:text-slate-800 fill-transparent"}`} viewBox="0 0 20 20" stroke="currentColor" strokeWidth={star <= t.rating! ? "0" : "1"}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}
      
      <p className="text-[17px] text-slate-700 dark:text-slate-300 leading-relaxed font-sans relative z-10">
        "{t.content}"
      </p>

      <div className="flex items-center gap-3 mt-4 relative z-10">
        {t.clientAvatar ? (
          <img src={t.clientAvatar} alt={t.clientName} className="w-11 h-11 rounded-full object-cover shrink-0 border border-slate-200 dark:border-slate-700" />
        ) : (
          <div className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center font-bold text-sm shrink-0">
            {initials}
          </div>
        )}
        <div className="flex flex-col min-w-0">
          <span className="text-[15px] font-semibold text-slate-900 dark:text-slate-100 truncate font-sans tracking-tight">
            {t.clientName}
          </span>
          <span className="text-[13px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
            {t.clientRole || (t.project && `Project: ${t.project.title}`) || "Client"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials({ testimonials = [] }: { testimonials: DbTestimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  // Split into two columns for masonry
  const col1 = testimonials.filter((_, i) => i % 2 === 0);
  const col2 = testimonials.filter((_, i) => i % 2 !== 0);

  return (
    <section className="relative w-full bg-[#FAFBFC] dark:bg-background py-16 sm:py-24 overflow-hidden border-t border-slate-200 dark:border-slate-800">
      
      {/* Background gradients and noise for the right side */}
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full opacity-[0.015] dark:opacity-[0.03] pointer-events-none -z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="w-[95%] max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-[4fr_6fr] gap-16 lg:gap-20 items-center lg:items-start relative z-10">
        
        {/* Left Column (40%) */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-40 pt-10 text-center lg:text-left w-full max-w-xl lg:max-w-none">
          
          <div className="flex flex-col items-center lg:items-start gap-4">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <NeumorphicSVG className="w-12 h-12 sm:w-16 sm:h-16 opacity-70 dark:opacity-30 pointer-events-none drop-shadow-sm" />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white font-display leading-[1.1]"
            >
              Trusted by Clients Who Value Quality
            </motion.h2>
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
            className="text-base sm:text-lg text-slate-500 dark:text-slate-500 leading-relaxed font-sans font-normal"
          >
            From startups to growing businesses, I help transform ideas into scalable, high-performance digital products. Every project is built with clean architecture, attention to detail, and long-term maintainability.
          </motion.p>
        </div>

        {/* Right Column (60%) - Testimonial Wall */}
        <div className="w-full relative min-h-[400px] h-full lg:h-[600px] [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 flex items-center">
          
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 py-4 h-full items-center">
            {/* Column 1 */}
            <div className="flex flex-col justify-center gap-6 lg:gap-8 h-full">
              {col1.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: "easeOut" }}
                >
                  <TestimonialCard t={t} />
                </motion.div>
              ))}
            </div>

            {/* Column 2 (Offset starting position if there are multiple) */}
            <div className="flex flex-col justify-center gap-6 lg:gap-8 h-full sm:mt-12">
              {col2.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1 + 0.2, duration: 0.8, ease: "easeOut" }}
                >
                  <TestimonialCard t={t} />
                </motion.div>
              ))}
            </div>
          </div>
          
        </div>
        
      </div>
    </section>
  );
}

export function TestimonialsSkeleton() {
  return (
    <section className="relative w-full bg-[#FAFBFC] dark:bg-background py-16 sm:py-24 overflow-hidden border-t border-slate-200 dark:border-slate-800">
      <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.03)_0%,transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08)_0%,transparent_70%)] pointer-events-none -z-10" />
      
      <div className="w-[95%] max-w-7xl mx-auto flex flex-col lg:grid lg:grid-cols-[4fr_6fr] gap-16 lg:gap-20 items-center lg:items-start relative z-10">
        <div className="flex flex-col gap-6 lg:sticky lg:top-40 pt-10 text-center lg:text-left w-full max-w-xl lg:max-w-none">
          <div className="flex flex-col items-center lg:items-start gap-4">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-200/50 dark:bg-slate-800/50 rounded-full animate-pulse" />
            <div className="w-64 h-10 sm:h-12 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg animate-pulse" />
            <div className="w-48 h-10 sm:h-12 bg-slate-200/50 dark:bg-slate-800/50 rounded-lg animate-pulse mt-1" />
          </div>
          <div className="w-full max-w-sm h-24 bg-slate-200/50 dark:bg-slate-800/50 rounded-xl animate-pulse mt-4 mx-auto lg:mx-0" />
        </div>

        <div className="w-full relative min-h-[400px] h-full lg:h-[600px] [mask-image:linear-gradient(to_bottom,transparent,black_5%,black_95%,transparent)] -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-10 lg:px-10 flex items-center">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 py-4 h-full items-center">
            <div className="flex flex-col justify-center gap-6 lg:gap-8 h-full">
              <div className="w-full h-[280px] rounded-[24px] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse border border-slate-200/60 dark:border-slate-800" />
              <div className="w-full h-[240px] rounded-[24px] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse border border-slate-200/60 dark:border-slate-800" />
            </div>
            <div className="flex flex-col justify-center gap-6 lg:gap-8 h-full sm:mt-12">
              <div className="w-full h-[250px] rounded-[24px] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse border border-slate-200/60 dark:border-slate-800" />
              <div className="w-full h-[290px] rounded-[24px] bg-slate-200/50 dark:bg-slate-800/50 animate-pulse border border-slate-200/60 dark:border-slate-800" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}