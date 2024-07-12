import {ChangeEvent, FC, useState} from 'react';
import {useLocalStorage} from "../../hooks/useLocalStorage.ts";
import SearchList from "../../components/SearchList/SearchList.tsx";
import cls from "./styles.module.css";
import {getPaginationNumbers, pageCounter} from "../../utils/pageCounter.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useParams, useNavigate } from "react-router-dom";

export const SearchApp: FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    //const [search, setSearch] = useState<string>(localStorage.getItem('searchTerm') || '');
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [pagesCount, setPagesCount] = useState(0);
    const navigate = useNavigate();
    const { page: pageParam } = useParams<{ page: string }>();
    const initialPage = parseInt(pageParam || '1', 10);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useLocalStorage();

    const fetchData = async (page: number) => {
        const request = `https://swapi.dev/api/people/?search=${search}&page=${page}`;

        setLoading(true);
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched data:", data);
                setData(data);
                setPagesCount(pageCounter(data.count));
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const pagesArr = getPaginationNumbers(pagesCount);

    const handleFetch = () => {
        fetchData(page);
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
    };

    const handleNewPage = (page: number) => {
        setPage(page);
        fetchData(page);
        navigate(`/rsschool-react/search/${page}`);
    }

    const makeError = () => {
        setIsClicked(true);
    };

    if (isClicked) {
        throw new Error('some error happened i guess');
    }

    const msg = data ? 'No results' : 'Search for something';

    return (
        <div className={cls.wrapper}>
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
            <div className={`${cls.section} ${cls.bottom}`}>
                {loading ? <p>Loading...</p> :
                    data && data.count > 0 ? (
                        <>
                            <SearchList results={data.results}/>
                            <Pagination pagesArr={pagesArr} currPage={page} setPage={handleNewPage} next={data.next} previous={data.previous}/>
                        </>
                    ) : <p>{msg}</p>
                }
            </div>
        </div>
    );
};

export default SearchApp;