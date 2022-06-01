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

function SingleDangerousResult(props){
    return {__html:`<div class="verse"><small><em>${props.dataItem.address[1].name+" ch "+parseInt(props.dataItem.address[2]+1)+" : " +parseInt(props.dataItem.address[3]+1)}</em></small><p>${props.dataItem.text}</p></div>`}
}
function DangerousResults(props){
    return props.listsData.map(data=>{
        let bibleObj = {openPanAddress:true, address:[data.address]}
        return (<div onClick={()=>props.openBookByAddress(bibleObj)} dangerouslySetInnerHTML={SingleDangerousResult({dataItem:data})}  key={data.address[1].name+data.address[2]+data.address[3]} />)
    })
}
export default class BiblePan extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            version:Object,
            book:Object,
            chapter:Number,
            verse:Number,
            searchKey:"",
            bibleFile : [],
            hasLoadedBible: false
        }
        this.searchResult = []

        this.bibleUsesAdapter = ['asv', 'bible_esv', 'yoruba-bible']
        this.adapterOfBible = {"asv":EN_ASV, "bible_esv":EN_ESV, "yoruba-bible":NG_YORUBA}

        this.handleSelectBook = this.handleSelectBook.bind(this)
        this.handleSelectChapter = this.handleSelectChapter.bind(this)
        this.handleSelectVerse = this.handleSelectVerse.bind(this)
        this.handleSelectVersion = this.handleSelectVersion.bind(this)
        this.handleUpdateSearchKey = this.handleUpdateSearchKey.bind(this)
        this.openBookByAddress = this.openBookByAddress.bind(this)

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

    openBookByAddress(bible){
        this.props.openBookByAddress(bible)
    }

    fetchAndCommitBibleFile(){
        this.setState({hasLoadedBible : false})
        const dp = new Promise((resolve, reject)=>{
            resolve(this.state.version.abbreviation)
        })
        dp.then(()=>{
            let baseUrl = (this.bibleUsesAdapter.includes(this.state.version.abbreviation))?"http://localhost:3000/bible_versions/":"http://localhost:3000/bible_versions/bible-master/json/"
            fetch(`${baseUrl+this.state.version.abbreviation}.json`).then((response)=>{
                return response.json()
            }).then((data)=>{
                if(this.bibleUsesAdapter.includes(this.state.version.abbreviation)){
                    this.setState({bibleFile:this.adapterOfBible[this.state.version.abbreviation](data)})
                }else{
                    this.setState({bibleFile : data})
                }
            }).then(()=>{
                this.setState({hasLoadedBible : true})
            })
        })
    }

    componentDidMount(){
        if(this.props.bibleAddress){
            this.setState({version:this.props.bibleAddress.versionObj})
            this.setState({book:this.props.bibleAddress.bookObj})
            this.setState({chapter:this.props.bibleAddress.chapter})
        }
    }
    
    getSearchKey(){
        return this.state.searchKey
    }
    handleUpdateSearchKey(key){
        this.setState({searchKey:key})
        let keyUpdatePromise = new Promise((resolve, reject)=>{
            resolve(this.state.searchKey === key)
        })
        let prm = new Promise((resolve, reject)=>{
            resolve(this.state.bibleFile)
        })
        prm.then(()=>{
            keyUpdatePromise.then(()=>{
                this.searchBibleAndCommitResult(key)
            })
        })
    }
    // componentDidUpdate(){
    //     let prm = new Promise((resolve, reject)=>{
    //         resolve(this.state.bibleFile)
    //     })
    //     prm.then(()=>{
    //         return this.state.searchKey
    //     }).then(()=>{
    //         this.searchBibleAndCommitResult()
    //     })
    // }
    searchBibleAndCommitResult(key){
        this.searchResult = []
        let unsearchedKeys = ["is", "us", "as", "of", "the", "but", "by", "at", "to", "that", "be", "he", "and", "she", "to", "this"]
        let keyFragments = key.split(" ")
        let keyRegPattern = ""
        keyFragments.forEach((key, id)=>{
            if(keyFragments.length > 1){
                if(id === 0) {
                    keyRegPattern += "("+ key
                }else if(id < keyFragments.length-1) {
                    keyRegPattern +=  ")\|("+key
                }else if(id === keyFragments.length-1){
                    keyRegPattern = keyRegPattern+")"
                }
            }else{
                keyRegPattern = +key
            }
        })
        if(key.length > 4 && !unsearchedKeys.includes(key)){
            this.state.bibleFile.forEach((book, b_id)=>{
                book.chapters.forEach((chapter, c_id)=>{
                    chapter.forEach((verse, v_id)=>{
                        if(new RegExp(key, "gi").test(verse)){
                            let  newText = verse.replaceAll(new RegExp(keyRegPattern, "gi"), (match)=>{
                                return `<span class="highlight-text"><em>${match}</em></span>`
                            })
                            let newObj = {"address":[this.state.version, {name:book.name, id:b_id}, c_id, v_id], "text":newText}
                            this.searchResult.push(newObj)
                        }
                    })
                })
            })
        }
    }
    render(){
        let BooksSelector
        let ChaptersSelector
        let VersesSelector
        
        let books = null
        let chapters = null
        let verses = null
        let VersesView = null

        
        if(typeof this.state.version.name != "undefined" && this.state.hasLoadedBible){
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
                VersesView = chapters[this.state.chapter].map((verse, id)=> {return (<div key={id} className="verse"><small><small><em>verse {id+1}</em></small></small><p>{verse}</p></div>)})

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
                <div className="bible-content">{VersesView}</div>
                <div  className="bible-content">
                    <DangerousResults openBookByAddress={this.openBookByAddress} listsData={this.searchResult} />
                </div>
            </div>
        )
    }
}