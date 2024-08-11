import { FC, useState, ChangeEvent, useEffect } from 'react';
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
import CardList from "../CardList/CardList.tsx";
import cls from "./styles.module.css";
import { getPaginationNumbers, pageCounter } from "../../utils/pageCounter.ts";
import Pagination from "../Pagination/Pagination.tsx";
import { useSearchParams, useNavigate, useLocation } from '@remix-run/react';
import Search from "../Search/Search.tsx";
import { resetItems } from "../../store/reducers/selected.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import Flyout from "../Flyout/Flyout.tsx";
import { useGetPeopleQuery } from "../../store/api.ts";
import DetailedCard from "../DetailedCard/DetailedCard.tsx";

export const SearchApp: FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const pageParam = searchParams.get('page');
    const searchParam = searchParams.get('search');
    const details = searchParams.get('details');
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [search, setSearch] = useLocalStorage<string>('search', '');
    const [queryString, setQueryString] = useState<string>(searchParam || '');
    const [inputValue, setInputValue] = useState<string>(search || '');
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetItems());
    }, [dispatch]);

    useEffect(() => {
        if (searchParam) {
            setQueryString(searchParam);
        }
    }, [searchParam]);

    useEffect(() => {
        if (search && !searchParam) {
            navigate(`?search=${search}&page=1`, { replace: true });
        }
    }, [search, searchParam, navigate]);

    const { data, error, isLoading, isFetching } = useGetPeopleQuery({ page: currentPage, search: queryString || '' });

    const pagesCount = data ? pageCounter(data.count) : 0;
    const pagesArr = getPaginationNumbers(pagesCount);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleFetch = () => {
        setCurrentPage(1);
        setSearch(inputValue);
        setQueryString(inputValue);
        navigate(`?search=${inputValue}&page=1`, { replace: true });
    };

    const handleNewPage = (newPage: number) => {
        if (!isNaN(newPage)) {
            setCurrentPage(newPage);
            navigate(`?search=${queryString.trim()}&page=${newPage}`, { replace: true });
        }
    };

    return (
        <div className={cls.wrapper}>
            <Search
                search={inputValue}
                handleSearch={handleSearch}
                handleFetch={handleFetch}
            />
            <div className={`${cls.section} ${cls.bottom}`}>
                {isLoading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error fetching data: {JSON.stringify(error)}</p>
                ) : isFetching ? (
                    <p>Fetching and caching data...</p>
                ) : data ? (
                    <>
                        <CardList results={data.results} />
                        {data.results.length > 0 && (
                            <Pagination
                                pagesArr={pagesArr}
                                currPage={currentPage}
                                setPage={handleNewPage}
                                next={data.next}
                                previous={data.previous}
                            />
                        )}
                        {details && <DetailedCard details={details} />}
                        <Flyout />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default SearchApp;
