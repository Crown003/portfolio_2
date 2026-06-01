import React, { ReactNode } from "react";

interface ContactButtonProps {
  href: string;
  children: ReactNode;
  primary?: boolean;
  download?: boolean;
}

export const ContactButton = ({ href, children, primary, download }: ContactButtonProps) => {
  const isPrimary = !!primary;

  return (
    <a
      href={href}
      target={download ? undefined : "_blank"}
      rel={download ? undefined : "noreferrer"}
      download={download}
      className={`inline-flex items-center gap-1.5 border px-3.5 py-2 rounded-lg font-bold text-[11px] transition-all duration-200 cursor-pointer active:scale-97 select-none ${
        isPrimary
          ? "border-slate-800 bg-slate-900 text-white dark:border-slate-200 dark:bg-slate-100 dark:text-black hover:opacity-90"
          : "border-border bg-slate-100/50 hover:bg-slate-100 dark:bg-slate-900/50 dark:hover:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-foreground"
      }`}
    >
      {children}
    </a>
  );
};
