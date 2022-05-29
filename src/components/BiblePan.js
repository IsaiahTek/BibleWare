// import EN_KJV from "../bible_versions/bible-master/json/en_kjv.json";
// import EN_BBE from "../bible_versions/bible-master/json/en_bbe.json";
// import EN_ESV from "../bible-version-adapters/ESV_TO_APP_STANDARD";
// import EN_ASV from "../bible-version-adapters/ASV_TO_APP_STANDARD";
// import NG_YORUBA from "../bible-version-adapters/YORUBA_TO_APP_STANDARD";
// import AR_SVD from "../bible_versions/bible-master/json/ar_svd.json";
// import ZH_CUV from "../bible_versions/bible-master/json/zh_cuv.json";
// import ZH_NCV from "../bible_versions/bible-master/json/zh_ncv.json";
// import DE_SCHLACHTER from "../bible_versions/bible-master/json/de_schlachter.json";
// import EL_GREEK from "../bible_versions/bible-master/json/el_greek.json";
// import EO_ESPERANTO from "../bible_versions/bible-master/json/eo_esperanto.json";
// import ES_RVR from "../bible_versions/bible-master/json/es_rvr.json";
// import FI_FINNISH from "../bible_versions/bible-master/json/fi_finnish.json";
// import FI_PR from "../bible_versions/bible-master/json/fi_pr.json";
// import FR_APEE from "../bible_versions/bible-master/json/fr_apee.json";
// import KO_KO from "../bible_versions/bible-master/json/ko_ko.json";
// import PT_AA from "../bible_versions/bible-master/json/pt_aa.json";
// import PT_ACF from "../bible_versions/bible-master/json/pt_acf.json";
// import PT_NVI from "../bible_versions/bible-master/json/pt_nvi.json";
// import RO_CORNILESCU from "../bible_versions/bible-master/json/ro_cornilescu.json";
// import RU_SYNODAL from "../bible_versions/bible-master/json/ru_synodal.json";
// import VI_VIETNAMESE from "../bible_versions/bible-master/json/vi_vietnamese.json";
import BibleIndex from "../bible_versions/bible-master/json/index.json";
import SelectBook from "./SelectBook";
import SelectVersion from "./SelectVersion";
import SelectItem from "./SelectItem";
import Search from "./Search";
import BookSelected from "../components/BookSelected"
import React from "react";

