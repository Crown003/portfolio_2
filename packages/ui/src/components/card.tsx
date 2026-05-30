import { type JSX } from "react";

export function Card({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children: React.ReactNode;
  href: string;
}): JSX.Element {
  return (
    <div className="bg-card text-card-foreground rounded-md ring-1 ring-border p-6 transition-all hover:shadow-lg hover:ring-primary/50">
      <a
        className={className}
        href={`${href}?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <h2 className="text-xl font-semibold mb-2">
          {title} <span className="inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
        </h2>
        <p className="text-sm text-muted-foreground">{children}</p>
      </a>
    </div>
  );
}
