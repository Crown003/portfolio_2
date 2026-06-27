import React from "react";
import Dashboard from "../components/dashboard";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import HeroBackground from "../components/hero-background";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import Testimonials from "../components/testimonials";
import dynamic from "next/dynamic";
import { getExperiences, seedExperiences } from "./actions/experience";

const Experience = dynamic(() => import("../components/experience"));
const TechStack = dynamic(() => import("../components/tech-stack"));
import { db } from "@repo/database";

export default async function Home() {
  // Ensure experiences are seeded
  await seedExperiences();

  const featuredProjects = await db.project.findMany({
    where: { showOnHomepage: true },
    orderBy: { createdAt: "desc" }
  });

  const experiencesData = await getExperiences();

  const posProject = featuredProjects.find(p => p.title.toLowerCase().includes("pos"));
  const kdProject = featuredProjects.find(p => p.title.toLowerCase().includes("kd") || p.title.toLowerCase().includes("home"));
  const otherProjects = featuredProjects.filter(p => p.id !== posProject?.id && p.id !== kdProject?.id);

  return (
    <div className="relative flex flex-col pt-6 sm:pt-10 pb-0 font-sans antialiased text-foreground">
      <HeroBackground />

      {/* Hero Content Section */}
      <div className="flex flex-col items-start text-left gap-5 md:gap-7 max-w-3xl px-1">
        {/* Added mb-2 for mobile, resets to whatever your original layout needed on larger screens if necessary */}
        <div className="rotating-chip-container mb-2 sm:mb-4">
          <div className="rotating-chip-glow" />
          <div className="relative z-10 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-card text-xs font-semibold text-slate-600 dark:text-slate-400 select-none">
            <span>Open for freelance projects</span>
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
          <Link
            href="/projects"
            className="inline-flex justify-center w-full max-w-full md:w-fit items-center gap-1.5 bg-slate-900  hover:opacity-90 px-5 py-2.5 rounded-lg font-bold text-sm select-none text-white shadow-[0px_0px_10px_0px_rgba(255,255,255,0.2)_inset] ring ring-white/20 ring-offset-2 ring-offset-neutral-900 transition-all duration-200 ring-inset hover:shadow-[0px_0px_20px_0px_rgba(255,255,255,0.4)_inset] hover:ring-white/40 active:scale-98 dark:bg-white dark:text-black dark:shadow-[0px_0px_10px_0px_rgba(0,0,0,0.2)_inset] dark:ring-black/20 dark:ring-offset-white dark:hover:shadow-[0px_0px_20px_0px_rgba(0,0,0,0.3)_inset] dark:hover:ring-black/50"
          >
            <span>Explore My Works</span>
            <span className="text-xs">→</span>
          </Link>

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
      <Experience experiences={experiencesData as any} />

      {/* Gridline Project Showcase Section */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen bg-background shadow-[0_8px_40px_-8px_rgba(0,0,0,0.06)_inset] dark:shadow-[0_12px_60px_-12px_rgba(0,0,0,0.7)_inset] border-t border-dashed border-slate-200/80 dark:border-slate-800/80">
        {/* Diagonal stroke bg across the ENTIRE section */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[repeating-linear-gradient(45deg,rgb(0_0_0/0.03)_0,rgb(0_0_0/0.03)_1px,transparent_1px,transparent_0.5rem)] dark:bg-[repeating-linear-gradient(45deg,rgb(255_255_255/0.03)_0,rgb(255_255_255/0.03)_1px,transparent_1px,transparent_0.5rem)]" />

        {/* Full screen width content wrapper */}
        <div className="w-full flex flex-col relative z-10">
          {/* Header Row */}
          <div className="w-[95%] max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 py-12 sm:py-32 md:py-28">
            <div className="flex flex-col gap-1.5 sm:gap-3 max-w-xl">
              <h2 className="text-2xl text-balance sm:text-3xl font-semibold tracking-tight text-foreground font-display leading-[1.1]">
                Transforming concepts into{" "}
                <span className="bg-gradient-to-r from-blue-500 via-blue-500 via-55% to-purple-500 text-transparent bg-clip-text">
                  functional applications
                </span>
                .
              </h2>
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

          {/* Bento Grid */}
          <div className="w-full max-w-[100rem] mx-auto">
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-y border-dashed border-slate-200/80 dark:border-slate-800/80">

              {/* Cell 1: POS System (1 col) */}
              <div className="p-6 md:p-8 border-b md:border-r lg:border-r border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col group/card">
                <div
                  className="w-full h-full relative flex flex-col rounded-2xl overflow-hidden sm:min-h-[310px] bg-slate-50 dark:bg-slate-900 shadow-sm shadow-slate-100 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-xl hover:shadow-emerald-500/5 dark:hover:shadow-emerald-500/5 hover:ring-emerald-500/40 dark:hover:ring-emerald-500/40 transition-all duration-300"
                >
                  <form action={async () => { "use server"; redirect("/projects/pos-system"); }} className="absolute inset-0 z-[3]">
                    <button type="submit" className="w-full h-full opacity-0 cursor-pointer" aria-label="View POS System" />
                  </form>

                  {/* MOBILE LAYOUT */}
                  <div className="flex flex-col sm:hidden">
                    <div className="relative w-full aspect-[4/3] overflow-hidden">
                      <Image src="/pos-system.jpg" alt="POS System for Stalls & Small Businesses" fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, 50vw" />
                      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-slate-900 dark:via-slate-900/80 dark:to-transparent" />
                      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.15)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.4)_100%)] pointer-events-none" />
                    </div>
                    <div className="flex flex-col gap-3 px-5 pb-6 -mt-6 relative z-[1]">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h4 className="text-lg font-bold text-slate-900 dark:text-white font-display group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors duration-300">POS System</h4>
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 ring-1 ring-emerald-500/20 dark:ring-emerald-500/25">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                          <span className="text-[7px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Live</span>
                        </span>
                        {posProject?.blogPostId && (
                          <Link href={`/blogs/${posProject.blogPostId}`} className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500 text-white rounded-md text-[10px] font-bold hover:bg-emerald-600 transition-colors shadow-sm z-[4] relative">
                            <FiBookOpen /> Case Study
                          </Link>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium">Smart billing & checkout system for stalls and small businesses. Serving 2 businesses in NCR.</p>
                      <div className="flex items-center gap-2 flex-wrap pt-2 pointer-events-auto">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-700/50">Flutter</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-700/50">Firebase</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800/50 ring-1 ring-slate-200 dark:ring-slate-700/50">Android</span>
                      </div>
                    </div>
                  </div>

                  {/* DESKTOP LAYOUT */}
                  <div className="hidden sm:flex flex-col h-full min-h-[310px]">
                    <Image src="/pos-system.jpg" alt="POS System for Stalls & Small Businesses" fill className="object-cover object-center" sizes="(max-width: 640px) 100vw, 50vw" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.22)_100%)] dark:bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)] z-[1] pointer-events-none" />
                    <div className="absolute top-0 left-0 w-[60%] h-[68%] bg-white dark:bg-slate-950 z-[2] transition-colors duration-300 clip-pos-vignette" />
                    <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white/95 via-white/70 to-transparent dark:from-slate-950/95 dark:via-slate-950/70 dark:to-transparent z-[2] pointer-events-none" />
                    <div className="flex flex-col relative z-10 h-full justify-between p-6 pointer-events-none">
                      <div className="flex flex-col gap-2.5 max-w-[45%] pointer-events-none">
                        <div className="flex items-center gap-2.5">
                          <h4 className="text-base font-bold text-slate-900 dark:text-white font-display group-hover/card:text-emerald-600 dark:group-hover/card:text-emerald-400 transition-colors duration-300">POS System</h4>
                          <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 ring-1 ring-emerald-500/20 dark:ring-emerald-500/25">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                            <span className="text-[7px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Live</span>
                          </span>
                          {posProject?.blogPostId && (
                            <Link href={`/blogs/${posProject.blogPostId}`} className="pointer-events-auto ml-2 flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500 text-white rounded-md text-[10px] font-bold hover:bg-emerald-600 transition-colors shadow-sm">
                              <FiBookOpen /> Case Study
                            </Link>
                          )}
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 group-hover/card:text-slate-900 group-hover/card:dark:text-slate-100 transition-colors duration-300 leading-relaxed font-sans font-medium">Smart billing & checkout system for stalls and small businesses. Serving 2 businesses in NCR.</p>
                      </div>
                      <div className="w-full overflow-x-auto no-scrollbar mt-auto pt-6 pointer-events-auto">
                        <div className="flex items-center gap-2 whitespace-nowrap">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">Flutter</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">Firebase</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">Android</span>
                          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-white/95 dark:bg-slate-900/95 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 active:scale-95 hover:ring-slate-300 dark:hover:ring-slate-700 cursor-pointer">Closed Source</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cell 2: KD Home Tutorial Live Iframe (2 cols) */}
              <div className="p-6 md:p-8 lg:col-span-2 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col">
                <div
                  className="w-full h-full relative group flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md border border-slate-200/50 dark:border-slate-800/50 shadow-sm shadow-slate-100 dark:shadow-none hover:shadow-xl hover:shadow-amber-500/5 dark:hover:shadow-amber-500/5 hover:ring-1 hover:ring-amber-500/30 transition-all duration-300"
                >
                  <form action={async () => { "use server"; redirect("https://www.kdhometutorial.in/"); }} className="absolute inset-0 z-[3]">
                    <button type="submit" className="w-full h-full opacity-0 cursor-pointer" aria-label="View KD Home Tutorial" />
                  </form>
                  <div className="w-full h-full flex flex-col overflow-hidden">
                    <div className="h-9 border-b border-border/80 bg-slate-100/50 dark:bg-slate-900/50 backdrop-blur-sm flex items-center justify-between px-4 select-none shrink-0 relative z-10 pointer-events-none">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#ff5f56]/90" />
                        <span className="w-2 h-2 rounded-full bg-[#ffbd2e]/90" />
                        <span className="w-2 h-2 rounded-full bg-[#27c93f]/90" />
                      </div>
                      <div className="flex items-center gap-1 bg-slate-200/50 dark:bg-slate-800/50 px-3 py-0.5 rounded-md text-[8px] text-slate-500 dark:text-slate-400 font-mono w-40 justify-center border border-border/40">
                        <span>🔒</span>
                        <span>kdhometutorial.in</span>
                      </div>
                      {kdProject?.blogPostId ? (
                        <Link href={`/blogs/${kdProject.blogPostId}`} className="pointer-events-auto flex items-center gap-1.5 px-2 py-1 bg-emerald-500 text-white rounded-md text-[9px] font-bold hover:bg-emerald-600 transition-colors shadow-sm">
                          <FiBookOpen /> Case Study
                        </Link>
                      ) : (
                        <div className="w-10 h-2" />
                      )}
                    </div>
                    <div className="w-full h-[320px] sm:h-[350px] md:h-[400px] bg-white relative overflow-hidden">
                      <iframe
                        src="https://www.kdhometutorial.in/"
                        className="absolute top-0 left-0 w-[300%] sm:w-[200%] md:w-[125%] h-[300%] sm:h-[200%] md:h-[125%] border-none select-none pointer-events-none origin-top-left scale-[0.3333] sm:scale-50 md:scale-80 overflow-hidden"
                        title="KD Home Tutorial Live Website"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Featured Projects — alternating 2-1 / 1-2 pattern to fill rows */}
              {otherProjects.map((project: any, i: number) => {
                // Row pattern: even rows = [2col, 1col], odd rows = [1col, 2col]
                const posInRow = i % 2;
                const rowIndex = Math.floor(i / 2);
                const isWide = (rowIndex % 2 === 0) ? posInRow === 0 : posInRow === 1;

                return (
                  <div
                    key={project.id}
                    className={`p-6 md:p-8 border-b border-dashed border-slate-200/80 dark:border-slate-800/80 flex flex-col group/card
                      ${isWide ? 'lg:col-span-2 md:col-span-2' : 'lg:col-span-1 md:col-span-1'}
                      [&:not(:last-child)]:border-r-0 md:[&:nth-child(odd)]:border-r md:border-r border-r-0 lg:border-r
                    `}
                  >
                    <div className="w-full h-full relative flex flex-col rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 shadow-sm shadow-slate-100 dark:shadow-none ring-1 ring-slate-200/50 dark:ring-slate-800/50 hover:shadow-xl hover:shadow-sky-500/10 dark:hover:shadow-sky-500/10 hover:ring-sky-500/40 dark:hover:ring-sky-500/40 transition-all duration-300">
                      <form action={async () => { "use server"; redirect(project.slug ? `/projects/${project.slug}` : `/projects`); }} className="absolute inset-0 z-[3]">
                        <button type="submit" className="w-full h-full opacity-0 cursor-pointer" aria-label={`View ${project.title}`} />
                      </form>

                      {/* Image */}
                      <div className="relative w-full aspect-video overflow-hidden bg-card">
                        {project.imageUrl ? (
                          <Image
                            src={project.imageUrl}
                            alt={project.title}
                            fill
                            className="object-contain"
                            sizes={isWide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-slate-400 dark:text-slate-600 font-display font-medium text-base">No Preview</span>
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex flex-col gap-2.5 p-5 md:p-6 flex-grow">
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <h4 className="text-base md:text-lg font-bold text-slate-900 dark:text-white font-display group-hover/card:text-sky-500 transition-colors duration-300">
                            {project.title}
                          </h4>
                          {project.liveUrl && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 ring-1 ring-emerald-500/20 dark:ring-emerald-500/25">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                              <span className="text-[7px] font-mono font-bold text-emerald-700 dark:text-emerald-300 uppercase tracking-wider">Live</span>
                            </span>
                          )}
                          {project.blogPostId && (
                            <Link href={`/blogs/${project.blogPostId}`} className="pointer-events-auto flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500 text-white rounded-md text-[10px] font-bold hover:bg-emerald-600 transition-colors shadow-sm z-[4] relative">
                              <FiBookOpen /> Case Study
                            </Link>
                          )}
                        </div>
                        <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans font-medium line-clamp-2">
                          {project.description}
                        </p>
                        {project.tags && project.tags.length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-1 mt-auto">
                            {project.tags.slice(0, 4).map((tag: string) => (
                              <span key={tag} className="px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/60 ring-1 ring-slate-200 dark:ring-slate-700/50">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </div>

      <TechStack />

      {/* <Testimonials /> */}
    </div>
  );
}
