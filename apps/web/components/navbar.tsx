"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

// Scalable Links Array Structure
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "Services", href: "/Services" },
];

// Hamburger Icon Component with animated paths
const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2.5"
    stroke="currentColor"
    strokeLinecap="round"
    {...props}
  />
);

const MenuToggle = ({ toggle, isOpen }: { toggle: () => void; isOpen: boolean }) => (
  <button
    onClick={toggle}
    className="p-2.5 rounded-xl border border-border md:hidden flex items-center justify-center hover:bg-muted/40 transition-colors cursor-pointer text-foreground"
    aria-label="Toggle Menu"
  >
    <svg width="18" height="18" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: "M 2 2.5 L 20 2.5" },
          open: { d: "M 3 16.5 L 17 2.5" }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.2 }}
      />
      <Path
        variants={{
          closed: { d: "M 2 16.346 L 20 16.346" },
          open: { d: "M 3 2.5 L 17 16.346" }
        }}
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3 }}
      />
    </svg>
  </button>
);

export default function Navbar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Track scroll position to trigger floating morph
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) {
      setIsStuck(true);
    } else {
      setIsStuck(false);
    }
  });

  // useEffect only runs on client-side, preventing hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsStuck(window.scrollY > 30);
  }, []);

  const toggleTheme = () => {
    const isDark = resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    if (!(document as any).startViewTransition || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheme(nextTheme);
      return;
    }

    const transition = (document as any).startViewTransition(() => {
      setTheme(nextTheme);
    });

    transition.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: ["inset(0 0 100% 0)", "inset(0 0 0 0)"],
        },
        {
          duration: 400,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        }
      );
    });
  };

  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Stagger animation definitions
  const menuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      display: "flex",
      transition: {
        height: { duration: 0.4, ease: "easeOut" },
        staggerChildren: 0.08,
        delayChildren: 0.1
      }
    },
    closed: {
      opacity: 0,
      height: 0,
      transitionEnd: {
        display: "none"
      },
      transition: {
        height: { duration: 0.3, ease: "easeIn" },
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const linkVariants = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 }
      }
    },
    closed: {
      y: -20,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full flex justify-center">
      <motion.nav
        initial={false}
        animate={{
          width: "100%",
          maxWidth: "80rem",
          y: isStuck ? 8 : 0,
          borderRadius: "0.75rem",
          boxShadow: isStuck
            ? isDark
              ? "0 10px 30px -10px rgba(0, 0, 0, 0.5)"
              : "0 10px 30px rgba(0, 0, 0, 0.08)"
            : isDark
              ? "0 10px 30px -10px rgba(0, 0, 0, 0)"
              : "0 10px 30px rgba(0, 0, 0, 0)",
        }}
        transition={{
          default: {
            type: "spring",
            stiffness: 280,
            damping: 30,
          },
          boxShadow: {
            type: "tween",
            duration: 0.3,
            ease: "easeInOut",
          },
        }}
        className={`w-full flex flex-col justify-center px-6 backdrop-blur-md transition-colors duration-300 border-border
          ${isStuck
            ? "border bg-card/85"
            : "border-b bg-card/85"
          }
        `}
      >
        {/* Main Navbar Row */}
        <div className="w-full flex items-center justify-between h-16">
          {/* Logo with sharp edge Space Grotesk font */}
          <div className="flex items-center gap-2">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display hover:text-black dark:hover:text-white transition-colors"
            >
              Crown
            </Link>
          </div>

          {/* Desktop Nav Links with rounded hover highlight */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs sm:text-sm font-normal text-muted-foreground hover:text-foreground px-4 py-2 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions & Hamburger Toggle */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:p-2.5 rounded-xl border border-border hover:bg-muted/40 transition-colors cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDark ? (
                // Sun Icon
                <svg className="w-4 h-4 fill-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z" />
                </svg>
              ) : (
                // Moon Icon
                <svg className="w-4 h-4 fill-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10C2.2 6.8 6.4 2.5 11.7 2c.6 0 1 .4.9 1-.1.5-.5.9-1 .9-3.9.5-6.8 3.9-6.8 7.9 0 4.4 3.6 8 8 8 3.5 0 6.6-2.3 7.6-5.6.2-.5.7-.8 1.2-.7.5.1.8.6.7 1.1-.9 4.3-4.8 7.3-9.4 7.3z" />
                </svg>
              )}
            </button>

            {/* Desktop Action: Single Login Button */}
            <Link
              href="/signin"
              className="hidden md:inline-block btn-gradient-interactive text-xs sm:text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Login
            </Link>

            {/* Hamburger Toggle (Mobile/Tablet only) */}
            <MenuToggle toggle={() => setIsOpen(!isOpen)} isOpen={isOpen} />
          </div>
        </div>

        {/* Mobile Dropdown Panel */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="overflow-hidden w-full flex flex-col gap-2 pb-6 pt-3 border-t border-border/40 md:hidden"
            >
              {navLinks.map((link) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-semibold text-muted-foreground hover:text-foreground px-4 py-2.5 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all duration-200 block"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Actions Drawer */}
              <motion.div
                variants={linkVariants}
                className="flex flex-col mt-4 pt-4 border-t border-border/40"
              >
                <Link
                  href="/signin"
                  onClick={() => setIsOpen(false)}
                  className="btn-gradient-interactive text-sm font-semibold text-white text-center py-2.5 rounded-xl shadow-xs"
                >
                  Login
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
