import cls from "./styles.module.css";

export const Pagination = ({ pagesArr, currPage, setPage, next, previous }: { pagesArr: number[]; currPage: number; setPage: (value: number) => void; next: string; previous: string;}) => {
    return (
        <div className={cls.pagination}>
            <div className={previous ? `${cls.item}` : `${cls.item} ${cls.item_inactive}`}>PREV</div>
            {pagesArr.map((page) => (
                <div onClick={() => setPage(page)} key={page}
                     className={currPage === page ? `${cls.item} ${cls.item_current}` : `${cls.item}`}> {page} </div>
            ))}
            <div className={next ? `${cls.item}` : `${cls.item} ${cls.item_inactive}`}>NEXT</div>
        </div>
    );
};

export default Pagination;