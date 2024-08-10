import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/vitest-setup.ts',
        css: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            enabled: true,
            all: true,
            exclude: ['**/.eslintrc.cjs', 'vitest.config.ts', 'next.config.js', '.next', 'dist', 'src/tests/*.test.{js,jsx,ts,tsx}', '**/types.ts', 'src/utils/**/*', 'src/main.tsx'],
            include: ['src/**/*.{ts,tsx}'],
            thresholds: {
                statements: 80,
            },
        },
    },
})
