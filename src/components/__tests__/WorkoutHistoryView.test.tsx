import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { WorkoutHistoryView } from '../WorkoutHistoryView';
import { WorkoutHistoryEntry } from '../../types';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('WorkoutHistoryView Component', () => {
  const mockOnDeleteEntry = vi.fn();
  const mockOnClearHistory = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    mockOnDeleteEntry.mockClear();
    mockOnClearHistory.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const mockHistory: WorkoutHistoryEntry[] = [
    {
      id: "1",
      date: "28 de jun. de 2026 14:00",
      routine: "A",
      completedExercisesCount: 3,
      totalExercisesCount: 10,
      logs: {
        "puxada_frente": { weight: "50", completed: true, completedSets: 3 }
      }
    }
  ];

  it('should render the empty state message when history is empty', () => {
    render(
      <WorkoutHistoryView
        history={[]}
        onDeleteEntry={mockOnDeleteEntry}
        onClearHistory={mockOnClearHistory}
        accentColorA="#ccff00"
        accentColorB="#00e5ff"
      />
    );

    expect(screen.getByText('Nenhum treino registrado ainda')).toBeInTheDocument();
    expect(screen.getByText(/Complete seus exercícios e clique no botão de/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /resetar.*logs/i })).not.toBeInTheDocument();
  });

  it('should render history cards when history is provided', () => {
    render(
      <WorkoutHistoryView
        history={mockHistory}
        onDeleteEntry={mockOnDeleteEntry}
        onClearHistory={mockOnClearHistory}
        accentColorA="#ccff00"
        accentColorB="#00e5ff"
      />
    );

    expect(screen.getByText('Série A (Coxas e Puxada)')).toBeInTheDocument();
    expect(screen.getByText('28 de jun. de 2026 14:00')).toBeInTheDocument();
    expect(screen.getByText('3/10 aparelhos')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /resetar.*logs/i })).toBeInTheDocument();
  });

  it('should require double-click within 4 seconds to clear history', () => {
    render(
      <WorkoutHistoryView
        history={mockHistory}
        onDeleteEntry={mockOnDeleteEntry}
        onClearHistory={mockOnClearHistory}
        accentColorA="#ccff00"
        accentColorB="#00e5ff"
      />
    );

    const resetButton = screen.getByRole('button', { name: /resetar.*logs/i });

    // First click: should arm the button but not trigger onClearHistory
    fireEvent.click(resetButton);
    expect(mockOnClearHistory).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();

    // Second click (immediate): should trigger onClearHistory
    fireEvent.click(resetButton);
    expect(mockOnClearHistory).toHaveBeenCalledTimes(1);
  });

  it('should disarm the clear history button after 4 seconds', () => {
    render(
      <WorkoutHistoryView
        history={mockHistory}
        onDeleteEntry={mockOnDeleteEntry}
        onClearHistory={mockOnClearHistory}
        accentColorA="#ccff00"
        accentColorB="#00e5ff"
      />
    );

    const resetButton = screen.getByRole('button', { name: /resetar.*logs/i });

    // First click: arm the button
    fireEvent.click(resetButton);
    expect(screen.getByRole('button', { name: /confirmar/i })).toBeInTheDocument();

    // Fast-forward 4 seconds
    act(() => {
      vi.advanceTimersByTime(4000);
    });

    // Button should be disarmed back to "Resetar Logs"
    expect(screen.getByRole('button', { name: /resetar.*logs/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /confirmar/i })).not.toBeInTheDocument();

    // Click again after disarm: should not clear, but arm again
    fireEvent.click(resetButton);
    expect(mockOnClearHistory).not.toHaveBeenCalled();
  });
});
