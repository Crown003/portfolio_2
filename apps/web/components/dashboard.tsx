"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { techStackCategories } from "./tech-data";

type TabType = "about" | "professional skills" | "services" | "contact";

const StandardIcons = {
  Code: () => (
    <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Smartphone: () => (
    <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  Palette: () => (
    <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3M9.7 9.3L14 5l4.3 4.3m-8.6 0l4.3 4.3m0 0L14 9.3" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-5 h-5 text-slate-500 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Send: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
};

const Icons = {
  User: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Briefcase: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabType>("about");
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [contactSuccess, setContactSuccess] = useState(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.email || !contactForm.message) return;
    setContactSuccess(true);
    setContactForm({ name: "", email: "", message: "" });
    setTimeout(() => setContactSuccess(false), 5000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "about":
        const metadata = [
          { label: "Location", value: "India" },
          { label: "Focus", value: "Full Stack Development" },
          { label: "Specialization", value: "Web Platforms & Backend Systems" },
          { label: "Availability", value: "Open for Freelance Projects" },
        ];

        const expertises = [
          "Backend Architecture",
          "API Design",
          "Modern Frontend Development",
          "Database Engineering",
          "Performance Optimization",
          "Cloud Deployment",
        ];

        return (
          <motion.div
            key="about"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-8 py-2"
          >
            {/* Hero Profile Block */}
            <div className="flex flex-col gap-2.5">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground font-display tracking-tight leading-none">
                Harshit Tiwari
              </h3>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-mono tracking-wide uppercase">
                Full Stack Engineer
              </p>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-2xl font-medium mt-1">
                Building scalable web applications, developer tools, and modern digital experiences.
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-y border-border/60 py-6">
              {metadata.map((item, idx) => (
                <div key={idx} className="flex flex-col gap-1 font-sans">
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Core Expertise Pills */}
            <div className="flex flex-col gap-3.5">
              <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-bold">
                Core Expertise
              </span>
              <div className="flex flex-wrap gap-2">
                {expertises.map((exp, idx) => (
                  <span
                    key={idx}
                    className="px-3.5 py-1.5 rounded-lg border border-border text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-500/5 select-none flex items-center gap-0 hover:gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:border-slate-300 dark:hover:border-slate-700 hover:text-foreground transition-all duration-300 group cursor-default"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[oklch(62.3%_0.214_259.815)] scale-0 group-hover:scale-100 transition-all duration-300 ease-out shrink-0" />
                    <span className="transition-transform duration-300 ease-out">{exp}</span>
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case "professional skills":
        return (
          <motion.div
            key="professional skills"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 py-2 max-h-[380px] overflow-y-auto pr-3 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800"
            style={{
              maskImage: "linear-gradient(to bottom, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)",
              WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20px, black calc(100% - 20px), transparent 100%)",
            }}
          >
            {techStackCategories.map((cat, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <span className="text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block font-bold border-b border-border/40 pb-1">
                  {cat.title}
                </span>

                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 gap-2">
                  {cat.skills.map((skill, sIdx) => {
                    const Icon = skill.icon;
                    return (
                      <div
                        key={sIdx}
                        className="flex flex-col items-center justify-center p-2 rounded-lg border border-border bg-card/30 hover:bg-slate-500/5 hover:border-sky-500/30 dark:hover:border-sky-400/20 hover:ring-1 hover:ring-sky-500/20 dark:hover:ring-sky-400/10 hover:shadow-[0_0_12px_rgba(14,165,233,0.02)] transition-all duration-300 select-none group cursor-default text-center"
                      >
                        <span className="text-slate-500 dark:text-slate-400 flex items-center justify-center shrink-0 w-10 h-10 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:text-slate-800 dark:group-hover:text-slate-200 transition-all duration-300">
                          <Icon className="w-9 h-9" />
                        </span>
                        <span className="text-[9px] font-mono font-medium text-slate-400 dark:text-slate-500 group-hover:text-foreground transition-colors duration-300 mt-1 leading-none">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </motion.div>
        );

      case "services":
        const serviceItems = [
          {
            title: "Web Development",
            desc: "Modern websites, dashboards, SaaS products, admin panels, and custom web applications.",
            icon: StandardIcons.Code,
          },
          {
            title: "Mobile App Development",
            desc: "Cross-platform mobile applications built with React Native and modern tooling.",
            icon: StandardIcons.Smartphone,
          },
          {
            title: "Graphic Design",
            desc: "Branding assets, social media creatives, UI visuals, presentations, and marketing materials.",
            icon: StandardIcons.Palette,
          },
          {
            title: "Technical Consultation",
            desc: "Architecture reviews, scalability planning, performance optimization, and technical guidance.",
            icon: StandardIcons.Briefcase,
          },
        ];

        return (
          <motion.div
            key="services"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6 py-2"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceItems.map((service, idx) => {
                const Icon = service.icon;
                return (
                  <div
                    key={idx}
                    className="border border-border p-5 rounded-xl bg-card/40 hover:bg-slate-500/5 hover:border-slate-400/30 dark:hover:border-slate-700/30 transition-all duration-300 flex flex-col gap-3 group cursor-pointer"
                  >
                    <div className="w-9 h-9 rounded-lg bg-slate-500/5 border border-border flex items-center justify-center group-hover:border-slate-300 dark:group-hover:border-slate-700 transition-colors duration-300">
                      <span className="inline-block group-hover:rotate-12 transition-transform duration-300">
                        <Icon  />
                      </span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <h4 className="text-sm font-bold text-foreground font-display transition-transform duration-300">
                        {service.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        );

      case "contact":
        return (
          <motion.div
            key="contact"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-6 py-2"
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold text-foreground font-display">
                Let's collaborate
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-sans">
                I'm open to discussing web applications, mobile architectures, consultations, or design work. Send a message directly or connect via social networks.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
              {/* Form panel */}
              <form onSubmit={handleContactSubmit} className="md:col-span-7 flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className="bg-card border border-border rounded-lg px-3 py-2 text-xs font-sans text-foreground focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600"
                    placeholder="Jane Doe"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="bg-card border border-border rounded-lg px-3 py-2 text-xs font-sans text-foreground focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600"
                    placeholder="jane@example.com"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[9px] font-mono text-slate-400 uppercase">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="bg-card border border-border rounded-lg px-3 py-2 text-xs font-sans text-foreground resize-none focus:outline-hidden focus:border-slate-400 dark:focus:border-slate-600"
                    placeholder="Let's build something..."
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 py-2 bg-slate-900 text-white dark:bg-white dark:text-black font-semibold rounded-lg text-xs hover:opacity-90 active:scale-98 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <StandardIcons.Send />
                  <span>Send Message</span>
                </button>

                <AnimatePresence>
                  {contactSuccess && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="bg-slate-500/10 border border-border text-foreground p-2.5 rounded-lg text-[9px] text-center font-mono leading-relaxed mt-1"
                    >
                      Message transmitted! I'll respond within 24 hours.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Direct links card */}
              <div className="md:col-span-5 border border-border rounded-xl bg-slate-500/5 p-4 flex flex-col gap-4">
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest block font-bold">
                  Direct Nodes
                </span>

                <div className="flex flex-col gap-2.5 font-sans">
                  <a
                    href="mailto:harshit@example.com"
                    className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <StandardIcons.Mail />
                    <span className="font-semibold">harshit@example.com</span>
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <StandardIcons.Globe />
                    <span className="font-semibold">github.com/harshit</span>
                  </a>

                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <StandardIcons.Globe />
                    <span className="font-semibold">linkedin.com/in/harshit</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <div className="w-full border border-border bg-card/45 backdrop-blur-md rounded-xl shadow-xs overflow-hidden flex flex-col relative transition-all duration-300">
      
      {/* macOS Window Title Bar Wrapper */}
      <div className="h-11 border-b border-border/80 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between relative px-4 select-none">
        {/* Left Side: Red, Yellow, Green traffic dots */}
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]/90 border border-black/5 dark:border-white/5" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]/90 border border-black/5 dark:border-white/5" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]/90 border border-black/5 dark:border-white/5" />
        </div>

        {/* Center: URL address bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-1.5 bg-slate-200/50 dark:bg-slate-800/50 px-4 py-1 rounded-md text-[10px] text-slate-500 dark:text-slate-400 font-mono w-48 sm:w-64 border border-border/40 select-all cursor-pointer">
          <span className="text-[9px] text-slate-400 dark:text-slate-500">🔒</span>
          <span>Harshit.tiwari/{activeTab}</span>
        </div>

        {/* Right Side: Status Badge */}
        <div className="flex items-center gap-1.5 text-[9px] font-mono text-slate-500 dark:text-slate-400">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-500 animate-pulse" />
          <span className="hidden sm:inline">CONSOLE ACTIVE</span>
        </div>
      </div>

      {/* Main Grid Window Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[500px]">
        
        {/* Left Area: Viewport */}
        <div className="lg:col-span-3 p-6 sm:p-7 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-border/80">
          
          <div className="flex-1 relative">
            <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
          </div>

        </div>

        {/* Right Area: Control Deck & Buttons Sidebar */}
        <div className="lg:col-span-1 p-6 flex flex-col gap-6 justify-between bg-slate-500/5 dark:bg-slate-900/10">
          
          {/* Button stack */}
          <div className="flex flex-col gap-3">
            <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest block select-none">
              Workspace Options
            </span>

            <div className="flex flex-row lg:flex-col gap-2 w-full">
              {[
                { id: "about", label: "About", icon: Icons.User },
                { id: "professional skills", label: "Professional", icon: Icons.Briefcase },
                { id: "services", label: "Services", icon: Icons.Sparkles },
                { id: "contact", label: "Contact", icon: Icons.User },
              ].map((btn) => {
                const IconComp = btn.icon;
                const isActive = activeTab === btn.id;

                return (
                  <button
                    key={btn.id}
                    onClick={() => setActiveTab(btn.id as TabType)}
                    className={`flex-1 lg:flex-none flex items-center justify-center lg:justify-between px-3.5 py-2.5 rounded-lg border font-sans text-xs font-bold transition-all duration-200 relative group cursor-pointer ${
                      isActive
                        ? "border-slate-800 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-slate-900"
                        : "border-transparent bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 text-slate-500 hover:text-foreground dark:text-slate-400"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="scale-95">
                        <IconComp />
                      </span>
                      <span className="hidden sm:inline lg:inline tracking-tight">{btn.label}</span>
                    </div>

                    {/* Small blue dot active indicator on the right of the button */}
                    {isActive && (
                      <span className="hidden lg:inline-block w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Simple status card (Open to Freelance) */}
          <div className="flex flex-col gap-1.5 bg-card border border-border p-4 rounded-xl font-mono">
            <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
              <span className="text-green-400 animate-pulse">●</span> Status
            </span>
            <span className="text-xs font-bold text-foreground">Available for Work</span>
            <span className="text-[10px] text-slate-400 leading-normal">
              Currently building the PopnFry Platform. Open to freelance projects and collaborations.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
}
