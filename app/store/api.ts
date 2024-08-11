import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {IDetails} from "../components/DetailedCard/DetailedCard.tsx";
import { setPageData } from "./reducers/selected.ts";

interface IData {
    results: IDetails[];
    next: string | null;
    previous: string | null;
    count: number;
}

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://swapi.dev/api/' }),
    endpoints: (builder) => ({
        getPeople: builder.query<IData, { page: number; search: string }>({
            query: ({ page, search }) => {
                let request = `people/?page=${page}`;
                if (search.trim()) {
                    const searchTerm = encodeURIComponent(search.trim());
                    request = `people/?search=${searchTerm}&page=${page}`;
                }
                return request;
            },
            async onQueryStarted({ page, search }, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    dispatch(setPageData({ page, data: data.results }));
                } catch (error) {
                    console.error(error, search);
                }
            },
        }),
    }),
});

export const { useGetPeopleQuery } = api;
