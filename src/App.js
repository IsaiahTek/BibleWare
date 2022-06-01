import './App.css';
// import Verse from './components/Verse.js';
import ReadBible from './routes/ReadBible.js';
import Home from './routes/Home';
import { Route, Routes } from 'react-router-dom';
import React, { Fragment } from 'react';

class App extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            dayNightMode:0,
        }

        this.setDayNightTheme = this.setDayNightTheme.bind(this)
    }

    // getDayNightValue(){
    //     return this.state.dayNightMode
    // }

    setDayNightTheme(){
        let value = this.state.dayNightMode
        this.setState({dayNightMode:!value})
    }
    getDayNightTheme() {
        const themeForDay = "<style>body{background-color: white; color:rgb(148, 0, 69)}"
        +".controls-container{background-color:#ff93c5}"
        +".verse{background-color:#f9f9f9}</style>"
        const themeForNight =
        "<style>body{background-color:rgb(100, 0, 47);color: rgb(255, 177, 207); }"
        +".bible-pan{box-shadow: rgb(255, 0, 98) 0px 0px 8px 2px;} </style>"
        return (this.state.dayNightMode)?themeForNight:themeForDay
    }
    createMarkup(){
        return {__html:this.getDayNightTheme()}
    }
    render(){
        const dayNightNames = ["Day", "Night"]
        let getNextDayNightThemeName = (this.state.dayNightMode)?dayNightNames[0]:dayNightNames[1]
        return (
            <Fragment>
                <span dangerouslySetInnerHTML={this.createMarkup()}></span>
                <div className='day-night-handle' onClick={this.setDayNightTheme} >{getNextDayNightThemeName}?</div>
                <Routes>
                    <Route path="/" element={<Home greetings="BibleWare"></Home>}></Route>
                    <Route path="/read-bible" element={<ReadBible greetings="Continue reading the HOLY Bible"></ReadBible>}></Route>
                </Routes>
            </Fragment>
        );
      
    }
}

export default App;