import "./App.css";
import {ChangeEvent, FC, useState} from "react";
import SearchList from "./components/SearchList/SearchList.tsx";
import {useLocalStorage} from "./hooks/useLocalStorage.ts";

const App: FC = () => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    //const [search, setSearch] = useState<string>(localStorage.getItem('searchTerm') || '');
    const [isClicked, setIsClicked] = useState<boolean>(false);
    const [search, setSearch] = useLocalStorage();

    const fetchData = async () => {
        const request = `https://swapi.dev/api/people/?search=${search}`;

        setLoading(true);
        try {
            const response = await fetch(request);
            if (response.ok) {
                const data = await response.json();
                console.log("Fetched data:", data);
                setData(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        setLoading(false);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearch(value);
    };

    const makeError = () => {
        setIsClicked(true);
    };

    if (isClicked) {
        throw new Error('some error happened i guess');
    }

    const msg = data ? 'No results' : 'Search for something';

    return (
        <div className="wrapper">
            <div className="section top">
                <label htmlFor="search" className="section__title">Search</label>
                <input
                    type="search"
                    id="search"
                    value={search}
                    onChange={handleChange}
                    name="search"
                />
                <button onClick={fetchData}>Search</button>
                <button onClick={makeError}>Click Me</button>
            </div>
            <div className="section bottom">
                {loading ? <p>Loading...</p> :
                    data && data.count > 0 ? <SearchList results={data.results}/> : <p>{msg}</p>
                }
            </div>
        </div>
    );
};

export default App;