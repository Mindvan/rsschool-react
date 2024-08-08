import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
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

type IDetailsKey = keyof IDetails;

const DetailedCard: FC = () => {
    const router = useRouter();
    const { details } = router.query;
    const [isOpen, setIsOpen] = useState<boolean>(!!details);
    const [detailsData, setDetailsData] = useState<IDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!details) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://swapi.dev/api/people/${details}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();

                setDetailsData({
                    id: details as string,
                    name: data.name,
                    birth_year: data.birth_year,
                    eye_color: data.eye_color,
                    gender: data.gender,
                    hair_color: data.hair_color,
                    height: data.height,
                    homeworld: data.homeworld,
                    mass: data.mass,
                    skin_color: data.skin_color,
                    url: data.url,
                });
                setError(null);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [details]);

    const handleClose = () => {
        setIsOpen(false);
        router.push({
            pathname: router.pathname,
            query: { ...router.query, details: undefined }
        }, undefined, { shallow: true });
    };

    const handleOutside = (event: React.MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    return (
        <div>
            {isOpen && (
                <div className={cls.detailsContainer}>
                    <div className={cls.backdrop} onClick={handleOutside}></div>
                    <div className={cls.details}>
                        {loading ? (<p>Loading details...</p>) : detailsData ? (
                            <div>
                                <h2>Details info</h2>
                                <ul>
                                    {Object.keys(detailsData).map((key: string) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {detailsData[key as IDetailsKey]}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <p>{error}</p>
                        )}
                        <ButtonCustom type={cls.closeButton} onClick={handleClose}>Close</ButtonCustom>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DetailedCard;
