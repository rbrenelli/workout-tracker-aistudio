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

interface LegacySet {
  weight?: string | number;
  completed?: boolean;
}

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
          const legacySets = value as LegacySet[];
          const firstCompletedSet = legacySets.find((s) => s.completed);
          const firstSetWithWeight = legacySets.find((s) => s.weight !== undefined && s.weight !== '');
          migrated[key] = {
            weight: firstSetWithWeight && firstSetWithWeight.weight !== undefined ? String(firstSetWithWeight.weight) : '',
            completed: !!firstCompletedSet,
          };
        } else if (value && typeof value === 'object') {
          migrated[key] = value;
        }
      });
      const initial = createEmptySession(defaultExercises);
      return { ...initial, ...migrated };
    }
  } catch {
    // Silent fail to avoid crashing the application
  }
  return createEmptySession(defaultExercises);
};

export const saveActiveSession = (routine: 'A' | 'B', state: ExerciseSessionState): void => {
  try {
    const key = routine === 'A' ? KEYS.ACTIVE_A : KEYS.ACTIVE_B;
    localStorage.setItem(key, JSON.stringify(state));
  } catch {
    // Silent fail
  }
};

export const loadHistory = (): WorkoutHistoryEntry[] => {
  try {
    const raw = localStorage.getItem(KEYS.HISTORY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // Silent fail
  }
  return [];
};

export const saveHistory = (history: WorkoutHistoryEntry[]): void => {
  try {
    localStorage.setItem(KEYS.HISTORY, JSON.stringify(history));
  } catch {
    // Silent fail
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
  } catch {
    alert('Erro ao exportar backup. Tente novamente.');
  }
};

// Validate and import backup
export interface ParsedBackup {
  activeA: ExerciseSessionState;
  activeB: ExerciseSessionState;
  history: WorkoutHistoryEntry[];
}

const isExerciseSession = (val: unknown): val is { weight: string; completed: boolean } => {
  return (
    val !== null &&
    typeof val === 'object' &&
    'weight' in val &&
    'completed' in val &&
    typeof (val as { weight: unknown }).weight === 'string' &&
    typeof (val as { completed: unknown }).completed === 'boolean'
  );
};

const isExerciseSessionState = (val: unknown): val is ExerciseSessionState => {
  if (val === null || typeof val !== 'object' || Array.isArray(val)) return false;
  return Object.values(val).every(isExerciseSession);
};

const isWorkoutHistoryEntry = (val: unknown): val is WorkoutHistoryEntry => {
  return (
    val !== null &&
    typeof val === 'object' &&
    'id' in val &&
    'date' in val &&
    'routine' in val &&
    'completedExercisesCount' in val &&
    'totalExercisesCount' in val &&
    'logs' in val &&
    typeof (val as { id: unknown }).id === 'string' &&
    typeof (val as { date: unknown }).date === 'string' &&
    ((val as { routine: unknown }).routine === 'A' || (val as { routine: unknown }).routine === 'B') &&
    typeof (val as { completedExercisesCount: unknown }).completedExercisesCount === 'number' &&
    typeof (val as { totalExercisesCount: unknown }).totalExercisesCount === 'number' &&
    isExerciseSessionState((val as { logs: unknown }).logs)
  );
};

export const parseAndValidateBackup = (fileText: string): ParsedBackup => {
  const data = JSON.parse(fileText);

  if (typeof data !== 'object' || data === null) {
    throw new Error('Formato de arquivo inválido.');
  }

  const activeA = data.activeA || {};
  const activeB = data.activeB || {};
  const history = data.history || [];

  if (!isExerciseSessionState(activeA) || !isExerciseSessionState(activeB)) {
    throw new Error('Dados de treino ativo inválidos.');
  }

  if (!Array.isArray(history) || !history.every(isWorkoutHistoryEntry)) {
    throw new Error('Histórico de treinos inválido.');
  }

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
