import EN_ESV from "../bible-version-adapters/ESV_TO_APP_STANDARD";
import EN_ASV from "../bible-version-adapters/ASV_TO_APP_STANDARD";
import NG_YORUBA from "../bible-version-adapters/YORUBA_TO_APP_STANDARD";
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

        this.bibleUsesAdapter = ['asv', 'bible_esv', 'yoruba-bible']
        this.adapterOfBible = {"asv":EN_ASV, "bible_esv":EN_ESV, "yoruba-bible":NG_YORUBA}

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
        this.fetchAndCommitBibleFile()
    }

    fetchAndCommitBibleFile(){
        this.setState({hasLoadedBible : false})
        const dp = new Promise((resolve, reject)=>{
            resolve(this.state.version.value)
        })
        dp.then(()=>{
                
            let baseUrl = (this.bibleUsesAdapter.includes(this.state.version.value))?"http://localhost:3000/bible_versions/":"http://localhost:3000/bible_versions/bible-master/json/"
            fetch(`${baseUrl+this.state.version.value}.json`).then((response)=>{
                return response.json()
            }).then((data)=>{
                if(this.bibleUsesAdapter.includes(this.state.version.value)){
                    this.setState({bibleFile:this.adapterOfBible[this.state.version.value](data)})
                }else{
                    this.setState({bibleFile : data})
                }
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