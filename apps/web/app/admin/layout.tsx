"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBookOpen, FiBriefcase, FiMessageSquare, FiHome, FiSettings, FiMenu, FiX } from "react-icons/fi";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { name: "Blogs", href: "/admin/blogs", icon: FiBookOpen },
    { name: "Projects", href: "/admin/projects", icon: FiBriefcase },
    { name: "Experience", href: "/admin/experience", icon: FiBriefcase },
    { name: "Messages", href: "/admin/messages", icon: FiMessageSquare },
  ];

  return (
    <div className="flex flex-col md:flex-row h-full min-h-[calc(100vh-80px)] w-full">
      {/* Mobile Admin Header (Only visible when sidebar is closed) */}
      {!isSidebarOpen && (
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-sm sticky top-[72px] z-30 shrink-0">
          <div className="flex items-center gap-2 text-foreground font-display font-bold text-lg">
            <FiSettings className="text-sky-500" />
            <span>Admin Portal</span>
          </div>
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-slate-500 hover:text-foreground">
            <FiMenu size={24} />
          </button>
        </div>
      )}

      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-[80] bg-black/60 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 bottom-0 left-0 z-[90] w-64 border-r border-border bg-card flex flex-col shrink-0 transform transition-transform duration-300 ease-out md:translate-x-0 md:static md:h-auto md:z-0 md:sticky md:top-[88px] md:self-start md:min-h-[calc(100vh-100px)] ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}>
        {/* Mobile sidebar header with close button */}
        <div className="flex items-center justify-between p-4 border-b border-border md:hidden bg-card mt-[72px]">
          <Link href="/admin/blogs" className="flex items-center gap-2 text-foreground font-display font-bold text-lg">
            <FiSettings className="text-sky-500" />
            <span>Admin Portal</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-500 hover:text-foreground bg-slate-100 dark:bg-slate-800 rounded-lg">
            <FiX size={20} />
          </button>
        </div>
        {/* Desktop sidebar header */}
        <div className="p-6 border-b border-border hidden md:flex">
          <Link href="/admin/blogs" className="flex items-center gap-2 text-foreground font-display font-bold text-lg">
            <FiSettings className="text-sky-500" />
            <span>Admin Portal</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
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
      <main className="flex-1 w-full overflow-y-auto bg-slate-50/50 dark:bg-background/50 md:rounded-tl-2xl">
        <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>
    </div>
  );
}
