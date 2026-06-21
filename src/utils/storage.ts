/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExerciseSessionState, WorkoutHistoryEntry } from '../types';

const KEYS = {
  ACTIVE_A: 'gym_active_session_A',
  ACTIVE_B: 'gym_active_session_B',
  HISTORY: 'gym_workout_history',
};

// Initial state helpers
export const createEmptySession = (exercises: { id: string }[]): ExerciseSessionState => {
  const state: ExerciseSessionState = {};
  exercises.forEach((ex) => {
    state[ex.id] = {
      weight: '', // Empty initially
      completed: false,
    };
  });
  return state;
};

export const loadActiveSession = (routine: 'A' | 'B', defaultExercises: { id: string }[]): ExerciseSessionState => {
  try {
    const key = routine === 'A' ? KEYS.ACTIVE_A : KEYS.ACTIVE_B;
    const raw = localStorage.getItem(key);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Handle legacy migration if loading older sets structure
      const migrated: ExerciseSessionState = {};
      Object.keys(parsed).forEach((key) => {
        const value = parsed[key];
        if (Array.isArray(value)) {
          // It's a legacy SetLog array, convert to simplified ExerciseSession
          const firstCompletedSet = value.find((s: any) => s.completed);
          const firstSetWithWeight = value.find((s: any) => s.weight);
          migrated[key] = {
            weight: firstSetWithWeight ? firstSetWithWeight.weight : '',
            completed: !!firstCompletedSet,
          };
        } else if (value && typeof value === 'object') {
          migrated[key] = value;
        }
      });
      const initial = createEmptySession(defaultExercises);
      return { ...initial, ...migrated };
    }
  } catch (e) {
    console.error('Error loading active session from localStorage', e);
  }
  return createEmptySession(defaultExercises);
};

export const saveActiveSession = (routine: 'A' | 'B', state: ExerciseSessionState): void => {
  try {
    const key = routine === 'A' ? KEYS.ACTIVE_A : KEYS.ACTIVE_B;
    localStorage.setItem(key, JSON.stringify(state));
  } catch (e) {
    console.error('Error saving active session to localStorage', e);
  }
};

export const loadHistory = (): WorkoutHistoryEntry[] => {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error('Error loading workout history from localStorage', e);
  }
  return [];
};

export const saveHistory = (history: WorkoutHistoryEntry[]): void => {
  try {
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
  } catch (e) {
    console.error('Error saving workout history to localStorage', e);
  }
};

// Export full backup
export const downloadBackupFile = (): void => {
  try {
    const activeA = localStorage.getItem(KEYS.ACTIVE_A) || '{}';
    const activeB = localStorage.getItem(KEYS.ACTIVE_B) || '{}';
    const history = localStorage.getItem(KEYS.HISTORY) || '[]';

    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      activeA: JSON.parse(activeA),
      activeB: JSON.parse(activeB),
      history: JSON.parse(history),
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    
    // Format current date for file name
    const dateStr = new Date().toISOString().split('T')[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `treino_academia_backup_${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  } catch (e) {
    console.error('Error preparing backup download:', e);
    alert('Erro ao exportar backup. Tente novamente.');
  }
};

// Validate and import backup
export interface ParsedBackup {
  activeA: ExerciseSessionState;
  activeB: ExerciseSessionState;
  history: WorkoutHistoryEntry[];
}

export const parseAndValidateBackup = (fileText: string): ParsedBackup => {
  const data = JSON.parse(fileText);

  if (typeof data !== 'object' || data === null) {
    throw new Error('Formato de arquivo inválido.');
  }

  // Soft validation
  const activeA = data.activeA || {};
  const activeB = data.activeB || {};
  const history = Array.isArray(data.history) ? data.history : [];

  return {
    activeA,
    activeB,
    history,
  };
};

export const saveBackupToStorage = (backup: ParsedBackup): void => {
  localStorage.setItem(KEYS.ACTIVE_A, JSON.stringify(backup.activeA));
  localStorage.setItem(KEYS.ACTIVE_B, JSON.stringify(backup.activeB));
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(backup.history));
};
