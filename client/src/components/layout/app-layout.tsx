import { Sidebar } from "./sidebar";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2D1B4E] to-[#0F0F1A] text-white selection:bg-primary/30 selection:text-white">
      <Sidebar />
      <main className="md:pl-72 min-h-screen transition-all duration-300">
        <div className="container mx-auto px-4 py-8 md:py-12 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          {children}
        </div>
      </main>
    </div>
  );
}
