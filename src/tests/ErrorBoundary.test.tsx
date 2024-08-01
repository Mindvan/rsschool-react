import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

const ErrorThrowingComponent = () => {
    throw new Error('Test Error');
};

describe('ErrorBoundary Component', () => {
    it('should render error message when an error is thrown', () => {
        render(
            <ErrorBoundary>
                <ErrorThrowingComponent />
            </ErrorBoundary>
        );

        expect(screen.getByText(/YEAH, YOU BROKE IT, GREAT JOB/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Error/i)).toBeInTheDocument();
    });
});


