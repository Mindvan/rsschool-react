import { useEffect, useState } from "react";

export const useLocalStorage = (): [string, (value: string) => void] => {
    const getInitialQuery = () => {
        if (typeof window !== 'undefined') {
            const savedQuery = window.localStorage.getItem('searchTerm');
            return savedQuery ? savedQuery : '';
        }
        return '';
    };

    const [data, setData] = useState<string>(getInitialQuery);

    useEffect(() => {
        const initialQuery = getInitialQuery();
        setData(initialQuery);
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.localStorage.setItem('searchTerm', data);
        }
    }, [data]);

    return [data, setData];
}