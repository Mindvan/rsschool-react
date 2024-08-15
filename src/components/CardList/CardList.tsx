'use client';

import cls from './styles.module.css';
import Card from '../Card/Card';

interface DataType {
    birth_year: string;
    gender: string;
    height: string;
    name: string;
    url: string;
}

const getIdFromUrl = (url: string) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
};

const CardList = ({ results }: { results: DataType[] }) => {
    if (results.length === 0) {
        return <div>No results</div>;
    }

    return (
      <div className={cls.search__list}>
          {results.map((item: DataType) => (
            <Card
              key={item.url}
              id={getIdFromUrl(item.url)}
              gender={item.gender}
              height={item.height}
              birth_year={item.birth_year}
              name={item.name}
            />
          ))}
      </div>
    );
};

export default CardList;
