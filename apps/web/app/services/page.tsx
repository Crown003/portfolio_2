import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — Crown",
  description:
    "Professional web development, mobile apps, design, and technical consulting services. Coming soon.",
};

export default function ServicesPage() {
  return (
    <div className="flex-1 flex flex-col py-16 sm:py-24 px-6 sm:px-10 md:px-16 lg:px-24 max-w-5xl mx-auto w-full relative">
      {/* Badge */}
      <span className="w-fit px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-muted-foreground bg-slate-100 dark:bg-slate-800/60 border border-border mb-8">
        Services & Offerings
      </span>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-foreground font-display leading-[1.1] mb-6">
        Building{" "}
        <span className="text-[oklch(62.3%_0.214_259.815)]">digital</span>
        {" "}products,{" "}
        <br className="hidden sm:block" />
        web & mobile.
      </h1>

      {/* Description */}
      <p className="max-w-xl text-sm sm:text-base text-muted-foreground leading-relaxed font-sans mb-4">
        Full-stack development, UI/UX design, mobile applications,
        <br className="hidden sm:block" />
        and technical consulting. Tailored for startups & teams.
      </p>

      <p className="max-w-md text-xs text-slate-400 dark:text-slate-500 leading-relaxed font-mono mb-12">
        This page will be updated soon with detailed service
        breakdowns, pricing, and case studies.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Link
          href="/contact"
          className="btn-gradient-interactive text-sm font-semibold text-white px-6 py-3 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300"
        >
          Get in Touch
        </Link>
        <Link
          href="/"
          className="text-sm font-semibold text-foreground px-6 py-3 rounded-xl border border-border hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}

