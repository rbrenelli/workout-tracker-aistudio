/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type RoutineType = 'A' | 'B' | 'C';

export interface Exercise {
  id: string;
  name: string;
  defaultSets: number;
  defaultReps: string;
  muscleGroup: string;
  targetMuscles: string[];
  equipment: string;
  instructions: string[];
  tips: string;
  svgType: string; images?: string[]; // ID to render specialized SVG diagrams
}

export interface ExerciseSession {
  weight: string;     // Single weight for this entire exercise
  completed: boolean; // Single checkbox per exercise
  completedSets: number; // Number of completed sets (0-3)
}

export interface ExerciseSessionState {
  [exerciseId: string]: ExerciseSession;
}

export interface WorkoutHistoryEntry {
  id: string;
  date: string; // Date formatted (e.g. "18 Jun 2026, 14:51")
  routine: RoutineType;
  completedExercisesCount: number;
  totalExercisesCount: number;
  logs: ExerciseSessionState;
}

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

