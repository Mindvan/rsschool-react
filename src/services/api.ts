// src/services/api.ts
export async function fetchPeople(page: number, search: string = '') {
    const response = await fetch(`https://swapi.dev/api/people/?page=${page}&search=${search}`);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return response.json(); // Убедитесь, что данные имеют нужную структуру
}
