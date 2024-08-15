import Link from 'next/link';
import { FC } from 'react';
import cls from './styles.module.css';

interface PaginationProps {
    pagesArr: number[];
    currPage: number;
    next: string | null;
    previous: string | null;
    searchQuery: string;
}

const Pagination: FC<PaginationProps> = ({ pagesArr, currPage, next, previous, searchQuery }) => {
    return (
      <nav>
          <ul className={cls.pagination}>
              <li className={previous ? cls.item : `${cls.item} ${cls.item_inactive}`}>
                  {previous ? (
                    <Link href={`/?search=${encodeURIComponent(searchQuery)}&page=${currPage - 1}`}>
                        Previous
                    </Link>
                  ) : (
                    'Previous'
                  )}
              </li>
              {pagesArr.map((page) => (
                <li key={page} className={currPage === page ? `${cls.item} ${cls.item_current}` : cls.item}>
                    <Link href={`/?search=${encodeURIComponent(searchQuery)}&page=${page}`}>
                        {page}
                    </Link>
                </li>
              ))}
              <li className={next ? cls.item : `${cls.item} ${cls.item_inactive}`}>
                  {next ? (
                    <Link href={`/?search=${encodeURIComponent(searchQuery)}&page=${currPage + 1}`}>
                        Next
                    </Link>
                  ) : (
                    'Next'
                  )}
              </li>
          </ul>
      </nav>
    );
};

export default Pagination;
