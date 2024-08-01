import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../store/store.ts';
import App from "../App";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary.tsx";

describe('App', () => {
    it('should render the Error component for an invalid route', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <ErrorBoundary>
                        <App />
                    </ErrorBoundary>
                </Router>
            </Provider>
        );

        window.history.pushState({}, 'Test page', '/invalid-route');

        await waitFor(() => {
            expect(screen.getByText(/YEAH, YOU BROKE IT, GREAT JOB/i)).toBeInTheDocument();
        });
    });
});
