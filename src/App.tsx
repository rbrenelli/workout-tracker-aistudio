/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
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
import { EXERCISES_SERIE_A, EXERCISES_SERIE_B, EXERCISES_SERIE_C } from './data';
import { Exercise, WorkoutHistoryEntry, ExerciseSessionState, RoutineType } from './types';
import { ExerciseCard } from './components/ExerciseCard';
import { WorkoutHistoryView } from './components/WorkoutHistoryView';
import { RestTimer } from './components/RestTimer';
import { ConfirmDialog } from './components/ConfirmDialog';
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
const ACCENT_C = '#ff6b00'; // High Density Electric Orange

export default function App() {
  // Navigation & Routine Selection
  const [currentView, setCurrentView] = useState<'tracker' | 'history'>('tracker');
  const [activeRoutine, setActiveRoutine] = useState<RoutineType>('A');
  const [searchQuery, setSearchQuery] = useState('');

  // Loaded database references
  const exercises = activeRoutine === 'A' ? EXERCISES_SERIE_A : activeRoutine === 'B' ? EXERCISES_SERIE_B : EXERCISES_SERIE_C;

  // Workout state loaders
  const [sessionA, setSessionA] = useState<ExerciseSessionState>({});
  const [sessionB, setSessionB] = useState<ExerciseSessionState>({});
  const [sessionC, setSessionC] = useState<ExerciseSessionState>({});
  const [history, setHistory] = useState<WorkoutHistoryEntry[]>([]);
  
  // Confetti / Celebration HUD State
  const [celebrationMessage, setCelebrationMessage] = useState<string | null>(null);
  const [celebrationVolume, setCelebrationVolume] = useState<number>(0);
  
  // Timer Overlay State
  const [timerOpen, setTimerOpen] = useState(false);
  const [timerDuration, setTimerDuration] = useState(60);
  const [timerExerciseId, setTimerExerciseId] = useState<string | null>(null);

  // Milestone Toast State
  const [milestoneMessage, setMilestoneMessage] = useState<string | null>(null);

  // Custom Dialog State
  const [dialog, setDialog] = useState<{
    title: string;
    message: string;
    confirmLabel: string;
    cancelLabel?: string;
    variant: 'danger' | 'success' | 'info';
    onConfirm: () => void;
  } | null>(null);

  // Hidden File input ref for backup import
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Init and load states
  useEffect(() => {
    setSessionA(loadActiveSession('A', EXERCISES_SERIE_A));
    setSessionB(loadActiveSession('B', EXERCISES_SERIE_B));
    setSessionC(loadActiveSession('C', EXERCISES_SERIE_C));
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

  useEffect(() => {
    if (Object.keys(sessionC).length > 0) {
      saveActiveSession('C', sessionC);
    }
  }, [sessionC]);

  const activeSession = activeRoutine === 'A' ? sessionA : activeRoutine === 'B' ? sessionB : sessionC;
  const activeAccentColor = activeRoutine === 'A' ? ACCENT_A : activeRoutine === 'B' ? ACCENT_B : ACCENT_C;

  // Precompute the most recently logged weight (carga) for all exercises in history
  const previousCargas = useMemo(() => {
    const map: Record<string, string> = {};
    // Traverse history from oldest to newest so that newer entries overwrite older ones
    history.forEach((entry) => {
      Object.entries(entry.logs).forEach(([exId, log]) => {
        const session = log as any;
        if (session && session.weight) {
          map[exId] = session.weight;
        }
      });
    });
    return map;
  }, [history]);

  // Handle exercise log change (single weight and single completed status per exercise)
  const handleExerciseChange = (
    exerciseId: string, 
    field: 'weight' | 'completed' | 'completedSets', 
    value: string | boolean | number
  ) => {
    const updateSessionState = (prev: ExerciseSessionState) => {
      const current = prev[exerciseId] || { weight: '', completed: false, completedSets: 0 };
      const updated = { ...current };
      
      if (field === 'weight') {
        updated.weight = value as string;
      } else if (field === 'completed') {
        updated.completed = value as boolean;
        
        // If completed toggled to true but weight is blank, autofill previous load!
        if (value === true && !updated.weight) {
          const lastCarga = previousCargas[exerciseId];
          if (lastCarga) {
            updated.weight = lastCarga;
          }
        }
      } else if (field === 'completedSets') {
        updated.completedSets = value as number;
      }
      return { ...prev, [exerciseId]: updated };
    };

    if (activeRoutine === 'A') {
      setSessionA(prev => updateSessionState(prev));
    } else if (activeRoutine === 'B') {
      setSessionB(prev => updateSessionState(prev));
    } else {
      setSessionC(prev => updateSessionState(prev));
    }
  };

  // Rest Timer launcher
  const handleStartTimer = (duration: number, exerciseId?: string) => {
    setTimerDuration(duration);
    setTimerExerciseId(exerciseId || null);
    setTimerOpen(true);
  };

  const handleTimerComplete = () => {
    if (!timerExerciseId) return;
    const exercise = exercises.find(ex => ex.id === timerExerciseId);
    if (!exercise) return;
    
    const currentSession = activeSession[timerExerciseId] || { weight: '', completed: false, completedSets: 0 };
    const maxSets = exercise.defaultSets;
    
    if (currentSession.completedSets < maxSets) {
      const newSets = currentSession.completedSets + 1;
      const nowComplete = newSets >= maxSets;
      handleExerciseChange(timerExerciseId, 'completedSets', newSets);
      if (nowComplete) {
        handleExerciseChange(timerExerciseId, 'completed', true);
      }
    }
  };

  // Calculated session stats based on exercise level completion
  const { completedExercises, totalExercises, percent } = useMemo(() => {
    const total = exercises.length;
    let completed = 0;

    exercises.forEach((ex) => {
      const session = activeSession[ex.id];
      if (session && session.completed) {
        completed++;
      }
    });

    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { completedExercises: completed, totalExercises: total, percent: pct };
  }, [exercises, activeSession]);

  // Reset active session
  const handleResetSession = () => {
    setDialog({
      title: 'Resetar Ficha',
      message: 'Deseja resetar as marcações deste treino ativo? As cargas salvas voltarão ao estado limpo.',
      confirmLabel: 'Confirmar Reset',
      cancelLabel: 'Voltar',
      variant: 'danger',
      onConfirm: () => {
        const empty: ExerciseSessionState = {};
        const targetExercises = activeRoutine === 'A' 
          ? EXERCISES_SERIE_A 
          : activeRoutine === 'B' 
            ? EXERCISES_SERIE_B 
            : EXERCISES_SERIE_C;
        
        targetExercises.forEach((ex) => {
          empty[ex.id] = {
            weight: '',
            completed: false,
            completedSets: 0,
          };
        });

        if (activeRoutine === 'A') {
          setSessionA(empty);
        } else if (activeRoutine === 'B') {
          setSessionB(empty);
        } else {
          setSessionC(empty);
        }
        setDialog(null);
      }
    });
  };

  // Finalize current workout session, saving to history database and showing celebration
  const handleFinalizeWorkout = () => {
    // Extract logged exercises
    const logsToSave: ExerciseSessionState = {};
    let activeCompletedCount = 0;
    const activeTotalCount = exercises.length;

    exercises.forEach((ex) => {
      const session = activeSession[ex.id] || { weight: '', completed: false, completedSets: 0 };
      if (session.completed) {
        activeCompletedCount++;
      }
      logsToSave[ex.id] = session;
    });

    if (activeCompletedCount === 0) {
      setDialog({
        title: 'Nenhum exercício concluído',
        message: 'Você ainda não marcou nenhum exercício como concluído neste treino. Finalize pelo menos um exercício para salvar no histórico!',
        confirmLabel: 'Entendido',
        variant: 'info',
        onConfirm: () => setDialog(null)
      });
      return;
    }

    // Calculate total weight volume of completed exercises
    let totalVolume = 0;
    exercises.forEach((ex) => {
      const session = activeSession[ex.id] || { weight: '', completed: false, completedSets: 0 };
      if (session.completed && session.weight) {
        const parsedWeight = parseFloat(session.weight.replace(',', '.'));
        if (!isNaN(parsedWeight)) {
          totalVolume += parsedWeight * (session.completedSets || ex.defaultSets);
        }
      }
    });
    setCelebrationVolume(totalVolume);

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
    
    // Cryptographically secure random selection
    const getRandomIndex = (length: number): number => {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      return array[0] % length;
    };
    
    const randomCongratulations = achievements[getRandomIndex(achievements.length)];
    setCelebrationMessage(randomCongratulations);

    // Clean completion checkmarks, but preserve the loads so they are populated for convenience next class
    const cleanedSession: ExerciseSessionState = {};
    exercises.forEach((ex) => {
      const current = activeSession[ex.id] || { weight: '', completed: false, completedSets: 0 };
      cleanedSession[ex.id] = {
        weight: current.weight, // Preserve weight for convenience!
        completed: false,        // Reset checkmark
        completedSets: 0,        // Reset completed sets
      };
    });

    if (activeRoutine === 'A') {
      setSessionA(cleanedSession);
    } else if (activeRoutine === 'B') {
      setSessionB(cleanedSession);
    } else {
      setSessionC(cleanedSession);
    }
  };

  // History operations
  const handleDeleteHistoryEntry = (id: string) => {
    setDialog({
      title: 'Apagar Registro',
      message: 'Tem certeza que deseja apagar permanentemente este registro de treino?',
      confirmLabel: 'Apagar',
      cancelLabel: 'Cancelar',
      variant: 'danger',
      onConfirm: () => {
        const updated = history.filter(h => h.id !== id);
        setHistory(updated);
        saveHistory(updated);
        setDialog(null);
      }
    });
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
        setSessionC(backup.activeC || {});
        setHistory(backup.history);

        setDialog({
          title: 'Backup Importado',
          message: 'Backup importado com sucesso! Os seus dados foram totalmente restaurados.',
          confirmLabel: 'Excelente',
          variant: 'success',
          onConfirm: () => setDialog(null)
        });
      } catch (err) {
        setDialog({
          title: 'Erro de Importação',
          message: 'Erro ao importar backup: Formato de arquivo JSON inválido ou corrompido.',
          confirmLabel: 'Entendido',
          variant: 'danger',
          onConfirm: () => setDialog(null)
        });
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

  // Derive unique muscle groups for quick-filter chips
  const muscleGroups = useMemo(() => {
    return [...new Set(exercises.map(ex => ex.muscleGroup))];
  }, [exercises]);

  // Track progress and trigger milestone toasts
  useEffect(() => {
    if (percent === 0) return;
    let msg = null;
    if (percent === 25) msg = "💪 Bom começo! 25% concluído.";
    else if (percent === 50) msg = "🔥 Metade do caminho! 50% concluído.";
    else if (percent === 75) msg = "⚡ Quase lá! 75% concluído.";
    else if (percent === 100) msg = "🏆 Sensacional! Treino completo!";

    if (msg) {
      setMilestoneMessage(msg);
      const timer = setTimeout(() => setMilestoneMessage(null), 2500);
      return () => clearTimeout(timer);
    }
  }, [percent]);

  // Auto-dismiss celebration message after 5 seconds
  useEffect(() => {
    if (celebrationMessage) {
      const timer = setTimeout(() => setCelebrationMessage(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [celebrationMessage]);

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
                  Treino
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
      <main className="flex-1 w-full max-w-lg mx-auto px-4 py-5 flex flex-col gap-5 relative">
        
        {/* Milestone Toast notification */}
        <AnimatePresence>
          {milestoneMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-2 left-4 right-4 z-30 bg-[#111] border rounded-xl px-4 py-3 text-center shadow-2xl flex items-center justify-center gap-2 text-sm font-display font-bold text-white uppercase tracking-wide"
              style={{ borderColor: activeAccentColor }}
            >
              <Sparkles size={16} style={{ color: activeAccentColor }} />
              <span>{milestoneMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {currentView === 'tracker' ? (
          /* Tracker View Dashboard */
          <>
            {/* Header / Routine Level switcher */}
            <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-xs font-sans text-zinc-400 uppercase font-black tracking-widest">Mudar Ficha de Treino</span>
                  <span className="text-[13px] font-mono text-zinc-500 font-medium tracking-tight">Período Ativo</span>
                </div>
                
                {/* Clean Toggle Switch between A, B & C */}
                <div className="flex items-center bg-[#1a1a1a] border border-[#333] p-1 rounded-xl w-60">
                  <button
                    onClick={() => {
                      setActiveRoutine('A');
                      setSearchQuery('');
                    }}
                    className="flex-1 py-1.5 text-[10px] font-display font-black rounded-lg transition-all text-center relative"
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
                    className="flex-1 py-1.5 text-[10px] font-display font-black rounded-lg transition-all text-center relative"
                    style={{
                      backgroundColor: activeRoutine === 'B' ? ACCENT_B : 'transparent',
                      color: activeRoutine === 'B' ? '#000000' : '#71717a'
                    }}
                  >
                    SÉRIE B
                  </button>

                  <button
                    onClick={() => {
                      setActiveRoutine('C');
                      setSearchQuery('');
                    }}
                    className="flex-1 py-1.5 text-[10px] font-display font-black rounded-lg transition-all text-center relative"
                    style={{
                      backgroundColor: activeRoutine === 'C' ? ACCENT_C : 'transparent',
                      color: activeRoutine === 'C' ? '#000000' : '#71717a'
                    }}
                  >
                    SÉRIE C
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
                      : activeRoutine === 'B'
                        ? 'Série B: Anterior, Pernas e Empurrar (Peito/Ombro)'
                        : 'Série C: Treino Personalizado (Puxada, Peito & Braços)'
                    }
                  </h2>
                </div>
                
                <span className="text-[12.5px] font-mono text-zinc-400 bg-[#111] border border-[#222] px-2 py-0.5 rounded font-black">
                  {exercises.length} Aparelhos
                </span>
              </div>

              {/* Completion Progress Gauge */}
              <div className="space-y-1.5 select-none">
                <div className="flex justify-between items-center text-[13.5px]">
                  <span className="text-zinc-400 font-sans font-bold uppercase tracking-wider text-[11px]">Meta do treino de hoje</span>
                  <span className="font-mono text-zinc-200 font-bold">
                    {completedExercises} de {totalExercises} aparelhos (
                    <motion.span
                      key={percent}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.2 }}
                      className="inline-block"
                    >
                      {percent}
                    </motion.span>
                    %)
                  </span>
                </div>
                {/* Horizontal Progress bar */}
                <div className="relative w-full h-2.5 bg-[#050505] rounded-full overflow-hidden border border-[#222]">
                  <motion.div 
                    className="absolute top-0 bottom-0 left-0 rounded-full transition-all duration-300 animate-shimmer"
                    style={{ 
                      backgroundColor: activeAccentColor,
                      width: `${percent}%`,
                      backgroundImage: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%)'
                    }}
                    layoutId="workout-progress-bar"
                  />
                </div>
              </div>
            </div>

            {/* Quick Search and Filter utilities */}
            <div className="space-y-2">
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" aria-hidden="true">
                  <Search size={16} />
                </span>
                <input
                  type="text"
                  id="exercise-search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filtrar por exercício, músculo ou aparelho..."
                  aria-label="Filtrar exercícios por nome, músculo ou aparelho"
                  className="w-full bg-[#0a0a0a] border border-[#222] rounded-xl pl-10 pr-4 py-3 text-sm text-zinc-100 placeholder-zinc-650 focus:outline-none focus:border-zinc-500 focus:ring-2 focus:ring-zinc-700 transition-colors"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpar busca"
                    title="Limpar busca"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 rounded-lg p-1"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                )}
              </div>

              {/* Quick Filter Chips */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                {muscleGroups.map((group) => {
                  const isActive = searchQuery.toLowerCase() === group.toLowerCase();
                  return (
                    <button
                      key={group}
                      type="button"
                      onClick={() => setSearchQuery(isActive ? '' : group)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border transition-all duration-200 ${
                        isActive
                          ? 'text-black font-bold border-transparent'
                          : 'text-zinc-400 border-[#222] bg-[#0a0a0a] hover:border-zinc-500 hover:text-white'
                      }`}
                      style={{
                        backgroundColor: isActive ? activeAccentColor : undefined,
                      }}
                    >
                      {group}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Exercise Cards */}
            {filteredExercises.length === 0 ? (
              <div className="text-center py-8 px-4 bg-[#0a0a0a] border border-zinc-900 border-dashed rounded-xl">
                <p className="text-xs text-zinc-400 font-sans">Nenhum exercício corresponde ao seu filtro.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredExercises.map((ex) => {
                  const sessionState = activeSession[ex.id] || { weight: '', completed: false, completedSets: 0 };
                  const previousCarga = previousCargas[ex.id];

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
                className="flex items-center justify-center gap-2 py-3 bg-[#0a0a0a] text-zinc-350 hover:text-white hover:bg-[#111] rounded-xl border border-[#222] transition-colors font-display text-xs font-bold uppercase tracking-widest"
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
            onNavigateToTracker={() => setCurrentView('tracker')}
          />
        )}

        {/* Floating Action Button (FAB) for Finalize Workout */}
        <AnimatePresence>
          {currentView === 'tracker' && completedExercises >= 1 && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleFinalizeWorkout}
              className="fixed bottom-6 right-6 z-45 w-14 h-14 rounded-full flex items-center justify-center text-black shadow-2xl active:scale-95"
              style={{ 
                backgroundColor: activeAccentColor,
                boxShadow: `0 8px 24px -4px ${activeAccentColor}80`
              }}
              aria-label="Finalizar treino ativo"
            >
              <CheckCircle2 size={24} strokeWidth={2.5} />
              <span className="absolute -top-1.5 -right-1.5 bg-[#050505] text-white text-[10px] font-mono font-black rounded-full w-6 h-6 flex items-center justify-center border border-[#222] shadow">
                {completedExercises}
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </main>

      {/* Footer utility Backup controls */}
      <footer className="bg-[#0a0a0a] border-t border-[#222] mt-auto select-none">
        <div className="w-full max-w-lg mx-auto px-4 py-4 space-y-3">
          
          <div className="flex items-center justify-between gap-4 text-xs">
            <span className="text-zinc-400 font-sans font-bold uppercase tracking-widest text-[10px] flex items-center gap-1.5">
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
                <Upload size={12} className="text-gym-accent-a" />
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
            <p className="text-[10px] text-zinc-500 font-sans">
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
        onTimerComplete={handleTimerComplete}
        accentColor={activeAccentColor}
      />

      {/* Custom Themed Dialog Modal */}
      <ConfirmDialog
        isOpen={dialog !== null}
        title={dialog?.title || ''}
        message={dialog?.message || ''}
        confirmLabel={dialog?.confirmLabel || ''}
        cancelLabel={dialog?.cancelLabel}
        variant={dialog?.variant || 'info'}
        onConfirm={dialog?.onConfirm || (() => {})}
        onCancel={() => setDialog(null)}
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
            <div className="w-full max-w-sm bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 text-center space-y-4 shadow-3xl relative overflow-hidden">
              
              {/* Confetti Rain Overlay */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {Array.from({ length: 30 }, (_, idx) => {
                  const left = Math.random() * 100;
                  const duration = 2 + Math.random() * 3;
                  const delay = Math.random() * 2;
                  const colors = [activeAccentColor, '#ffffff', '#e2e8f0', '#f59e0b'];
                  const color = colors[idx % colors.length];
                  return (
                    <div
                      key={idx}
                      className="absolute w-2 h-2 animate-confetti rounded-sm"
                      style={{
                        left: `${left}%`,
                        top: `-10px`,
                        backgroundColor: color,
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`
                      }}
                    />
                  );
                })}
              </div>

              <div 
                className="w-16 h-16 rounded-xl mx-auto flex items-center justify-center text-black"
                style={{ backgroundColor: activeAccentColor }}
              >
                <Check size={36} strokeWidth={3} />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-display font-black tracking-tight text-white uppercase">Parabéns!</h3>
                <p className="text-xs text-zinc-300 font-sans">
                  {celebrationMessage}
                </p>
              </div>

              <div className="bg-[#111] p-3 rounded-lg border border-[#222] font-sans text-xs text-zinc-400 space-y-2">
                <p>Os seus dados de carga foram arquivados com sucesso.</p>
                {celebrationVolume > 0 && (
                  <div className="flex justify-between border-t border-[#222] pt-2 text-[11px] font-mono text-zinc-300">
                    <span>Volume Total Levantado:</span>
                    <span className="font-black text-white">{celebrationVolume} kg</span>
                  </div>
                )}
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
