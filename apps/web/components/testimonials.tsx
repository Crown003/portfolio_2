import React from "react";

// ── Aceternity Twitter/X Verified Badge SVG ────────────────────────────────
const VerifiedBadge = () => (
  <svg
    className="w-[14px] h-[14px] text-[#1d9bf0] shrink-0 fill-current inline-block"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
  </svg>
);

// ── Types ───────────────────────────────────────────────────────────────────
interface Testimonial {
  name: string;
  handle: string;
  initials: string;
  avatarColor: string;
  text: string;
  tag?: string;
}

// ── Data ───────────────────────────────────────────────────────────────────
const columns: Testimonial[][] = [
  [
    {
      name: "Aditya Verma",
      handle: "@aditya_v_dev",
      initials: "AV",
      avatarColor: "bg-violet-600",
      text: "Harshit built our entire platform backend in under three weeks. Clean architecture, solid docs, zero handholding. Shipped exactly what we asked for.",
      tag: "Full-Stack",
    },
    {
      name: "Priya Sharma",
      handle: "@priya_pm",
      initials: "PS",
      avatarColor: "bg-rose-600",
      text: "Our team's go-to for anything full-stack. He knows when to reach for a library and when not to. That judgment is surprisingly rare.",
      tag: "Engineering",
    },
    {
      name: "Karan Mehta",
      handle: "@karanbuilds",
      initials: "KM",
      avatarColor: "bg-amber-600",
      text: "Integrated our payment gateway + realtime notifications in a single sprint. Couldn't believe the turnaround.",
      tag: "Full-Stack",
    },
  ],
  [
    {
      name: "Sara Nair",
      handle: "@sara_designs",
      initials: "SN",
      avatarColor: "bg-sky-600",
      text: "Honestly one of the few devs who actually cares about pixel-perfect UI. Handed him a Figma file and he shipped it exactly — no guessing, no corners cut.",
      tag: "UI/UX",
    },
    {
      name: "James Park",
      handle: "@jamespark_ux",
      initials: "JP",
      avatarColor: "bg-emerald-600",
      text: "The micro-animations he added to our dashboard made testers say 'this feels premium'. That's the difference between good and great.",
      tag: "Design",
    },
    {
      name: "Meera Iyer",
      handle: "@meera_product",
      initials: "MI",
      avatarColor: "bg-fuchsia-600",
      text: "We hired Harshit for a 2-week redesign. The result was a component system our entire team can now extend without breaking anything. Exceptional work.",
      tag: "UI/UX",
    },
  ],
  [
    {
      name: "Rahul Das",
      handle: "@rahuldas_cto",
      initials: "RD",
      avatarColor: "bg-cyan-600",
      text: "Moved us from a monolith to edge-deployed services. Zero downtime. Load times dropped by 60%. I'd hire him again without hesitation.",
      tag: "Infrastructure",
    },
    {
      name: "Tom Fischer",
      handle: "@tom_oss",
      initials: "TF",
      avatarColor: "bg-indigo-600",
      text: "His open-source tooling has saved our engineering team literal weeks. The code is readable, the README is clear, and PRs get reviewed fast. 🔥",
      tag: "Open Source",
    },
    {
      name: "Sneha Kulkarni",
      handle: "@sneha_startup",
      initials: "SK",
      avatarColor: "bg-orange-600",
      text: "KD Home Tutorial site he built for us handles thousands of sessions a day without a single crash. Scalable and fast out of the box.",
      tag: "Projects",
    },
  ],
  [
    {
      name: "Ankit Roy",
      handle: "@ankitroy_dev",
      initials: "AR",
      avatarColor: "bg-teal-600",
      text: "His blog posts are bookmark-worthy. Found his Next.js caching breakdown and it saved us two days of debugging. Crystal-clear writing.",
      tag: "Blogs",
    },
    {
      name: "Lisa Müller",
      handle: "@lisamuller_eng",
      initials: "LM",
      avatarColor: "bg-pink-600",
      text: "Started following Harshit's blog six months ago. Every post has something I can apply at work immediately. More devs should write like this.",
      tag: "Writing",
    },
    {
      name: "Dev Kapoor",
      handle: "@devkapoor_io",
      initials: "DK",
      avatarColor: "bg-lime-700",
      text: "Mentored our junior engineers through a tough architectural decision. Patient, precise, and always willing to explain the 'why' behind every choice.",
      tag: "Mentorship",
    },
  ],
];

