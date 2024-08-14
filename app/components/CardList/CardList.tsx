import cls from './styles.module.css';
import Card from '../Card/Card.tsx';

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
    if (results && results.length === 0) {
        return (<div>No results</div>);
    }

    return (
        <div className={cls.search__list}>
            {results.map((item: DataType, index: number) => (
                <Card
                    key={index}
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
