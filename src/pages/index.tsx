import {GetServerSideProps} from 'next';
import {IDetails} from '../components/DetailedCard/DetailedCard';
import Head from "next/head";
import {SearchApp} from '../components/SearchApp/SearchApp';

const fetchData = async (page: number, search: string) => {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}&search=${search}`);
    return await response.json();
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;
    const page = query.page ? parseInt(query.page as string, 10) : 1;
    const search = query.search ? query.search as string : '';

    try {
        const data = await fetchData(page, search);

        return {
            props: {
                initialData: data.results || [],
                page,
                search,
                totalPages: Math.ceil(data.count / 10) || 0,
                error: null,
            },
        };
    } catch (error) {
        return {
            props: {
                initialData: [],
                page,
                search,
                totalPages: 0,
                error: 'Failed to fetch data from API.',
            },
        };
    }
};

const Home = ({ initialData, page, search, error, totalPages }: { initialData: IDetails[], page: number, search: string, error?: string, totalPages: number }) => {
    return (
        <>
            <Head>
                <title>Star Wars Search</title>
                <meta name="description" content="App Star Wars Search" />
            </Head>
            <SearchApp initialData={initialData} page={page} search={search} error={error} totalPages={totalPages} />
        </>
    );
};

export default Home;
