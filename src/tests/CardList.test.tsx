import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import CardList from '../components/CardList/CardList.tsx';

vi.mock('../components/Card/Card.tsx', () => {
    return {
        __esModule: true,
        default: () => <div data-testid="card" />,
    };
});

describe('CardList', () => {
    it('renders the correct number of cards', () => {
        const testData = [
            {
                name: 'Boba Fett',
                height: '183',
                birth_year: '31.5BBY',
                gender: 'male',
                url: 'https://swapi.dev/api/people/22/'
            },
            {
                name: 'Luke Skywalker',
                height: '172',
                birth_year: '19BBY',
                gender: 'male',
                url: 'https://swapi.dev/api/people/1/'
            }
        ];

        render(
            <CardList results={testData} />
        );

        const cards = screen.getAllByTestId('card');
        expect(cards).toHaveLength(testData.length);
    });

    it('displays a message when no cards are present', () => {
        render(
            <CardList results={[]} />
        );

        const noResultsMessage = screen.queryByText('No results');

        expect(noResultsMessage).toBeInTheDocument();
    });
});
