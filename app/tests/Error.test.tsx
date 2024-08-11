import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Error from '../components/Error/Error';

describe('Error Component', () => {
    it('should display the correct error message', () => {
        render(<Error />);
        expect(screen.getByText('Error 404. Try again.')).toBeInTheDocument();
    });
});
