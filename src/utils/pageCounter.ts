export const pageCounter = (total: number) => {
    return Math.ceil(total / 10);
}

export const getPaginationNumbers = (totalItems: number, itemsPerPage: number) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
    }
    return pages;
};