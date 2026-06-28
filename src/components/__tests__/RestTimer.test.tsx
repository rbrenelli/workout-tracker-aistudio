import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { RestTimer } from '../RestTimer';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

describe('RestTimer Component', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    vi.useFakeTimers();
    mockOnClose.mockClear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should render the timer with formatted time when open', () => {
    render(
      <RestTimer
        duration={95} // 1 minute and 35 seconds
        isOpen={true}
        onClose={mockOnClose}
        accentColor="#ccff00"
      />
    );

    // 95 seconds should be formatted as "01:35"
    expect(screen.getByText('01:35')).toBeInTheDocument();
    expect(screen.getByText('segundos restantes')).toBeInTheDocument();
  });

  it('should not render anything when isOpen is false', () => {
    const { container } = render(
      <RestTimer
        duration={60}
        isOpen={false}
        onClose={mockOnClose}
        accentColor="#ccff00"
      />
    );

    expect(container.firstChild).toBeNull();
  });

  it('should adjust time correctly using Plus and Minus buttons', () => {
    render(
      <RestTimer
        duration={60}
        isOpen={true}
        onClose={mockOnClose}
        accentColor="#ccff00"
      />
    );

    expect(screen.getByText('01:00')).toBeInTheDocument();

    // Click plus button (+10s)
    const plusButton = screen.getByRole('button', { name: /adicionar 10 segundos/i });
    fireEvent.click(plusButton);
    expect(screen.getByText('01:10')).toBeInTheDocument();

    // Click minus button (-10s)
    const minusButton = screen.getByRole('button', { name: /remover 10 segundos/i });
    fireEvent.click(minusButton);
    expect(screen.getByText('01:00')).toBeInTheDocument();
  });

  it('should prevent adjusting time below 10 seconds via the UI', () => {
    render(
      <RestTimer
        duration={15}
        isOpen={true}
        onClose={mockOnClose}
        accentColor="#ccff00"
      />
    );

    expect(screen.getByText('00:15')).toBeInTheDocument();

    const minusButton = screen.getByRole('button', { name: /remover 10 segundos/i });
    expect(minusButton).not.toBeDisabled();

    // Click minus button (-10s) -> should become 00:05
    fireEvent.click(minusButton);
    expect(screen.getByText('00:05')).toBeInTheDocument();

    // Now it is at 5s, which is <= 10s, so the minus button should be disabled
    expect(minusButton).toBeDisabled();
  });

  it('should count down when active', () => {
    render(
      <RestTimer
        duration={10}
        isOpen={true}
        onClose={mockOnClose}
        accentColor="#ccff00"
      />
    );

    expect(screen.getByText('00:10')).toBeInTheDocument();

    // Fast-forward time by 3 seconds
    act(() => {
      vi.advanceTimersByTime(3000);
    });

    expect(screen.getByText('00:07')).toBeInTheDocument();
  });

  it('should show "Treinar!" when timer finishes', () => {
    render(
      <RestTimer
        duration={5}
        isOpen={true}
        onClose={mockOnClose}
        accentColor="#ccff00"
      />
    );

    // Fast-forward time by 5 seconds
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByText('Treinar!')).toBeInTheDocument();
  });
});
