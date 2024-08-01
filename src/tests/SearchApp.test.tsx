import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import SearchApp from "../pages/SearchApp/SearchApp.tsx";
import {store} from "../store/store.ts";

describe('SearchApp', () => {
    beforeEach(() => {
        render(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/:page" element={<SearchApp />} />
                        <Route path="/" element={<SearchApp />} />
                    </Routes>
                </Router>
            </Provider>
        );
    });

    it('should display loading state initially', () => {
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should handle search input and fetch data', async () => {
        const searchInput = screen.getByPlaceholderText(/Type something/i);
        fireEvent.change(searchInput, { target: { value: 'Yoda' } });

        const fetchButton = screen.getByText(/search/i);
        fireEvent.click(fetchButton);

        await waitFor(() => {
            expect(screen.queryByText(/loading/i)).toBeInTheDocument();
        });
    });

    it('should display pagination when data is available', async () => {
        render(
            <Provider store={store}>
                <Router>
                    <Routes>
                        <Route path="/:page" element={<SearchApp />} />
                        <Route path="/" element={<SearchApp />} />
                    </Routes>
                </Router>
            </Provider>
        );

        await waitFor(() => {
            const prevButtons = screen.getAllByText(/prev/i);
            expect(prevButtons.length).toBeGreaterThan(0);

            const nextButtons = screen.getAllByText(/next/i);
            expect(nextButtons.length).toBeGreaterThan(0);
        });
    });
});
