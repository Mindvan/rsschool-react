'use client';

import { ChangeEvent, FC, useState, useContext } from 'react';
import ButtonCustom from '../UI/ButtonCustom/ButtonCustom';
import InputCustom from '../UI/InputCustom/InputCustom';
import { ThemeContext } from '../../context/ThemeProvider';
import { useRouter } from 'next/navigation';
import cls from './styles.module.css';

interface Props {
    initialSearch: string;
}

export const Search: FC<Props> = ({ initialSearch }) => {
    const [search, setSearch] = useState(initialSearch);
    const { darkMode, handleDarkMode } = useContext(ThemeContext);
    const router = useRouter();

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleFetch = () => {
        if (search.trim()) {
            router.push(`/search?query=${encodeURIComponent(search)}`);
        } else {
            console.log('Search query is empty');
        }
    };

    return (
      <div className={`${cls.section} ${cls.top}`}>
          <div className={cls.searchBlock}>
              <label htmlFor="search">Mindvan</label>
              <InputCustom
                id="search"
                name="search"
                placeholder="Type something"
                onChange={handleSearch}
                type="search"
                value={search}
              />
              <ButtonCustom onClick={handleFetch}>Search</ButtonCustom>
          </div>
          <div className={cls.buttonsOptions}>
              <ButtonCustom onClick={handleDarkMode}>
                  Switch to {darkMode ? 'Light' : 'Dark'} Mode
              </ButtonCustom>
              <ButtonCustom onClick={() => { throw new Error('some error happened i guess'); }}>
                  Click Me for Error
              </ButtonCustom>
          </div>
      </div>
    );
};

export default Search;
