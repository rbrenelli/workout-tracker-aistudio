/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, EyeOff, Timer, Trophy, Dumbbell, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Exercise } from '../types';

interface ExerciseCardProps {
  exercise: Exercise;
  session: { weight: string; completed: boolean };
  onExerciseChange: (exerciseId: string, field: 'weight' | 'completed', value: any) => void;
  onStartTimer: (duration: number) => void;
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
        className="p-4 flex items-start justify-between gap-3 selection:bg-zinc-800 cursor-pointer hover:bg-[#111] transition-colors"
        onClick={() => setShowGuide(!showGuide)}
      >
        <div className="flex-1">
          {/* Muscle Category Pin */}
          <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
            <span className="text-[10.5px] font-mono uppercase tracking-widest font-black text-zinc-400 bg-[#111] px-2 py-0.5 rounded border border-[#222]">
              {exercise.muscleGroup}
            </span>
            {previousCarga && (
              <span className="text-[10.5px] font-mono tracking-widest uppercase font-bold text-amber-500 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                <Trophy size={11.5} />
                <span>Anterior: {previousCarga}kg</span>
              </span>
            )}
          </div>
          
          <h3 className="text-[15.5px] font-display font-black text-zinc-100 tracking-tight leading-snug">
            {exercise.name}
          </h3>
          
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-[12.5px] text-zinc-500 font-sans">Meta:</span>
            <span className="text-[12.5px] font-mono text-zinc-350 bg-[#161616] border border-[#262626] px-2 py-0.5 rounded font-black">
              {exercise.defaultSets} séries x {exercise.defaultReps} reps
            </span>
          </div>
        </div>

        {/* Action Button: Rest timer & Guide toggle */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Quick Rest Timer Trigger */}
          <button
            onClick={(e) => { e.stopPropagation(); onStartTimer(60); }}
            className="p-2 bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222] rounded-lg transition-all flex items-center justify-center border border-[#333]"
            title="Iniciar descanso de 60 segundos"
            aria-label="Cronômetro de descanso"
          >
            <Timer size={14} />
          </button>

          {/* Expand Details Trigger */}
          <div
            className="p-2 bg-[#1a1a1a] text-zinc-400 hover:text-white hover:bg-[#222] rounded-lg transition-all flex items-center justify-center border border-[#333]"
            title="Visualizar instruções e aparelho"
            aria-label="Exibir guia do aparelho"
          >
            {showGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </div>
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
            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Visual Images */}
              <div className="bg-[#0a0a0a] border border-[#222] rounded-xl p-3 flex flex-col justify-between min-h-[160px] relative">
                <div className="text-[11.5px] font-mono text-zinc-500 uppercase tracking-widest mb-2 select-none font-bold text-center">
                  Aparelho a ser utilizado:
                </div>
                <div className="text-center mb-4">
                  <span className="text-[15.5px] font-sans font-bold text-zinc-200 uppercase tracking-wide">
                    {exercise.equipment}
                  </span>
                </div>

                <div className="flex-1 flex flex-col gap-2 items-center justify-center">
                  {exercise.images && exercise.images.map((imgUrl, index) => (
                    <img key={index} src={imgUrl.startsWith('http') ? imgUrl : `${import.meta.env.BASE_URL}${imgUrl.replace(/^\//, '')}`} alt={`${exercise.equipment} ${index + 1}`} className="max-w-full h-auto rounded-lg shadow-md max-h-[200px] object-contain bg-[#111] p-1 border border-[#333]" />
                  ))}
                  {(!exercise.images || exercise.images.length === 0) && (
                     <div className="text-zinc-500 text-xs text-center py-8">Imagens indisponíveis</div>
                  )}
                </div>
              </div>

              {/* Right Column: Execution steps & targets */}
              <div className="flex flex-col justify-between gap-3">
                <div>
                  <h4 className="text-[12.5px] font-display font-black text-zinc-400 uppercase tracking-widest mb-1.5">
                    Como Executar:
                  </h4>
                  <ol className="list-decimal list-inside text-[13.5px] text-zinc-400 space-y-1.5 leading-relaxed">
                    {exercise.instructions.map((step, idx) => (
                      <li key={idx} className="marker:text-zinc-600 pl-1">
                        <span className="text-zinc-300">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="border-t border-[#222] pt-2.5">
                  <span className="text-[12.5px] text-zinc-400 font-mono flex items-start gap-1">
                    <Dumbbell size={13} className="mt-0.5 shrink-0 text-zinc-400" />
                    <span>
                      <strong className="text-zinc-400 uppercase tracking-wider text-[11.5px] font-bold">Foco: </strong>
                      {exercise.targetMuscles.join(', ')}
                    </span>
                  </span>
                  
                  {exercise.tips && (
                    <div className="mt-2 bg-[#111] p-2 rounded-lg border border-[#222] text-[12.5px] text-zinc-400">
                      <span className="text-amber-500 font-bold select-none">Dica de execução: </span>
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
      <div className="border-t border-[#222] px-4 py-3 bg-[#111] flex items-center justify-between gap-4">
        {/* Input for Weight Carga */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-black leading-none mb-1">Carga</span>
            <div className="relative flex items-center w-28">
              <input
                type="text"
                inputMode="decimal"
                value={session.weight}
                onChange={(e) => onExerciseChange(exercise.id, 'weight', e.target.value)}
                placeholder={previousCarga || "0"}
                className="w-full bg-[#1a1a1a] border border-[#2e2e2e] focus:border-[#444] rounded-lg py-1.5 pl-3 pr-8 text-left text-white font-mono text-[15.5px] font-black focus:outline-none transition-colors"
              />
              <span className="absolute right-2.5 text-[11.5px] font-mono text-zinc-500 font-bold uppercase select-none pointer-events-none">kg</span>
            </div>
          </div>

          <div className="hidden xs:flex flex-col">
            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest font-black leading-none mb-1">Meta Reps</span>
            <div className="bg-[#1a1a1a] border border-[#222] rounded-lg py-1.5 px-3 font-mono text-[13px] font-bold text-zinc-400 text-center select-none">
              {exercise.defaultSets}x {exercise.defaultReps}
            </div>
          </div>
        </div>

        {/* Satisfying checkbox for the whole exercise */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-sans font-bold uppercase tracking-widest text-zinc-500 mr-1 hidden xs:block">
            {session.completed ? 'CONCLUÍDO' : 'FEITO'}
          </span>
          <button
            onClick={() => onExerciseChange(exercise.id, 'completed', !session.completed)}
            aria-label={`Marcar exercício ${exercise.name} como concluído`}
            className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 border ${
              session.completed
                ? 'border-transparent shadow-lg text-black'
                : 'border-[#333] bg-[#1a1a1a] text-transparent hover:border-[#444] hover:bg-[#222]'
            }`}
            style={{
              backgroundColor: session.completed ? accentColor : 'transparent',
              boxShadow: session.completed ? `0 0 16px ${accentColor}40` : 'none'
            }}
          >
            <Check size={18} strokeWidth={4} className={session.completed ? 'text-black' : 'text-zinc-600'} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
