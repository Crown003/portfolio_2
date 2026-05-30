import Dashboard from "../components/dashboard";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 pt-2 pb-10 sm:pt-4 sm:pb-12 font-sans antialiased text-foreground">

      {/* Hero Content Section */}
      <div className="flex flex-col items-start text-left gap-6 max-w-3xl px-1">

        {/* Pill Alert Badge with Static Ring & Revolving Gradient Border */}
        <div className="rotating-chip-container">
          <div className="rotating-chip-glow" />
          <div className="relative z-10 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-card text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
            <span>Building with passion</span>
          </div>
        </div>

        {/* Massive Bold Title */}
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-foreground leading-[1.08] font-display text-balance">
          Building robust systems. Designing <span className="text-[oklch(62.3%_0.214_259.815)]">clean interfaces</span>.
        </h1>

        {/* Subtitle Description */}
        <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-sans max-w-3xl font-medium text-balance">
          I'm Harshit, A Full-Stack Engineer crafting reliable applications, scalable infrastructure, and polished user experiences while balancing technical excellence with practical business needs.
        </p>

        {/* Dual CTA Buttons */}
        <div className="flex items-center gap-3.5 mt-2">
          <a
            href="#dashboard-section"
            className="inline-flex items-center gap-1.5 bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90 active:scale-97 transition-all px-5 py-2.5 rounded-lg font-bold text-sm select-none"
          >
            <span>Explore Services</span>
            <span className="text-xs">→</span>
          </a>

          <Link
            href="/blogs"
            className="border border-border bg-transparent hover:bg-slate-100/70 dark:hover:bg-slate-800/60 active:scale-97 transition-all px-5 py-2.5 rounded-lg font-bold text-sm text-slate-700 dark:text-slate-300 select-none"
          >
            Read Blogs
          </Link>
        </div>

      </div>

      {/* Spaced Anchor for Interactive Dashboard */}
      <div id="dashboard-section" className="w-full pt-4">
        <Dashboard />
      </div>

    </div>
  );
}
