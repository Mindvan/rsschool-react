import { useNavigate } from 'react-router-dom';
import cls from './styles.module.css';
import {FC} from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks.ts";
import {IDetails} from "../DetailedCard/DetailedCard.tsx";
import {addItem, removeItem} from "../../store/reducers/selected.ts";

interface SearchItemProps {
    id: string;
    gender: string;
    birth_year: string;
    height: string;
    name: string;
}

const Card: FC<SearchItemProps> = ({ id, gender, birth_year, height, name }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const selectedItems = useAppSelector(state => state.selected.items);
    const isSelected = selectedItems.some(item => item.id === id);

    // useEffect(() => {
    //     console.log('хранилище:', selectedItems);
    // }, [selectedItems]);

    const handleClick = () => {
        const params = new URLSearchParams(location.search);
        params.set('details', id);
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const item: IDetails = { id, gender, birth_year, height, name, eye_color: "", hair_color: "", homeworld: "", mass: "", skin_color: "", url: "" };
        if (e.target.checked) {
            dispatch(addItem(item));
        } else {
            dispatch(removeItem(id));
        }
    };

    return (
        <div onClick={handleClick} className={cls.search__listItem}>
            <input
                type="checkbox"
                className={cls.checkbox}
                checked={isSelected}
                onChange={handleCheckboxChange}
                onClick={(e) => e.stopPropagation()}
            />
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
