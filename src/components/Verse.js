import React from "react"
class Verse extends React.Component{
    render(){
        return(
            <div className="verse">
                <p className="text" aria-details={this.props.address}>{this.props.body}</p>
            </div>
        )
    }
}
export default Verse