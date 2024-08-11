"use client";

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeContext } from '../context/ThemeProvider';
import { useState } from 'react';
import '../styles/normalize.css';
import '../styles/global.css';
import '../styles/root.css';
import ErrorBoundary from '../components/ErrorBoundary/ErrorBoundary';

export default function RootLayout({ children }: { children: ReactNode }) {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode((prevState) => !prevState);
    };

    return (
        <html lang="en">
        <body>
        <Provider store={store}>
            <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
                <ErrorBoundary>
                    <div id="rootDiv" className={darkMode ? 'dark-mode' : ''}>
                        {children}
                    </div>
                </ErrorBoundary>
            </ThemeContext.Provider>
        </Provider>
        </body>
        </html>
    );
}
