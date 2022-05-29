import { Link } from "react-router-dom";
import logo from "../BibleWare.svg";
import Search from '../components/Search'

export default function Home(props){
    return(
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h1>{props.greetings}</h1>
                <Link to="/read-bible">Read Bible</Link>
                <div className="search-container">
                    <Search />
                </div>
            </header>
        </div>
    )
}