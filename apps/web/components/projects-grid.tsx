"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiGithub, FiExternalLink, FiBookOpen } from "react-icons/fi";
import ProjectModal from "./project-modal";

interface Project {
  id: string;
  title: string;
  description: string;
  content?: string | null;
  imageUrl?: string | null;
  liveUrl?: string | null;
  githubUrl?: string | null;
  tags: string[];
  blogPostId?: string | null;
  showOnHomepage: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="group relative flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md border border-border shadow-sm hover:shadow-xl hover:border-sky-500/30 transition-all duration-300 cursor-pointer"
          >
            {project.imageUrl && (
              <div className="relative w-full aspect-video overflow-hidden border-b border-border">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <div className="flex flex-col p-6 flex-1">
              <h3 className="text-xl font-bold font-display mb-2 group-hover:text-sky-500 transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-slate-500 mb-6 flex-1 line-clamp-3">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-500/10 text-slate-600 dark:text-slate-400 text-[10px] font-mono rounded-md font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-bold text-sky-500 hover:text-sky-600 transition-colors"
                  >
                    <FiExternalLink /> Live
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-foreground transition-colors"
                  >
                    <FiGithub /> Source
                  </a>
                )}
                {project.blogPostId && (
                  <Link
                    href={`/blogs/${project.blogPostId}`}
                    onClick={(e) => e.stopPropagation()}
                    className="ml-auto flex items-center gap-1.5 text-xs font-bold text-emerald-500 hover:text-emerald-600 transition-colors"
                  >
                    <FiBookOpen /> Case Study
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
