import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import DetailedCard from '../components/DetailedCard/DetailedCard';
import { Provider } from 'react-redux';
import { store } from '../store/store';

vi.mock('next/router', () => ({
    useRouter: () => ({
        query: { details: '1' },
        push: vi.fn(),
        pathname: '/details',
    }),
}));

describe('DetailedCard Component', () => {
    it('should close the detailed card component when the close button is clicked', async () => {
        render(
            <Provider store={store}>
                <DetailedCard />
            </Provider>
        );

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
        render(
            <Provider store={store}>
                <DetailedCard />
            </Provider>
        );

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
