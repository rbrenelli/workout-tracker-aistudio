import { describe, it, expect, beforeEach } from 'vitest';
import { 
  parseAndValidateBackup, 
  loadActiveSession, 
  createEmptySession 
} from '../storage';
import { ExerciseSessionState } from '../../types';

describe('storage.ts', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('parseAndValidateBackup', () => {
    it('should parse and validate a valid backup successfully', () => {
      const validBackup = {
        version: 1,
        exportedAt: new Date().toISOString(),
        activeA: {
          "ex1": { weight: "20", completed: true }
        },
        activeB: {
          "ex2": { weight: "", completed: false }
        },
        history: [
          {
            id: "12345",
            date: "2026-06-28",
            routine: "A",
            completedExercisesCount: 1,
            totalExercisesCount: 10,
            logs: {
              "ex1": { weight: "20", completed: true }
            }
          }
        ]
      };

      const result = parseAndValidateBackup(JSON.stringify(validBackup));
      expect(result.activeA).toEqual(validBackup.activeA);
      expect(result.activeB).toEqual(validBackup.activeB);
      expect(result.history).toHaveLength(1);
      expect(result.history[0].id).toBe("12345");
    });

    it('should throw an error for non-object JSON', () => {
      expect(() => parseAndValidateBackup('null')).toThrow();
      expect(() => parseAndValidateBackup('123')).toThrow();
      expect(() => parseAndValidateBackup('"string"')).toThrow();
    });

    it('should throw an error for malformed active session state', () => {
      const malformedBackup = {
        activeA: {
          "ex1": { weight: 20, completed: true } // weight should be a string
        },
        activeB: {},
        history: []
      };

      expect(() => parseAndValidateBackup(JSON.stringify(malformedBackup))).toThrow('Dados de treino ativo inválidos.');
    });

    it('should throw an error for malformed history entries', () => {
      const malformedBackup = {
        activeA: {},
        activeB: {},
        history: [
          {
            id: 12345, // id should be a string
            date: "2026-06-28",
            routine: "C", // routine must be A or B
            completedExercisesCount: 1,
            totalExercisesCount: 10,
            logs: {}
          }
        ]
      };

      expect(() => parseAndValidateBackup(JSON.stringify(malformedBackup))).toThrow('Histórico de treinos inválido.');
    });
  });

  describe('loadActiveSession', () => {
    const defaultExercises = [{ id: 'ex1' }, { id: 'ex2' }];

    it('should return empty session if localStorage is empty', () => {
      const result = loadActiveSession('A', defaultExercises);
      expect(result).toEqual(createEmptySession(defaultExercises));
    });

    it('should migrate legacy array sets format', () => {
      const legacyData = {
        "ex1": [
          { weight: "15", completed: false },
          { weight: "20", completed: true }
        ],
        "ex2": [
          { weight: "", completed: false }
        ]
      };

      localStorage.setItem('gym_active_session_A', JSON.stringify(legacyData));

      const result = loadActiveSession('A', defaultExercises);
      
      expect(result["ex1"]).toEqual({
        weight: "15", // The first set with a weight
        completed: true // True if any set is completed
      });
      expect(result["ex2"]).toEqual({
        weight: "",
        completed: false
      });
    });

    it('should load standard state format correctly', () => {
      const standardData: ExerciseSessionState = {
        "ex1": { weight: "25", completed: true },
        "ex2": { weight: "10", completed: false }
      };

      localStorage.setItem('gym_active_session_B', JSON.stringify(standardData));

      const result = loadActiveSession('B', defaultExercises);
      expect(result).toEqual(standardData);
    });
  });
});
