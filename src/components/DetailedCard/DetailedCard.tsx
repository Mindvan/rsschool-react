import { FC } from 'react';
import cls from './styles.module.css';
import ButtonCustom from "../UI/ButtonCustom/ButtonCustom.tsx";

export interface IDetails {
    id: string;
    name: string;
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: string;
    homeworld: string;
    mass: string;
    skin_color: string;
    url: string;
}

interface DetailedCardProps {
    detailsData: IDetails | null;
    error: string | null;
}

const DetailedCard: FC<DetailedCardProps> = ({ detailsData, error }) => {
    const handleClose = () => {
        // Здесь используем обычную логику для закрытия модального окна
        const query = new URLSearchParams(window.location.search);
        query.delete('details');
        window.history.pushState({}, '', `${window.location.pathname}?${query.toString()}`);
    };

    const handleOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    return (
        <div>
            {detailsData ? (
                <div className={cls.detailsContainer}>
                    <div className={cls.backdrop} onClick={handleOutside}></div>
                    <div className={cls.details}>
                        <h2>Details info</h2>
                        <ul>
                            {Object.keys(detailsData).map((key: string) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {detailsData[key as keyof IDetails]}
                                </li>
                            ))}
                        </ul>
                        <ButtonCustom type={cls.closeButton} onClick={handleClose}>Close</ButtonCustom>
                    </div>
                </div>
            ) : (
                <p>{error}</p>
            )}
        </div>
    );
};

export default DetailedCard;