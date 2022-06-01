import React from "react"
function Options(props){
    return props.options.map((option, id)=>{
        return <option key={option.abbrev} value={option.name}>{option.name}</option>
    })
}
export default class SelectBook extends React.Component{
    constructor(props){
        super(props)

        this.handleSelect = this.handleSelect.bind(this)
    }

    render(){
        return(
            <select value={this.props.book} onChange={this.handleSelect}>
                <option hidden >Select Book</option>
                <option disabled >Select Book</option>
                <Options options={this.props.items}/>
            </select>
        )
    }
    
    handleSelect(event){
        let bookID = this.props.items.findIndex(({name})=>name === event.target.value)
        this.props.handleSelect({id:parseInt(bookID), name:event.target.value})
    }
}