import cls from './styles.module.css';
import SearchItem from "../SearchItem/SearchItem.tsx";

interface DataType {
    birth_year: string;
    gender: string;
    height: string;
    name: string;
}

const SearchList = ({ results }: { results: DataType[] }) => {
    return (
        <div className={cls.search__list}>
            {results.map((item: DataType, index: number) => (
                <div key={index} className={cls.search__listItem}>
                    {item.name}
                    <SearchItem gender={item.gender} height={item.height} birth_year={item.birth_year} />
                </div>
            ))}
        </div>
    );
};

export default SearchList;