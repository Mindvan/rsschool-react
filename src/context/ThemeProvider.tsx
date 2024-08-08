import { createContext, useState, ReactNode, FC } from 'react';

interface ThemeContextProps {
    darkMode: boolean;
    handleDarkMode: () => void;
}

const defaultValue: ThemeContextProps = {
    darkMode: false,
    handleDarkMode: () => {},
};

export const ThemeContext = createContext<ThemeContextProps>(defaultValue);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(prevState => !prevState);
        const newTheme = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};