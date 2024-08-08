import { FC, useEffect, useState } from 'react';
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
import CardList from "../CardList/CardList.tsx";
import cls from "./styles.module.css";
import { getPaginationNumbers, pageCounter } from "../../utils/pageCounter.ts";
import Pagination from "../Pagination/Pagination.tsx";
import { useRouter } from 'next/router';
import Search from "../Search/Search.tsx";
import { resetItems } from "../../store/reducers/selected.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import Flyout from "../Flyout/Flyout.tsx";
import { useGetPeopleQuery } from "../../store/api.ts";
import DetailedCard from "../DetailedCard/DetailedCard.tsx";

export const SearchApp: FC = () => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const router = useRouter();
    const { page, search: searchParam, details } = router.query;
    const initialPage = page ? parseInt(page as string, 10) : 1;
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [search, setSearch] = useLocalStorage();
    const [queryString, setQueryString] = useState<string>(searchParam as string || '');
    const dispatch = useAppDispatch();

    if (!useGetPeopleQuery) return;
    const { data, error, isLoading, isFetching } = useGetPeopleQuery({ page: currentPage, search: queryString || '' });

    useEffect(() => {
        dispatch(resetItems());
    }, [dispatch]);

    const pagesCount = data ? pageCounter(data.count) : 0;
    const pagesArr = getPaginationNumbers(pagesCount);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleFetch = () => {
        setCurrentPage(1);
        setQueryString(search);
        router.push({
            pathname: router.pathname,
            query: { search, page: 1 }
        });
    };

    const handleNewPage = (newPage: number) => {
        if (!isNaN(newPage)) {
            setCurrentPage(newPage);

            router.push({
                pathname: router.pathname,
                query: { search: search.trim(), page: newPage.toString() }
            });
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
                        {data && data.results.length > 0 && (<Pagination pagesArr={pagesArr} currPage={currentPage} setPage={handleNewPage} next={data.next}
                                                                         previous={data.previous}/>)}
                        {details && <DetailedCard />} {/* Отображаем DetailedCard если параметр 'details' присутствует */}
                        <Flyout />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default SearchApp;
