import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import MyApp from '../pages/_app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeContext } from '../context/ThemeProvider';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const MockComponent = () => <div>Mock Component</div>;

describe('MyApp Component', () => {
    it('renders the component with the correct providers and context', () => {
        render(
            <Provider store={store}>
                <ThemeContext.Provider value={{ darkMode: false, handleDarkMode: () => {} }}>
                    <ErrorBoundary>
                        <MyApp Component={MockComponent} pageProps={{}}/>
                    </ErrorBoundary>
                </ThemeContext.Provider>
            </Provider>
        );

        expect(screen.getByText('Mock Component')).toBeInTheDocument();
    });
});
