import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import { ThemeContext } from '../context/ThemeProvider';
import { useState } from 'react';
import '../styles/normalize.css';
import '../styles/global.css';
import '../styles/root.css';
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

const MyApp = ({ Component, pageProps }: AppProps) => {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(prevState => !prevState);
    };

    return (
        <Provider store={store}>
            <ThemeContext.Provider value={{ darkMode, handleDarkMode }}>
                <ErrorBoundary>
                    <div id="rootDiv" className={darkMode ? "dark-mode" : ""}>
                        <Component {...pageProps} />
                    </div>
                </ErrorBoundary>
            </ThemeContext.Provider>
        </Provider>
    );
};

export default MyApp;
