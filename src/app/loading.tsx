export default function Loading() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Simple typing animation spinner */}
        <div className="text-primary font-mono text-xl flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
          <span className="animate-pulse">_</span>
        </div>
        <p className="text-sm font-mono text-text-muted animate-pulse">
          Loading node processes...
        </p>
      </div>
    </div>
  );
}
