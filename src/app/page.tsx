import SearchApp from '../components/SearchApp/SearchApp';

export async function generateMetadata({ searchParams }: { searchParams: { search?: string; page?: string } }) {
    const search = searchParams.search || '';
    return { title: `Search results for "${search}"` };
}

export default async function Page({ searchParams }: { searchParams: { search?: string; page?: string } }) {
    const query = searchParams.search || '';
    const page = parseInt(searchParams.page || '1', 10);

    const response = await fetch(`https://swapi.dev/api/people/?search=${encodeURIComponent(query)}&page=${page}`);
    const data = await response.json();

    return (
      <SearchApp
        searchParams={{ search: query, page: searchParams.page }}
        data={data}
      />
    );
}
