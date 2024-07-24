import cls from './styles.module.css';
import {ChangeEvent} from "react";
import ButtonCustom from "../UI/ButtonCustom/ButtonCustom.tsx";
import InputCustom from "../UI/InputCustom/InputCustom.tsx";

interface Props {
    search: string;
    handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
    handleFetch: () => void;
    makeError: () => void;
}

export const Search = ({search, handleSearch, handleFetch, makeError}: Props) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        handleSearch(event);
    };

    return (
        <div className={`${cls.section} ${cls.top}`}>
            <div className={cls.searchBlock}>
                <InputCustom name='search' onChange={handleChange} type='search' label='Search' value={search}/>
                <ButtonCustom onClick={handleFetch}>Search</ButtonCustom>
            </div>
            <div className={cls.buttonsOptions}>
                <ButtonCustom onClick={handleFetch}>Change Theme</ButtonCustom>
                <ButtonCustom onClick={makeError}>Click Me</ButtonCustom>
            </div>
        </div>
    );
};

export default Search;
