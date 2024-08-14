import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../store/api.ts', () => ({
    useGetPersonDetailsQuery: () => ({
        data: {
            name: 'Luke Skywalker',
            birth_year: '19BBY',
            eye_color: 'blue',
            gender: 'male',
            hair_color: 'blonde',
            height: '172',
            homeworld: 'Tatooine',
            mass: '77',
            skin_color: 'fair',
            url: 'http://example.com',
        },
        error: null,
        isLoading: false,
        isFetching: false,
    }),
}));

describe('DetailedCard Component', () => {
    it('should render the relevant card data correctly', async () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DetailedCard details="1" />
                </MemoryRouter>
            </Provider>
        );

        await waitFor(() => {
            expect(screen.queryByText(/Loading details/i)).not.toBeInTheDocument();
        }, { timeout: 5000 });

        setTimeout(() => {
            expect(screen.getByText(/Details info/i)).toBeInTheDocument();
            expect(screen.getByText(/Name: Luke Skywalker/i)).toBeInTheDocument();
            expect(screen.getByText(/Birth Year: 19BBY/i)).toBeInTheDocument();
            expect(screen.getByText(/Eye Color: blue/i)).toBeInTheDocument();
            expect(screen.getByText(/Gender: male/i)).toBeInTheDocument();
            expect(screen.getByText(/Hair Color: blonde/i)).toBeInTheDocument();
            expect(screen.getByText(/Height: 172/i)).toBeInTheDocument();
            expect(screen.getByText(/Homeworld: Tatooine/i)).toBeInTheDocument();
            expect(screen.getByText(/Mass: 77/i)).toBeInTheDocument();
            expect(screen.getByText(/Skin Color: fair/i)).toBeInTheDocument();
            expect(screen.getByText(/URL: http:\/\/example\.com/i)).toBeInTheDocument();
        }, 5000);
    });
});
