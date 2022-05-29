import React from "react";
class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {searchText:""}

        this.updateSearchText = this.updateSearchText.bind(this)
    }
    render(){
        // const Search = <>{search}</>
        return(
            <div>
                <i className="search-icon bw-search-icon" alt="search icon" ></i>
                <input className="search-box" type="search" value={this.state.searchText} onChange={this.updateSearchText} placeholder="search"></input>
            </div>
        );
    }
    updateSearchText(ev) {
        this.setState({searchText:ev.target.value})
        let newValue = this.state.searchText
        this.props.updateSearchKey(newValue)
    }
}
export default Search