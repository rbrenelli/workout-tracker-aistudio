/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ExerciseSessionState, WorkoutHistoryEntry } from '../types';

const KEYS = {
  ACTIVE_A: 'gym_active_session_A',
  ACTIVE_B: 'gym_active_session_B',
  ACTIVE_C: 'gym_active_session_C',
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
      completedSets: 0,
    };
  });
  return state;
};

export const loadActiveSession = (routine: 'A' | 'B' | 'C', defaultExercises: { id: string }[]): ExerciseSessionState => {
  try {
    const key = routine === 'A' ? KEYS.ACTIVE_A : routine === 'B' ? KEYS.ACTIVE_B : KEYS.ACTIVE_C;
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
            completedSets: firstCompletedSet ? 1 : 0,
          };
        } else if (value && typeof value === 'object') {
          migrated[key] = {
            weight: (value as any).weight || '',
            completed: !!(value as any).completed,
            completedSets: typeof (value as any).completedSets === 'number' ? (value as any).completedSets : ((value as any).completed ? 3 : 0),
          };
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

export const saveActiveSession = (routine: 'A' | 'B' | 'C', state: ExerciseSessionState): void => {
  try {
    const key = routine === 'A' ? KEYS.ACTIVE_A : routine === 'B' ? KEYS.ACTIVE_B : KEYS.ACTIVE_C;
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
export const downloadBackupFile = () => {
  try {
    const backupData = {
      version: 1,
      exportedAt: new Date().toISOString(),
      activeA: JSON.parse(localStorage.getItem(KEYS.ACTIVE_A) || '{}'),
      activeB: JSON.parse(localStorage.getItem(KEYS.ACTIVE_B) || '{}'),
      activeC: JSON.parse(localStorage.getItem(KEYS.ACTIVE_C) || '{}'),
      history: loadHistory(),
    };

    const fileBlob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const downloadAnchor = document.createElement('a');
    downloadAnchor.href = URL.createObjectURL(fileBlob);
    downloadAnchor.download = `treino_backup_${new Date().toISOString().split('T')[0]}.json`;
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
  activeC: ExerciseSessionState;
  history: WorkoutHistoryEntry[];
}

const isExerciseSession = (val: unknown): val is { weight: string; completed: boolean; completedSets?: number } => {
  return (
    val !== null &&
    typeof val === 'object' &&
    'weight' in val &&
    'completed' in val &&
    typeof (val as { weight: unknown }).weight === 'string' &&
    typeof (val as { completed: unknown }).completed === 'boolean' &&
    (!('completedSets' in val) || typeof (val as { completedSets: unknown }).completedSets === 'number')
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
    ((val as { routine: unknown }).routine === 'A' || (val as { routine: unknown }).routine === 'B' || (val as { routine: unknown }).routine === 'C') &&
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

  const rawActiveA = data.activeA || {};
  const rawActiveB = data.activeB || {};
  const rawActiveC = data.activeC || {};
  const rawHistory = data.history || [];

  if (!isExerciseSessionState(rawActiveA) || !isExerciseSessionState(rawActiveB) || !isExerciseSessionState(rawActiveC)) {
    throw new Error('Dados de treino ativo inválidos.');
  }

  if (!Array.isArray(rawHistory) || !rawHistory.every(isWorkoutHistoryEntry)) {
    throw new Error('Histórico de treinos inválido.');
  }

  const sanitizeState = (state: ExerciseSessionState): ExerciseSessionState => {
    const sanitized: ExerciseSessionState = {};
    Object.keys(state).forEach((key) => {
      const val = state[key];
      sanitized[key] = {
        weight: val.weight,
        completed: val.completed,
        completedSets: typeof val.completedSets === 'number' ? val.completedSets : (val.completed ? 3 : 0),
      };
    });
    return sanitized;
  };

  const sanitizeHistory = (hist: WorkoutHistoryEntry[]): WorkoutHistoryEntry[] => {
    return hist.map((entry) => ({
      ...entry,
      logs: sanitizeState(entry.logs),
    }));
  };

  return {
    activeA: sanitizeState(rawActiveA),
    activeB: sanitizeState(rawActiveB),
    activeC: sanitizeState(rawActiveC),
    history: sanitizeHistory(rawHistory),
  };
};

export const saveBackupToStorage = (backup: ParsedBackup): void => {
  localStorage.setItem(KEYS.ACTIVE_A, JSON.stringify(backup.activeA));
  localStorage.setItem(KEYS.ACTIVE_B, JSON.stringify(backup.activeB));
  localStorage.setItem(KEYS.ACTIVE_C, JSON.stringify(backup.activeC));
  localStorage.setItem(KEYS.HISTORY, JSON.stringify(backup.history));
};
