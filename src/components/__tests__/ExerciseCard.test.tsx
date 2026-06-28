import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ExerciseCard } from '../ExerciseCard';
import { Exercise } from '../../types';
import { describe, it, expect, vi, beforeEach } from 'vitest';

describe('ExerciseCard Component', () => {
  const mockOnExerciseChange = vi.fn();
  const mockOnStartTimer = vi.fn();

  beforeEach(() => {
    mockOnExerciseChange.mockClear();
    mockOnStartTimer.mockClear();
  });

  const mockExercise: Exercise = {
    id: "leg_press",
    name: "Leg Press 45º",
    defaultSets: 4,
    defaultReps: "10 a 12",
    muscleGroup: "Coxas",
    targetMuscles: ["Quadríceps", "Glúteos"],
    equipment: "Leg Press 45º",
    instructions: [
      "Posicione os pés na plataforma",
      "Destrave o aparelho",
      "Desça controladamente e empurre de volta"
    ],
    tips: "Mantenha os joelhos alinhados com a ponta dos pés.",
    svgType: "legs",
    images: []
  };

  const mockSession = {
    weight: "120",
    completed: false,
    completedSets: 0
  };

  it('should render basic exercise info', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        session={mockSession}
        onExerciseChange={mockOnExerciseChange}
        accentColor="#ccff00"
        onStartTimer={mockOnStartTimer}
      />
    );

    expect(screen.getByText('Leg Press 45º')).toBeInTheDocument();
    expect(screen.getByText('Coxas')).toBeInTheDocument();
    expect(screen.getByText('4 séries x 10 a 12 reps')).toBeInTheDocument();
    expect(screen.getByLabelText(/carga em quilogramas/i)).toHaveValue('120');
  });

  it('should toggle the guide open and closed', async () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        session={mockSession}
        onExerciseChange={mockOnExerciseChange}
        accentColor="#ccff00"
        onStartTimer={mockOnStartTimer}
      />
    );

    // Instructions should not be visible initially since showGuide is false
    expect(screen.queryByText('Posicione os pés na plataforma')).not.toBeInTheDocument();

    // Click on the card header to expand
    const header = screen.getByRole('button', { name: /instruções para leg press 45º/i });
    fireEvent.click(header);

    // Instructions should now be visible
    expect(screen.getByText('Posicione os pés na plataforma')).toBeInTheDocument();
    expect(screen.getByText('Mantenha os joelhos alinhados com a ponta dos pés.')).toBeInTheDocument();

    // Click again to collapse
    fireEvent.click(header);

    // Wait for Framer Motion exit animation to finish and the element to be unmounted
    await waitFor(() => {
      expect(screen.queryByText('Posicione os pés na plataforma')).not.toBeInTheDocument();
    });
  });

  it('should trigger onExerciseChange when typing in weight input', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        session={mockSession}
        onExerciseChange={mockOnExerciseChange}
        accentColor="#ccff00"
        onStartTimer={mockOnStartTimer}
      />
    );

    const input = screen.getByLabelText(/carga em quilogramas/i);
    fireEvent.change(input, { target: { value: '130' } });

    expect(mockOnExerciseChange).toHaveBeenCalledWith('leg_press', 'weight', '130');
  });

  it('should trigger onExerciseChange when clicking completion checkbox', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        session={mockSession}
        onExerciseChange={mockOnExerciseChange}
        accentColor="#ccff00"
        onStartTimer={mockOnStartTimer}
      />
    );

    const checkbox = screen.getByRole('button', { name: /marcar exercício leg press 45º como concluído/i });
    fireEvent.click(checkbox);

    expect(mockOnExerciseChange).toHaveBeenCalledWith('leg_press', 'completed', true);
  });

  it('should trigger onStartTimer when clicking rest timer button', () => {
    render(
      <ExerciseCard
        exercise={mockExercise}
        session={mockSession}
        onExerciseChange={mockOnExerciseChange}
        accentColor="#ccff00"
        onStartTimer={mockOnStartTimer}
      />
    );

    const timerButton = screen.getByRole('button', { name: /iniciar cronômetro de descanso de 60 segundos/i });
    fireEvent.click(timerButton);

    expect(mockOnStartTimer).toHaveBeenCalledWith(60, 'leg_press');
  });
});
