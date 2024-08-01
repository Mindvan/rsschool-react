import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
import CardList from "../../components/CardList/CardList.tsx";
import cls from "./styles.module.css";
import { getPaginationNumbers, pageCounter } from "../../utils/pageCounter.ts";
import Pagination from "../../components/Pagination/Pagination.tsx";
import { useParams, useNavigate, Outlet, useSearchParams } from "react-router-dom";
import Search from "../../components/Search/Search.tsx";
import {resetItems} from "../../store/reducers/selected.ts";
import {useAppDispatch} from "../../store/hooks.ts";
import Flyout from "../../components/Flyout/Flyout.tsx";
import {useGetPeopleQuery} from "../../store/api.ts";

export const SearchApp: FC = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const navigate = useNavigate();
    const { page: pageParam } = useParams<{ page: string }>();
    const initialPage = pageParam ? parseInt(pageParam, 10) : 1;
    const [page, setPage] = useState<number>(initialPage);
    const [search, setSearch] = useLocalStorage();
    const [queryString, setQueryString] = useState<string>('');
    const [searchParams] = useSearchParams();
    const dispatch = useAppDispatch();

    if (!useGetPeopleQuery) return;
    const {data, error, isLoading, isFetching } = useGetPeopleQuery({ page, search: queryString || '' });

    useEffect(() => {
        dispatch(resetItems());
    }, [dispatch]);

    const pagesCount = data ? pageCounter(data.count) : 0;
    const pagesArr = getPaginationNumbers(pagesCount);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleFetch = () => {
        setPage(1);
        setQueryString(search);
    }

    const handleNewPage = (newPage: number) => {
        if (!isNaN(newPage)) {
            setPage(newPage);

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

    return (
        <div className={cls.wrapper}>
            <Search
                search={search}
                handleSearch={handleSearch}
                handleFetch={handleFetch}
                makeError={makeError}
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
                        {data && data.results.length > 0 && (<Pagination pagesArr={pagesArr} currPage={page} setPage={handleNewPage} next={data.next}
                                     previous={data.previous}/>)}
                        <Outlet />
                        <Flyout />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default SearchApp;
