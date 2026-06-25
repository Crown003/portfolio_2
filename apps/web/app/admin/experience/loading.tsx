import React from "react";
import { Skeleton } from "../../../components/skeleton";

export default function Loading() {
  return (
    <div className="flex-1 w-full flex flex-col gap-8 p-6 md:p-10 pt-24 max-w-7xl mx-auto">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
          Experience Management
        </h1>
        <p className="text-muted-foreground">
          Manage your professional timeline. You can add, edit, or delete experience entries here.
        </p>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto p-4 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Existing Experiences</h2>
          <Skeleton className="w-40 h-10 rounded-lg" />
        </div>

        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 border border-border rounded-lg bg-card flex justify-between items-center h-20">
              <div className="flex flex-col gap-2 w-full max-w-[200px]">
                <Skeleton className="w-full h-5 rounded" />
                <Skeleton className="w-2/3 h-4 rounded" />
              </div>
              <div className="flex gap-2">
                <Skeleton className="w-12 h-8 rounded" />
                <Skeleton className="w-16 h-8 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