// ── Card Component ──────────────────────────────────────────────────────────
function TestimonialCard({ t, wrapperClassName = "" }: { t: Testimonial; wrapperClassName?: string }) {
  return (
    <div 
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-xl border border-transparent p-6 break-inside-avoid mb-4 cursor-pointer select-none transition-all duration-300 ease-in

        /* Light Mode: Bright White Background with Premium Multi-Layered Soft Shadow */
        bg-card text-card-foreground
        shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]
        hover:shadow-[0_1px_1px_rgba(0,0,0,0.05),0_8px_12px_rgba(34,42,53,0.08),0_32px_80px_rgba(47,48,55,0.1),0_2px_3px_rgba(0,0,0,0.06)]

        /* Dark Mode: Translucent Slate Matte, Delicate Borders & Inset Ambient Glow */
        dark:border-[rgba(255,255,255,0.10)] 
        dark:bg-[rgba(40,40,40,0.30)] 
        dark:shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] 
        dark:hover:border-[rgba(255,255,255,0.15)] 
        dark:hover:bg-neutral-900/40
        
        ${wrapperClassName}`}
    >
      
      {/* Author Header Block */}
      <div className="flex items-center gap-3">
        {/* Avatar Profile Bubble */}
        <div
          className={`w-10 h-10 rounded-full ${t.avatarColor} flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-[inset_0_1px_2px_rgba(0,0,0,0.15)]`}
        >
          {t.initials}
        </div>

        {/* Name Identity Details */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[13.5px] font-bold text-foreground dark:text-neutral-200 truncate font-sans tracking-tight">
              {t.name}
            </span>
            <VerifiedBadge />
          </div>
          <span className="text-xs font-normal text-muted-foreground dark:text-neutral-300 truncate mt-0.5">
            {t.handle}
          </span>
        </div>

        {/* Tag chip alignment boundary */}
        {t.tag && (
          <span className="ml-auto shrink-0 text-[9px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded-md bg-muted text-muted-foreground dark:bg-neutral-800">
            {t.tag}
          </span>
        )}
      </div>

      {/* Primary Quote Workspace Text */}
      <p className="text-[14px] text-muted-foreground dark:text-white leading-relaxed font-sans font-normal tracking-normal whitespace-pre-wrap">
        {t.text}
      </p>
    </div>
  );
}
// ── Main Layout Canvas Grid ──────────────────────────────────────────────────
export default function Testimonials() {
  return (
    <section className="relative left-1/2 -translate-x-1/2 w-screen bg-gray-50 dark:bg-background py-28 sm:py-32 overflow-hidden border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
      {/* Premium Minimal Backdrop Glow */}
      <div className="pointer-events-none absolute inset-0 flex items-start justify-center overflow-hidden">
        <div className="w-[70rem] h-[35rem] rounded-full bg-background dark:bg-background/20 blur-3xl -translate-y-1/3" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center gap-16">

        {/* Global Content Header Group */}
        <div className="flex flex-col items-center gap-2 text-center max-w-xl">
          <h2 className="text-3xl sm:text-[40px] font-semibold tracking-tight text-foreground dark:text-foreground font-display leading-tight">
            Feedback & Collaborations
          </h2>
          <p className="text-sm sm:text-base tracking-tight leading-tight text-slate-500 dark:text-slate-400 font-display font-light max-w-md">
            Grateful for the opportunity to work with amazing people on open-source tools, design systems, and web projects. Here is what they thought of our time together.
          </p>
        </div>

        {/* Authentic Multi-Column Masonry Matrix */}
        <div className="w-full columns-1 sm:columns-2 lg:columns-4 gap-4 space-y-4">
          {columns.flat().map((t, i) => (
            <div key={i} className={i >= 3 ? "hidden sm:block" : ""}>
              <TestimonialCard t={t} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}