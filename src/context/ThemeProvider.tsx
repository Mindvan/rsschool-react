// src/context/ThemeProvider.tsx
'use client'; // Помечаем как клиентский компонент

import React, { createContext, useState, ReactNode, FC } from 'react';

interface ThemeContextProps {
    darkMode: boolean;
    handleDarkMode: () => void;
}

export const ThemeContext = createContext<ThemeContextProps>({
    darkMode: false,
    handleDarkMode: () => {},
});

const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const handleDarkMode = () => setDarkMode((prevMode) => !prevMode);

    return (
        <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
