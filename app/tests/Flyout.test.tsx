import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer, {resetItems} from '../store/reducers/selected';
import Flyout from '../components/Flyout/Flyout';

const renderWithStore = (store) => {
    return render(
        <Provider store={store}>
            <Flyout />
        </Provider>
    );
};

describe('Flyout Component', () => {
    it('should not render if no items are selected', () => {
        const store = configureStore({
            reducer: {
                selected: selectedReducer,
            },
            preloadedState: {
                selected: { items: [] },
            },
        });

        renderWithStore(store);
        expect(screen.queryByText(/item is selected/i)).toBeNull();
        expect(screen.queryByText(/items are selected/i)).toBeNull();
    });

    it('should render correctly when items are selected', () => {
        const store = configureStore({
            reducer: {
                selected: selectedReducer,
            },
            preloadedState: {
                selected: { items: [{ name: 'John Doe', age: 30 }] },
            },
        });

        renderWithStore(store);
        expect(screen.getByText(/1 item is selected!/i)).toBeInTheDocument();
    });

    it('should call unselectAll on button click', () => {
        const dispatch = vi.fn();
        const store = configureStore({
            reducer: {
                selected: selectedReducer,
            },
            preloadedState: {
                selected: { items: [{ name: 'John Doe', age: 30 }] },
            },
        });


        vi.spyOn(store, 'dispatch').mockImplementation(dispatch);
        renderWithStore(store);
        fireEvent.click(screen.getByText(/Unselect all/i));
        expect(dispatch).toHaveBeenCalledWith(resetItems());
    });
});
