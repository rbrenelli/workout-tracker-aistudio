import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

// Automatically cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.crypto.getRandomValues
if (typeof window !== 'undefined') {
  const cryptoMock = {
    getRandomValues: <T extends ArrayBufferView | null>(array: T): T => {
      if (!array) return array;
      const view = array as unknown as Uint32Array;
      for (let i = 0; i < view.length; i++) {
        view[i] = Math.floor(Math.random() * 4294967296);
      }
      return array;
    },
  };
  Object.defineProperty(window, 'crypto', {
    value: cryptoMock,
    writable: true,
    configurable: true,
  });
}

// Mock navigator.vibrate
if (typeof navigator !== 'undefined') {
  Object.defineProperty(navigator, 'vibrate', {
    value: vi.fn(),
    writable: true,
    configurable: true,
  });
}

// Mock AudioContext
if (typeof window !== 'undefined') {
  class MockAudioContext {
    currentTime = 0;
    destination = {};
    createOscillator() {
      return {
        connect: vi.fn(),
        type: 'sine',
        frequency: {
          setValueAtTime: vi.fn(),
        },
        start: vi.fn(),
        stop: vi.fn(),
      };
    }
    createGain() {
      return {
        connect: vi.fn(),
        gain: {
          setValueAtTime: vi.fn(),
          exponentialRampToValueAtTime: vi.fn(),
        },
      };
    }
  }
  Object.defineProperty(window, 'AudioContext', {
    value: MockAudioContext,
    writable: true,
    configurable: true,
  });
}

// Mock window.confirm and window.alert
if (typeof window !== 'undefined') {
  window.confirm = vi.fn(() => true);
  window.alert = vi.fn();
}
