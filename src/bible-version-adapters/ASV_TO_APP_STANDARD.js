// import BIBLE_ASV from "../bible_versions/asv.json"

function customSort(BIBLE_ASV){
    let previousVerse = 0
    let previousChapter = 0
    let previousBook = ""
    let verses = []
    let chapters = []
    let books = []

    for(let i = 0; i < BIBLE_ASV.length; i++){
        let obj = BIBLE_ASV[i]
        let prevObj = (i-1)?BIBLE_ASV[i-1]:null
        let b = obj.book_id, c = obj.chapter, v = obj.verse

        if(i === 0){
            previousBook = b
            verses.push(obj.text)
            previousVerse = v
        }else{
            // Subsequent iterations
            // Next Chapter of the same book
            if(v < previousVerse && c !== previousChapter && b === previousBook){
                chapters.push(verses)
                verses = []
                previousVerse = v
                previousChapter = c
            }else if(v < previousVerse && b !== previousBook){
                // Next Book
                // Add previous chapter to list
                if(c === 1 && v === 1){
                    chapters.push(verses)
                    verses = []
                }
                books.push({
                    chapters:chapters,
                    name:prevObj.book_name,
                    abbrev:prevObj.book_id
                })
                verses = []
                chapters = []
                previousVerse = v
                previousChapter = c
                previousBook = b
            }
            verses.push(obj.text)
            previousVerse = v
            // THE LAST LOOP
            if(i === BIBLE_ASV.length-1){
                books.push({
                    chapters:chapters,
                    name:obj.book_name,
                    abbrev:obj.book_id
                })
            }
        }
        
    }
    return books
}
    
function bibleAsvToStandard(bibleJSON_File){
    let finalBook = customSort(bibleJSON_File)
    return finalBook
}
const EN_ASV = bibleAsvToStandard
export default EN_ASV








// if(b === previousBook && c === previousChapter && v !== previousVerse){
//     verses.push(obj.text)
//     previousVerse = obj.verse
// }else if((b === previousBook && c !== previousChapter && v !== previousVerse)){
//     chapters.push(verses)
//     verses = []
//     previousVerse = obj.verse
//     previousChapter = obj.chapter
// }else if(b !== previousBook && c !== previousChapter && v === 1){
//     books.push({
//         chapters:chapters,
//         name:(prevObj)?prevObj.book_name:obj.book_name,
//         abbrev:(prevObj)?prevObj.book_id:obj.book_id
//     })
//     verses = []
//     chapters = []
//     previousVerse = obj.verse
//     previousChapter = obj.chapter
//     previousBook = obj.book_id
// }else if(b !== previousBook && c === 1 && v === 1){
//     books.push({
//         chapters:chapters,
//         name:(prevObj)?prevObj.book_name:obj.book_name,
//         abbrev:(prevObj)?prevObj.book_id:obj.book_id
//     })
//     // console.log(obj.verse, obj.chapter, obj.book_id)
//     verses = []
//     chapters = []
//     previousVerse = obj.verse
//     previousChapter = obj.chapter
//     previousBook = obj.book_id
// }
// else if(i === BIBLE_ASV.length){
//     books.push({
//         chapters:chapters,
//         name:obj.book_name,
//         abbrev:obj.book_id
//     })
// }
// if(b === "Rev"){
//     // console.log("In revelation")
// }