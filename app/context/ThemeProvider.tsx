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
        setDarkMode(prevState => {
            const newDarkMode = !prevState;
            const newTheme = newDarkMode ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            return newDarkMode;
        });
    };

    return (
        <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
            {children}
        </ThemeContext.Provider>
    );
};
