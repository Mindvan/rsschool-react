import cls from './styles.module.css';
import {ChangeEvent} from "react";

interface Props {
    search: string;
    handleSearch: (event) => void;
    handleFetch: () => void;
    makeError: () => void;
}

export const Search = ({search, handleSearch, handleFetch, makeError}: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleSearch(event);
    };

    return (
        <div className={`${cls.section} ${cls.top}`}>
            <label htmlFor="search" className={cls.section__title}>Search</label>
            <input
                type="search"
                id={cls.search}
                value={search}
                onChange={handleChange}
                name="search"
            />
            <button onClick={handleFetch}>Search</button>
            <button onClick={makeError}>Click Me</button>
        </div>
    );
};

export default Search;
