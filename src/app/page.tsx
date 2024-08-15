// src/app/page.tsx
import SearchApp from '../components/SearchApp/SearchApp';

export async function generateMetadata({ searchParams }: { searchParams: { search?: string; page?: string } }) {
    const search = searchParams.search || '';
    return { title: `Search results for "${search}"` };
}

export default async function Page({ searchParams }: { searchParams: { search?: string; page?: string } }) {
    const search = searchParams.search || '';
    const page = parseInt(searchParams.page || '1', 10);

    // Получение данных с сервера
    const response = await fetch(`http://localhost:3000/api/search?search=${search}&page=${page}`);
    const data = await response.json();

    return (
        <SearchApp
            searchParams={{ search, page: searchParams.page }}
            data={data}
        />
    );
}