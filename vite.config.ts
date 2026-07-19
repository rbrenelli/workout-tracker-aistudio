/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vitest/config';

export default defineConfig(async () => {
  const plugins = [react()];
  
  const nodeMajorVersion = parseInt(process.versions.node.split('.')[0], 10);
  if (nodeMajorVersion >= 20) {
    try {
      const tailwind = await import('@tailwindcss/vite');
      plugins.push(tailwind.default());
    } catch (e) {
      console.warn('Warning: Tailwind CSS plugin could not be loaded:', e);
    }
  } else {
    console.warn(`Warning: Node version is ${process.versions.node}. Tailwind CSS Vite plugin requires Node >= 20. Skipping styling plugin for this process.`);
  }

  return {
    base: process.env.GITHUB_PAGES === 'true' ? '/workout-tracker-aistudio/' : '/',
    plugins,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/test/setup.ts',
    },
  };
});

