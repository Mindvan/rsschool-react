import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import {MemoryRouter, Route, Routes} from 'react-router-dom';
import Card from "../components/Card/Card.tsx";
import {Provider} from "react-redux";
import {store} from "../store/store.ts";

const cardData = {
    id: '1',
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    eye_color: 'blue',
    gender: 'male',
    hair_color: 'blond',
    height: '172',
    homeworld: 'Tatooine',
    mass: '77',
    skin_color: 'fair',
    url: 'https://swapi.dev/api/people/1/'
};

const renderWithRouter = (initialEntries: string[]) => {
    return render(
        <Provider store={store}>
            <MemoryRouter initialEntries={initialEntries}>
                <Routes>
                    <Route path="/" element={<Card {...cardData} />} />
                    <Route path="/details" element={<DetailedCard />} />
                </Routes>
            </MemoryRouter>
        </Provider>
    );
};

describe('DetailedCard Component', () => {
    it('should close the detailed card component when the close button is clicked', async () => {
        renderWithRouter(['/details?details=1']);

        await waitFor(() => {
            expect(screen.queryByText(/Loading details/i)).not.toBeInTheDocument();
        });

        const detailsInfo = screen.queryByText(/Details info/i);
        expect(detailsInfo).toBeInTheDocument();

        const closeButton = screen.getByRole('button', { name: /Close/i });
        fireEvent.click(closeButton);

        await waitFor(() => {
            expect(screen.queryByText(/Details info/i)).not.toBeInTheDocument();
        });
    });

    it('should render the relevant card data correctly', async () => {
        renderWithRouter(['/details?details=1']);

        await waitFor(() => {
            expect(screen.queryByText(/Loading details/i)).not.toBeInTheDocument();
        });

        expect(screen.getByText(/Details info/i)).toBeInTheDocument();
        expect(screen.getByText(/name:/i)).toBeInTheDocument();
        expect(screen.getByText(/birth_year:/i)).toBeInTheDocument();
        expect(screen.getByText(/eye_color:/i)).toBeInTheDocument();
        expect(screen.getByText(/gender:/i)).toBeInTheDocument();
        expect(screen.getByText(/hair_color:/i)).toBeInTheDocument();
        expect(screen.getByText(/height:/i)).toBeInTheDocument();
        expect(screen.getByText(/homeworld:/i)).toBeInTheDocument();
        expect(screen.getByText(/mass:/i)).toBeInTheDocument();
        expect(screen.getByText(/skin_color:/i)).toBeInTheDocument();
        expect(screen.getByText(/url:/i)).toBeInTheDocument();
    });
});
