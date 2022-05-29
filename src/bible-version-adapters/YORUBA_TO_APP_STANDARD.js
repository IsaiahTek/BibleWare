import BIBLE_YORUBA from "../bible_versions/yoruba-bible.json"

function bibleYorubaToStandard(){
    let books = []
    let chapters = []
    let verses = []
    let previousChapter = 0
    let previousVerse = 0
    for(let i = 0; i < BIBLE_YORUBA.length; i++){
        let book = BIBLE_YORUBA[i]
        let details = book.details
        let bookName = BIBLE_YORUBA[i].bookName
        for(let j = 0; j < details.length; j++){
            let c = details[j].chapter
            let v = details[j].verse
            // Next Chapter
            if(v < previousVerse && c !== previousChapter){
                chapters.push(verses)
                verses = []
                previousVerse = v
                previousChapter = c
            }
            verses.push(details[j].text)
            previousVerse = v
            if(j === details.length - 1){
                chapters.push(verses)
            }
        }
        books.push({
            chapters:chapters,
            name:bookName,
            abbrev:bookName
        })
        chapters = []
        verses = []
    }
    return books
}
let  NG_YORUBA = bibleYorubaToStandard()
export default NG_YORUBA
