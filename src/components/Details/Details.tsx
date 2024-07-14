import { FC, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import cls from './styles.module.css';
import { MouseEvent } from 'react';

export const Details: FC = () => {
    const [params] = useSearchParams();
    const id = params.get('details');
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchDetails = async () => {
            try {
                setLoading(true);
                setIsOpen(true);
                const response = await fetch(`https://swapi.dev/api/people/${id}`);
                if (!response.ok) {
                    throw new Error(`error ${response.statusText}`);
                }
                const data = await response.json();

                setDetails({
                    'Name': data.name,
                    'Birth Year': data.birth_year,
                    'Eye Color': data.eye_color,
                    'Gender': data.gender,
                    'Hair Color': data.hair_color,
                    'Height': data.height,
                    'Homeworld': data.homeworld,
                    'Mass': data.mass,
                    'Skin_color': data.skin_color
                });
                setError(null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchDetails();
    }, [id]);

    const handleClose = () => {
        setIsOpen(false);
        params.delete('details');
        navigate(`?${params.toString()}`, { replace: true });
    };

    const handleOutside = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            handleClose();
        }
    };

    return (
        <div style={{display: isOpen ? 'block' : 'none'}}>
            <div className={cls.backdrop} onClick={handleOutside}></div>
            <div className={cls.details}>
                {loading ? (<p>Loading details...</p>) : details ? (
                        <div>
                            <h2>Details info for {details?.Name}</h2>
                            <ul>
                                {Object.keys(details).map((key) => (
                                    <li key={key}>
                                        <strong>{key}:</strong> {details[key]}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>{error}</p>
                    )}
                <button className={cls.closeButton} onClick={handleClose}>Close</button>
            </div>
        </div>
    );
};

export default Details;
