const quotesEditor = document.getElementById("quotes-text-editor")
const quotesTop = document.getElementById("quotes-text-name")
const blockSchemeTop = document.getElementById("block-scheme-name")
const blockSchemeEditor = document.getElementById("block-scheme-editor")
const dropdownNotes = document.getElementById("dropdown-notes")
const blockNotes = document.getElementById("block-notes")

blockNotes.style.top = document.getElementById("header-liner-u").getBoundingClientRect().height+3+"px"
dropdownNotes.style.height = document.getElementById("canvas").getBoundingClientRect().height + "px"

expandElement(quotesEditor, 'collapsed')
expandElement(blockSchemeEditor, 'collapsed')

var pixHeights = ["0px", (document.getElementById("canvas").getBoundingClientRect().height - 30)/2 +"px", (document.getElementById("canvas").getBoundingClientRect().height - 30) +"px"]
var openedWindows = []

quotesTop.addEventListener('click', () => {
  if(quotesEditor.getAttribute("contenteditable") == "false"){
    quotesEditor.style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
    quotesEditor.setAttribute("contenteditable", true)
    if(openedWindows.length == 0){
        expandElement(quotesEditor, 'collapsed', pixHeights[0], pixHeights[2]);
    }
    else{
        expandElement(quotesEditor, 'collapsed', pixHeights[0], pixHeights[1]);
        expandElement(blockSchemeEditor, 'collapsed', pixHeights[2], pixHeights[1]);
    }
    openedWindows.push(quotesEditor)
  }
  else{
    quotesEditor.setAttribute("contenteditable", false)
    if(openedWindows.length == 1){
        expandElement(quotesEditor, 'collapsed', pixHeights[2], pixHeights[0]);
    }
    else{
        expandElement(quotesEditor, 'collapsed', pixHeights[1], pixHeights[0]);
        expandElement(blockSchemeEditor, 'collapsed', pixHeights[1], pixHeights[2]);
    }
    openedWindows.splice(openedWindows.indexOf(quotesEditor), 1)
  }
});
blockSchemeTop.addEventListener('click', () => {
    if(!openedWindows.includes(blockSchemeEditor)){
        blockSchemeEditor.style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
        if(openedWindows.length == 0){
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[0], pixHeights[2]);
        }
        else{
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[0], pixHeights[1]);
            expandElement(quotesEditor, 'collapsed', pixHeights[2], pixHeights[1]);
        }
        openedWindows.push(blockSchemeEditor)
      }
      else{
        if(openedWindows.length == 1){
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[2], pixHeights[0]);
        }
        else{
            expandElement(blockSchemeEditor, 'collapsed', pixHeights[1], pixHeights[0]);
            expandElement(quotesEditor, 'collapsed', pixHeights[1], pixHeights[2]);
        }
        openedWindows.splice(openedWindows.indexOf(blockSchemeEditor), 1)
      }
});

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