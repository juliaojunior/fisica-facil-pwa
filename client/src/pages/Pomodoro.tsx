import { AppLayout } from "@/components/layout/app-layout";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Play, Pause, RotateCcw, Coffee, Brain } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type TimerMode = "focus" | "shortBreak" | "longBreak";

const MODES = {
  focus: { label: "Foco", minutes: 25, color: "text-primary", icon: Brain },
  shortBreak: { label: "Pausa Curta", minutes: 5, color: "text-secondary", icon: Coffee },
  longBreak: { label: "Pausa Longa", minutes: 15, color: "text-green-400", icon: Coffee },
};

export default function Pomodoro() {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentMode = MODES[mode];
  const progress = 100 - (timeLeft / (currentMode.minutes * 60)) * 100;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
      // Play sound here if possible
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(currentMode.minutes * 60);
  };

  const changeMode = (newMode: TimerMode) => {
    setMode(newMode);
    setIsActive(false);
    setTimeLeft(MODES[newMode].minutes * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Pomodoro Timer</h1>
          <p className="text-white/60">Mantenha o foco e gerencie seu tempo de estudo.</p>
        </div>

        <GlassCard className="p-8 md:p-12 relative overflow-hidden">
          {/* Background Glow */}
          <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] -z-10 transition-colors duration-700",
            mode === "focus" ? "bg-primary/20" : mode === "shortBreak" ? "bg-secondary/20" : "bg-green-500/20"
          )} />

          {/* Mode Selector */}
          <div className="flex justify-center gap-2 mb-12 bg-black/20 p-1.5 rounded-2xl backdrop-blur-sm w-fit mx-auto border border-white/5">
            {(Object.keys(MODES) as TimerMode[]).map((m) => (
              <button
                key={m}
                onClick={() => changeMode(m)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300",
                  mode === m 
                    ? "bg-white/10 text-white shadow-lg" 
                    : "text-white/40 hover:text-white hover:bg-white/5"
                )}
              >
                {MODES[m].label}
              </button>
            ))}
          </div>

          {/* Timer Display */}
          <div className="relative w-64 h-64 mx-auto mb-12 flex items-center justify-center">
            {/* Circular Progress SVG */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="4"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeDasharray="283"
                strokeDashoffset={283 - (283 * progress) / 100}
                strokeLinecap="round"
                className={cn("transition-all duration-1000 ease-linear", currentMode.color)}
              />
            </svg>
            
            <div className="text-center z-10">
              <div className={cn("text-6xl font-bold font-display tracking-tighter mb-2", currentMode.color)}>
                {formatTime(timeLeft)}
              </div>
              <div className="flex items-center justify-center gap-2 text-white/50 text-sm uppercase tracking-widest">
                <currentMode.icon size={14} />
                {isActive ? "Rodando" : "Pausado"}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-6">
            <GlassButton
              size="icon"
              variant="ghost"
              onClick={resetTimer}
              className="rounded-full w-14 h-14 border-white/5 hover:bg-white/5"
            >
              <RotateCcw size={20} />
            </GlassButton>
            
            <GlassButton
              size="lg"
              variant={mode === "focus" ? "primary" : "secondary"}
              onClick={toggleTimer}
              className="rounded-full w-20 h-20 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95"
            >
              {isActive ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
            </GlassButton>
          </div>
        </GlassCard>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <GlassCard className="p-4 text-center">
            <h3 className="font-bold text-primary mb-1">25 min</h3>
            <p className="text-xs text-white/50">Foco total sem distrações</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <h3 className="font-bold text-secondary mb-1">5 min</h3>
            <p className="text-xs text-white/50">Pausa curta para relaxar</p>
          </GlassCard>
          <GlassCard className="p-4 text-center">
            <h3 className="font-bold text-green-400 mb-1">4 Ciclos</h3>
            <p className="text-xs text-white/50">Depois pausa longa de 15m</p>
          </GlassCard>
        </div>
      </div>
    </AppLayout>
  );
}
