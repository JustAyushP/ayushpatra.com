"use client";

import { useEffect } from "react";

export default function TravelPage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#0a0a0a";
    document.body.style.backgroundColor = "#0a0a0a";
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      <div className="flex flex-col items-center gap-4">
        <p className="text-white/25 text-lg tracking-[0.3em] uppercase">coming soon</p>
        <div className="flex gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "0s" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "0.3s" }} />
          <span className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </div>
  );
}
