export default function BookSelected(props){
    let book = (props.state.book.value)?props.state.book.value:''
    let displayedChapter = (props.state.chapter >= 0)?" ch "+parseInt(props.state.chapter+1):""
    let displayedVerse = (props.state.verse >= 0)?" v "+parseInt(props.state.verse+1):""

    return(<div>{book} {displayedChapter} {displayedVerse}</div>)
}