import React from "react";
import { db } from "@repo/database";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiBookOpen } from "react-icons/fi";

export const dynamic = "force-dynamic";
export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="relative flex flex-col gap-10 pt-10 pb-24 font-sans antialiased text-foreground max-w-5xl mx-auto w-full px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-foreground font-display">
          All Projects
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          A comprehensive list of my work, experiments, and open source contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project: any) => (
          <div key={project.id} className="group relative flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md border border-border shadow-sm hover:shadow-xl hover:border-sky-500/30 transition-all duration-300">
            {project.imageUrl && (
              <div className="relative w-full aspect-video overflow-hidden border-b border-border">
                <img src={project.imageUrl} alt={project.title} className="object-cover w-full h-full transition-transform duration-500" />
              </div>
            )}
            
            <div className="flex flex-col p-6 flex-1">
              <h3 className="text-xl font-bold font-display mb-2">{project.title}</h3>
              <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3">{project.description}</p>
              
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag: any) => (
                    <span key={tag} className="px-2 py-1 bg-slate-500/10 text-slate-600 dark:text-slate-400 text-[10px] font-mono rounded-md font-semibold">{tag}</span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-600 transition-colors">
                    <FiExternalLink /> Live
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-foreground transition-colors">
                    <FiGithub /> Source
                  </a>
                )}
                {project.blogPostId && (
                  <Link href={`/blogs/${project.blogPostId}`} className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors">
                    <FiBookOpen /> Case Study
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {projects.length === 0 && (
        <div className="py-20 text-center text-slate-500 border border-border rounded-2xl border-dashed">
          No projects found. Check back later!
        </div>
      )}
    </div>
  );
}
