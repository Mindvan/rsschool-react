export const pageCounter = (total: number) => {
    return Math.ceil(total / 10);
}

export const getPaginationNumbers = (pages: number) => {
    const arr = [];
    for (let i = 0; i < pages; i++) {
        arr.push(i + 1);
    }
    return arr;
}