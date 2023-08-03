const quotesEditor = document.getElementById("quotes-text-editor")
const quotesTop = document.getElementById("quotes-text-name")
const blockSchemeTop = document.getElementById("block-scheme-name")
const dropdownNotes = document.getElementById("dropdown-notes")
const blockNotes = document.getElementById("block-notes")

blockNotes.style.top = document.getElementById("header-liner-u").getBoundingClientRect().height+3+"px"
dropdownNotes.style.height = document.getElementById("canvas").getBoundingClientRect().height + "px"

var openedWindows = []

function openQuotes(){
    if(openedWindows.length == 0){
        quotesEditor.style.height = document.getElementById("canvas").getBoundingClientRect().height - 30 + "px"
        quotesEditor.setAttribute("contenteditable", true)
        openedWindows.push(quotesEditor)
    }
}
quotesTop.addEventListener('click', () => {
  const content = quotesEditor;
  expandElement(content, 'collapsed');
});

function expandElement(elem, collapseClass) {
  // debugger;
  elem.style.height = '';
  elem.style.transition = 'none';
  
  const startHeight = window.getComputedStyle(elem).height;
  
  // Remove the collapse class, and force a layout calculation to get the final height
  elem.classList.toggle(collapseClass);
  const height = window.getComputedStyle(elem).height;
  
  // Set the start height to begin the transition
  elem.style.height = startHeight;
  
  // wait until the next frame so that everything has time to update before starting the transition
  requestAnimationFrame(() => {
    elem.style.transition = '';
    
    requestAnimationFrame(() => {
        elem.style.height = height
    })
  })
  
  // Clear the saved height values after the transition
  elem.addEventListener('transitionend', () => {
    elem.style.height = '';
    elem.removeEventListener('transitionend', arguments.callee);
  }); 
}