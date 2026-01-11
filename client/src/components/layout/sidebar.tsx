import { GlassCard } from "@/components/ui/glass-card";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Atom, BookOpen, Calculator, Clock, GraduationCap, Home, Menu, X, FileQuestion } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const menuItems = [
  { icon: Home, label: "Início", href: "/" },
  { icon: Clock, label: "Pomodoro", href: "/pomodoro" },
  { icon: Atom, label: "Leis de Newton", href: "/newton" },
  { icon: BookOpen, label: "Termodinâmica", href: "/termodinamica" },
  { icon: Calculator, label: "Fórmulas", href: "/formulas" },
  { icon: FileQuestion, label: "Flashcards", href: "/flashcards" },
  { icon: GraduationCap, label: "Método de Estudo", href: "/metodo-estudo" },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-4 left-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg active:scale-95 transition-all md:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 h-full w-72 z-40 md:translate-x-0 transition-transform duration-300 ease-out-cubic",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <GlassCard className="h-full w-full rounded-none border-r border-white/10 bg-[#0F0F1A]/90 backdrop-blur-xl flex flex-col">
          {/* Header */}
          <div className="p-8 flex flex-col items-center border-b border-white/5">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary p-[2px] mb-4 shadow-lg shadow-primary/20">
              <div className="w-full h-full rounded-full bg-[#0F0F1A] flex items-center justify-center">
                <Atom size={40} className="text-primary animate-spin-slow" />
              </div>
            </div>
            <h1 className="text-xl font-bold text-white font-display text-center">Física Fácil Demais</h1>
            <p className="text-sm text-white/50 mt-1">Professor Julião</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
            {menuItems.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <a
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                      isActive
                        ? "bg-primary/20 text-white border border-primary/30 shadow-lg shadow-primary/10"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon
                      size={20}
                      className={cn(
                        "transition-colors",
                        isActive ? "text-secondary" : "text-white/40 group-hover:text-secondary"
                      )}
                    />
                    <span className="font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="ml-auto w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(0,240,255,0.8)]"
                      />
                    )}
                  </a>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-6 border-t border-white/5">
            <div className="text-xs text-center text-white/30">
              v1.0.0 • PWA Ready
            </div>
          </div>
        </GlassCard>
      </motion.aside>
    </>
  );
}
