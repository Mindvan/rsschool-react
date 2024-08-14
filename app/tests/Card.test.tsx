import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Card from '../components/Card/Card';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../store/reducers/selected';
import { MemoryRouter } from 'react-router-dom';

vi.mock('@remix-run/react', () => ({
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/' }),
}));

const renderWithProviders = (ui: React.ReactElement) => {
    const store = configureStore({ reducer: { selected: selectedReducer } });
    return render(
        <Provider store={store}>
            <MemoryRouter>
                {ui}
            </MemoryRouter>
        </Provider>
    );
};

describe('Card component', () => {
    it('renders the relevant card data', () => {
        const cardData = {
            id: '1',
            name: 'Luke Skywalker',
            gender: 'male',
            birth_year: '19BBY',
            height: '172',
        };

        renderWithProviders(<Card {...cardData} />);

        expect(screen.getByText(cardData.name)).toBeInTheDocument();
        expect(screen.getByText(`Gender: ${cardData.gender}`)).toBeInTheDocument();
        expect(screen.getByText(`Birth Year: ${cardData.birth_year}`)).toBeInTheDocument();
        expect(screen.getByText(`Height: ${cardData.height}`)).toBeInTheDocument();
    });

    it('checks the checkbox and adds/removes item from selected state', () => {
        const cardData = {
            id: '1',
            name: 'Luke Skywalker',
            gender: 'male',
            birth_year: '19BBY',
            height: '172',
        };

        renderWithProviders(<Card {...cardData} />);

        const checkbox = screen.getByRole('checkbox');
        fireEvent.click(checkbox);
        expect(checkbox).toBeChecked();

        fireEvent.click(checkbox);
        expect(checkbox).not.toBeChecked();
    });
});
