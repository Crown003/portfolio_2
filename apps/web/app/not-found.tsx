import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-center py-20 min-h-[50vh]">
      <span className="px-4 py-1.5 rounded-xl text-xs font-semibold tracking-wider text-blue-500 bg-blue-500/10 border border-blue-500/20 backdrop-blur-md mb-6 uppercase">
        404 - Lost in Space
      </span>
      <h1 className="text-5xl sm:text-7xl font-bold tracking-tight bg-clip-text text-linear-to-r from-foreground via-foreground/80 to-muted-foreground/60 mb-6 font-display">
        Page Not Found
      </h1>
      <p className="max-w-md text-muted-foreground mb-8">
        The page you are looking for does not exist or has been moved. Use the navigation bar above or button below to get back on track.
      </p>
      <Link
        href="/"
        className="btn-gradient-interactive text-sm font-semibold text-white px-6 py-3 rounded-xl shadow-xs hover:shadow-lg transition-all duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
}
