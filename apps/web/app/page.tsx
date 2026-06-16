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
        className="w-full mt-20 sm:mt-28 pb-40 relative group/dashboard md:dark:[mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)]"
      >
        {/* Ambient background glow shadow - Monochromatic Slate/Gray */}
        <div className="absolute -inset-10 rounded-[3rem]  bg-gradient-to-tr from-slate-400/15 via-slate-300/10 to-slate-400/15 dark:from-slate-800/25 dark:via-slate-900/25 dark:to-slate-800/25 blur-3xl opacity-60 dark:opacity-40 group-hover/dashboard:opacity-80 transition-opacity duration-700 pointer-events-none -z-10" />
        <Dashboard />
      </div>

      {/* Gridline Project Showcase Section */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen max-w-[100vw] overflow-x-hidden bg-background shadow-[0_8px_40px_-8px_rgba(0,0,0,0.06)_inset] dark:shadow-[0_12px_60px_-12px_rgba(0,0,0,0.7)_inset] border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
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

              {/* Cell 1: Hosting over the edge */}
              <div className="p-6 md:p-8 border-b md:border-r lg:border-b lg:border-r border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col">
                <Link
                  href="/projects"
                  className="w-full h-full relative group flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md p-6 min-h-[250px] border border-slate-200/50 dark:border-slate-800/50 shadow-sm shadow-slate-100 dark:shadow-none hover:shadow-xl hover:shadow-sky-500/5 dark:hover:shadow-sky-500/5 hover:ring-1 hover:ring-sky-500/30 transition-all duration-300"
                >
                  <div className="flex flex-col gap-2 relative z-10">
                    <h4 className="text-base font-bold text-foreground font-display">
                      Hosting over the edge
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-sans font-normal max-w-[200px]">
                      With our edge network, we host your website by going into
                      each city by ourselves.
                    </p>
                  </div>

                  {/* Glowing 3D SVG Globe Graphic Mockup */}
                  <div className="absolute -bottom-6 -right-6 w-36 h-36 pointer-events-none">
                    <svg
                      className="w-full h-full text-slate-300 dark:text-slate-700"
                      viewBox="0 0 100 100"
                      fill="none"
                    >
                      <defs>
                        <radialGradient id="blueGlow" cx="50%" cy="50%" r="50%">
                          <stop
                            offset="0%"
                            stopColor="#38bdf8"
                            stopOpacity="0.5"
                          />
                          <stop
                            offset="100%"
                            stopColor="#38bdf8"
                            stopOpacity="0"
                          />
                        </radialGradient>
                        <radialGradient
                          id="darkGlobeGrad"
                          cx="50%"
                          cy="50%"
                          r="50%"
                          fx="30%"
                          fy="30%"
                        >
                          <stop offset="0%" stopColor="#1e293b" />
                          <stop offset="70%" stopColor="#0f172a" />
                          <stop offset="100%" stopColor="#020617" />
                        </radialGradient>
                      </defs>

                      <circle
                        cx="50"
                        cy="50"
                        r="46"
                        className="fill-[url(#darkGlobeGrad)] stroke-slate-300/10 dark:stroke-slate-800/30"
                        strokeWidth="0.5"
                      />

                      <path
                        d="M 4 50 A 46 15 0 0 0 96 50"
                        className="stroke-slate-300/10 dark:stroke-slate-800/40"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 4 50 A 46 30 0 0 0 96 50"
                        className="stroke-slate-300/15 dark:stroke-slate-800/50"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 4 50 A 46 15 0 0 1 96 50"
                        className="stroke-slate-300/10 dark:stroke-slate-800/40"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 4 50 A 46 30 0 0 1 96 50"
                        className="stroke-slate-300/15 dark:stroke-slate-800/50"
                        strokeWidth="0.5"
                      />

                      <path
                        d="M 50 4 A 15 46 0 0 0 50 96"
                        className="stroke-slate-300/10 dark:stroke-slate-800/40"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 50 4 A 30 46 0 0 0 50 96"
                        className="stroke-slate-300/15 dark:stroke-slate-800/50"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 50 4 A 15 46 0 0 1 50 96"
                        className="stroke-slate-300/10 dark:stroke-slate-800/40"
                        strokeWidth="0.5"
                      />
                      <path
                        d="M 50 4 A 30 46 0 0 1 50 96"
                        className="stroke-slate-300/15 dark:stroke-slate-800/50"
                        strokeWidth="0.5"
                      />

                      <circle cx="50" cy="50" r="2" fill="#38bdf8" />
                      <circle cx="50" cy="50" r="6" fill="url(#blueGlow)" />
                      <circle cx="28" cy="28" r="1.5" fill="#38bdf8" />
                      <circle cx="28" cy="28" r="4" fill="url(#blueGlow)" />
                      <circle cx="72" cy="28" r="1.5" fill="#38bdf8" />
                      <circle cx="72" cy="28" r="4" fill="url(#blueGlow)" />
                      <circle cx="20" cy="50" r="1.5" fill="#38bdf8" />
                      <circle cx="80" cy="50" r="2" fill="#38bdf8" />
                      <circle cx="80" cy="50" r="6" fill="url(#blueGlow)" />
                      <circle cx="35" cy="70" r="1.5" fill="#38bdf8" />
                      <circle cx="65" cy="70" r="2" fill="#38bdf8" />
                      <circle cx="65" cy="70" r="6" fill="url(#blueGlow)" />
                    </svg>
                  </div>
                </Link>
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
