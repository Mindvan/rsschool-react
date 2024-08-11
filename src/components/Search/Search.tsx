import cls from './styles.module.css';
import { ChangeEvent, useContext } from 'react';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom.tsx';
import InputCustom from '../UI/InputCustom/InputCustom.tsx';
import { ThemeContext } from '../../context/ThemeProvider.tsx';

interface Props {
    search: string;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFetch: () => void;
    makeError: () => void;
}

export const Search = ({ search, handleSearch, handleFetch }: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleSearch(event);
    };

    const makeError = () => {
        throw new Error('some error happened i guess');
    };

    const { darkMode, handleDarkMode } = useContext(ThemeContext);

    return (
        <div className={`${cls.section} ${cls.top}`}>
            <div className={cls.searchBlock}>
                <label htmlFor="search">Mindvan</label>
                <InputCustom id="search" name="search" placeholder="Type something" onChange={handleChange} type="search" value={search} />
                <ButtonCustom onClick={handleFetch}>Search</ButtonCustom>
            </div>
            <div className={cls.buttonsOptions}>
                <ButtonCustom onClick={handleDarkMode}>Switch to {darkMode ? 'Light' : 'Dark'} Mode</ButtonCustom>
                <ButtonCustom onClick={makeError}>Click Me for Error</ButtonCustom>
            </div>
        </div>
    );
};

export default Search;
