/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  RotateCcw, 
  History as HistoryIcon, 
  Dumbbell, 
  CheckCircle2, 
  Download, 
  Upload, 
  Volume2, 
  Activity,
  Search,
  Check,
  Calendar,
  X,
  Sparkles,
  RefreshCw,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXERCISES_SERIE_A, EXERCISES_SERIE_B } from './data';
import { Exercise, WorkoutHistoryEntry, ExerciseSessionState, RoutineType } from './types';
import { ExerciseCard } from './components/ExerciseCard';
import { WorkoutHistoryView } from './components/WorkoutHistoryView';
import { RestTimer } from './components/RestTimer';
import { 
  loadActiveSession, 
  saveActiveSession, 
  loadHistory, 
  saveHistory, 
  downloadBackupFile, 
  parseAndValidateBackup, 
  saveBackupToStorage 
} from './utils/storage';

const ACCENT_A = '#ccff00'; // High Density Acid Green
const ACCENT_B = '#00e5ff'; // High Density Electric Cyan

export default function App() {
  // Navigation & Routine Selection
  const [currentView, setCurrentView] = useState<'tracker' | 'history'>('tracker');
  const [activeRoutine, setActiveRoutine] = useState<RoutineType>('A');
  const [searchQuery, setSearchQuery] = useState('');

  // Loaded database references
  const exercises = activeRoutine === 'A' ? EXERCISES_SERIE_A : EXERCISES_SERIE_B;

  // Workout state loaders
  const [sessionA, setSessionA] = useState<ExerciseSessionState>({});
  const [sessionB, setSessionB] = useState<ExerciseSessionState>({});
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);
  
  // Confetti / Celebration HUD State
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);
  
  // Timer Overlay State
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60);

  // Hidden File input ref for backup import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Init and load states
  useEffect(() => {
    setSessionA(loadActiveSession('A', EXERCISES_SERIE_A));
    setSessionB(loadActiveSession('B', EXERCISES_SERIE_B));
    setHistory(loadHistory());
  }, []);

  // Sync state changes back to storage
  useEffect(() => {
    if (Object.keys(sessionA).length > 0) {
      saveActiveSession('A', sessionA);
    }
  }, [sessionA]);

  useEffect(() => {
    if (Object.keys(sessionB).length > 0) {
      saveActiveSession('B', sessionB);
    }
  }, [sessionB]);

  const activeSession = activeRoutine === 'A' ? sessionA : sessionB;
  const activeAccentColor = activeRoutine === 'A' ? ACCENT_A : ACCENT_B;

  // Handle exercise log change (single weight and single completed status per exercise)
  const handleExerciseChange = (exerciseId: string, field: 'weight' | 'completed', value: any) => {
    const updateSessionState = (prev: ExerciseSessionState) => {
      const current = prev[exerciseId] || { weight: '', completed: false };
      const updated = { ...current, [field]: value };
      
      // If completed toggled to true but weight is blank, autofill previous load!
      if (field === 'completed' && value === true) {
        if (!updated.weight) {
          const lastCarga = findPreviousCarga(exerciseId);
          if (lastCarga) {
            updated.weight = lastCarga;
          }
        }
      }
      return { ...prev, [exerciseId]: updated };
    };

    if (activeRoutine === 'A') {
      setSessionA(prev => updateSessionState(prev));
    } else {
      setSessionB(prev => updateSessionState(prev));
    }
  };

  // Rest Timer launcher
  const handleStartTimer = (duration: number) => {
    setTimerDuration(duration);
    setTimerOpen(true);
  };

  // Helper: Find the most recently logged weight (carga) for this exercise in history
  const findPreviousCarga = (exerciseId: string): string | undefined => {
    // Traverse history records backwards from most recent
    for (let i = history.length - 1; i >= 0; i--) {
      const entry = history[i];
      const loggedSession = entry.logs[exerciseId];
      if (loggedSession && loggedSession.weight) {
        return loggedSession.weight;
      }
    }
    return undefined;
  };

  // Calculated session stats based on exercise level completion
  const getSessionProgress = () => {
    const totalExercises = exercises.length;
    let completedExercises = 0;

    exercises.forEach((ex) => {
      const session = activeSession[ex.id];
      if (session && session.completed) {
        completedExercises++;
      }
    });

    const percent = totalExercises > 0 ? Math.round((completedExercises / totalExercises) * 100) : 0;
    return { completedExercises, totalExercises, percent };
  };

  const { completedExercises, totalExercises, percent } = getSessionProgress();

  // Reset active session
  const handleResetSession = () => {
    if (confirm('Deseja resetar as marcações deste treino ativo? As cargas salvas voltarão ao estado limpo.')) {
      const empty = {};
      const targetExercises = activeRoutine === 'A' ? EXERCISES_SERIE_A : EXERCISES_SERIE_B;
      
      targetExercises.forEach((ex) => {
        (empty as any)[ex.id] = {
          weight: '',
          completed: false,
        };
      });

      if (activeRoutine === 'A') {
        setSessionA(empty);
      } else {
        setSessionB(empty);
      }
    }
  };

  // Finalize current workout session, saving to history database and showing celebration
  const handleFinalizeWorkout = () => {
    // Extract logged exercises
    const logsToSave: ExerciseSessionState = {};
    let activeCompletedCount = 0;
    const activeTotalCount = exercises.length;

    exercises.forEach((ex) => {
      const session = activeSession[ex.id] || { weight: '', completed: false };
      if (session.completed) {
        activeCompletedCount++;
      }
      logsToSave[ex.id] = session;
    });

    if (activeCompletedCount === 0) {
      alert('Você ainda não marcou nenhum exercício como concluído neste treino. Finalize pelo menos um exercício para salvar no histórico!');
      return;
    }

    // Capture standard local Date
    const now = new Date();
    const formattedDate = now.toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newHistoryEntry: WorkoutHistoryEntry = {
      id: now.getTime().toString(),
      date: formattedDate,
      routine: activeRoutine,
      completedExercisesCount: activeCompletedCount,
      totalExercisesCount: activeTotalCount,
      logs: logsToSave
    };

    const updatedHistory = [...history, newHistoryEntry];
    setHistory(updatedHistory);
    saveHistory(updatedHistory);

    // Trigger beautiful completion toast/overlay
    const achievements = [
      "Monstro! Treino concluído com consistência.",
      "Mais um pago! Disciplina de ferro.",
      "Excelente progresso! Seu corpo agradece.",
      "Superação total! Cargas devidamente registradas."
    ];
    const randomCongratulations = achievements[Math.floor(Math.random() * achievements.length)];
    setCelebrationMessage(randomCongratulations);

    // Clean completion checkmarks, but preserve the loads so they are populated for convenience next class
    const cleanedSession: ExerciseSessionState = {};
    exercises.forEach((ex) => {
      const current = activeSession[ex.id] || { weight: '', completed: false };
      cleanedSession[ex.id] = {
        weight: current.weight, // Preserve weight for convenience!
        completed: false        // Reset checkmark
      };
    });

    if (activeRoutine === 'A') {
      setSessionA(cleanedSession);
    } else {
      setSessionB(cleanedSession);
    }
  };

  // History operations
  const handleDeleteHistoryEntry = (id: string) => {
    if (confirm('Tem certeza que deseja apagar permanentemente este registro de treino?')) {
      const updated = history.filter(h => h.id !== id);
      setHistory(updated);
      saveHistory(updated);
    }
  };

  const handleClearAllHistory = () => {
    setHistory([]);
    saveHistory([]);
  };

  // Backup file handlers
  const handleImportBackup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const backup = parseAndValidateBackup(text);
        
        saveBackupToStorage(backup);
        
        // Refresh States
        setSessionA(backup.activeA);
        setSessionB(backup.activeB);
        setHistory(backup.history);

        alert('Backup importado com sucesso! Os seus dados foram totalmente restaurados.');
      } catch (err) {
        console.error('Error importing backup:', err);
        alert('Erro ao importar backup: Formato de arquivo JSON inválido ou corrompido.');
      }
    };
    reader.readAsText(file);
    // Reset file input value to allow uploading same file again
    if (event.target) event.target.value = '';
  };

  const triggerImportClick = () => {
    fileInputRef.current?.click();
  };

  // Text-based exercise search filter
  const filteredExercises = exercises.filter(ex => 
    ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ex.equipment.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#050505] text-[#f0f0f0] flex flex-col antialiased font-sans">
      {/* Hidden File Input for import */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImportBackup} 
        accept=".json" 
        className="hidden" 
      />

      {/* Top Header Card */}
      <header className="bg-[#0a0a0a] border-b border-[#222] sticky top-0 z-40 select-none">
        <div className="w-full max-w-lg mx-auto px-4 py-3.5">
          <div className="flex items-center justify-between gap-2">
            
            {/* Logo / Branding */}
            <div className="flex items-center gap-2">
              <div 
                className="w-10 h-10 rounded-xl flex items-center justify-center text-black font-black transition-colors duration-300 shadow-md"
                style={{ backgroundColor: activeAccentColor }}
              >
                <Dumbbell size={22} className="rotate-[-45deg]" />
              </div>
              <div>
                <h1 className="text-base font-display font-black text-white tracking-wider flex items-center gap-1 uppercase">
                  CORE FIT <span className="text-[11px] bg-[#1a1a1a] text-[#ccff00] font-mono font-medium tracking-normal px-1.5 py-0.2 rounded border border-[#333]">PRO</span>
                </h1>
                <p className="text-[12px] font-sans text-zinc-400 font-bold uppercase tracking-wider">GUIA E PAINEL DE TREINO</p>
              </div>
            </div>

            {/* View navigation Tabs */}
            <div className="flex items-center bg-[#111] border border-[#222] p-0.5 rounded-xl">
              <button
                onClick={() => setCurrentView('tracker')}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all flex items-center gap-1.5 ${
                  currentView === 'tracker' 
                    ? 'bg-[#222] border border-[#333] text-white shadow' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <Activity size={13} />
                <span>Painel</span>
              </button>
              
              <button
                onClick={() => setCurrentView('history')}
                className={`px-3 py-1.5 rounded-lg text-xs font-display font-semibold transition-all flex items-center gap-1.5 ${
                  currentView === 'history' 
                    ? 'bg-[#222] border border-[#333] text-white shadow' 
                    : 'text-zinc-400 hover:text-white'
                }`}
                id="history-tab-button"
              >
                <HistoryIcon size={13} />
                <span>Histórico</span>
              </button>
            </div>
            
          </div>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-5 flex flex-col gap-5">
        
        {currentView === 'tracker' ? (
          /* Tracker View Dashboard */
          <>
            {/* Header / Routine Level switcher */}
            <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-sans text-zinc-500 uppercase font-black tracking-widest">Mudar Ficha de Treino</span>
                  <span className="text-[13px] font-mono text-zinc-600 font-medium tracking-tight">Período Ativo</span>
                </div>
                
                {/* Clean Toggle Switch between A & B */}
                <div className="flex items-center bg-[#1a1a1a] border border-[#333] p-1 rounded-xl w-44">
                  <button
                    onClick={() => {
                      setActiveRoutine('A');
                      setSearchQuery('');
                    }}
                    className="flex-1 py-1.5 text-xs font-display font-black rounded-lg transition-all text-center relative"
                    style={{
                      backgroundColor: activeRoutine === 'A' ? ACCENT_A : 'transparent',
                      color: activeRoutine === 'A' ? '#000000' : '#71717a'
                    }}
                  >
                    SÉRIE A
                  </button>
                  
                  <button
                    onClick={() => {
                      setActiveRoutine('B');
                      setSearchQuery('');
                    }}
                    className="flex-1 py-1.5 text-xs font-display font-black rounded-lg transition-all text-center relative"
                    style={{
                      backgroundColor: activeRoutine === 'B' ? ACCENT_B : 'transparent',
                      color: activeRoutine === 'B' ? '#000000' : '#71717a'
                    }}
                  >
                    SÉRIE B
                  </button>
                </div>
              </div>

              {/* Status Header of current selected routine */}
              <div className="border-t border-[#222] pt-3 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-2.5 h-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: activeAccentColor }}
                  />
                  <h2 className="text-sm font-display font-bold text-white tracking-tight uppercase">
                    {activeRoutine === 'A' 
                      ? 'Série A: Posterior, Coxas e Puxada (Costas)' 
                      : 'Série B: Anterior, Pernas e Empurrar (Peito/Ombro)'
                    }
                  </h2>
                </div>
                
                <span className="text-[12.5px] font-mono text-zinc-400 bg-[#111] border border-[#222] px-2 py-0.5 rounded">
                  {exercises.length} Aparelhos
                </span>
              </div>

              {/* Completion Progress Gauge */}
              <div className="space-y-1.5 select-none">
                <div className="flex justify-between items-center text-[13.5px]">
                  <span className="text-zinc-500 font-sans font-bold uppercase tracking-wider text-[11px]">Meta do treino de hoje</span>
                  <span className="font-mono text-zinc-200 font-bold">
                    {completedExercises} de {totalExercises} aparelhos ({percent}%)
                  </span>
                </div>
                {/* Horizontal Progress bar */}
                <div className="relative w-full h-2.5 bg-[#050505] rounded-full overflow-hidden border border-[#222]">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-300"
                    style={{ 
                      backgroundColor: activeAccentColor,
                      width: `${percent}%` 
                    }}
                    layoutId="workout-progress-bar"
                  />
                </div>
              </div>
            </div>

            {/* Quick Search and Filter utilities */}
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500">
                <Search size={16} />
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filtrar por exercício, músculo ou aparelho..."
                className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-[#444] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpar busca"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#444] rounded-sm transition-shadow"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Interactive Exercise Cards */}
            {filteredExercises.length === 0 ? (
              <div className="text-center py-8 px-4 bg-zinc-900/10 border border-zinc-900 border-dashed rounded-xl">
                <p className="text-xs text-zinc-500 font-sans">Nenhum exercício corresponde ao seu filtro.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExercises.map((ex) => {
                  const sessionState = activeSession[ex.id] || { weight: '', completed: false };
                  const previousCarga = findPreviousCarga(ex.id);

                  return (
                    <ExerciseCard
                      key={ex.id}
                      exercise={ex}
                      session={sessionState}
                      onExerciseChange={handleExerciseChange}
                      onStartTimer={handleStartTimer}
                      accentColor={activeAccentColor}
                      previousCarga={previousCarga}
                    />
                  );
                })}
              </div>
            )}

            {/* Action Buttons: Save and Reset */}
            <div className="grid grid-cols-2 gap-3 pt-2 select-none">
              <button
                onClick={handleResetSession}
                className="flex items-center justify-center gap-2 py-3 bg-[#0a0a0a] text-zinc-350 hover:text-[#ccff00] hover:bg-[#111] rounded-xl border border-[#222] transition-colors font-display text-xs font-bold uppercase tracking-widest"
              >
                <RotateCcw size={14} />
                <span>Resetar Série</span>
              </button>

              <button
                onClick={handleFinalizeWorkout}
                className="flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-display text-xs font-black text-black uppercase tracking-widest shadow-lg active:scale-95"
                style={{ 
                  backgroundColor: activeAccentColor,
                  boxShadow: `0 4px 14px -4px ${activeAccentColor}80`
                }}
              >
                <CheckCircle2 size={14} />
                <span>Finalizar Treino</span>
              </button>
            </div>
          </>
        ) : (
          /* History logs page */
          <WorkoutHistoryView
            history={history}
            onDeleteEntry={handleDeleteHistoryEntry}
            onClearHistory={handleClearAllHistory}
            accentColorA={ACCENT_A}
            accentColorB={ACCENT_B}
          />
        )}
      </main>

      {/* Footer utility Backup controls */}
      <footer className="bg-[#0a0a0a] border-t border-[#222] mt-auto select-none">
        <div className="w-full max-w-lg mx-auto px-4 py-4 space-y-3">
          
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-zinc-500 font-sans font-bold uppercase tracking-widest text-[10px] flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>Local Storage Sync Ativo</span>
            </span>
            <div className="flex items-center gap-3">
              {/* Import backup */}
              <button
                onClick={triggerImportClick}
                className="text-zinc-400 hover:text-white flex items-center gap-1 font-display font-medium text-[10px] tracking-wider uppercase hover:bg-[#1a1a1a] px-2.5 py-1.5 rounded transition-all border border-transparent hover:border-[#333]"
                title="Restaurar de arquivo JSON"
              >
                <Upload size={12} className="text-[#ccff00]" />
                <span>Importar JSON</span>
              </button>

              {/* Export backup */}
              <button
                onClick={downloadBackupFile}
                className="text-zinc-400 hover:text-white flex items-center gap-1 font-display font-medium text-[10px] tracking-wider uppercase hover:bg-[#1a1a1a] px-2.5 py-1.5 rounded transition-all border border-transparent hover:border-[#333]"
                title="Baixar cópia de segurança JSON"
              >
                <Download size={12} className="text-[#00e5ff]" />
                <span>Exportar JSON</span>
              </button>
            </div>
          </div>

          <div className="text-center">
            <p className="text-[10px] text-zinc-600 font-sans">
              Dados salvos localmente. Exclusão de caches do navegador pode remover o progresso. Use a ferramenta JSON acima para garantir segurança periódica.
            </p>
          </div>

        </div>
      </footer>

      {/* Floating Rest Timer Modal / HUD overlay */}
      <RestTimer
        duration={timerDuration}
        isOpen={timerOpen}
        onClose={() => setTimerOpen(false)}
        accentColor={activeAccentColor}
      />

      {/* Celebration Completion Alert Toast overlay */}
      <AnimatePresence>
        {celebrationMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 text-center space-y-4 shadow-3xl">
              <div 
                className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center text-black"
                style={{ backgroundColor: activeAccentColor }}
              >
                <Check size={36} strokeWidth={3} />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-display font-black tracking-tight text-white uppercase">Parabéns!</h3>
                <p className="text-xs text-zinc-400 font-sans">
                  {celebrationMessage}
                </p>
              </div>

              <div className="bg-[#111] p-3 rounded-lg border border-[#222] font-sans text-xs text-zinc-400">
                Os seus dados de carga foram arquivados com sucesso. O check de execução foi resetado no painel principal para que a sua próxima rodada comece zerada!
              </div>

              <button
                onClick={() => setCelebrationMessage(null)}
                className="w-full py-2.5 rounded-xl font-display text-xs font-black uppercase tracking-widest bg-white text-[#050505] hover:bg-[#eaeaea] transition-colors"
              >
                Fechar e Continuar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
