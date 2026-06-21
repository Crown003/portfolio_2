import React from "react";
import Dashboard from "../components/dashboard";
import Link from "next/link";
import HeroBackground from "../components/hero-background";
import { FiArrowRight } from "react-icons/fi";
import Testimonials from "../components/testimonials";

export default function Home() {
  return (
    <div className="relative flex flex-col pt-6 sm:pt-10 pb-0 font-sans antialiased text-foreground">
      <HeroBackground />

      {/* Hero Content Section */}
      <div className="flex flex-col items-start text-left gap-5 md:gap-7 max-w-3xl px-1">
        {/* Added mb-2 for mobile, resets to whatever your original layout needed on larger screens if necessary */}
        <div className="rotating-chip-container mb-2 sm:mb-4">
          <div className="rotating-chip-glow" />
          <div className="relative z-10 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-card text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
            <span>Building with passion</span>
          </div>
        </div>

        {/* Massive Bold Title */}
        {/* Tightened leading on mobile (leading-[1.05]), returns to original (sm:leading-[1.08]) on larger screens */}
        <h1 className="text-4xl sm:text-6xl text-start font-extrabold tracking-[-0.025em] text-foreground leading-[1.05] sm:leading-[1.08] font-display m-0">
          Building robust systems. Designing{" "}
          <span className="text-[oklch(62.3%_0.214_259.815)]">
            clean interfaces
          </span>
          .
        </h1>

        {/* Subtitle Description */}
        {/* Added a tight mt-2 for mobile, and changed to leading-snug on mobile while resetting to leading-relaxed on desktop */}
        <p className="mt-2 sm:mt-4 text-base sm:text-lg w-full text-start md:text-left text-slate-500 dark:text-slate-400 leading-snug sm:leading-relaxed font-sans max-w-3xl font-normal">
          I'm Harshit, A Full-Stack Engineer crafting reliable applications,
          scalable infrastructure, and polished user experiences while balancing
          technical excellence with practical business needs.
        </p>

        {/* Dual CTA Buttons */}
        <div className="w-full text-center md:text-left flex flex-col md:flex-row items-center gap-3.5 mt-4">
          <a
            href="#dashboard-section"
            className="inline-flex justify-center w-full max-w-full md:w-fit items-center gap-1.5 bg-slate-900  hover:opacity-90 px-5 py-2.5 rounded-lg font-bold text-sm select-none text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-98 dark:bg-white dark:text-black dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset] dark:ring-black/20 dark:ring-offset-white dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset] dark:hover:ring-black/50"
          >
            <span>Explore My Works</span>
            <span className="text-xs">→</span>
          </a>

          <Link
            href="/blogs"
            className="
            border border-border w-full md:w-fit max-w-full bg-transparent hover:bg-slate-100/70 dark:hover:bg-slate-800/60 active:scale-97 transition-all px-5 py-2.5 rounded-lg font-bold text-sm text-slate-700 dark:text-slate-300 select-none ring ring-gray-50 dark:ring-transparent shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]
            "
          >
            Read Blogs
          </Link>
        </div>
      </div>

      {/* Spaced Anchor for Interactive Dashboard */}
      <div
        id="dashboard-section"
        className="w-full mt-20 sm:mt-28 pb-40 relative group/dashboard md:dark:[mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)] overflow-x-clip"
      >
        {/* Ambient background glow shadow - Monochromatic Slate/Gray */}
        <div className="absolute -inset-10 rounded-[3rem]  bg-gradient-to-tr from-slate-400/15 via-slate-300/10 to-slate-400/15 dark:from-slate-800/25 dark:via-slate-900/25 dark:to-slate-800/25 blur-3xl opacity-60 dark:opacity-40 group-hover/dashboard:opacity-80 transition-opacity duration-700 pointer-events-none -z-10" />
        <Dashboard />
      </div>

      {/* Gridline Project Showcase Section */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen bg-background shadow-[0_8px_40px_-8px_rgba(0,0,0,0.06)_inset] dark:shadow-[0_12px_60px_-12px_rgba(0,0,0,0.7)_inset] border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
        {/* Full screen width content wrapper with custom layout sections */}
        <div className="w-full flex flex-col gap-12 relative z-10">
          {/* Header Row: Aligned to 95% width page layout constraint */}
          {/* Tightened the massive vertical padding on mobile (py-12), returns to original (sm:py-32 md:py-28) on larger screens */}
          <div className="w-[95%] max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 py-12 sm:py-32 md:py-28">
            {/* Reduced gap between header and paragraph from gap-3 to gap-1.5 on mobile */}
            <div className="flex flex-col gap-1.5 sm:gap-3 max-w-xl">
              {/* Increased mobile text size to text-3xl (originally text-xl) and tightened leading to leading-none on mobile */}
              <h2 className="text-3xl text-balance sm:text-3xl font-extrabold tracking-tight text-foreground font-display leading-[1.1] sm:leading-tight">
                Transforming concepts into{" "}
                <span className="text-[oklch(62.3%_0.214_259.815)]">
                  functional applications.
                </span>
              </h2>

              {/* Tightened paragraph line-height on mobile (leading-snug), returns to original (sm:leading-relaxed) on desktops */}
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug sm:leading-relaxed font-sans font-normal">
                A showcase of projects built with a focus on clean architecture,
                reliable performance, and smooth user experiences.
              </p>
            </div>

            <div className="flex flex-col">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-lg text-xs hover:opacity-90 active:scale-98 cursor-pointer select-none transition-all duration-200 shadow-md shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset] dark:ring-black/20 dark:ring-offset-white dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset] dark:hover:ring-black/50"
              >
                <span>View All Projects</span>
                <FiArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Bento Grid Layout: Cards breakout wide, borders drawn outside cards on grid cell dividers */}
          <div className="w-full max-w-[100rem] mx-auto">
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-y border-dashed border-slate-200/80 dark:border-slate-800/80">
              {/* Repeating 45deg diagonal grid-line bg effect with bottom fade mask */}
              <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(45deg,rgb(0_0_0/0.04)_0,rgb(0_0_0/0.04)_1px,transparent_1px,transparent_0.4rem)] dark:bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.04)_0,rgb(255_255_255/0.04)_1px,transparent_1px,transparent_0.4rem)] [mask-image:linear-gradient(to_bottom,black_0%,transparent_100%)]" />

              {/* Cell 1: POS System for Stalls & Small Businesses */}
              <div className="p-6 md:p-8 border-b md:border-r lg:border-b lg:border-r border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col group/card">
                <a
                  href="/projects/pos-system"
                  className="w-full h-full relative flex flex-col rounded-2xl overflow-hidden min-h-[310px] bg-slate-50 dark:bg-slate-900 shadow-sm shadow-slate-100 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/5 hover:ring-emerald-500/40 dark:hover:ring-emerald-500/40 transition-all duration-300"
                >
                  {/* 1. Full-bleed background product showcase */}
                  <img
                    src="/pos-system.jpg"
                    alt="POS System for Stalls & Small Businesses"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />

                  {/* Vignette — darkens edges for premium depth */}
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.22)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)] z-[1] pointer-events-none" />

                  {/* 3. Solid Angular Text Background - Insulates header readability */}
                  <div
                    className="absolute top-0 left-0 w-[60%] h-[68%] bg-white dark:bg-slate-950 z-[2] transition-colors duration-300 clip-pos-vignette"
                  />

                  {/* 4. Active Content Container */}
                  <div className="flex flex-col relative z-10 h-full justify-between p-6">

                    {/* Header Text Block (Perfectly constrained within the solid clip zone) */}
                    <div className="flex flex-col gap-2.5 max-w-[45%] pointer-events-none">
                      <div className="flex items-center gap-2.5">
                        <h4 className="text-base font-bold text-slate-900 dark:text-white font-display group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors duration-300">
                          POS System
                        </h4>

                        {/* Live Indicator */}
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 ring-1 ring-emerald-500/20 dark:ring-emerald-500/25">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                          <span className="text-[7px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Live</span>
                        </span>
                      </div>

                      <p className="text-xs text-slate-600 dark:text-slate-300 group-hover/card:text-slate-900 group-hover/card:dark:text-slate-100 transition-colors duration-300 leading-relaxed font-sans font-medium">
                        Smart billing & checkout system for stalls and small businesses. Serving 2 businesses in NCR.
                      </p>
                    </div>

                    {/* Tech Stack Horizontal Scroll Strip — fully visible always */}
                    <div className="w-full overflow-x-auto no-scrollbar mt-auto pt-6">
                      <div className="flex items-center gap-2 whitespace-nowrap">

                        {/* Flutter */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">
                          <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14.314 0L2.3 12 6 15.7 21.684.012h-7.37zm.014 11.072L7.857 17.53l6.47 6.47H21.7l-6.46-6.468 6.46-6.46h-7.37z" />
                          </svg>
                          Flutter
                        </span>

                        {/* Firebase */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">
                          <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.288l2.543 4.771zm16.794 3.692l-2.25-14a.54.54 0 00-.919-.295L3.316 19.365l7.856 4.427a1.621 1.621 0 001.588 0zM14.3 7.147l-1.356-2.558a.54.54 0 00-.96 0L3.89 15.672z" />
                          </svg>
                          Firebase
                        </span>

                        {/* Android */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">
                          <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48A5.84 5.84 0 0012 1.5c-.96 0-1.86.23-2.66.63L7.88.65c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31A5.983 5.983 0 006 8h12a5.983 5.983 0 00-2.47-5.84zM10 6H9V5h1v1zm5 0h-1V5h1v1z" />
                          </svg>
                          Android
                        </span>

                        {/* Closed Source */}
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">
                          <svg className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                          Closed Source
                        </span>

                      </div>
                    </div>

                  </div>
                </a>
              </div>

              {/* Cell 2: KD Home Tutorial Live Iframe */}
              <div className="p-6 md:p-8 lg:col-span-2 border-b lg:border-b border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col">
                <a
                  href="https://www.kdhometutorial.in/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-full relative group flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm shadow-slate-100 dark:shadow-none hover:shadow-xl hover:shadow-amber-500/5 dark:hover:shadow-amber-500/5 hover:ring-1 hover:ring-amber-500/30 transition-all duration-300"
                >
                  {/* Browser Mockup Structure */}
                  <div className="w-full h-full flex flex-col overflow-hidden">
                    {/* macOS Window header bar */}
                    <div className="h-9 border-b border-border/80 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-4 select-none shrink-0 relative z-10">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]/90" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/90" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]/90" />
                      </div>
                      <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 px-3 py-0.5 rounded-md text-[8px] text-slate-500 dark:text-slate-400 font-mono w-40 justify-center border border-border/40">
                        <span>🔒</span>
                        <span>kdhometutorial.in</span>
                      </div>
                      <div className="w-10 h-2" />
                    </div>

                    {/* Content area: Fixed aspect ratio/height to resolve iframe layout visibility */}
                    <div className="w-full h-[320px] sm:h-[350px] md:h-[400px] bg-white relative overflow-hidden">
                      <iframe
                        src="https://www.kdhometutorial.in/"
                        className="absolute top-0 left-0 w-[300%] sm:w-[200%] md:w-[125%] h-[300%] sm:h-[200%] md:h-[125%] border-none select-none pointer-events-none origin-top-left scale-[0.3333] sm:scale-50 md:scale-80 overflow-hidden"
                        title="KD Home Tutorial Live Website"
                      />
                    </div>
                  </div>
                </a>
              </div>

              {/* Cell 3: Testimonial Card */}
              <div className="p-6 md:p-8 border-b md:border-r md:border-b-0 lg:border-r border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col">
                <Link
                  href="/about"
                  className="w-full h-full relative group flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md p-6 min-h-[250px] border border-slate-200/50 dark:border-slate-800/50 shadow-sm shadow-slate-100 dark:shadow-none hover:shadow-xl hover:shadow-sky-500/5 dark:hover:shadow-sky-500/5 hover:ring-1 hover:ring-sky-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col gap-4 h-full relative z-10 justify-between">
                    {/* Quote Icon */}
                    <span className="text-5xl font-serif text-slate-300 dark:text-slate-800 leading-none select-none">
                      “
                    </span>

                    {/* Quote Text */}
                    <p className="text-xs sm:text-[13px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal font-sans">
                      A robust solution that fits perfectly into our workflow.
                      It has enhanced our team's capabilities and allowed us to
                      tackle more complex projects.
                    </p>

                    {/* Profile Meta */}
                    <div className="flex items-center gap-2.5 mt-2">
                      <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-black text-slate-600 dark:text-slate-400 select-none">
                        FM
                      </div>
                      <div className="flex flex-col leading-tight">
                        <span className="text-xs font-bold text-foreground">
                          Frank Moore
                        </span>
                        <span className="text-[9px] text-slate-400">
                          VP Engineering, Saasternity
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Cell 4: All over the world */}
              <div className="p-6 md:p-8 border-b md:border-none lg:border-r lg:border-b-0 border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col">
                <Link
                  href="/about"
                  className="w-full h-full relative group flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md p-6 min-h-[250px] border border-slate-200/50 dark:border-slate-800/50 shadow-sm shadow-slate-100 dark:shadow-none hover:shadow-xl hover:shadow-sky-500/5 dark:hover:shadow-sky-500/5 hover:ring-1 hover:ring-sky-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col gap-2 relative z-10">
                    <h4 className="text-base font-bold text-foreground font-display">
                      All over the world
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-normal max-w-[200px]">
                      Meet our distributed team of experts working across 6
                      continents.
                    </p>
                  </div>

                  {/* Simplified global distribution map SVG */}
                  <div className="absolute -bottom-6 -right-6 w-36 h-36 pointer-events-none">
                    <svg
                      className="w-full h-full text-slate-300 dark:text-slate-700"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <circle
                        cx="50"
                        cy="50"
                        r="42"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeDasharray="2 2"
                        className="text-slate-200 dark:text-slate-800/40"
                      />
                      <circle
                        cx="50"
                        cy="50"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        className="text-slate-200 dark:text-slate-800/30"
                      />
                      <path
                        d="M15 50 C 30 30, 70 30, 85 50 C 70 70, 30 70, 15 50 Z"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeOpacity="0.15"
                      />
                      <path
                        d="M50 15 C 30 30, 30 70, 50 85 C 70 70, 70 30, 50 15 Z"
                        stroke="currentColor"
                        strokeWidth="0.5"
                        strokeOpacity="0.15"
                      />
                      {/* Glowing location indicators */}
                      <circle
                        cx="45"
                        cy="35"
                        r="2.5"
                        className="fill-rose-500 animate-pulse"
                      />
                      <circle
                        cx="65"
                        cy="48"
                        r="3"
                        className="fill-emerald-500 animate-pulse"
                      />
                      <circle cx="30" cy="58" r="2" className="fill-sky-500" />
                      <circle
                        cx="55"
                        cy="65"
                        r="2.5"
                        className="fill-amber-500"
                      />
                    </svg>
                  </div>
                </Link>
              </div>

              {/* Cell 5: Saasternity */}
              <div className="p-6 md:p-8 border-none flex flex-col">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full h-full relative group flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-6 min-h-[250px] border border-white/5 shadow-md shadow-black/20 hover:shadow-xl hover:shadow-purple-500/10 hover:ring-1 hover:ring-purple-500/40 transition-all duration-300"
                >
                  {/* Glowing star backgrounds */}
                  <div className="absolute top-12 left-16 w-1 h-1 bg-white rounded-full opacity-60 animate-ping" />
                  <div className="absolute top-24 right-16 w-0.5 h-0.5 bg-white rounded-full opacity-80" />
                  <div className="absolute bottom-16 left-28 w-1 h-1 bg-sky-300 rounded-full opacity-40 animate-pulse" />

                  <div className="flex flex-col gap-2 relative z-10 h-full justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-5 h-5 text-purple-400"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polygon points="12 2 2 22 22 22" />
                        </svg>
                        <span className="text-base font-bold text-white font-display tracking-tight">
                          Saasternity
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-sans font-normal mt-1">
                        Interactive developer tools and scalable SaaS platforms
                        built for the next generation of web engineering.
                      </p>
                    </div>

                    <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider mt-auto select-none">
                      Open Source Project →
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Testimonials />
    </div>
  );
}