export default class BiblePan extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            version:Object,
            book:Object,
            chapter:Number,
            verse:Number,
            searchKey:"",
            bibleFile : null,
            hasLoadedBible: false
        }

        this.handleSelectBook = this.handleSelectBook.bind(this)
        this.handleSelectChapter = this.handleSelectChapter.bind(this)
        this.handleSelectVerse = this.handleSelectVerse.bind(this)
        this.handleSelectVersion = this.handleSelectVersion.bind(this)
        this.handleUpdateSearchKey = this.handleUpdateSearchKey.bind(this)
    }
    handleSelectBook(selected){
        this.setState({book:selected})
    }
    handleSelectChapter(selected){
        this.setState({chapter:selected})
    }
    handleSelectVerse(selected){
        this.setState({verse:selected})
    }
    handleSelectVersion(selected){
        this.setState({version:selected})
        this.setBibleFile()
    }

    setBibleFile(){
        this.setState({hasLoadedBible : false})
        const dp = new Promise((resolve, reject)=>{
            resolve(this.state.version.value)
        })
        dp.then(()=>{
            fetch(`http://localhost:3000/bible_versions/bible-master/json/${this.state.version.value}.json`).then((response)=>{
                return response.json()
            }).then((data)=>{
                this.setState({bibleFile : data})
            }).then(()=>{
                this.setState({hasLoadedBible : true})
            })

        })
    }
    
    getSearchKey(){
        return this.state.searchKey
    }
    handleUpdateSearchKey(key){
        this.setState({searchKey:key})
    }

    // getAllBooksMap(){
    //     console.log(this.state.bibleFiles)
    //     return this.state.bibleFiles
    // }
    // getBible(version_id){
    //     return this.getAllBooksMap().find((elem)=>{
    //         return Object.keys(elem)[0] === version_id
    //     })
    // }
    
    render(){
        let BooksSelector
        let ChaptersSelector
        let VersesSelector
        
        let books = null
        let chapters = null
        let verses = null
        let ChapterView = null
        
        if(typeof this.state.version.value != "undefined" && this.state.hasLoadedBible){
            // const BIBLE = Object.values(this.getBible(this.state.version.value))[0]
            console.log(this.state.bibleFile, this.state.hasLoadedBible)
            books = this.state.bibleFile.map((book, id)=>{
                return book
            })
            BooksSelector = <SelectBook handleSelect={this.handleSelectBook} items={books}/>
        }
        
        if(this.state.book.id >= 0 && this.state.hasLoadedBible){
            chapters = books[this.state.book.id].chapters.map((chapter, id)=>{
                return chapter
            })
            ChaptersSelector = <SelectItem value={this.state.chapter} handleSelectItem = {this.handleSelectChapter} items={chapters} placeholder="Select Chapter" />
        }
        
        if(this.state.chapter >= 0 && this.state.hasLoadedBible){
            try{
                verses = chapters.map((verse, id)=>{return verse})
                VersesSelector = <SelectItem value={this.state.verse} handleSelectItem = {this.handleSelectVerse} items={verses} placeholder="Select Verse" />
                ChapterView = chapters[this.state.chapter].map((verse, id)=> {return (<div key={id} className="verse"><small><small><em>verse {id+1}</em></small></small><p>{verse}</p></div>)})

            }catch(e){
                // 
            }
        }
        return(
            <div className={this.props.className} id={this.props.id}>
                <div className="controls-container">
                    <form>
                        <button className="close-pan" type="button" onClick={(event)=>this.props.handleRemovePan(event, this.props.id)}>&times;</button>
                    </form>
                    <span><BookSelected state={this.state}/></span>
                    <div className="book-controls">
                        <div className="actionable">
                            <SelectVersion handleSelect={this.handleSelectVersion} multiLanguageVersions={BibleIndex} displayType="" />
                        </div>
                        <div className="actionable">
                            <Search searchText={this.state.searchKey} updateSearchKey={this.handleUpdateSearchKey} />
                        </div>
                        <div className="actionable">
                            {BooksSelector}
                        </div>
                        <div className="actionable">
                            {ChaptersSelector}
                        </div>
                        <div className="actionable">
                            {VersesSelector}
                        </div>
                    </div>
                </div>
                <div className="bible-content">{ChapterView}</div>
            </div>
        )
    }
}


// [
//     {"en_kjv": EN_KJV},
//     {"en_bbe": EN_BBE},
//     {"en_esv": EN_ESV},
//     {"en_asv": EN_ASV},
//     {"ng_yoruba": NG_YORUBA},
//     {"ar_svd": AR_SVD},
//     {"zh_cuv": ZH_CUV},
//     {"zh_ncv": ZH_NCV},
//     {"de_schlachter": DE_SCHLACHTER},
//     {"el_greek": EL_GREEK},
//     {"eo_esperanto": EO_ESPERANTO},
//     {"es_rvr": ES_RVR},
//     {"fi_finnish": FI_FINNISH},
//     {"fi_pr": FI_PR},
//     {"fr_apee": FR_APEE},
//     {"ko_ko": KO_KO},
//     {"pt_aa": PT_AA},
//     {"pt_acf": PT_ACF},
//     {"pt_nvi": PT_NVI},
//     {"ro_cornilescu": RO_CORNILESCU},
//     {"ru_cornilescu": RU_SYNODAL},
//     {"vi_vietnamese": VI_VIETNAMESE},
// ]



// getAllBooksNames(){
//     let allVersions = []
//     BibleIndex.forEach(({versions})=>{
//         versions.forEach((version)=>{
//             allVersions.push({name:version.name, abbrev:version.abbreviation})
//         })
//     })
//     return allVersions
// }

// const versions = this.getAllBooksNames().map((i)=>{return i})