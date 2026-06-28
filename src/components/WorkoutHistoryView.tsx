/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Calendar, Trash2, Award, History, ChevronRight, ChevronDown, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { WorkoutHistoryEntry } from '../types';
import { EXERCISES_SERIE_A, EXERCISES_SERIE_B } from '../data';

interface WorkoutHistoryViewProps {
  history: WorkoutHistoryEntry[];
  onDeleteEntry: (id: string) => void;
  onClearHistory: () => void;
  accentColorA: string;
  accentColorB: string;
}

export const WorkoutHistoryView: React.FC<WorkoutHistoryViewProps> = ({
  history,
  onDeleteEntry,
  onClearHistory,
  accentColorA,
  accentColorB,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [confirmClear, setConfirmClear] = useState(false);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Combine exercises to ease lookup using a Map for O(1) complexity
  const exercisesMap = useMemo(() => {
    const map = new Map<string, typeof EXERCISES_SERIE_A[number]>();
    EXERCISES_SERIE_A.forEach(ex => map.set(ex.id, ex));
    EXERCISES_SERIE_B.forEach(ex => map.set(ex.id, ex));
    return map;
  }, []);

  // Helper to find exercise name by ID
  const getExerciseName = (id: string) => {
    const found = exercisesMap.get(id);
    return found ? found.name : 'Exercício Omitido';
  };

  const getExerciseGroup = (id: string) => {
    const found = exercisesMap.get(id);
    return found ? found.muscleGroup : 'Geral';
  };

  return (
    <div className="space-y-4" id="workout-history-container">
      {/* History Hero Status Card */}
      <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-500">
            <Award size={24} aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-base font-display font-black text-white uppercase tracking-wider">Histórico de Treino</h3>
            <p className="text-[13px] text-zinc-400 mt-0.5 font-sans">
              Você realizou <span className="text-amber-400 font-bold font-mono text-[15px]">{history.length}</span> treinos no total.
            </p>
          </div>
        </div>

        {history.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (confirmClear) {
                onClearHistory();
                setConfirmClear(false);
              } else {
                setConfirmClear(true);
                setTimeout(() => setConfirmClear(false), 4000); // Disarm after 4s
              }
            }}
            aria-label={confirmClear ? "Confirmar reset de todo o histórico" : "Resetar todos os logs de histórico"}
            className={`px-3 py-1.5 rounded text-sm font-semibold font-display transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 ${
              confirmClear 
                ? 'bg-red-600 text-white animate-pulse font-bold' 
                : 'bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222] border border-[#333]'
            }`}
          >
            {confirmClear ? 'Confirmar Reset!' : 'Resetar Logs'}
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="text-center py-10 px-4 bg-[#0a0a0a] border border-[#222] border-dashed rounded-xl">
          <History className="mx-auto text-zinc-500 mb-3" size={36} aria-hidden="true" />
          <p className="text-sm font-display font-black text-zinc-400 uppercase tracking-wide">Nenhum treino registrado ainda</p>
          <p className="text-xs text-zinc-500 font-sans mt-2">
            Complete seus exercícios e clique no botão de "Finalizar Treino" para salvar o seu progresso diário!
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {history.map((entry) => {
            const isA = entry.routine === 'A';
            const accentColor = isA ? accentColorA : accentColorB;
            const isExpanded = expandedId === entry.id;

            // Formatted date
            const routineLabel = isA ? 'Série A (Coxas e Puxada)' : 'Série B (Pernas e Supino)';

            return (
              <div
                key={entry.id}
                id={`history-entry-card-${entry.id}`}
                className="bg-[#0a0a0a] border border-[#222] rounded-xl overflow-hidden shadow-sm"
              >
                {/* Entry Header Accordion Button */}
                <div
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-label={`${entry.routine === 'A' ? 'Série A' : 'Série B'}, ${entry.date}. ${isExpanded ? 'Recolher detalhes' : 'Expandir detalhes'}`}
                  onClick={() => toggleExpand(entry.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleExpand(entry.id);
                    }
                  }}
                  className="p-3.5 flex items-center justify-between gap-3 cursor-pointer hover:bg-[#111] transition-all select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-700 rounded-t-xl"
                >
                  <div className="flex items-center gap-3">
                    {/* Circle badge denoting series */}
                    <div
                      className="w-8 h-8 rounded flex items-center justify-center font-display font-black text-sm text-black"
                      style={{ backgroundColor: accentColor }}
                    >
                      {entry.routine}
                    </div>
                    
                    <div>
                      <h4 className="text-[13.5px] font-display font-bold text-zinc-200">
                        {routineLabel}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-sans mt-0.5">
                        <Calendar size={11} className="text-zinc-500" aria-hidden="true" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Circle badge denoting series */}
                    <span className="text-[11.5px] font-mono font-bold text-zinc-400 bg-[#111] px-2 py-0.5 rounded border border-[#222]">
                      {entry.completedExercisesCount}/{entry.totalExercisesCount} aparelhos
                    </span>
                    
                    {/* Expand indicator icon */}
                    <div className="text-zinc-500 font-sans">
                      {isExpanded ? <ChevronDown size={14} aria-hidden="true" /> : <ChevronRight size={14} aria-hidden="true" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-[#050505] border-t border-[#222]"
                    >
                      <div className="p-3 space-y-3">
                        <div className="text-[11.5px] font-mono text-zinc-500 uppercase tracking-widest font-black select-none">
                          Histórico de Cargas do Treino:
                        </div>

                        {/* List of exercises and sets */}
                        <div className="space-y-2">
                          {Object.entries(entry.logs).map(([exId, sessionData]) => {
                            const session = sessionData as { weight: string; completed: boolean };
                            if (!session.completed && !session.weight) return null;

                            const metaExercise = exercisesMap.get(exId);

                            return (
                              <div key={exId} className="bg-[#0a0a0a] rounded-lg p-2.5 border border-[#222] flex items-center justify-between gap-4">
                                <div className="flex-1">
                                  <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                    <span className="text-[13.5px] font-display font-bold text-zinc-200">
                                      {getExerciseName(exId)}
                                    </span>
                                    <span className="text-[10px] font-mono font-bold text-zinc-450 bg-[#111] border border-[#222] px-1.5 py-0.2 rounded">
                                      {getExerciseGroup(exId)}
                                    </span>
                                  </div>
                                  <div className="text-xs text-zinc-400 font-sans">
                                    Meta sugerida: <span className="font-mono text-zinc-300 font-medium">{metaExercise ? `${metaExercise.defaultSets}x ${metaExercise.defaultReps}` : '--'}</span>
                                  </div>
                                </div>

                                <div className="text-right space-y-1">
                                  <div className="text-[13.5px] font-mono font-black text-amber-500">
                                    {session.weight ? `${session.weight} kg` : 'Sem Carga'}
                                  </div>
                                  <div className="text-[11px] uppercase font-sans font-black tracking-wider">
                                    {session.completed ? (
                                      <span className="text-emerald-450">✓ Feito</span>
                                    ) : (
                                      <span className="text-zinc-600">Não Feito</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Delete entry action */}
                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => onDeleteEntry(entry.id)}
                            aria-label={`Remover registro de treino de ${entry.date}`}
                            className="bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-display font-medium transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-600"
                          >
                            <Trash2 size={12} aria-hidden="true" />
                            <span>Remover Registro</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
