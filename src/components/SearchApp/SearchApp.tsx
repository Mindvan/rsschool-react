// src/app/search/page.tsx (или другой файл, в зависимости от структуры вашего проекта)

import { FC } from 'react';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import { getPaginationNumbers } from '../../utils/pageCounter';
import Search from '../../components/Search/Search';
import cls from './styles.module.css';

interface SearchAppProps {
    searchParams: {
        search?: string;
        page?: string;
    };
}

const SearchApp: FC<SearchAppProps> = async ({ searchParams }) => {
    const query = searchParams?.search || '';
    const page = searchParams?.page || '1';

    const itemsPerPage = 10;
    const pageNumber = parseInt(page, 10);

    let data = { results: [], next: null, previous: null, count: 0 };

    try {
        const response = await fetch(`https://swapi.dev/api/people/?search=${encodeURIComponent(query)}&page=${pageNumber}`);
        data = await response.json();
    } catch (err) {
        console.error('Error fetching data:', err);
    }

    const pagesArr = getPaginationNumbers(data.count, itemsPerPage);

    return (
        <div className={cls.wrapper}>
            <Search initialSearch={query} />
            <CardList results={data.results} />
            <Pagination
                pagesArr={pagesArr}
                currPage={pageNumber}
                searchQuery={query}
                next={data.next}
                previous={data.previous}
            />
        </div>
    );
};

export default SearchApp;