const quotesWindow = document.getElementById("quotes")
const blockSchemeWindow = document.getElementById("block-scheme")
const dropdownNotes = document.getElementById("dropdown-notes")
const blockNotes = document.getElementById("block-notes")

blockNotes.style.top = document.getElementById("header-liner-u").getBoundingClientRect().height+3+"px"
dropdownNotes.style.height = document.getElementById("canvas").getBoundingClientRect().height + "px"

var openedWindows = []

function openWindow(element){
    if(openedWindows.length == 0){
        element.style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
        element.style.alignItems = "end"
        element.style.paddingBottom = "5px"
        openedWindows.push(element)
    }
    else{
        if(openedWindows.length == 1){
            if(openedWindows[0] == element){
                element.style.height = "25px"
                element.style.alignItems = "center"
                element.style.paddingBottom = "0px"
                openedWindows.splice(openedWindows.indexOf(element), 1)
            }
            else{
                quotesWindow.style.height = document.getElementById("canvas").getBoundingClientRect().height/2 + "px"
                quotesWindow.style.alignItems = "end"
                quotesWindow.style.paddingBottom = "5px"
                blockSchemeWindow.style.height = document.getElementById("canvas").getBoundingClientRect().height/2 + "px"
                blockSchemeWindow.style.alignItems = "end"
                blockSchemeWindow.style.paddingBottom = "5px"
                openedWindows.push(element)
            }
        }
        else{
            openedWindows.splice(openedWindows.indexOf(element), 1)
            element.style.height = "25px"
            element.style.alignItems = "center"
            element.style.paddingBottom = "0px"
            openedWindows[0].style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
        }
    }
}

quotesWindow.onclick = function(){
    openWindow(quotesWindow)
}
blockSchemeWindow.onclick = function(){
    openWindow(blockSchemeWindow)
}