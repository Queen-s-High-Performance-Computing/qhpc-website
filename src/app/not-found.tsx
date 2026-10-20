import Link from "next/link";
import { Terminal } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20 px-4">
      <div className="max-w-md w-full">
        {/* Terminal Window */}
        <div className="rounded-xl overflow-hidden bg-[#0A0A0A] border border-border flex flex-col shadow-2xl">
          {/* Header */}
          <div className="flex items-center gap-2 px-4 py-3 bg-[#1A1A1A] border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-text-muted">qhpc@cluster ~ not-found</span>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 font-mono text-sm sm:text-base leading-relaxed space-y-4">
            <div className="flex items-center gap-2 text-red-400">
              <Terminal size={18} />
              <span>[ERROR] 404: Node offline.</span>
            </div>
            
            <p className="text-text-secondary">
              User &apos;guest&apos; attempted to access an invalid directory. 
              The requested path could not be found on this cluster.
            </p>

            <div className="pt-4 border-t border-border/50">
              <p className="text-text-muted mb-4">Suggested actions:</p>
              
              <Link 
                href="/"
                className="inline-flex text-primary hover:text-terminal-green transition-colors"
              >
                <span className="mr-2 text-terminal-green">$</span> cd ~/home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
