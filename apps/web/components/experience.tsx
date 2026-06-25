"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

interface Skill {
  name: string;
}

interface Role {
  title: string;
  type: string;
  duration: string;
  location: string;
  description?: string;
  skills: Skill[];
  media?: {
    type: "image";
    src: string;
    alt: string;
    caption: string;
  };
}

interface CompanyExperience {
  id: string;
  company: string;
  totalDuration: string;
  location: string;
  logoInitial: string;
  roles: any; // Using any or specific Role[] type as parsed from JSON
}

export default function Experience({ experiences }: { experiences: CompanyExperience[] }) {
  // Track which role indices are expanded. Key is `${companyIdx}-${roleIdx}`
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="relative left-1/2 -translate-x-1/2 w-screen bg-background shadow-[0_8px_40px_-8px_rgba(0,0,0,0.06)_inset] dark:shadow-[0_12px_60px_-12px_rgba(0,0,0,0.7)_inset] border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
      <div className="w-full flex flex-col gap-12 relative z-10">
        <div className="w-[95%] max-w-4xl mx-auto flex flex-col gap-8 py-12 sm:py-32 md:py-28">
          <div className="flex flex-col gap-1.5 sm:gap-3 max-w-xl">
            <h2 className="text-3xl text-balance sm:text-3xl font-extrabold tracking-tight text-foreground font-display leading-[1.1] sm:leading-tight">
              Professional{" "}
              <span className="text-[oklch(62.3%_0.214_259.815)]">
                Experience
              </span>
              .
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug sm:leading-relaxed font-sans font-normal">
              A timeline of my professional journey, highlighting the roles,
              projects, and technologies I've worked with. Click on a role to view more details.
            </p>
          </div>

          <div className="flex flex-col gap-12 mt-6">
            {experiences.map((exp, cIdx) => (
              <div key={exp.id} className="flex gap-4 sm:gap-6">
                {/* Company Logo column */}
                <div className="flex flex-col items-center relative mt-1">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md shadow-[0_4px_12px_-2px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_-2px_rgba(0,0,0,0.5)] ring-1 ring-inset ring-white/50 dark:ring-white/10 group-hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.15)] transition-all duration-300">
                    <FiBriefcase className="w-5 h-5 text-slate-600 dark:text-slate-300" />
                  </div>
                  {Array.isArray(exp.roles) && exp.roles.length > 1 && (
                    <div className="w-0.5 bg-slate-200 dark:bg-slate-800 flex-1 mt-2 mb-2 rounded-full" />
                  )}
                </div>

                {/* Content column */}
                <div className="flex flex-col flex-1 pb-4">
                  {/* Company Header */}
                  {Array.isArray(exp.roles) && exp.roles.length > 1 ? (
                    <div className="mb-6">
                      <h3 className="text-base sm:text-lg font-bold text-foreground font-display">
                        {exp.company}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                        {exp.totalDuration}
                      </p>
                      <p className="text-sm text-slate-400 dark:text-slate-500">
                        {exp.location}
                      </p>
                    </div>
                  ) : null}

                  {/* Roles */}
                  <div className="flex flex-col gap-4">
                    {Array.isArray(exp.roles) && exp.roles.map((role: Role, rIdx: number) => {
                      const roleKey = `${cIdx}-${rIdx}`;
                      const isExpanded = expanded[roleKey];

                      return (
                        <div key={rIdx} className="relative">
                          {/* Timeline dot for multiple roles */}
                          {exp.roles.length > 1 && (
                            <div className="absolute -left-[35px] sm:-left-[43px] top-2 w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-background z-10" />
                          )}

                          <div 
                            className="group cursor-pointer rounded-xl transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900/50 p-2 -mx-2"
                            onClick={() => toggleExpand(roleKey)}
                          >
                            <div className="flex items-start justify-between">
                              {exp.roles.length === 1 ? (
                                <div className="mb-1">
                                  <h3 className="text-base sm:text-lg font-bold text-foreground font-display group-hover:text-[oklch(62.3%_0.214_259.815)] transition-colors">
                                    {role.title}
                                  </h3>
                                  <p className="text-sm text-foreground font-medium">
                                    {exp.company} · {role.type}
                                  </p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {role.duration}
                                  </p>
                                  <p className="text-sm text-slate-400 dark:text-slate-500">
                                    {role.location}
                                  </p>
                                </div>
                              ) : (
                                <div className="mb-1">
                                  <h4 className="text-[15px] sm:text-base font-bold text-foreground font-display group-hover:text-[oklch(62.3%_0.214_259.815)] transition-colors">
                                    {role.title}
                                  </h4>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {role.type}
                                  </p>
                                  <p className="text-sm text-slate-500 dark:text-slate-400">
                                    {role.duration}
                                  </p>
                                  <p className="text-sm text-slate-400 dark:text-slate-500">
                                    {role.location}
                                  </p>
                                </div>
                              )}
                              
                              <div className="shrink-0 p-2 text-slate-400 transition-transform duration-300" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                              </div>
                            </div>

                            <AnimatePresence initial={false}>
                              {isExpanded && (
                                <motion.div
                                  initial={{ height: 0, opacity: 0 }}
                                  animate={{ height: "auto", opacity: 1 }}
                                  exit={{ height: 0, opacity: 0 }}
                                  transition={{ duration: 0.3, ease: "easeInOut" }}
                                  className="overflow-hidden"
                                >
                                  <div className="pt-2 pb-2">
                                    {role.description && (
                                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                                        {role.description}
                                      </p>
                                    )}


                                    {role.skills && role.skills.length > 0 && (
                                      <div className="mt-4 flex items-center gap-2 flex-wrap">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        {role.skills.map((skill, sIdx) => (
                                          <span key={sIdx} className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                                            {skill.name}
                                          </span>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
