import React from "react";
import { db } from "@repo/database";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";
import ProjectsGrid from "../../components/projects-grid";

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="relative flex flex-col gap-10 pt-10 pb-24 font-sans antialiased text-foreground max-w-5xl mx-auto w-full px-4">
      <div className="flex flex-col gap-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-foreground mb-2 transition-colors w-fit"
        >
          <FiArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground font-display">
          All Projects
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          A comprehensive list of my work, experiments, and open source contributions.
        </p>
      </div>

      <ProjectsGrid projects={JSON.parse(JSON.stringify(projects))} />
      
      {projects.length === 0 && (
        <div className="py-20 text-center text-slate-500 border border-border rounded-2xl border-dashed">
          No projects found. Check back later!
        </div>
      )}
    </div>
  );
}
