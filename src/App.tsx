import "./App.css";
import { ChangeEvent, Component } from "react";
import SearchList from "./components/SearchList/SearchList.tsx";

export type DataType = {
    birth_year: string;
    gender: string;
    height: string;
    name: string;
}

export interface State {
    data: {
        results: DataType[];
        count: number;
    } | null;
    loading: boolean;
    search: string;
    isClicked: boolean;
}

interface Props {}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            data: null,
            loading: false,
            search: localStorage.getItem('searchTerm') || '',
            isClicked: false,
        };
        this.makeError = this.makeError.bind(this)
    }

    fetchData = async () => {
        const request = `https://swapi.dev/api/people/?search=${this.state.search}`;

        this.setState({ loading: true });
        await fetch(request).then((response) => {
            if (response.ok) {
                return response.json();
            }
        }).then((data) => {
            console.log("Fetched data:", data);
            this.setState({ data: data });
        });
        this.setState({ loading: false });
    };

    handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState({ search: value });
        localStorage.setItem('searchTerm', value);
    };

    makeError = () => {
        this.setState({ isClicked: true });
    }

    render() {
        const { search, data, loading } = this.state;

        if (this.state.isClicked) {
            throw new Error('some error happened i guess');
        }

        const msg = data? 'No results' : 'Search for something';

        return (
            <div className="wrapper">
                <div className="section top">
                    <label htmlFor="search" className="section__title">Search</label>
                    <input
                        type="search"
                        id="search"
                        value={search}
                        onChange={this.handleChange}
                        name="search"
                    />
                    <button onClick={this.fetchData}>Search</button>
                    <button onClick={this.makeError}>Click Me</button>
                </div>
                <div className="section bottom">
                {loading ? <p>Loading...</p> :
                        data && data.count > 0 ? <SearchList results={data.results}/> : <p>{msg}</p>
                    }
                </div>
            </div>
        );
    }
}

export default App;