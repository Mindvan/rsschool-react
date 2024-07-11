import cls from "./styles.module.css";

const SearchItem = (item: { gender: string, birth_year: string, height: string }) => {
    return (
        <ul className={cls.search__listItemInfo}>
            <li>Gender: {item.gender}</li>
            <li>Birth Year: {item.birth_year}</li>
            <li>Height: {item.height}</li>
        </ul>
    );
};

export default SearchItem;