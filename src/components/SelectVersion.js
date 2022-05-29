import React from "react"

function OptionGroups(props){
    return props.multiLanguageVersions.map(({language,versions})=> <optgroup key={language} label={language}><Options options={versions}></Options></optgroup>)
}

function Options(props){
    return props.options.map(option=>{
        return <option key={option.abbreviation} value={option.abbreviation}>{option.name}</option>
    })
}
export default class SelectVersion extends React.Component{
    constructor(props){
        super(props)

        this.handleSelect = this.handleSelect.bind(this)
    }

    render(){
        return(
            <select value={this.props.versions} onChange={this.handleSelect}>
                <option hidden >Select Version</option>
                <option disabled >Select Version</option>
                <OptionGroups multiLanguageVersions={this.props.multiLanguageVersions}/>
            </select>
        )
    }
    
    handleSelect(event){
        let bookObj = null
        this.props.multiLanguageVersions.forEach(({versions}) => {
            versions.forEach((obj)=>{
                if(obj.abbreviation === event.target.value) bookObj = obj
            })
        });
        this.props.handleSelect({name:bookObj.name, value:event.target.value})
    }
}