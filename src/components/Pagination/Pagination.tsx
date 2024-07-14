import cls from "./styles.module.css";

const Pagination = ({ pagesArr, currPage, setPage, next, previous }: { pagesArr: number[]; currPage: number; setPage: (value: number) => void; next: string | null; previous: string | null; }) => {
    const handlePrev = () => {
        if (previous) {
            const prevPage = currPage - 1;
            setPage(prevPage);
        }
    };

    const handleNext = () => {
        if (next) {
            const nextPage = currPage + 1;
            setPage(nextPage);
        }
    };

    return (
        <div className={cls.pagination}>
            <div onClick={handlePrev} className={previous ? `${cls.item}` : `${cls.item} ${cls.item_inactive}`}>PREV</div>
            {pagesArr.map((page) => (
                <div onClick={() => setPage(page)} key={page}
                     className={currPage === page ? `${cls.item} ${cls.item_current}` : `${cls.item}`}> {page} </div>
            ))}
            <div onClick={handleNext} className={next ? `${cls.item}` : `${cls.item} ${cls.item_inactive}`}>NEXT</div>
        </div>
    );
};

export default Pagination;
