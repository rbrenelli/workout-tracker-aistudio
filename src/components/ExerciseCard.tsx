/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Timer, Trophy, Dumbbell, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  session: { weight: string; completed: boolean; completedSets: number };
  onExerciseChange: (
    exerciseId: string,
    field: 'weight' | 'completed' | 'completedSets',
    value: string | boolean | number
  ) => void;
  onStartTimer: (duration: number, exerciseId: string) => void;
  accentColor: string;
  previousCarga?: string; // Shows previous load for motivation
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  session,
  onExerciseChange,
  onStartTimer,
  accentColor,
  previousCarga,
}) => {
  const [showGuide, setShowGuide] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      layout="position"
      id={`exercise-card-${exercise.id}`}
      className="bg-[#0a0a0a] border rounded-xl overflow-hidden shadow-md transition-all duration-300"
      style={{
        borderColor: session.completed 
          ? `${accentColor}60` 
          : '#222222',
        boxShadow: session.completed
          ? `0 0 15px -5px ${accentColor}30`
          : 'none'
      }}
    >
      {/* Top Banner Section */}
      <div
        role="button"
        tabIndex={0}
        aria-expanded={showGuide}
        aria-label={`Instruções para ${exercise.name}`}
        className="p-4 flex items-start justify-between gap-3 selection:bg-zinc-800 cursor-pointer hover:bg-[#111] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-750 rounded-t-xl"
        onClick={() => setShowGuide(!showGuide)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setShowGuide(!showGuide);
          }
        }}
      >
        <div className="flex-1">
          {/* Muscle Category Pin */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className="text-[10.5px] font-mono uppercase tracking-widest font-black text-zinc-450 bg-[#111] px-2 py-0.5 rounded border border-[#222]">
              {exercise.muscleGroup}
            </span>
            {previousCarga && (
              <span className="text-[10.5px] font-mono tracking-widest uppercase font-bold text-amber-550 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                <Trophy size={11.5} aria-hidden="true" />
                <span>Anterior: {previousCarga}kg</span>
              </span>
            )}
          </div>
          
          <h3 className="text-[15.5px] font-display font-black text-zinc-100 tracking-tight leading-snug line-clamp-2">
            {exercise.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[12.5px] text-zinc-400 font-sans">Meta:</span>
            <span className="text-[12.5px] font-mono text-zinc-300 bg-[#161616] border border-[#262626] px-2 py-0.5 rounded font-black">
              {exercise.defaultSets} séries x {exercise.defaultReps} reps
            </span>
          </div>
        </div>

        {/* Action Button: Rest timer & Guide toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Rest Timer Trigger */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onStartTimer(60, exercise.id); }}
            className="w-12 h-12 bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222] rounded-lg transition-all flex items-center justify-center border border-[#333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
            title="Iniciar descanso de 60 segundos"
            aria-label="Iniciar cronômetro de descanso de 60 segundos"
          >
            <Timer size={18} aria-hidden="true" />
          </button>

          {/* Expand Details Trigger */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setShowGuide(!showGuide); }}
            aria-label={showGuide ? "Ocultar guia do aparelho" : "Exibir guia do aparelho"}
            aria-expanded={showGuide}
            className="w-12 h-12 bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222] rounded-lg transition-all flex items-center justify-center border border-[#333] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600"
          >
            {showGuide ? <ChevronUp size={18} aria-hidden="true" /> : <ChevronDown size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Interactive Equipment and Guide Dropdown */}
      <AnimatePresence initial={false}>
        {showGuide && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden bg-[#050505] border-t border-[#222]"
          >
            <div className="p-4 flex flex-col gap-4">
              {/* Visual Image - Single Image Layout */}
              <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-3 flex flex-col justify-center items-center min-h-[160px] relative">
                {exercise.images && exercise.images.length > 0 ? (
                  <img
                    src={exercise.images[0].startsWith('http') ? exercise.images[0] : `${import.meta.env.BASE_URL}${exercise.images[0].replace(/^\//, '')}`}
                    alt={exercise.name}
                    className="w-[80%] h-auto rounded-lg shadow-md max-h-[200px] object-contain bg-[#111] p-1 border border-[#333]"
                  />
                ) : (
                  <div className="text-zinc-500 text-xs text-center py-8 w-full">Imagem indisponível</div>
                )}
              </div>

              {/* Execution steps & targets */}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setShowInstructions(!showInstructions)}
                    className="flex items-center justify-between bg-[#111] hover:bg-[#1a1a1a] transition-colors border border-[#222] rounded-lg p-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 w-full"
                  >
                    <span className="text-[12.5px] font-display font-black text-zinc-400 uppercase tracking-widest">
                      Como Executar
                    </span>
                    {showInstructions ? <ChevronUp size={16} className="text-zinc-400" /> : <ChevronDown size={16} className="text-zinc-400" />}
                  </button>

                  <AnimatePresence initial={false}>
                    {showInstructions && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="bg-[#0a0a0a] border border-[#222] rounded-lg p-3 mt-1">
                          <ol className="list-decimal list-inside text-[13.5px] text-zinc-400 space-y-1.5 leading-relaxed">
                            {exercise.instructions.map((step, idx) => (
                              <li key={idx} className="marker:text-zinc-600 pl-1">
                                <span className="text-zinc-300">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="pt-1 flex flex-col gap-2">
                  <span className="text-[12.5px] text-zinc-400 font-mono flex items-start gap-1">
                    <Dumbbell size={13} className="mt-0.5 shrink-0 text-zinc-400" aria-hidden="true" />
                    <span>
                      <strong className="text-zinc-450 uppercase tracking-wider text-[11.5px] font-bold">Foco: </strong>
                      {exercise.targetMuscles.join(', ')}
                    </span>
                  </span>
                  
                  {exercise.tips && (
                    <div className="bg-[#111] p-2 rounded-lg border border-[#222] text-[12.5px] text-zinc-400">
                      <span className="text-amber-550 font-bold select-none">Dica de execução: </span>
                      {exercise.tips}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Simplified, Single Weight Tracking Bar at bottom */}
      <div className="border-t border-[#222] px-4 py-3 bg-[#111] flex items-center justify-between gap-4 flex-wrap xs:flex-nowrap">
        {/* Input for Weight Carga / Cardio Duration */}
        <div className="flex flex-col">
          <label 
            htmlFor={`weight-input-${exercise.id}`}
            className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest font-black leading-none mb-1 cursor-pointer"
          >
            {exercise.muscleGroup === 'Cardiovascular' ? 'Tempo' : 'Carga'}
          </label>
          <div className="relative flex items-center w-36">
            <input
              type="text"
              id={`weight-input-${exercise.id}`}
              inputMode={exercise.muscleGroup === 'Cardiovascular' ? 'text' : 'decimal'}
              value={session.weight}
              onChange={(e) => onExerciseChange(exercise.id, 'weight', e.target.value)}
              placeholder={previousCarga || (exercise.muscleGroup === 'Cardiovascular' ? "20" : "0")}
              aria-label={exercise.muscleGroup === 'Cardiovascular' ? `Tempo em minutos para ${exercise.name}` : `Carga em quilogramas para ${exercise.name}`}
              className="w-full bg-[#1a1a1a] border border-[#2e2e2e] focus:border-zinc-550 focus:ring-2 focus:ring-zinc-700 rounded-lg py-1.5 pl-3 pr-10 text-left text-white font-mono text-[15.5px] font-black focus:outline-none transition-all"
              style={{
                borderLeftColor: session.weight ? accentColor : undefined,
                borderLeftWidth: session.weight ? '3px' : undefined,
              }}
            />
            <span className="absolute right-2.5 text-[11.5px] font-mono text-zinc-500 font-bold uppercase select-none pointer-events-none" aria-hidden="true">
              {exercise.muscleGroup === 'Cardiovascular' ? 'min' : 'kg'}
            </span>
          </div>
        </div>

        {/* Set/Series Tracking Dots */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {Array.from({ length: exercise.defaultSets }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  // Sequential fill logic:
                  // If this dot is filled and is the last filled one, unfill from here
                  // If this dot is empty, fill up to and including this dot
                  const newSets = i < session.completedSets ? i : i + 1;
                  onExerciseChange(exercise.id, 'completedSets', newSets);
                  if (newSets >= exercise.defaultSets) {
                    onExerciseChange(exercise.id, 'completed', true);
                  } else if (session.completed && newSets < exercise.defaultSets) {
                    onExerciseChange(exercise.id, 'completed', false);
                  }
                }}
                aria-label={`Série ${i + 1} de ${exercise.defaultSets}: ${i < session.completedSets ? 'concluída' : 'pendente'}`}
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full border-2 transition-all duration-200 ${
                  i < session.completedSets
                    ? 'border-transparent scale-110'
                    : 'border-zinc-600 bg-transparent hover:border-zinc-400'
                }`}
                style={{
                  backgroundColor: i < session.completedSets ? accentColor : 'transparent',
                  boxShadow: i < session.completedSets ? `0 0 8px ${accentColor}40` : 'none',
                }}
              />
            ))}
          </div>
          <span className="text-[11px] font-mono text-zinc-400 font-bold tabular-nums">
            {session.completedSets}/{exercise.defaultSets}
          </span>
        </div>

        {/* Satisfying checkbox for the whole exercise */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-zinc-450 mr-1">
            {session.completed ? 'CONCLUÍDO' : 'FEITO'}
          </span>
          <button
            type="button"
            onClick={() => {
              const nextCompleted = !session.completed;
              onExerciseChange(exercise.id, 'completed', nextCompleted);
              if (nextCompleted) {
                onExerciseChange(exercise.id, 'completedSets', exercise.defaultSets);
              } else {
                onExerciseChange(exercise.id, 'completedSets', 0);
              }
            }}
            aria-label={session.completed ? `Desmarcar exercício ${exercise.name}` : `Marcar exercício ${exercise.name} como concluído`}
            aria-pressed={session.completed}
            className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-600 ${
              session.completed
                ? 'border-transparent shadow-lg text-black'
                : 'border-[#333] bg-[#1a1a1a] text-transparent hover:border-[#444] hover:bg-[#222]'
            }`}
            style={{
              backgroundColor: session.completed ? accentColor : 'transparent',
              boxShadow: session.completed ? `0 0 16px ${accentColor}40` : 'none'
            }}
          >
            <Check size={20} strokeWidth={4} className={session.completed ? 'text-black' : 'text-zinc-600'} aria-hidden="true" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
