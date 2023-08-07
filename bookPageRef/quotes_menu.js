const quotesEditorContainer = document.getElementById("quotes-text-container")
const quotesEditor = document.getElementById("quotes-text-editor")
const quotesEditorLi = document.getElementById("quotes-editor-li")
const quotesTop = document.getElementById("quotes-text-name")
const blockSchemeTop = document.getElementById("block-scheme-name")
const blockSchemeEditor = document.getElementById("block-scheme-editor")
const dropdownNotes = document.getElementById("dropdown-notes")
const blockNotes = document.getElementById("block-notes")

const quotesMenu = document.getElementById("choose-quotes")
const notesArrow = document.getElementById("arrow-down-quotes")
const notesChooser = document.getElementById("saved-notes")
const outerNotes = document.getElementById("outer-saved")
const listExNotes = document.getElementById("li-saved-notes")
const addNote = document.getElementById("add-note")
const acceptNote = document.getElementById("accept-note")

function expandElement(elem, collapseClass, startHeight, height) {
    // debugger;
    elem.style.height = startHeight;
    elem.style.transition = 'none';
    
    // Remove the collapse class, and force a layout calculation to get the final height
    elem.classList.toggle(collapseClass);
    
    // Set the start height to begin the transition
    elem.style.height = startHeight;
    
    // wait until the next frame so that everything has time to update before starting the transition
    requestAnimationFrame(() => {
      elem.style.transition = '';
      
      requestAnimationFrame(() => {
          elem.style.height = height
      })
    })
}

function chooseNotes(){
    if(outerNotes.getBoundingClientRect().height<50){
        notesArrow.style.transform = "rotate(180deg)"
        expandElement(outerNotes, 'collapsed', "0px", "100px")
    }
    else{
        notesArrow.style.transform = "rotate(0deg)"
        expandElement(outerNotes, 'collapsed', "100px", "0px")
    }
}

function addOneNote(){
    var li = document.createElement("li")
    li.setAttribute("id", "quote-"+notesChooser.getElementsByTagName("li").length)
    li.setAttribute("class", "notes")
    li.style.width = quotesMenu.getBoundingClientRect().width+"px"
    li.style.borderBottomLeftRadius = "10px"
    li.style.borderBottomRightRadius = "10px"
    li.style.backgroundColor = "#7f5fb9"
    listExNotes.style.height = listExNotes.getBoundingClientRect().height+27+"px"
    document.getElementsByClassName("notes")[document.getElementsByClassName("notes").length-1].style.borderBottomLeftRadius = "0px"
    document.getElementsByClassName("notes")[document.getElementsByClassName("notes").length-1].style.borderBottomRightRadius = "0px"
    notesChooser.appendChild(li)
}

function afterExpansionNotes(){
    quotesMenu.style.width = (quotesEditorContainer.getBoundingClientRect().width - 20) + "px"
    notesChooser.style.width = (quotesEditorContainer.getBoundingClientRect().width - 20) + "px"
    var li = document.getElementsByClassName("notes")
    for(var i = 0; i<li.length; i++){
        li[i].style.width = quotesMenu.getBoundingClientRect().width+"px"
    }
    li[li.length-1].style.borderBottomLeftRadius = "10px"
    li[li.length-1].style.borderBottomRightRadius = "10px"
    quotesEditor.style.height = (document.getElementById("canvas").getBoundingClientRect().height - quotesMenu.getBoundingClientRect().height - 110) + "px"
    quotesEditorLi.style.height = (document.getElementById("canvas").getBoundingClientRect().height - 70) + "px"
    quotesEditorLi.style.top = notesChooser.getBoundingClientRect().height-15+"px"
    quotesEditorLi.style.width = quotesMenu.getBoundingClientRect().width+20+"px"
    quotesEditor.style.width = quotesMenu.getBoundingClientRect().width-20+"px"
    acceptNote.style.width = (quotesEditorContainer.getBoundingClientRect().width - 20) + "px"
    acceptNote.style.top = quotesEditor.getBoundingClientRect().height+10+"px"
    listExNotes.style.marginTop = -quotesEditor.getBoundingClientRect().height-acceptNote.getBoundingClientRect().height-15+"px"
}

blockNotes.style.top = document.getElementById("header-liner-u").getBoundingClientRect().height+3+"px"
dropdownNotes.style.height = document.getElementById("canvas").getBoundingClientRect().height + "px"
listExNotes.style.height = 25*notesChooser.getElementsByTagName("li").length+10+"px"
expandElement(quotesEditorContainer, 'collapsed')
expandElement(blockSchemeEditor, 'collapsed')
expandElement(outerNotes, 'collapsed')

var pixHeights = ["0px", (document.getElementById("canvas").getBoundingClientRect().height - 30)/2 +"px", (document.getElementById("canvas").getBoundingClientRect().height - 30) +"px"]
var openedWindows = []

notesArrow.onclick = chooseNotes
addNote.onclick = addOneNote

quotesTop.addEventListener('click', () => {
  if(quotesEditor.getAttribute("contenteditable") == "false"){
    quotesEditorContainer.style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
    quotesEditor.setAttribute("contenteditable", true)
    if(openedWindows.length == 0){
        expandElement(quotesEditorContainer, 'collapsed', pixHeights[0], pixHeights[2]);
    }
    else{
        expandElement(quotesEditorContainer, 'collapsed', pixHeights[0], pixHeights[1]);
        expandElement(blockSchemeEditor, 'collapsed', pixHeights[2], pixHeights[1]);
    }
    openedWindows.push(quotesEditorContainer)
  }
  else{
    quotesEditor.setAttribute("contenteditable", false)
    if(openedWindows.length == 1){
        expandElement(quotesEditorContainer, 'collapsed', pixHeights[2], pixHeights[0]);
    }
    else{
        expandElement(quotesEditorContainer, 'collapsed', pixHeights[1], pixHeights[0]);
        expandElement(blockSchemeEditor, 'collapsed', pixHeights[1], pixHeights[2]);
    }
    openedWindows.splice(openedWindows.indexOf(quotesEditorContainer), 1)
  }
  afterExpansionNotes()
});
blockSchemeTop.addEventListener('click', () => {
    if(!openedWindows.includes(blockSchemeEditor)){
        blockSchemeEditor.style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
        if(openedWindows.length == 0){
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[0], pixHeights[2]);
        }
        else{
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[0], pixHeights[1]);
            expandElement(quotesEditorContainer, 'collapsed', pixHeights[2], pixHeights[1]);
        }
        openedWindows.push(blockSchemeEditor)
      }
      else{
        if(openedWindows.length == 1){
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[2], pixHeights[0]);
        }
        else{
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[1], pixHeights[0]);
            expandElement(quotesEditorContainer, 'collapsed', pixHeights[1], pixHeights[2]);
        }
        openedWindows.splice(openedWindows.indexOf(blockSchemeEditor), 1)
      }
});