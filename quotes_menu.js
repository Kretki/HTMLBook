const quotesEditorContainer = document.getElementById("quotes-text-container")
const quotesEditor = document.getElementById("quotes-text-editor")
const quotesTop = document.getElementById("quotes-text-name")
const blockSchemeTop = document.getElementById("block-scheme-name")
const blockSchemeEditor = document.getElementById("block-scheme-editor")
const dropdownNotes = document.getElementById("dropdown-notes")
const blockNotes = document.getElementById("block-notes")

const quotesMenu = document.getElementById("choose-quotes")
const notesArrow = document.getElementById("arrow-down-quotes")
const notesChooser = document.getElementById("saved-notes")
const listExNotes = document.getElementById("li-saved-notes")

function chooseNotes(){
    notesArrow.style.transform = "rotate(180deg)"
}

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

function afterExpansionNotes(){
    quotesMenu.style.width = (quotesEditorContainer.getBoundingClientRect().width - 20) + "px"
    quotesEditor.style.height = (document.getElementById("canvas").getBoundingClientRect().height - quotesMenu.getBoundingClientRect().height - 55) + "px"
    notesChooser.style.width = (quotesEditorContainer.getBoundingClientRect().width - 20) + "px"
}

blockNotes.style.top = document.getElementById("header-liner-u").getBoundingClientRect().height+3+"px"
dropdownNotes.style.height = document.getElementById("canvas").getBoundingClientRect().height + "px"
// listExNotes.style.height = "75px"
expandElement(quotesEditorContainer, 'collapsed')
expandElement(blockSchemeEditor, 'collapsed')

var pixHeights = ["0px", (document.getElementById("canvas").getBoundingClientRect().height - 30)/2 +"px", (document.getElementById("canvas").getBoundingClientRect().height - 30) +"px"]
var openedWindows = []

notesArrow.onclick = chooseNotes

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
