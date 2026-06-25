import React from "react";
import { Skeleton } from "../../components/skeleton";

function ProjectCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-card/45 backdrop-blur-md border border-border shadow-sm">
      <Skeleton className="w-full aspect-video rounded-none" />
      <div className="flex flex-col p-6 flex-1 gap-4">
        <Skeleton className="w-3/4 h-6 rounded-md" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-full h-3" />
          <Skeleton className="w-2/3 h-3" />
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Skeleton className="w-12 h-5 rounded-md" />
          <Skeleton className="w-16 h-5 rounded-md" />
          <Skeleton className="w-10 h-5 rounded-md" />
        </div>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/40">
          <Skeleton className="w-14 h-4" />
          <Skeleton className="w-14 h-4" />
          <Skeleton className="ml-auto w-20 h-4" />
        </div>
      </div>
    </div>
  );
}

export default function Loading() {
  return (
    <div className="relative flex flex-col gap-10 pt-10 pb-24 font-sans antialiased text-foreground max-w-5xl mx-auto w-full px-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground font-display">
          All Projects
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl">
          A comprehensive list of my work, experiments, and open source contributions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </div>
  );
}
