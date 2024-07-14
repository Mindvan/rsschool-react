import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
import CardList from "../../components/CardList/CardList.tsx";
import cls from "./styles.module.css";
import { getPaginationNumbers, pageCounter } from "../../utils/pageCounter.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useParams, useNavigate, Outlet, useSearchParams } from "react-router-dom";
import Search from "../../components/Search/Search.tsx";

export const SearchApp: FC = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [pagesCount, setPagesCount] = useState(0);
    const navigate = useNavigate();
    const { page: pageParam } = useParams<{ page: string }>();
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useLocalStorage();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchData(page);
    }, []);

    useEffect(() => {
        if (pageParam && !isNaN(parseInt(pageParam, 10))) {
            fetchData(parseInt(pageParam, 10));
        } else {
            setPage(1);
        }
    }, [pageParam]);

    const fetchData = async (page: number) => {
        if (!search) {
            return;
        }

        const searchTerm = encodeURIComponent(search.trim());
        const request = `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`;

        setLoading(true);
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                setData(data);
                setPagesCount(pageCounter(data.count));
            } else {
                console.error("Error fetching data:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const pagesArr = getPaginationNumbers(pagesCount);

    const handleFetch = () => {
        if (!isNaN(page)) {
            fetchData(page);
        }
    };

    const handleSearch = (event) => {
        setSearch(event.target.value);
    }

    const handleNewPage = (newPage: number) => {
        if (!isNaN(newPage)) {
            setPage(newPage);
            fetchData(newPage);

            searchParams.set('search', search.trim());
            searchParams.set('page', newPage.toString());

            navigate({ search: `?${searchParams.toString()}` });
        }
    };

    const makeError = () => {
        setIsClicked(true);
    };

    if (isClicked) {
        throw new Error('some error happened i guess');
    }

    const msg = data ? 'No results' : 'Search for something';

    return (
        <div className={cls.wrapper}>
            <Search
                search={search}
                handleSearch={handleSearch}
                handleFetch={handleFetch}
                makeError={makeError}
            />
            <div className={`${cls.section} ${cls.bottom}`}>
                {loading ? <p>Loading...</p> :
                    data && data.count > 0 ? (
                        <>
                            <CardList results={data.results}/>
                            <Pagination pagesArr={pagesArr} currPage={page} setPage={handleNewPage} next={data.next}
                                        previous={data.previous}/>
                            <Outlet/>
                        </>
                    ) : <p>{msg}</p>
                }
            </div>
        </div>
    );
};

export default SearchApp;
