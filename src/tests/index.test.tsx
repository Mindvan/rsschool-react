import { render, screen } from '@testing-library/react';
import Home from '../pages/index.tsx'; // Adjust the path if needed
import { vi } from 'vitest';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../store/reducers/selected';

vi.mock('../components/SearchApp/SearchApp', () => ({
    SearchApp: () => <div>SearchApp Mock</div>,
}));

const store = configureStore({
    reducer: {
        selected: selectedReducer,
    },
});

describe('Home Page', () => {
    it('renders the SearchApp component', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Home />
                </Router>
            </Provider>
        );

        expect(screen.getByText('SearchApp Mock')).toBeInTheDocument();
    });
});
