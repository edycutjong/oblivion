import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: [
        'src/app/layout.tsx',
        'src/app/globals.css',
        'src/app/favicon.ico',
        '**/*.test.{ts,tsx}',
        '**/*.d.ts',
      ],
    },
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
