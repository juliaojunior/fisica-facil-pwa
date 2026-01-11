import { AppLayout } from "@/components/layout/app-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { Search, ChevronRight, Zap, Move, Thermometer, Atom } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const CATEGORIES = [
  { id: "all", label: "Todas", icon: null },
  { id: "mecanica", label: "Mecânica", icon: Move },
  { id: "termodinamica", label: "Termodinâmica", icon: Thermometer },
  { id: "eletricidade", label: "Eletricidade", icon: Zap },
  { id: "optica", label: "Óptica", icon: Atom },
];

const FORMULAS = [
  { id: 1, title: "Velocidade Média", formula: "Vm = ΔS / Δt", category: "mecanica", description: "Razão entre o deslocamento e o tempo gasto." },
  { id: 2, title: "Aceleração Média", formula: "Am = ΔV / Δt", category: "mecanica", description: "Variação da velocidade em função do tempo." },
  { id: 3, title: "2ª Lei de Newton", formula: "Fr = m . a", category: "mecanica", description: "Princípio Fundamental da Dinâmica." },
  { id: 4, title: "Energia Cinética", formula: "Ec = (m . v²) / 2", category: "mecanica", description: "Energia associada ao movimento dos corpos." },
  { id: 5, title: "Calor Sensível", formula: "Q = m . c . ΔT", category: "termodinamica", description: "Quantidade de calor que altera a temperatura." },
  { id: 6, title: "Lei de Ohm", formula: "U = R . i", category: "eletricidade", description: "Relação entre tensão, resistência e corrente." },
  { id: 7, title: "Potência Elétrica", formula: "P = U . i", category: "eletricidade", description: "Energia elétrica consumida por unidade de tempo." },
  { id: 8, title: "Equação de Clapeyron", formula: "P . V = n . R . T", category: "termodinamica", description: "Equação geral dos gases ideais." },
];

export default function Formulas() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFormulas = FORMULAS.filter(f => {
    const matchesCategory = activeCategory === "all" || f.category === activeCategory;
    const matchesSearch = f.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          f.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AppLayout>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Fórmulas</h1>
        <p className="text-white/60">Consulte rapidamente as principais equações da física.</p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8 group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-white/40 group-focus-within:text-primary transition-colors" size={20} />
        </div>
        <input
          type="text"
          placeholder="Buscar fórmula..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white/10 transition-all backdrop-blur-sm"
        />
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-3 no-scrollbar">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 border",
              activeCategory === cat.id
                ? "bg-primary/20 border-primary/50 text-white shadow-lg shadow-primary/10"
                : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white"
            )}
          >
            {cat.icon && <cat.icon size={16} />}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredFormulas.map((item) => (
          <GlassCard key={item.id} hoverEffect className="p-5 group">
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className={cn(
                  "text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded-md mb-2 inline-block",
                  item.category === "mecanica" && "bg-blue-500/20 text-blue-300",
                  item.category === "termodinamica" && "bg-orange-500/20 text-orange-300",
                  item.category === "eletricidade" && "bg-yellow-500/20 text-yellow-300",
                  item.category === "optica" && "bg-purple-500/20 text-purple-300",
                )}>
                  {CATEGORIES.find(c => c.id === item.category)?.label}
                </span>
                <h3 className="text-lg font-bold group-hover:text-primary transition-colors">{item.title}</h3>
              </div>
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <ChevronRight size={16} className="text-white/40 group-hover:text-primary" />
              </div>
            </div>
            
            <div className="bg-black/20 rounded-xl p-4 mb-3 border border-white/5 font-mono text-center text-lg tracking-wider text-secondary">
              {item.formula}
            </div>
            
            <p className="text-sm text-white/50 leading-relaxed">
              {item.description}
            </p>
          </GlassCard>
        ))}
      </div>

      {filteredFormulas.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="text-white/20" size={32} />
          </div>
          <p className="text-white/40">Nenhuma fórmula encontrada para sua busca.</p>
        </div>
      )}
    </AppLayout>
  );
}
