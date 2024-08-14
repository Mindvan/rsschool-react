import {
    isRouteErrorResponse,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useRouteError
} from "@remix-run/react";
import { Provider } from 'react-redux';
import { store } from './store/store';
import {ThemeContext, ThemeProvider} from './context/ThemeProvider';
import { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary/ErrorBoundary';
import { Error } from './components/Error/Error';
import './styles/normalize.css';
import './styles/global.css';
import './styles/root.css';
import {MetaFunction} from "@remix-run/node";
import SearchApp from "./components/SearchApp/SearchApp";

export default function App() {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(prevState => !prevState);
    };

    return (
        <html lang="en" id="rootDiv" className={darkMode ? 'dark-mode' : ''}>
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>
        <Provider store={store}>
            <ThemeContext.Provider value={{darkMode, handleDarkMode}}>
                <ErrorBoundary>
                    <div>
                        <SearchApp />
                        <Outlet/>
                    </div>
                </ErrorBoundary>
            </ThemeContext.Provider>
        </Provider>
        <ScrollRestoration/>
        <Scripts/>
        </body>
        </html>
    );
}
