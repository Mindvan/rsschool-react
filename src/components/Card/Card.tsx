import { useNavigate } from 'react-router-dom';
import cls from './styles.module.css';
import { FC } from "react";

interface SearchItemProps {
    id: string;
    gender: string;
    birth_year: string;
    height: string;
    name: string;
}

const Card: FC<SearchItemProps> = ({ id, gender, birth_year, height, name }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        const params = new URLSearchParams(location.search);
        params.set('details', id);
        navigate(`?${params.toString()}`, { replace: true });
    };

    return (
        <div onClick={handleClick} className={cls.search__listItem}>
            <div>{name}</div>
            <ul className={cls.search__listItemInfo}>
                <li>Gender: {gender}</li>
                <li>Birth Year: {birth_year}</li>
                <li>Height: {height}</li>
            </ul>
        </div>
    );
};

export default Card;
