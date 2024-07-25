import SearchApp from "./pages/SearchApp/SearchApp.tsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Error from "./pages/Error/Error.tsx";
import './App.css';
import DetailedCard from "./components/DetailedCard/DetailedCard.tsx";
import {createContext, useState} from "react";

interface ThemeContextProps {
    darkMode: boolean;
    handleDarkMode: () => void;
}

const defaultValue: ThemeContextProps = {
    darkMode: false,
    handleDarkMode: () => {},
};

export const ThemeContext = createContext(defaultValue);

const App = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(prevState => !prevState);
    }

    return (
        <ThemeContext.Provider value={{darkMode, handleDarkMode}}>
            <div id="root">
                <BrowserRouter>
                    <Routes>
                        <Route path="rsschool-react" element={<SearchApp/>}>
                            <Route index element={<DetailedCard/>}/>
                        </Route>
                        <Route path="rsschool-react/error" element={<Error/>}/>
                        <Route path="*" element={<Navigate to="/rsschool-react/error" replace/>}/>
                    </Routes>
                </BrowserRouter>
            </div>
        </ThemeContext.Provider>
    );
};

export default App;
