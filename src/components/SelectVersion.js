import React from "react"
function Options(props){
    return props.options.map((option, id)=>{
        return <option key={option.abbrev} value={option.abbrev}>{option.name}</option>
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
                <Options options={this.props.items}/>
            </select>
        )
    }
    
    handleSelect(event){
        let bookObj = this.props.items.find(({abbrev})=>abbrev === event.target.value)
        this.props.handleSelect({name:bookObj.name, value:event.target.value})
    }
}