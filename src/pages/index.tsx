import { SearchApp } from '../components/SearchApp/SearchApp';
import { DetailedCard } from '../components/DetailedCard/DetailedCard';
import Head from "next/head";

const Home = () => {
    return (
        <>
            <Head>
                <title>Star Wars Search</title>
                <meta name="description" content="App Star Wars Search" />
            </Head>
            <SearchApp />
        </>
    );
};

export default Home;
