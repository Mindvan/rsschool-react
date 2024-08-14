import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchApp from '../components/SearchApp/SearchApp';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter } from 'react-router-dom';

describe('SearchApp', () => {
    it('should display pagination when data is available', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <SearchApp />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            const prevButton = screen.getByText('PREV');
            const nextButton =  screen.getByText('NEXT');

            expect(prevButton).toBeInTheDocument();
            expect(nextButton).toBeInTheDocument();
        }, { timeout: 3000 });

    });
});
