import { AppLayout } from "@/components/layout/app-layout";
import { GlassButton } from "@/components/ui/glass-button";
import { GlassCard } from "@/components/ui/glass-card";
import { Atom, BookOpen, Calculator, Clock, GraduationCap, ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="mb-12 text-center relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 animate-in fade-in zoom-in duration-700 delay-100">
          <Star size={14} className="text-secondary fill-secondary" />
          <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Aprenda Física do jeito certo</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          Física <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Fácil Demais</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
          Domine os conceitos fundamentais da física com o método do Professor Julião. 
          Teoria simplificada, fórmulas na ponta dos dedos e ferramentas de estudo poderosas.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
          <Link href="/pomodoro">
            <GlassButton size="lg" variant="primary" className="group">
              Começar a Estudar
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </GlassButton>
          </Link>
          <Link href="/formulas">
            <GlassButton size="lg" variant="default">
              Ver Fórmulas
            </GlassButton>
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
        <FeatureCard 
          icon={Clock}
          title="Pomodoro Timer"
          description="Gerencie seu tempo de estudo com ciclos de foco e descanso para máxima produtividade."
          href="/pomodoro"
          color="text-secondary"
        />
        <FeatureCard 
          icon={Calculator}
          title="Banco de Fórmulas"
          description="Acesso rápido a todas as fórmulas essenciais de mecânica, termodinâmica e eletricidade."
          href="/formulas"
          color="text-primary"
        />
        <FeatureCard 
          icon={Atom}
          title="Leis de Newton"
          description="Entenda os princípios fundamentais que regem o movimento dos corpos."
          href="/newton"
          color="text-pink-400"
        />
        <FeatureCard 
          icon={BookOpen}
          title="Termodinâmica"
          description="Explore o calor, trabalho e temperatura com explicações claras e visuais."
          href="/termodinamica"
          color="text-orange-400"
        />
        <FeatureCard 
          icon={GraduationCap}
          title="Método de Estudo"
          description="Técnicas comprovadas para absorver conteúdo complexo de forma eficiente."
          href="/metodo-estudo"
          color="text-green-400"
        />
        <GlassCard className="p-6 flex flex-col items-center justify-center text-center border-dashed border-white/20 bg-transparent hover:bg-white/5 group">
          <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-lg font-bold mb-2">Mais em breve</h3>
          <p className="text-sm text-white/50">Novos conteúdos sendo preparados.</p>
        </GlassCard>
      </div>
    </AppLayout>
  );
}

function FeatureCard({ icon: Icon, title, description, href, color }: { icon: any, title: string, description: string, href: string, color: string }) {
  return (
    <Link href={href}>
      <GlassCard hoverEffect gradientBorder className="p-6 h-full flex flex-col group">
        <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors">
          <Icon className={`w-6 h-6 ${color}`} />
        </div>
        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-white/60 text-sm leading-relaxed mb-4 flex-1">
          {description}
        </p>
        <div className="flex items-center text-sm font-medium text-white/40 group-hover:text-white transition-colors mt-auto">
          Acessar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </GlassCard>
    </Link>
  );
}
