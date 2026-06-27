"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion, useScroll, useMotionValueEvent, AnimatePresence, SVGMotionProps, LayoutGroup } from "framer-motion";
import { UserButton, useUser } from "@clerk/nextjs";

// Scalable Links Array Structure
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Blogs", href: "/blogs" },
  { label: "Projects", href: "/projects" },
  // { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const Path = (props: SVGMotionProps<SVGPathElement>) => (
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
        initial="closed"
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
        initial="closed"
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
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isStuck, setIsStuck] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const { scrollY } = useScroll();
  const { user, isLoaded, isSignedIn } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 30) {
      setIsStuck(true);
    } else {
      setIsStuck(false);
    }
  });

  useEffect(() => {
    setMounted(true);
    setIsStuck(window.scrollY > 30);
  }, []);

  const toggleTheme = () => {
    const isDark = resolvedTheme === "dark";
    const nextTheme = isDark ? "light" : "dark";

    const isMdOrLarger = window.matchMedia("(min-width: 768px)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isMdOrLarger) {
      const style = document.createElement("style");
      style.textContent = "*,*::before,*::after{transition:none!important}";
      document.head.appendChild(style);
      setTheme(nextTheme);
      requestAnimationFrame(() =>
        requestAnimationFrame(() => document.head.removeChild(style))
      );
      return;
    }

    const doc = document as any;

    if (!doc.startViewTransition || prefersReducedMotion) {
      setTheme(nextTheme);
      return;
    }

    const transition = doc.startViewTransition(() => {
      const style = document.createElement("style");
      style.textContent = "*,*::before,*::after{transition:none!important}";
      document.head.appendChild(style);

      setTheme(nextTheme);

      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (document.head.contains(style)) {
            document.head.removeChild(style);
          }
        })
      );
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
    <>
      {/* Lifted using fixed out of the standard scrolling body tree */}
      <header className="fixed top-0 left-0 right-0 z-[100] w-full flex justify-center px-4 md:px-8 pointer-events-none">
        <motion.nav
          initial={false}
          animate={{
            width: "100%",
            maxWidth: "80rem",
            y: isStuck ? 12 : 0,
            borderRadius: isStuck ? "0.75rem" : "0px",
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
          className={`w-full flex flex-col justify-center px-6 backdrop-blur-md transition-all duration-300 border-border pointer-events-auto
            ${isStuck
              ? "border bg-card/85 mt-0"
              : "border-b bg-card/85 mt-2"
            }
          `}
        >
          {/* Main Navbar Row */}
          <div className="w-full flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Link
                href="/"
                className="text-xl sm:text-2xl font-bold tracking-tight text-foreground font-display hover:text-black dark:hover:text-white transition-colors"
              >
                Crown
              </Link>
            </div>

            {/* Desktop Nav Links */}
            <LayoutGroup>
              <div className="hidden md:flex items-center gap-1" onMouseLeave={() => setHoveredPath(null)}>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onMouseEnter={() => setHoveredPath(link.href)}
                    className="relative text-xs sm:text-sm font-medium text-muted-foreground hover:text-foreground px-4 py-2 transition-colors duration-200"
                  >
                    <span className="relative z-10">{link.label}</span>
                    {hoveredPath === link.href && (
                      <motion.div
                        layoutId="navbar-hover"
                        className="absolute inset-0 bg-slate-100/70 dark:bg-slate-800/60 rounded-xl"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                      />
                    )}
                  </Link>
                ))}
              </div>
            </LayoutGroup>

            {/* Actions & Hamburger Toggle */}
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 sm:p-2.5 rounded-xl border border-border hover:bg-muted/40 transition-colors cursor-pointer"
                aria-label="Toggle Theme"
              >
                {isDark ? (
                  <svg className="w-4 h-4 fill-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41zm-12.37 12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-foreground" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10C2.2 6.8 6.4 2.5 11.7 2c.6 0 1 .4.9 1-.1.5-.5.9-1 .9-3.9.5-6.8 3.9-6.8 7.9 0 4.4 3.6 8 8 8 3.5 0 6.6-2.3 7.6-5.6.2-.5.7-.8 1.2-.7.5.1.8.6.7 1.1-.9 4.3-4.8 7.3-9.4 7.3z" />
                  </svg>
                )}
              </button>

              {!isLoaded ? (
                <div className="hidden md:flex items-center gap-2">
                  <div className="w-16 h-9 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl" />
                  <div className="w-20 h-9 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl" />
                </div>
              ) : !isSignedIn ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link
                    href="/sign-in"
                    className="text-xs sm:text-sm font-semibold text-foreground px-4 py-2.5 rounded-xl border border-border hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all duration-300 cursor-pointer"
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="btn-gradient-interactive text-xs sm:text-sm font-semibold text-white px-5 py-2.5 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    Sign Up
                  </Link>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-3">
                  {isAdmin && (
                    <Link
                      href="/admin"
                      className="text-xs sm:text-sm font-semibold text-foreground px-4 py-2 rounded-xl border border-border hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-all duration-300 cursor-pointer"
                    >
                      Admin
                    </Link>
                  )}
                  <div className="h-8 w-8 flex items-center justify-center rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden ring-2 ring-border">
                    <UserButton appearance={{ elements: { userButtonAvatarBox: "w-8 h-8" } }} />
                  </div>
                </div>
              )}

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

                <motion.div
                  variants={linkVariants}
                  className="flex flex-col gap-2 mt-4 pt-4 border-t border-border/40"
                >
                  {!isLoaded ? (
                    <>
                      <div className="w-full h-10 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl" />
                      <div className="w-full h-10 animate-pulse bg-slate-200 dark:bg-slate-800 rounded-xl" />
                    </>
                  ) : !isSignedIn ? (
                    <>
                      <Link
                        href="/sign-in"
                        onClick={() => setIsOpen(false)}
                        className="text-sm font-semibold text-foreground text-center py-2.5 rounded-xl border border-border hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                      >
                        Login
                      </Link>
                      <Link
                        href="/sign-up"
                        onClick={() => setIsOpen(false)}
                        className="btn-gradient-interactive text-sm font-semibold text-white text-center py-2.5 rounded-xl shadow-xs"
                      >
                        Sign Up
                      </Link>
                    </>
                  ) : (
                    <>
                      {isAdmin && (
                        <Link
                          href="/admin"
                          onClick={() => setIsOpen(false)}
                          className="text-sm font-semibold text-foreground text-center py-2.5 rounded-xl border border-border hover:bg-slate-100/70 dark:hover:bg-slate-800/60"
                        >
                          Admin Panel
                        </Link>
                      )}
                      <div className="flex justify-center pt-2 pb-2">
                        <UserButton />
                      </div>
                    </>
                  )}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </header>
      {/* Layout offset preservation spacer */}
      <div className={`w-full shrink-0 transition-all duration-300 ${isStuck ? "h-[76px]" : "h-[72px]"}`} />
    </>
  );
}