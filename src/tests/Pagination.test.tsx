import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from '../components/Pagination/Pagination';

const mockSetPage = vi.fn();

describe('Pagination', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should update URL query parameter when previous button is clicked', () => {
        const initialPage = 2;
        const pagesArr = [1, 2, 3, 4, 5];
        const previous = '?page=1';
        const next = '?page=3';

        render(
            <MemoryRouter initialEntries={['/?page=2']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Pagination
                                pagesArr={pagesArr}
                                currPage={initialPage}
                                setPage={mockSetPage}
                                next={next}
                                previous={previous}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        const prevButton = screen.getByText('PREV');
        fireEvent.click(prevButton);

        expect(mockSetPage).toHaveBeenCalledWith(initialPage - 1);
    });

    it('should update URL query parameter when next button is clicked', () => {
        const initialPage = 2;
        const pagesArr = [1, 2, 3, 4, 5];
        const previous = '?page=1';
        const next = '?page=3';

        render(
            <MemoryRouter initialEntries={['/?page=2']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Pagination
                                pagesArr={pagesArr}
                                currPage={initialPage}
                                setPage={mockSetPage}
                                next={next}
                                previous={previous}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        const nextButton = screen.getByText('NEXT');
        fireEvent.click(nextButton);

        expect(mockSetPage).toHaveBeenCalledWith(initialPage + 1);
    });

    it('should update URL query parameter when page number is clicked', () => {
        const initialPage = 2;
        const pagesArr = [1, 2, 3, 4, 5];
        const previous = '?page=1';
        const next = '?page=3';

        render(
            <MemoryRouter initialEntries={['/?page=2']}>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Pagination
                                pagesArr={pagesArr}
                                currPage={initialPage}
                                setPage={mockSetPage}
                                next={next}
                                previous={previous}
                            />
                        }
                    />
                </Routes>
            </MemoryRouter>
        );

        const page4 = screen.getByText('4');
        fireEvent.click(page4);

        expect(mockSetPage).toHaveBeenCalledWith(4);
    });
});
