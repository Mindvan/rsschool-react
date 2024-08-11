import { render, screen } from '@testing-library/react';
import RootLayout from '../app/layout';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeContext } from '../context/ThemeProvider';
import { vi } from 'vitest';

describe('RootLayout', () => {
    it('renders children without dark mode class', () => {
        const mockHandleDarkMode = vi.fn();

        render(
            <Provider store={store}>
                <RootLayout darkMode={false}>
                    <div>Test Child</div>
                </RootLayout>
            </Provider>
        );

        const rootDiv = screen.getByText('Test Child').parentElement;
        expect(rootDiv).not.toHaveClass('dark-mode');
    });
});
