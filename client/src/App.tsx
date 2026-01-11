import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Pomodoro from "./pages/Pomodoro";
import Formulas from "./pages/Formulas";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/pomodoro" component={Pomodoro} />
      <Route path="/formulas" component={Formulas} />
      
      {/* Placeholder routes for other features */}
      <Route path="/newton" component={() => <PlaceholderPage title="Leis de Newton" />} />
      <Route path="/termodinamica" component={() => <PlaceholderPage title="Termodinâmica" />} />
      <Route path="/flashcards" component={() => <PlaceholderPage title="Flashcards" />} />
      <Route path="/metodo-estudo" component={() => <PlaceholderPage title="Método de Estudo" />} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

// Temporary placeholder component
import { AppLayout } from "@/components/layout/app-layout";
import { GlassCard } from "@/components/ui/glass-card";
import { Construction } from "lucide-react";

function PlaceholderPage({ title }: { title: string }) {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <GlassCard className="p-12 flex flex-col items-center max-w-md">
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
            <Construction size={40} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <p className="text-white/60 mb-8">
            Esta funcionalidade está sendo desenvolvida e estará disponível na próxima atualização do app.
          </p>
          <div className="px-4 py-2 bg-white/5 rounded-full text-xs font-mono text-white/40 border border-white/10">
            Em Breve
          </div>
        </GlassCard>
      </div>
    </AppLayout>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
