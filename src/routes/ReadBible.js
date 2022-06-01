// import { Fragment } from "react";
import { Link } from "react-router-dom"
import BiblePan from "../components/BiblePan"
import favourite from "../favourite.svg"
import comments from "../comments.svg"
import React from "react";

export default class ReadBible extends React.Component{
    constructor(props){
        super(props)
        let defaultPanID = this.generatePanID()
        this.state = {
            pans:[defaultPanID]
        }

        this.handleAddPan = this.handleAddPan.bind(this)
        this.handleRemovePan = this.handleRemovePan.bind(this)
    }
    handleAddPan(){
        let thisPans = this.state.pans
        thisPans.push(this.generatePanID())
        this.setState({pans:thisPans})
    }
    handleRemovePan(event, panID){
        let thisPans = this.state.pans
        thisPans.splice(thisPans.indexOf(panID), 1)
        this.setState({pans:thisPans})
    }
    generatePanID(){
        return (Math.floor(Math.random()*10000)).toString();
    }
    openBookByAddress(bibleObj){
        // let panID = (Math.floor(Math.random()*10000)).toString()
        // let versionObj = bibleObj[0]
        // let bookObj = bibleObj[1]
        // let chapter = bibleObj[2]
        // let openPanAddress =  true
        // let openPanByAddressConstructor = {id:panID, openPanAddress:openPanAddress, address:{versionObj:versionObj, bookObj:bookObj, chapter:chapter}}
        console.log(bibleObj)
        // this.setState((state)=>{
        //     pans:state.pans.push(openPanByAddressConstructor)
        // })
    }
    render(){

        const PanInput = (
            <form>
                <button className="add-pan" type="button" onClick={this.handleAddPan}>+</button>
            </form>
        )
        let Pans = null
        Pans = this.state.pans.map((pan)=>{
            if(pan.openPanAddress){
                return(<div className="bible-pan" key={pan.id}>
                <BiblePan id={pan.id} bibleAddress={pan.address} handleRemovePan={this.handleRemovePan}/>
            </div>)
            }else return(
                <div className="bible-pan" key={pan}>
                    <BiblePan id={pan} openBookByAddress={this.openBookByAddress} handleRemovePan={this.handleRemovePan}/>
                </div>
            )
        })
        return(
            <div>
                <div className="bible-controls">
                    <div className="t-center">
                        <img className="icons" src={favourite} alt="favourite"></img>
                        <div>
                            <small>Favourite</small>
                        </div>
                    </div>
                    <div className="t-center">
                        <img className="icons" src={comments} alt="favourite"></img>
                        <div>
                            <small>Comments</small>
                        </div>
                    </div>
                    <div className="t-center">
                        <img className="icons" src={favourite} alt="favourite"></img>
                        <div>
                            <small>Notes</small>
                        </div>
                    </div>
                    <div className="t-center">
                        <img className="icons" src={favourite} alt="favourite"></img>
                        <div>
                            <small>Settings</small>
                        </div>
                    </div>
                    <div className="t-center">
                        <img className="icons" src={favourite} alt="favourite"></img>
                        <div>
                            <small>Views</small>
                        </div>
                    </div>
                    <div className="t-center">
                        <img className="icons" src={favourite} alt="favourite"></img>
                        <div>
                            <small>About</small>
                        </div>
                    </div>
                </div>
                <div className="view-intro">
                    <Link to="/">Home</Link>
                </div>
                <div className="container">
                    <div>
                        {PanInput}
                    </div>
                    <div className="bible-container">
                        {Pans}
                    </div>
                </div>
            </div>
        )
    }
}

// THE CODE BELOW IS COMPATIBLE WITH "bible.json"
// const chapters = kjv["Book"].map((chapters)=>{
//     return chapters.Chapter.map((verses, id)=>{
//         return verses.Verse.map((verse, id)=>{
//             return <p key={id}>{verse.Verse}</p>
//         }) 
//     })
// })