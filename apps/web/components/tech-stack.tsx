"use client";

import React from "react";
import { techStackCategories } from "./tech-data";

export default function TechStack() {
  return (
    <div className="w-full relative py-32 sm:py-40 bg-background text-foreground border-t border-dashed border-slate-200/80 dark:border-slate-800/80 overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="w-[95%] max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        <div className="flex flex-col gap-4 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight font-display leading-[1.1] text-slate-900 dark:text-slate-100">
            My Tech Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 max-w-2xl font-sans">
            A categorized overview of the languages, frameworks, databases, and tools I use to build scalable applications.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {techStackCategories.map((category, idx) => (
            <div key={idx} className="flex flex-col gap-5">
              <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase font-display border-b border-slate-800 pb-3">
                {category.title}
              </h3>
              
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <div
                      key={sIdx}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 group cursor-default"
                    >
                      <Icon className="w-4 h-4 text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300" />
                      <span className="text-xs sm:text-sm font-semibold font-display text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-colors duration-300">
                        {skill.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
