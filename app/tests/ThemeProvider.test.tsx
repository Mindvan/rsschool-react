import React, { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider, ThemeContext } from '../context/ThemeProvider';

const ThemeConsumer: React.FC = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('ThemeConsumer must be used within a ThemeProvider');
    }
    const { darkMode, handleDarkMode } = context;
    const theme = darkMode ? 'dark' : 'light';
    return (
        <div>
            <span data-testid="theme">{theme}</span>
            <button data-testid="toggle" onClick={handleDarkMode}>Toggle Theme</button>
        </div>
    );
};

describe('ThemeProvider', () => {
    it('provides the default theme', () => {
        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );
        const themeSpan = screen.getByTestId('theme');
        expect(themeSpan.textContent).toBe('light');
    });

    it('toggles the theme', () => {
        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );
        const themeSpan = screen.getByTestId('theme');
        const toggleButton = screen.getByTestId('toggle');

        expect(themeSpan.textContent).toBe('light');

        fireEvent.click(toggleButton);
        expect(themeSpan.textContent).toBe('dark');

        fireEvent.click(toggleButton);
        expect(themeSpan.textContent).toBe('light');
    });

    it('sets the data-theme attribute on documentElement', () => {
        render(
            <ThemeProvider>
                <ThemeConsumer />
            </ThemeProvider>
        );
        const toggleButton = screen.getByTestId('toggle');
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');

        fireEvent.click(toggleButton);
        expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

        fireEvent.click(toggleButton);
        expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
});
