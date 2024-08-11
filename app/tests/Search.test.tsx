import {render, screen, fireEvent} from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Search from '../components/Search/Search';

const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
        getItem(key: string) {
            return store[key] || null;
        },
        setItem(key: string, value: string) {
            store[key] = value;
        },
        clear() {
            store = {};
        },
        removeItem(key: string) {
            delete store[key];
        },
    };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const mockHandleSearch = vi.fn();
const mockHandleFetch = vi.fn();
const mockMakeError = vi.fn();

describe('Search Component', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        localStorageMock.clear();
    });

    it('should save the entered value to the local storage when the Search button is clicked', () => {
        const searchValue = 'tests search';

        render(
            <Search
                search={searchValue}
                handleSearch={mockHandleSearch}
                handleFetch={() => {
                    mockHandleFetch();
                    localStorage.setItem('search', searchValue);
                }}
                makeError={mockMakeError}
            />
        );

        const searchButton = screen.getByRole('button', { name: /search/i });
        fireEvent.click(searchButton);

        expect(mockHandleFetch).toHaveBeenCalled();
        expect(localStorage.getItem('search')).toBe(searchValue);
    });

    it('should retrieve the value from the local storage upon mounting', () => {
        const searchValue = 'stored search';
        localStorage.setItem('search', searchValue);

        render(
            <Search
                search={searchValue}
                handleSearch={mockHandleSearch}
                handleFetch={mockHandleFetch}
                makeError={mockMakeError}
            />
        );

        const inputElement = screen.getByLabelText('Mindvan') as HTMLInputElement;
        expect(inputElement.value).toBe(searchValue);
    });
});
