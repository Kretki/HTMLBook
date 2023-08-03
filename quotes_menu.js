const quotesWindow = document.getElementById("quotes")
const dropdownNotes = document.getElementById("dropdown-notes")
const blockNotes = document.getElementById("block-notes")

blockNotes.style.top = document.getElementById("header-liner-u").getBoundingClientRect().height+3+"px"
dropdownNotes.style.height = document.getElementById("canvas").getBoundingClientRect().height + "px"

function openQuotes(){
    if(quotesWindow.getBoundingClientRect().height<30){
        quotesWindow.style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
        quotesWindow.style.alignItems = "end"
        quotesWindow.style.paddingBottom = "5px"
    }
    else{
        quotesWindow.style.height = "25px"
        quotesWindow.style.alignItems = "center"
        quotesWindow.style.paddingBottom = "0px"
    }
}

quotesWindow.onclick = openQuotes