import { FC, ChangeEvent, useEffect, useState } from 'react';
import { useLocalStorage } from "../../hooks/useLocalStorage.ts";
import CardList from "../CardList/CardList.tsx";
import cls from "./styles.module.css";
import { getPaginationNumbers } from "../../utils/pageCounter.ts";
import Pagination from "../Pagination/Pagination.tsx";
import { useRouter } from 'next/router';
import Search from "../Search/Search.tsx";
import { resetItems } from "../../store/reducers/selected.ts";
import { useAppDispatch } from "../../store/hooks.ts";
import Flyout from "../Flyout/Flyout.tsx";
import DetailedCard from "../DetailedCard/DetailedCard.tsx";
import { IDetails } from '../DetailedCard/DetailedCard';

export const SearchApp: FC<{ initialData: IDetails[], page: number, search: string, error?: string, totalPages: number }> = ({ initialData, page, search, error, totalPages }) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(page);
    const [queryString, setQueryString] = useState<string>(search);
    const [searchTerm, setSearch] = useLocalStorage();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetItems());
    }, [dispatch]);

    const pagesArr = getPaginationNumbers(totalPages);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleFetch = () => {
        setCurrentPage(1);
        setQueryString(searchTerm);
        router.push({
            pathname: router.pathname,
            query: { search: searchTerm, page: 1 }
        });
    };

    const handleNewPage = async (newPage: number) => {
        if (!isNaN(newPage)) {
            setIsLoading(true);
            setCurrentPage(newPage);
            await router.push({
                pathname: router.pathname,
                query: { search: search.trim(), page: newPage.toString() }
            });
            setIsLoading(false);
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
                search={searchTerm}
                handleSearch={handleSearch}
                handleFetch={handleFetch}
                makeError={makeError}
            />
            <div className={`${cls.section} ${cls.bottom}`}>
                {error ? (
                    <p>{error}</p>
                ) : isLoading ? (
                    <p>Loading data...</p>
                ) : initialData.length > 0 ? (
                    <>
                        <CardList results={initialData} />
                        <Pagination pagesArr={pagesArr} currPage={currentPage} setPage={handleNewPage} next={null} previous={null} />
                        {router.query.details && <DetailedCard details={router.query.details as string} />}
                        <Flyout />
                    </>
                ) : (
                    <p>No data available.</p>
                )}
            </div>
        </div>
    );
};

export default SearchApp;
