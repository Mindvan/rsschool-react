import { useRouter } from 'next/router';
import DetailedCard from '../../components/DetailedCard/DetailedCard';

const DetailsPage = () => {
    const router = useRouter();
    const { id } = router.query;

    return (
        <div>
            {id && <DetailedCard id={id as string} />}
        </div>
    );
};

export default DetailsPage;
