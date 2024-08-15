import { FC } from 'react';
import CardList from '../../components/CardList/CardList';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import cls from './styles.module.css';
import { getPaginationNumbers } from '../../utils/pageCounter.ts';

interface SearchAppProps {
  searchParams: {
    search?: string;
    page?: string;
  };
  data: {
    results: any[];
    next: string | null;
    previous: string | null;
    count: number;
  };
}

const SearchApp: FC<SearchAppProps> = ({ searchParams, data }) => {
  const query = searchParams?.search || '';
  const page = parseInt(searchParams?.page || '1', 10);
  const itemsPerPage = 10;

  const pagesArr = getPaginationNumbers(data.count, itemsPerPage);

  return (
    <div className={cls.wrapper}>
      <Search initialSearch={query} />
      <CardList results={data.results} />
      <Pagination
        pagesArr={pagesArr}
        currPage={page}
        searchQuery={query}
        next={data.next}
        previous={data.previous}
      />
    </div>
  );
};

export default SearchApp;
