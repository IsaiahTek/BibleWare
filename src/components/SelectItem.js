import React from "react"
export default class SelectItem extends React.Component{
    constructor(props){
        super(props)

        this.handleSelect = this.handleSelect.bind(this)
    }

    render(){
        const items = this.props.items.map((item, id)=>{
            const displayField = (typeof this.props.displayType != "undefined" && this.props.displayType.toUpperCase() !== "Numeric".toUpperCase())?item:id+1;
            return <option value={id} key={item}>{displayField}</option>
        })
        return(
            <select onChange={this.handleSelect}>
                <option disabled>{this.props.placeholder}</option>
                <option hidden>{this.props.placeholder}</option>
                {items}
            </select>
            )
    }

    handleSelect(event){
        this.props.handleSelectItem(parseInt(event.target.value))
    }
}