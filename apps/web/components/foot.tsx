import React from "react";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import type { IconType } from "react-icons";

// ── Types ─────────────────────────────────────────────────────────────────────

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

interface SocialLink {
  label: string;
  href: string;
  icon: IconType;
  external?: boolean;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const footerLinks: FooterColumn[] = [
  {
    heading: "Navigate",
    links: [
      { label: "Home", href: "/" },
      { label: "Blogs", href: "/blogs" },
      { label: "Projects", href: "/projects" },
      { label: "Services", href: "/Services" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/Crown003", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/crown003", external: true },
      { label: "Twitter / X", href: "https://x.com/Harshit003_", external: true },
      { label: "Email", href: "mailto:harshittiwari4u@gmail.com", external: true },
    ],
  },
  {
    heading: "More",
    links: [
      { label: "About Me", href: "/about" },
      { label: "Resume", href: "/resume" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
];

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/Crown003",
    icon: FaGithub,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/crown003",
    icon: FaLinkedin,
    external: true,
  },
  {
    label: "Twitter / X",
    href: "https://x.com/Harshit003_",
    icon: FaXTwitter,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:harshittiwari4u@gmail.com",
    icon: MdEmail,
    external: false,
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

const SocialIcons = () => (
  <div className="flex items-center gap-3">
    {socialLinks.map(({ label, href, icon: Icon, external }) => (
      <a
        key={label}
        href={href}
        aria-label={label}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-sky-500/50 hover:bg-sky-500/5 text-muted-foreground hover:text-foreground transition-all duration-200"
      >
        <Icon className="w-3.5 h-3.5" />
      </a>
    ))}
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

const Foot = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full h-full flex flex-col justify-between px-6 py-12 sm:px-8 sm:py-16 max-w-7xl mx-auto min-h-[60vh]">

      {/* ── Top Row: Brand + Nav columns ── */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16 flex-1">

        {/* Brand block */}
        <div className="flex flex-col gap-4 min-w-[180px] max-w-[280px]">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-foreground font-display hover:text-[oklch(62.3%_0.214_259.815)] transition-colors duration-200 w-fit"
          >
            Crown
          </Link>
          <p className="text-xs text-muted-foreground leading-relaxed font-sans">
            Full-Stack Engineer crafting reliable applications, scalable
            infrastructure, and polished user experiences.
          </p>
          <SocialIcons />
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Navigation columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12">
          {footerLinks.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground/70 select-none">
                {col.heading}
              </span>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 font-normal leading-none"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-150 font-normal leading-none"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="mt-8 mb-5 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

      {/* ── Bottom Row: Copyright + badge ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="text-[11px] text-muted-foreground/70 font-sans select-none">
          &copy; {currentYear}{" "}
          <span className="text-muted-foreground font-medium">Harshit Tiwari</span>
          {" "}· All rights reserved.
        </p>
        <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground/50 select-none font-sans">
          <span>· Design Inspired by <a className="text-muted-foreground font-medium underline" href="https://ui.aceternity.com/" target="_blank" rel="noreferrer">Aceternity UI</a></span>
        </div>
      </div>
    </div>
  );
};

export default Foot;
