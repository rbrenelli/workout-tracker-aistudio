/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState, useRef } from 'react';
import { X, Play, Pause, RotateCcw, Plus, Minus, Minimize2, BellDot } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface RestTimerProps {
  duration: number; // in seconds
  isOpen: boolean;
  onClose: () => void;
  onTimerComplete?: () => void; // Callback when timer finishes
  accentColor: string; // Neon highlight color
}

export const RestTimer: React.FC<RestTimerProps> = ({
  duration,
  isOpen,
  onClose,
  onTimerComplete,
  accentColor,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isActive, setIsActive] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart timer when a new one is requested
  useEffect(() => {
    setTimeLeft(duration);
    setIsActive(true);
    setIsMinimized(false);
  }, [duration, isOpen]);

  // Main countdown logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            triggerCompletionAlert();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isActive, timeLeft]);

  // Alert with Audio Beep and Vibration when countdown finishes
  const triggerCompletionAlert = () => {
    // 1. Vibrate device
    if (typeof navigator !== 'undefined' && navigator.vibrate) {
      navigator.vibrate([300, 150, 300, 150, 400]);
    }

    // 2. Play Web Audio API Beep
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        const audioCtx = new AudioContextClass();
        
        const playBeep = (freq: number, start: number, duration: number) => {
          const osc = audioCtx.createOscillator();
          const gainNode = audioCtx.createGain();
          
          osc.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, audioCtx.currentTime + start);
          
          gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime + start);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + start + duration - 0.05);
          
          osc.start(audioCtx.currentTime + start);
          osc.stop(audioCtx.currentTime + start + duration);
        };

        playBeep(880, 0, 0.25);
        playBeep(880, 0.4, 0.25);
        playBeep(1200, 0.8, 0.5);
      }
    } catch {
      // Silent fail
    }

    // 3. Fire completion callback
    if (onTimerComplete) {
      onTimerComplete();
    }
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setTimeLeft(duration);
    setIsActive(true);
  };

  const adjustTime = (amount: number) => {
    setTimeLeft((prev) => Math.max(0, prev + amount));
  };

  if (!isOpen) return null;

  // Circular calculations
  const radius = 85;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (timeLeft / duration) * circumference;

  // Format MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isFinished = timeLeft === 0;

  return (
    <AnimatePresence>
      {isMinimized ? (
        /* Minimized Sticky Bubble on bottom right */
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          id="rest-timer-minimized"
          className="fixed bottom-24 right-4 z-50 flex items-center gap-3 bg-[#0a0a0a] border border-[#222] p-3 rounded-full shadow-2xl backdrop-blur-md"
          style={{ borderColor: isFinished ? accentColor : 'rgba(34, 34, 34, 0.6)' }}
        >
          <button
            onClick={() => setIsMinimized(false)}
            aria-label="Maximizar cronômetro de descanso"
            className="flex items-center gap-2"
          >
            <div className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${isFinished ? 'animate-ping' : ''}`}
                 style={{ borderColor: accentColor }}
            >
              <span className="text-xs font-mono font-bold text-white">
                {timeLeft > 0 ? timeLeft : '✓'}
              </span>
            </div>
            <div className="text-left pr-1">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold font-display">Descanso</p>
              <p className="text-xs font-mono font-bold text-white">
                {isFinished ? 'Pronto!' : formatTime(timeLeft)}
              </p>
            </div>
          </button>
          
          <button
            onClick={onClose}
            aria-label="Fechar cronômetro"
            className="text-zinc-400 hover:text-white p-1 rounded-full hover:bg-[#1a1a1a] transition-colors"
          >
            <X size={14} />
          </button>
        </motion.div>
      ) : (
        /* Full Screen Overlay */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          id="rest-timer-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md px-4"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 20 }}
            className="w-full max-w-sm bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 shadow-3xl text-center relative overflow-hidden"
            style={{
              boxShadow: isFinished 
                ? `0 0 80px -10px ${accentColor}`
                : `0 20px 40px -15px rgba(0, 0, 0, 0.7)`
            }}
          >
            {/* Visual ambient pulse background when finished */}
            {isFinished && (
              <div 
                className="absolute inset-0 opacity-5 animate-pulse pointer-events-none"
                style={{ backgroundColor: accentColor }}
              />
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setIsMinimized(true)}
                className="text-zinc-400 hover:text-white flex items-center gap-1.5 text-sm font-display hover:bg-[#111] px-2.5 py-1.5 rounded-lg transition-all border border-transparent hover:border-[#222]"
                title="Minimizar cronômetro para persistir na tela"
              >
                <Minimize2 size={14} />
                <span>Minimizar</span>
              </button>
              <h3 className="text-base font-display font-medium text-zinc-300">Tempo de Descanso</h3>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white hover:bg-[#111] p-1.5 rounded-lg transition-colors border border-transparent hover:border-[#222]"
                aria-label="Fechar descanso"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Duration Presets */}
            <div className="flex items-center justify-center gap-2 mb-2 flex-wrap">
              {[30, 60, 90, 120, 180].map((preset) => (
                <button
                  key={preset}
                  onClick={() => {
                    setTimeLeft(preset);
                    setIsActive(true);
                    if (navigator.vibrate) {
                      navigator.vibrate([10]);
                    }
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-mono font-bold transition-all border ${
                    timeLeft === preset && isActive
                      ? 'border-transparent text-black font-black'
                      : 'border-[#222] text-zinc-400 bg-[#111] hover:bg-[#1a1a1a] hover:text-white'
                  }`}
                  style={{
                    backgroundColor: timeLeft === preset && isActive ? accentColor : undefined,
                  }}
                >
                  {preset >= 60 ? `${preset / 60}min` : `${preset}s`}
                </button>
              ))}
            </div>

            {/* Rest Circular Display */}
            <div className="relative w-56 h-56 mx-auto my-6 flex items-center justify-center">
              {/* Back Ring */}
              <svg viewBox="0 0 224 224" className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="112"
                  cy="112"
                  r={radius}
                  className="stroke-[#222]"
                  strokeWidth="6"
                  fill="transparent"
                />
                {/* Active Progress Ring */}
                <motion.circle
                  cx="112"
                  cy="112"
                  r={radius}
                  style={{ stroke: accentColor }}
                  strokeWidth="6"
                  fill="transparent"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  animate={{ strokeDashoffset }}
                  transition={{ duration: 0.35, ease: 'linear' }}
                />
              </svg>

              {/* Timer Text inside circle */}
              <div className="z-10 flex flex-col items-center select-none">
                {isFinished ? (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ repeat: Infinity, duration: 1 }}
                    className="flex flex-col items-center"
                  >
                    <BellDot className="mb-1.5" style={{ color: accentColor }} size={40} />
                    <span className="text-3xl font-display font-bold text-white uppercase tracking-wider">Treinar!</span>
                  </motion.div>
                ) : (
                  <span className="text-5xl font-mono font-bold text-white tracking-tight leading-none">
                    {formatTime(timeLeft)}
                  </span>
                )}
              </div>
            </div>

            {/* Label below the circle */}
            {!isFinished && (
              <div className="text-xs uppercase font-display font-semibold text-zinc-400 tracking-widest text-center -mt-2 mb-6">
                segundos restantes
              </div>
            )}

            {/* Time Adjustment Controls */}
            <div className="flex items-center justify-center gap-4 mb-6">
              <button
                onClick={() => adjustTime(-10)}
                disabled={timeLeft <= 10}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#222] text-zinc-400 hover:bg-[#111] hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
                title="Remover 10 segundos"
                aria-label="Remover 10 segundos"
              >
                <Minus size={16} />
              </button>
              <div className="px-3 py-1 bg-[#111] rounded-full border border-[#222] select-none">
                <span className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wide">Ajustar Tempo</span>
              </div>
              <button
                onClick={() => adjustTime(10)}
                className="flex items-center justify-center w-10 h-10 rounded-full border border-[#222] text-zinc-350 hover:bg-[#111] hover:text-white transition-all"
                title="Adicionar 10 segundos"
                aria-label="Adicionar 10 segundos"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Action controls */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={handleToggle}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-display text-sm font-semibold transition-all"
                style={{
                  backgroundColor: isActive ? 'rgba(39, 39, 42, 0.8)' : accentColor,
                  color: isActive ? '#f4f4f5' : '#000000',
                }}
              >
                {isActive ? (
                  <>
                    <Pause size={16} fill="currentColor" />
                    <span>Pausar</span>
                  </>
                ) : (
                  <>
                    <Play size={16} fill="currentColor" />
                    <span>Iniciar</span>
                  </>
                )}
              </button>
              
              <button
                onClick={handleReset}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl border border-[#222] text-zinc-350 hover:bg-[#111] transition-colors font-display text-sm font-semibold uppercase tracking-wider"
              >
                <RotateCcw size={16} />
                <span>Reiniciar</span>
              </button>
            </div>

            {/* Small motivative tip */}
            <p className="text-xs text-zinc-500 mt-4 italic font-sans leading-relaxed">
              Use o intervalo para respirar fundo, se hidratar e focar na próxima série.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
