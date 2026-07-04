/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  variant: 'danger' | 'success' | 'info';
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant,
  onConfirm,
  onCancel,
}) => {
  const getIcon = () => {
    switch (variant) {
      case 'danger':
        return <AlertTriangle size={28} className="text-red-500" />;
      case 'success':
        return <CheckCircle size={28} className="text-emerald-500" />;
      case 'info':
      default:
        return <Info size={28} className="text-sky-500" />;
    }
  };

  const getButtonClass = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'success':
        return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      case 'info':
      default:
        return 'bg-zinc-200 hover:bg-zinc-300 text-black';
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog Card */}
          <motion.div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-desc"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.4 }}
            className="relative w-full max-w-sm bg-[#0a0a0a] border border-[#222] rounded-2xl p-6 shadow-3xl space-y-4 text-center z-10"
          >
            <div className="mx-auto w-12 h-12 rounded-full bg-[#111] border border-[#222] flex items-center justify-center">
              {getIcon()}
            </div>

            <div className="space-y-1.5">
              <h3 id="confirm-dialog-title" className="text-lg font-display font-black tracking-tight text-white uppercase">
                {title}
              </h3>
              <p id="confirm-dialog-desc" className="text-xs text-zinc-400 font-sans leading-relaxed">
                {message}
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              {cancelLabel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="flex-1 py-2.5 rounded-xl font-display text-xs font-bold uppercase tracking-wider bg-[#111] text-zinc-400 hover:text-white border border-[#222] hover:border-[#333] transition-colors"
                >
                  {cancelLabel}
                </button>
              )}
              <button
                type="button"
                onClick={onConfirm}
                className={`flex-1 py-2.5 rounded-xl font-display text-xs font-black uppercase tracking-widest transition-colors ${getButtonClass()}`}
              >
                {confirmLabel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
