"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBookOpen, FiBriefcase, FiMessageSquare, FiHome } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Blogs", href: "/admin/blogs", icon: FiBookOpen },
    { name: "Projects", href: "/admin/projects", icon: FiBriefcase },
    { name: "Messages", href: "/admin/messages", icon: FiMessageSquare },
  ];

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <Link href="/" className="flex items-center gap-2 text-foreground font-display font-bold text-lg">
            <FiHome className="text-sky-500" />
            <span>Admin Portal</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-sky-500/10 text-sky-600 dark:text-sky-400 font-bold"
                    : "text-slate-500 hover:text-foreground hover:bg-slate-500/5"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "text-sky-500" : ""}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-slate-50/50 dark:bg-background/50">
        <div className="p-4 sm:p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
